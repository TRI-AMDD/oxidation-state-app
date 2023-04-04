package tri.oxidationstates;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.TreeMap;

import matsci.Element;
import matsci.Species;
import matsci.engine.minimizer.CGMinimizer;
import matsci.io.app.log.Status;
import matsci.io.vasp.POSCAR;
import matsci.location.Coordinates;
import matsci.structure.BravaisLattice;
import matsci.structure.Structure;
import matsci.structure.StructureBuilder;
import matsci.structure.symmetry.StructureMapper;
import matsci.util.MSMath;
import tri.oxidationstates.fitting.OxidationStateData;
import tri.oxidationstates.fitting.OxidationStateData.Entry;
import tri.oxidationstates.ion.IIonFinder;
import tri.oxidationstates.ion.IonFactory;
import tri.oxidationstates.ion.IonFactory.Ion;
import tri.oxidationstates.ion.OxideIonFinder;
import tri.oxidationstates.ion.ZintlIonFinder;
import tri.oxidationstates.structure.LatticeOptimizer;
import tri.oxidationstates.structure.StructureOptimizer;
import tri.structure.mapper.GeneralStructureMapper;
import tri.structure.mapper.GeneralStructureMapper.Map;

public class IonTools {

	public static void findIons(String rootDir) {

		String structDirName = rootDir + "/Structures/";
		//OxidationStateData data = new OxidationStateData(rootDir + "/Training_Data/mpData.txt", false, 0, false, false, structDirName);
		OxidationStateData data = new OxidationStateData(rootDir + "/Training_Data/icsdData.txt", false, 0, false, false, structDirName);

		String ionDirName = rootDir + "/Oxide_ion_structures/";
		
		for (int entryNum = 0; entryNum < data.numEntries(); entryNum++) {
			
			Entry entry = data.getEntry(entryNum);
			//if (!entry.getID().endsWith("1087505")) {continue;}
			//if (!entry.getID().endsWith("1197430")) {continue;}
			String fileName = structDirName + entry.getID() + ".vasp";
			if (fileName.endsWith("icsd_133689.vasp")) {
				System.currentTimeMillis();
			}
			
			POSCAR infile = new POSCAR(fileName);
			Structure structure = new Structure(infile);
			structure = structure.findPrimStructure().getCompactStructure();
			extractIons(structure, ionDirName, fileName);
		}
		
	}
	
	public static void addIonsToData(String rootDir) {
		
		String dataFileName  = rootDir + "/Training_Data/icsdData.txt";
		String outDataFileName = rootDir + "/Training_Data/icsdData_polyOxides_smartCompositions.txt";
		String ionTypeDirName = rootDir + "/ion_types/";
		String structureDirName = rootDir + "/Structures/";
		
		OxidationStateData data = new OxidationStateData(dataFileName, true, -1, true, false, structureDirName);
		data.removeNonChargeBalancedStructures(structureDirName);
		
		HashMap<String, Structure> ionTypes = IonFactory.loadKnownMolecules(ionTypeDirName);
		
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(outDataFileName));
			
			for (int entryNum = 0; entryNum < data.numEntries(); entryNum++) {
				Entry entry = data.getEntry(entryNum);
				String id = entry.getID();
				String structFileName = structureDirName + id + ".vasp";
				Structure structure = new Structure(new POSCAR(structFileName));
				TreeMap<String, Integer> ionCounts = new TreeMap<String, Integer>();
				TreeMap<String, Integer> ionTypeCounts = new TreeMap<String, Integer>();
				for (int siteNum = 0; siteNum < structure.numDefiningSites(); siteNum++) {
					Species species = structure.getSiteSpecies(siteNum);
					Ion ion = IonFactory.get(species);
					String ionSymbol = ion.getSymbol();
					int ionCount = ionCounts.containsKey(ionSymbol) ? ionCounts.get(ionSymbol) : 0;
					ionCounts.put(ionSymbol, ionCount + 1);
					
					String ionTypeSymbol = ion.getStructureSymbol();
					int ionTypeCount = ionTypeCounts.containsKey(ionTypeSymbol) ? ionTypeCounts.get(ionTypeSymbol) : 0;
					ionTypeCounts.put(ionTypeSymbol, ionTypeCount + 1);
				}
				
				OxideIonFinder finder = new OxideIonFinder(structure);
				for (int ionNum = 0; ionNum < finder.numFoundIons(); ionNum++) {
					Structure ionStructure = finder.getFoundIon(ionNum);
					Structure elementStructure = ionStructure.removeOxidationStates();
					for (String ionTypeID : ionTypes.keySet()) {
						Structure ionType = ionTypes.get(ionTypeID);
						if (ionStructure.numPeriodicDimensions() != ionType.numPeriodicDimensions()) {continue;}
						if (ionStructure.numDefiningSites() != ionType.numDefiningSites()) {continue;}
						GeneralStructureMapper mapper = new GeneralStructureMapper(elementStructure, ionType);
						if (!mapper.mapExists()) {continue;}
						double oxidationState = 0;
						for (int siteNum = 0; siteNum < ionStructure.numDefiningSites(); siteNum++) {
							Species species = ionStructure.getSiteSpecies(siteNum);
							Ion ion = IonFactory.get(species);
							int ionCount = ionCounts.get(ion.getSymbol());
							ionCounts.put(ion.getSymbol(), ionCount - 1);
							int ionTypeCount = ionTypeCounts.get(ion.getStructureSymbol());
							ionTypeCounts.put(ion.getStructureSymbol(), ionTypeCount - 1);
							oxidationState += ion.getOxidationState();
						}
						Ion ion = IonFactory.get(ionTypeID, oxidationState);
						int count = ionCounts.containsKey(ion.getSymbol()) ? ionCounts.get(ion.getSymbol()) : 0;
						ionCounts.put(ion.getSymbol(), count + 1);
						
						String ionTypeSymbol = ion.getStructureSymbol();
						count = ionTypeCounts.containsKey(ionTypeSymbol) ? ionTypeCounts.get(ionTypeSymbol) : 0;
						ionTypeCounts.put(ionTypeSymbol, count + 1);
					}
				}

				String outString = entryNum + ": ";
				outString += id + "\t";
				
				int[] counts = ionTypeCounts.values().stream().mapToInt(i->i).toArray();
				int gcf = MSMath.GCF(counts);
				for (String ionTypeSymbol : ionTypeCounts.keySet()) {
					int count = ionTypeCounts.get(ionTypeSymbol) / gcf;
					if (count == 0) {continue;}
					outString += IonFactory.getIonSymbol(ionTypeSymbol, 0) + count;
				}
				outString += "\t";
				
				//outString += structure.getCompositionString() + "\t";
				for (String ionSymbol : ionCounts.keySet()) {
					int count = ionCounts.get(ionSymbol);
					if (count == 0) {continue;}
					outString += " " + ionSymbol;
				}
				outString += "\tICSD\tNaN\tfalse";
				System.out.println(outString);
				writer.write(outString);
				writer.newLine();
			}
			writer.flush();
			writer.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
	}
	
	public static boolean extractIons(Structure structure, String moleculeDirName, String sourceFileName) {
		
		new File(moleculeDirName).mkdirs();
		
		boolean foundIon = false;

		//IIonFinder ionFinder = new ZintlIonFinder(structure);
		IIonFinder ionFinder = new OxideIonFinder(structure);
		if (ionFinder.numFoundIons() > 0) {
			//System.out.print(structure.getDescription() + ", " + structure.getCompositionString(" "));
			System.out.print(sourceFileName + ", " + structure.getCompositionString());
			for (int ionNum = 0; ionNum < ionFinder.numFoundIons(); ionNum++) {
				Structure ion = ionFinder.getFoundIon(ionNum);
				int numDimensions = ion.numPeriodicDimensions();
				String composition = ion.getCompositionString("_", false);
				String outDirName = moleculeDirName + "/" + numDimensions + "_periodic_dimensions/" + composition + "/";
				File outDir = new File(outDirName);
				outDir.mkdirs();
				String ionFileName = outDirName + "/" + outDir.listFiles().length + ".vasp";
				boolean[] periodicity = ion.getVectorPeriodicity();
				String periodicityString = "";
				periodicityString += periodicity[0] ? "T" : "F";
				periodicityString += periodicity[1] ? "_T" : "_F";
				periodicityString += periodicity[2] ? "_T" : "_F";
				ion.setDescription(periodicityString + " " + new File(sourceFileName).getName());
				ion = ion.padNonPeriodicDimensions(10);
				ion = ion.centerNonPeriodicDimensions();
				POSCAR outfile = new POSCAR(ion);
				outfile.writeSpeciesWithDescription(false);
				outfile.writeFile(ionFileName);
				System.out.print(", " + ionFinder.getFoundIon(ionNum).getCompositionString("_", false));
				foundIon = true;
			}
			System.out.println();
		}
		
		return foundIon;
	}
	

	public static void groupIons(String rootDir) {
		//String moleculeDirName = rootDir + "/Molecules_Hull/";
		String moleculeDirName = rootDir + "/Oxide_ion_structures/";
		File moleculeDir = new File(moleculeDirName);
		
		File[] dimensionDirs = moleculeDir.listFiles();
		for (File dimensionDir : dimensionDirs) {
			if (!dimensionDir.isDirectory()) {continue;}
			/*if (!dimensionDir.getName().startsWith("3")) {
				continue;
			}*/
			File[] compositionDirs = dimensionDir.listFiles();
			for (File compositionDir : compositionDirs) {
				if (!compositionDir.isDirectory()) {continue;}
				/*if (!compositionDir.getAbsolutePath().contains("0_periodic_dimensions/O2_Se1")) {
					continue;
				}*/
				File[] molecules = compositionDir.listFiles();
				HashSet<HashSet<Structure>> knownMolecules= new HashSet<HashSet<Structure>>();
				/*if (!compositionDir.getName().endsWith("Ge2_P4")) {
					continue;
				}*/
				String moleculeID = compositionDir.getName();
				for (File moleculeFile : molecules) {
					if (!moleculeFile.getName().endsWith(".vasp")) {continue;}
					Structure molecule = IonFactory.loadIonStructureFromFile(moleculeFile.getAbsolutePath());
					boolean foundMatch = false;
					for (HashSet<Structure> moleculeSet : knownMolecules) {
						for (Structure knownMolecule : moleculeSet) {
							if (compareStructures(knownMolecule, molecule)) {
								foundMatch = true;
								moleculeSet.add(molecule);
								//int headerLength = moleculeDir.getAbsolutePath().length() + 1;
								String sourcePath = molecule.getDescription().split(" ")[1];
								File sourceFile = new File(sourcePath);
								
								String knownSourcePath = knownMolecule.getDescription().split(" ")[1];
								File knownSourceFile = new File(knownSourcePath);
								//System.out.println(moleculeFile.getAbsolutePath().substring(headerLength));
								//Status.detail(molecule.getDescription().substring(headerLength) + ", " + knownMolecule.getDescription().substring(headerLength));
								Status.detail(sourceFile.getName() + ", " + knownSourceFile.getName());
								break;
							}
						}
					}
					if (!foundMatch) {
						HashSet<Structure> moleculeSet = new HashSet<Structure>();
						moleculeSet.add(molecule);
						knownMolecules.add(moleculeSet);
					}
				}
				
				// Combine the molecule sets if they have overlapping molecules
				// We switch to arrays here because sets of sets that change cause serious problems in Java
				
				ArrayList<HashSet<Structure>> knownMoleculeList = new ArrayList<HashSet<Structure>>(knownMolecules);
				boolean[] mergedSets = new boolean[knownMoleculeList.size()];
				//HashSet<HashSet<Structure>> mergedSets = new HashSet<HashSet<Structure>>();
				/*for (HashSet<Structure> moleculeSet : knownMolecules) {
				if (mergedSets.contains(moleculeSet)) {continue;}*/
				for (int setNum = 0; setNum < knownMoleculeList.size(); setNum++) {
					if (mergedSets[setNum]) {continue;}
					HashSet<Structure> moleculeSet = knownMoleculeList.get(setNum);
					//for (HashSet<Structure> moleculeSet2 : knownMolecules) {
					for (int setNum2 = 0; setNum2 < knownMoleculeList.size(); setNum2++) {
						if (setNum == setNum2) {continue;}
						if (mergedSets[setNum2]) {continue;}
						HashSet<Structure> moleculeSet2 = knownMoleculeList.get(setNum2);
						for (Structure molecule : moleculeSet2) {
							if (moleculeSet.contains(molecule)) {
								moleculeSet.addAll(moleculeSet2);
								mergedSets[setNum2] = true;
								break;
							}
						}
					}
				}
				
				for (int setNum = mergedSets.length - 1; setNum >= 0; setNum--) {
					if (mergedSets[setNum]) {
						knownMoleculeList.remove(setNum);
					}
				}
				
				//knownMolecules.removeAll(mergedSets);  
				int setNum = 0;
				for (HashSet<Structure> moleculeSet : knownMoleculeList) {
					String dirName = compositionDir.getAbsolutePath() + "/set_" + (setNum++) + "/";
					new File(dirName).mkdirs();
					int moleculeNum = 0;
					for (Structure molecule : moleculeSet) {
						POSCAR outfile = new POSCAR(molecule);
						String outfileName = dirName + (moleculeNum++) + ".vasp";
						outfile.writeFile(outfileName);
					}
					Structure meanStructure = makeRepresentativeStructure2(dirName);
					meanStructure = meanStructure.padNonPeriodicDimensions(10);
					meanStructure = meanStructure.centerNonPeriodicDimensions();
					String meanFileName = dirName + "mean.vasp";
					new POSCAR(meanStructure).writeFile(meanFileName);
				}
			}
		}
	}

	public static Structure findRepresentativeStructure(List<Structure> structures) {
		
		Structure bestStructure = null;
		double bestScore = Double.POSITIVE_INFINITY;
		int[] structOrder = MSMath.getRandomShuffle(structures.size());
		int numStructs = Math.min(structOrder.length, 40);  // We sample up to 40 structures
		for (int structNum = 0; structNum < numStructs; structNum++) { 
		//for (Structure structure1 : structures) {
			Structure structure1 = structures.get(structOrder[structNum]);
			double scoreSum = 0;
			for (Structure structure2 : structures) {
				if (structure1 == structure2) {continue;}
				GeneralStructureMapper mapper = new GeneralStructureMapper(structure1, structure2);
				mapper.setDistanceTolerance(0.07 * 5); // TODO come up with a better way to determine these
				mapper.setSkewTolerance(0.08 * 5);
				mapper.setVolumeTolerance(0.15 * 5);
				GeneralStructureMapper.Map bestMap = mapper.getBestMap();
				if (bestMap == null) {
					scoreSum = Double.POSITIVE_INFINITY;
					break;
				}
				scoreSum += bestMap.scoreMap();
				if (scoreSum > bestScore) {break;}
			}
			if (scoreSum == Double.POSITIVE_INFINITY) { // This isn't as accurate but it's a lot faster.
				continue; 
			}
			if (scoreSum < bestScore) {
				bestScore = scoreSum;
				bestStructure = structure1;
			}
		}
		
		return bestStructure;
		
	}

	public static Structure makeRepresentativeStructure2(String dirName) {
		
		if (dirName.equals("/home/timmueller/Projects/Oxidation state analysis/ICSD/Oxide_ion_structures/0_periodic_dimensions/C3_O3/set_0/")) {
			System.currentTimeMillis();
		}
		
		File dir = new File(dirName);
		File[] structureFiles = dir.listFiles();
		if (structureFiles.length == 0) {
			return null;
		} 
		ArrayList<Structure> structures = new ArrayList<Structure>();
		for (File structureFile : structureFiles) {
			if (!structureFile.getName().endsWith(".vasp")) {continue;}
			if (structureFile.getName().endsWith("mean.vasp") ) {continue;}
			Structure structure = IonFactory.loadIonStructureFromFile(structureFile.getAbsolutePath());
			structure.setDescription(structure.getDescription() + " " + structureFile.getName());
			structures.add(structure);
		}
		if (structures.size() == 1) {
			return structures.get(0);
		}
				
		//Structure template = structures.get(0);
		if (dirName.equals("/home/timmueller/Projects/Oxidation state analysis/ICSD/Oxide_ion_structures/0_periodic_dimensions/O10_P3/set_6/")) {
			System.currentTimeMillis();
		}
		Structure template = findRepresentativeStructure(structures);
		BravaisLattice templateLattice = template.normalizeNonPeriodicVectors().getDefiningLattice();
		BravaisLattice bestLattice = templateLattice;
		CGMinimizer cgEngine = new CGMinimizer();

		// Find the representative lattice
		if (template.numPeriodicDimensions() > 0) {
			//Structure mappedTemplate = null; // TODO Why did I use this?  Just mappint template to itself.
			GeneralStructureMapper.Map[] bestMaps = new GeneralStructureMapper.Map[structures.size()];
			for (int structNum = 0; structNum < structures.size(); structNum++) {
				Structure structure = structures.get(structNum);
				/*if (structNum == 10) {
					System.currentTimeMillis();
					new POSCAR(template.padNonPeriodicDimensions(10).centerNonPeriodicDimensions()).writeFile("/home/timmueller/template.vasp");
					new POSCAR(structure.padNonPeriodicDimensions(10).centerNonPeriodicDimensions()).writeFile("/home/timmueller/structure.vasp");
				}*/
				GeneralStructureMapper mapper = new GeneralStructureMapper(template, structure);
				mapper.setDistanceTolerance(0.07 * 5); // TODO come up with a better way to determine these
				mapper.setSkewTolerance(0.08 * 5);
				mapper.setVolumeTolerance(0.15 * 5);
				GeneralStructureMapper.Map[] maps = mapper.getMaps();
	
				double minSkewFactor = Double.POSITIVE_INFINITY;
				for (GeneralStructureMapper.Map map : maps) {
					double skewFactor = map.getSkewFactor();
					if (skewFactor < minSkewFactor) {
						minSkewFactor = skewFactor;
						bestMaps[structNum] = map;
					}
				}
				if (bestMaps[structNum] == null) {
					mapper = new GeneralStructureMapper(template, structure);
					mapper.setDistanceTolerance(0.07 * 5);
					mapper.setSkewTolerance(0.08 * 5);
					mapper.setVolumeTolerance(0.15 * 5);
					maps = mapper.getMaps();
				}
				/*if (structNum == 0) {
					mappedTemplate = bestMaps[0].getTransformedSubStructure();
				}*/
			}
			
			ArrayList<BravaisLattice> lattices = new ArrayList<BravaisLattice>();
			for (int mapNum= 0; mapNum < bestMaps.length; mapNum++) {
	/*			if (bestMaps[mapNum] == null) {
					continue;
				}*/
				lattices.add(bestMaps[mapNum].getSubLattice());
			}
			
			LatticeOptimizer optimizer = new LatticeOptimizer(lattices.toArray(new BravaisLattice[0]));
			cgEngine.minimize(optimizer);
			
			LatticeOptimizer bestState = (LatticeOptimizer) cgEngine.getMinimumState();
			bestLattice = bestState.getLattice();			
			//templateLattice = mappedTemplate.normalizeNonPeriodicVectors().getDefiningLattice();
		}
		
		// TODO assumes that the template was also used to find best lattice -- enforce this.
		//StructureBuilder builder = new StructureBuilder(mappedTemplate); // TODO why did I do this?  Just mapped template to itself.
		StructureBuilder builder = new StructureBuilder(template);
		builder.setCellVectors(bestLattice.getCellVectors());
		builder.setVectorPeriodicity(bestLattice.getDimensionPeriodicity());
		for (int siteNum = 0; siteNum < builder.numDefiningSites(); siteNum++) {
			double[] coordArray = builder.getSiteCoords(siteNum).getCoordArray(templateLattice.getLatticeBasis());
			Coordinates coords = new Coordinates(coordArray, bestLattice.getLatticeBasis());
			builder.setSiteCoordinates(siteNum, coords);
		}
		template = new Structure(builder);
				
		new POSCAR(template.padNonPeriodicDimensions(10).centerNonPeriodicDimensions()).writeFile("/home/timmueller/template.vasp");
		
		GeneralStructureMapper.Map[] bestMaps = new GeneralStructureMapper.Map[structures.size()];
		for (int structNum = 0; structNum < structures.size(); structNum++) {
			Structure structure = structures.get(structNum);
			GeneralStructureMapper mapper = new GeneralStructureMapper(template, structure);
			mapper.setDistanceTolerance(0.07 * 5);
			mapper.setSkewTolerance(0.08 * 5);
			mapper.setVolumeTolerancePerDimension(0.07 * 5);
			GeneralStructureMapper.Map[] maps = mapper.getMaps();
			double minDistanceError = Double.POSITIVE_INFINITY;
			for (GeneralStructureMapper.Map map : maps) {
				double distanceError = map.getDistanceFactor();
				if (distanceError < minDistanceError) {
					minDistanceError = distanceError;
					bestMaps[structNum] = map;
				}
			}
		}
		
		ArrayList<Structure> bestStructures = new ArrayList<Structure>();
		for (int mapNum= 0; mapNum < bestMaps.length; mapNum++) {
			//if (bestMaps[mapNum] == null) {continue;}
			bestStructures.add(bestMaps[mapNum].getTransformedSubStructure(true));
		}
		
		StructureOptimizer structOptimizer = new StructureOptimizer(bestStructures.toArray(new Structure[0]));
		cgEngine.minimize(structOptimizer);
		
		StructureOptimizer bestState2 = (StructureOptimizer) cgEngine.getMinimumState();
		Structure bestStructure = bestState2.getStructure();
		return bestStructure;
	}
		
	public static Structure makeRepresentativeStructure(String dirName) {

		File dir = new File(dirName);
		File[] structureFiles = dir.listFiles();
		if (structureFiles.length == 0) {
			return null;
		} 
		ArrayList<Structure> structures = new ArrayList<Structure>();
		for (File structureFile : structureFiles) {
			if (!structureFile.getName().endsWith(".vasp")) {continue;}
			if (structureFile.getName().endsWith("mean.vasp") ) {continue;}
			Structure molecule = IonFactory.loadIonStructureFromFile(structureFile.getAbsolutePath());
			structures.add(molecule.normalizeNonPeriodicVectors());
		}
		if (structures.size() == 1) {
			return structures.get(0);
		}
		
		Structure template = structures.get(0); 
		BravaisLattice templateLattice = new BravaisLattice(template.getDefiningLattice().getPeriodicVectors());
		
		// TODO assumes that the template was also used to find best lattice -- enforce this.
		StructureBuilder builder = new StructureBuilder(template);
		BravaisLattice bestLattice = findRepresentativeLattice(dirName);
		builder.setCellVectors(bestLattice.getCellVectors());
		builder.setVectorPeriodicity(bestLattice.getDimensionPeriodicity());
		for (int siteNum = 0; siteNum < builder.numDefiningSites(); siteNum++) {
			double[] coordArray = builder.getSiteCoords(siteNum).getCoordArray(templateLattice.getLatticeBasis());
			Coordinates coords = new Coordinates(coordArray, bestLattice.getLatticeBasis());
			builder.setSiteCoordinates(siteNum, coords);
		}
		template = new Structure(builder);
		
		new POSCAR(template).writeFile("/home/timmueller/template.vasp");
		
		GeneralStructureMapper.Map[] bestMaps = new GeneralStructureMapper.Map[structures.size()];
		for (int structNum = 0; structNum < structures.size(); structNum++) {
			Structure structure = structures.get(structNum);
			GeneralStructureMapper mapper = new GeneralStructureMapper(template, structure);
			mapper.setDistanceTolerance(0.07);
			mapper.setSkewTolerance(0.08);
			mapper.setVolumeTolerancePerDimension(0.07);
			GeneralStructureMapper.Map[] maps = mapper.getMaps();
			double minDistanceError = Double.POSITIVE_INFINITY;
			for (GeneralStructureMapper.Map map : maps) {
				double distanceError = map.getDistanceFactor();
				if (distanceError < minDistanceError) {
					minDistanceError = distanceError;
					bestMaps[structNum] = map;
				}
			}
		}
		
		ArrayList<Structure> bestStructures = new ArrayList<Structure>();
		for (int mapNum= 0; mapNum < bestMaps.length; mapNum++) {
			if (bestMaps[mapNum] == null) {continue;}
			bestStructures.add(bestMaps[mapNum].getTransformedSubStructure());
		}
		
		StructureOptimizer optimizer = new StructureOptimizer(bestStructures.toArray(new Structure[0]));
		CGMinimizer cgEngine = new CGMinimizer();
		cgEngine.minimize(optimizer);
		
		StructureOptimizer bestState = (StructureOptimizer) cgEngine.getMinimumState();
		Structure bestStructure = bestState.getStructure();
		return bestStructure;
	}
	
	public static BravaisLattice findRepresentativeLattice(String dirName) {
		
		File dir = new File(dirName);
		File[] structureFiles = dir.listFiles();
		ArrayList<Structure> structures = new ArrayList<Structure>();
		for (File structureFile : structureFiles) {
			if (!structureFile.getName().endsWith(".vasp")) {continue;}
			if (structureFile.getName().endsWith("mean.vasp") ) {continue;}
			Structure molecule = IonFactory.loadIonStructureFromFile(structureFile.getAbsolutePath());
			structures.add(molecule);
		}
		
		Structure template = structures.get(0);
		GeneralStructureMapper.Map[] bestMaps = new GeneralStructureMapper.Map[structures.size()];
		for (int structNum = 0; structNum < structures.size(); structNum++) {
			Structure structure = structures.get(structNum);
			GeneralStructureMapper mapper = new GeneralStructureMapper(template, structure);
			mapper.setDistanceTolerance(0.07);
			mapper.setSkewTolerance(0.08);
			mapper.setVolumeTolerance(0.15);
			GeneralStructureMapper.Map[] maps = mapper.getMaps();
			if (maps.length == 0) {
				System.currentTimeMillis();
			}
			double minSkewFactor = Double.POSITIVE_INFINITY;
			for (GeneralStructureMapper.Map map : maps) {
				double skewFactor = map.getSkewFactor();
				if (skewFactor < minSkewFactor) {
					minSkewFactor = skewFactor;
					bestMaps[structNum] = map;
				}
			}
		}
		
		ArrayList<BravaisLattice> lattices = new ArrayList<BravaisLattice>();
		for (int mapNum= 0; mapNum < bestMaps.length; mapNum++) {
			if (bestMaps[mapNum] == null) {continue;}
			lattices.add(bestMaps[mapNum].getSubLattice());
		}
		
		LatticeOptimizer optimizer = new LatticeOptimizer(lattices.toArray(new BravaisLattice[0]));
		CGMinimizer cgEngine = new CGMinimizer();
		cgEngine.minimize(optimizer);
		
		LatticeOptimizer bestState = (LatticeOptimizer) cgEngine.getMinimumState();
		BravaisLattice bestLattice = bestState.getLattice();
		return bestLattice;
	}
	

	//public static boolean compareMolecules(Molecule molecule1, Molecule molecule2) {
	public static boolean compareStructures(Structure structure1, Structure structure2) {
				
		/*Structure structure1 = molecule1.getStructure();
		Structure structure2 = molecule2.getStructure();*/
		
		//structure1 = structure1.findPrimStructure().getCompactStructure();
		//structure2 = structure2.findPrimStructure().getCompactStructure();
		
		//structure1 = structure1.removeElement(Element.indium);
		//structure2 = structure2.removeElement(Element.indium);
		
		//if (!molecule1.getID().endsWith("3.vasp")) {return false;}
		//if (!molecule2.getID().endsWith("0.vasp")) {return false;}
		
		/*if (molecule1.getID().endsWith("3.vasp")) {
			System.out.println("Woo-hoo!");
			Vector shiftVector = new Vector(new double[] {0.5, 0.5, 0.5}, structure1.getDirectBasis());
			//structure1 = structure1.translate(shiftVector);
			//int[][] superToDirect = new int[][] {
			//	{-1, 0, 0},
			//	{0, -1, 0},
			//	{0, 0, 1}
			//};
			structure1 = new SuperStructure(structure1, superToDirect);
			POSCAR outfile = new POSCAR(structure1);
			outfile.writeFile("/home/timmueller/temp.vasp");
		}*/
		
		double scaleFactor = Math.pow(structure1.getDefiningVolume() / structure2.getDefiningVolume(), 1.0 / structure1.numPeriodicDimensions());
		//System.out.println(scaleFactor);
		//structure2 = structure2.scaleLatticeConstant(scaleFactor);
		
		if (structure1.numPeriodicDimensions() != structure2.numPeriodicDimensions()) {
			return false;
		}

		if (structure1.numDefiningSites() != structure2.numDefiningSites()) {
			return false;
		}
		
		Element[] elements = structure1.getDistinctElements();
		for (Element element : elements) {
			int numAtoms1 = structure1.numDefiningSitesWithElement(element);
			int numAtoms2 = structure2.numDefiningSitesWithElement(element);
			if (numAtoms1 != numAtoms2) {
				return false;
			}
		}
		
		/*IonAssigner assigner = new IonAssigner(molecule1.getStructure(), new Molecule[] {molecule2});
		return (assigner.numAssignments() > 0);*/

		GeneralStructureMapper mapper = new GeneralStructureMapper(structure1, structure2);
		mapper.setDistanceTolerance(0.07);
		mapper.setSkewTolerance(0.08);
		mapper.setVolumeTolerance(0.15);
		return (mapper.numMaps() > 0);
		//return false;
	}
	
}


