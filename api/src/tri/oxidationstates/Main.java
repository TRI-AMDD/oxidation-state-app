package tri.oxidationstates;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.LineNumberReader;
import java.util.ArrayList;
import java.util.HashMap;

import matsci.Element;
import matsci.io.app.log.Status;
import matsci.io.structure.CIF;
import matsci.io.vasp.POSCAR;
import matsci.structure.Structure;
import matsci.util.arrays.ArrayUtils;
import tri.oxidationstates.calculator.LikelihoodCalculator;
import tri.oxidationstates.calculator.LikelihoodCalculator.OxidationStateSet;
import tri.oxidationstates.fitting.OxidationStateData;
import tri.oxidationstates.fitting.OxidationStateData.Entry;
import tri.oxidationstates.fitting.ParamOptimizer;
import tri.oxidationstates.ion.IonAssigner;
import tri.oxidationstates.ion.IonFactory;
import tri.oxidationstates.ion.IonFactory.Ion;
import tri.oxidationstates.ion.ZintlIonFinder;

public class Main {
	
	//public static String ROOT_DIR = "/home/timmueller/Projects/Oxidation state analysis/Polyatomic_ions/";
	public static String ROOT_DIR = "/home/timmueller/Projects/Oxidation state analysis/ICSD/";
	public static String STRUCT_DIR = ROOT_DIR + "/Structures/";
		
	public static void main(String[] args) {
		
		Status.includeTime(true);
		Status.setLogLevelDetail();
		//printBondLengths();
		//IonTools.findIons(ROOT_DIR);
		//IonTools.groupIons(ROOT_DIR);
		/*IonTools.addIonsToData(ROOT_DIR);
		System.exit(0);*/
		
		//String dataFileName  = ROOT_DIR + "/Training_Data/icsdData_polyOxides_smartCompositions.txt";
		String dataFileName = ROOT_DIR + "/Training_Data/icsdData_Integer_NoZero_ChargeBalanced_NoRareIons2-0.003_PolyOxide_NoZintl.txt";
		//String dataFileName  = ROOT_DIR + "/Training_Data/icsdData.txt";
		//String paramFileName = ROOT_DIR + "/Parameters/parameters_centered2_noZero_polyOxides_1E-5reg.txt";
		//String paramFileName = ROOT_DIR + "/Parameters/parameters_centered2_noZero_1E-5reg.txt";
		String paramFileName = ROOT_DIR + "/Parameters/parameters_centered2_MinBounds_NoZero_NoRareIons2-0.003_PolyOxide_NoZintl_1E-5Reg.txt";
		String ionStructureDirName = ROOT_DIR + "/ion_types/";
		//String outDataFileName = ROOT_DIR + "/Training_Data/icsdData_Integer_NoZero_ChargeBalanced_NoRareIons2-0.003_PolyOxide_NoZintl_0.2Removed2.txt";

		IonFactory.loadKnownMolecules(ionStructureDirName);
		
		/*OxidationStateData data = new OxidationStateData(dataFileName);
		data.removeEntriesWithNonIntegerStates();
		data.removeEntriesWithZeroOxidationStates();
		//data.removeUnstableEntries(0);*/
		
		//OxidationStateData data = new OxidationStateData(dataFileName);
		//OxidationStateData data = new OxidationStateData(dataFileName, true, -1, true, false, STRUCT_DIR);
		//data.removeNonChargeBalancedStructures(STRUCT_DIR);
		//data.removeUncommonOxidationStates(0.003);
		  //data.removeUncommonOxidationStates(1E-5);
		//data.removeRandomEntries(0.2);
		
		//data.writeFile(outDataFileName);
		
		LikelihoodCalculator evaluator = new LikelihoodCalculator(paramFileName);	
		/*evaluator.writeDataFiles(ROOT_DIR + "/Visualization/DataFiles_PolyOxides_NoZintl/SharpCutoff/");
		System.exit(0);*/
		
		OxidationTrainer trainer = new OxidationTrainer(ROOT_DIR);

		//trainer.prepareTrainingDataFromICSD();
		//trainer.fitParameters(data);
		//trainer.fitParameters(data, evaluator);
		//trainer.writeLikelyOxidationStates(data, evaluator, "calculatedOxidationStates_fromICSD_centered2_noZero_NoRareIons2-0.003_PolyOxide_NoZintl_0.2RemovedOnFullSet_1E-5Reg.txt");
		
		String[] compositions = new String[] {
				"Li4Cr1Fe1Ni2O8",
				"Li3Cr1Fe1Ni2O8",
				"Li2Cr1Fe1Ni2O8",
				"Li1Cr1Fe1Ni2O8",
				"Cr1Fe1Ni2O8",
				"Li4Cr1Fe2Ni1O8",
				"Li3Cr1Fe2Ni1O8",
				"Li2Cr1Fe2Ni1O8",
				"Li1Cr1Fe2Ni1O8",
				"Cr1Fe2Ni1O8",
				"Li4Cr2Fe1Ni1O8",
				"Li3Cr2Fe1Ni1O8",
				"Li2Cr2Fe1Ni1O8",
				"Li1Cr2Fe1Ni1O8",
				"Cr2Fe1Ni1O8",
				"Li4Ti1Cr1Ni2O8",
				"Li3Ti1Cr1Ni2O8",
				"Li2Ti1Cr1Ni2O8",
				"Li1Ti1Cr1Ni2O8",
				"Ti1Cr1Ni2O8",
				"Li4Cr2Fe1Cu1O8",
				"Li3Cr2Fe1Cu1O8",
				"Li2Cr2Fe1Cu1O8",
				"Li1Cr2Fe1Cu1O8",
				"Cr2Fe1Cu1O8",
				"Li4Cr2Cu2O8",
				"Li3Cr2Cu2O8",
				"Li2Cr2Cu2O8",
				"Li1Cr2Cu2O8",
				"Cr2Cu2O8",
				"Li4Cr3Fe1O8",
				"Li3Cr3Fe1O8",
				"Li2Cr3Fe1O8",
				"Li1Cr3Fe1O8",
				"Cr3Fe1O8",
				"Li4Cr2Ga1Fe1O8",
				"Li3Cr2Ga1Fe1O8",
				"Li2Cr2Ga1Fe1O8",
				"Li1Cr2Ga1Fe1O8",
				"Cr2Ga1Fe1O8",
				"Li4Ti1Cr2Cu1O8",
				"Li3Ti1Cr2Cu1O8",
				"Li2Ti1Cr2Cu1O8",
				"Li1Ti1Cr2Cu1O8",
				"Ti1Cr1Cu1O8",
				"Li2Ni1O2",
				"Li1.5Ni1O2",
				"Li1Ni1O2",
				"Li0.5Ni1O2",
				"Ni1O2"
		};
		
		for (String composition : compositions) {
			if (!composition.startsWith("Li4")) {continue;}
			/*if (!composition.equals("Li2Cr3Fe1O8")) {
				System.currentTimeMillis();
				continue;
			}
			
			Ion[] ions = new Ion[] {
					IonFactory.get("Li1+"),
					IonFactory.get("Cr4+"),
					IonFactory.get("Fe3+"),
					//IonFactory.get("Ni2+"),
					IonFactory.get("O2-"),
					IonFactory.get("Cr3+")
			};
			double fermiLevel = evaluator.optimizeLikelihood(ions).getOptimalFermiLevel();
			System.out.println(fermiLevel);
			
			for (Ion ion : ions) {
				System.out.println(ion + "\t" + evaluator.getLikelihood(fermiLevel, ion));
			}*/
			
			OxidationStateSet set = evaluator.getLikelyOxidationStates(composition);
			System.out.println(composition + "\t" + set.getMaxLikelihood() + "\t" + set.getOptimalFermiLevel() + "\t" + set);
		}
		
		//fitParameters();
		//predictLikelyOxidationStates();
		//writeLikelyOxidationStates();
		//writeLikelihoods();
		//writeDataFiles();
		//writeCAMDLikelihoods();
		//testIonAssigner();
		//findZintlIons();
		//mergeZintlIons();
		//findRepresentativeLattice("/home/timmueller/Projects/Oxidation state analysis/Polyatomic_ions/Molecules_Hull/2_periodic_dimensions/As6_Ge6/set_0");
		//findRepresentativeStructure("/home/timmueller/Projects/Oxidation state analysis/Polyatomic_ions/Molecules_Hull/2_periodic_dimensions/As6_Ge6/set_0");
		//testLatticeAverage();
		//getStatesForJoeysData();
		//getData(ROOT_DIR + "/Training_Data/mpData.txt");
		//findMismatchedBV();
		//analyzeMultiValence();
		
		
		/*OxidationStateData data = new OxidationStateData(dataFileName, true, -1, true, false, STRUCT_DIR);
		OxidationTrainer trainer = new OxidationTrainer(ROOT_DIR);*/
		//trainer.fitParameters(data);

	}
	
	public static void analyzeMultiValence() {

		//String dataFileName = ROOT_DIR + "/Training_Data/mpData.txt";
		String dataFileName = ROOT_DIR + "/Training_Data/mpData.txt";
		//String dataFileName = ROOT_DIR + "/Training_Data/mpData_withTheoretical.txt";
		String outFileName = ROOT_DIR + "/BinariesAndTernaries.txt";
		//String paramFileName = ROOT_DIR + "/Parameters/parameters_10x10.txt";
		String paramFileName = ROOT_DIR + "/Parameters/parameters.txt";
		
		int numAttemptsNonMixed = 0;
		int numAttemptsMixed = 0;
		int numSuccessNonMixed = 0;
		int numSuccessMixed = 0;
		
		boolean usePreAssignedStates = true;
		
		ArrayList<Entry> mixedValenceTernaries = new ArrayList<Entry>();

		OxidationStateData data = new OxidationStateData(dataFileName, true, -1, true, false, null);

		/*double hullCutoff = 0.0001;
		//double hullCutoff = 0.01;
		data.removeUnstableEntries(hullCutoff);
		Status.basic(data.numEntries() + " remaining entries in data set within " + hullCutoff + " eV/atom of convex hull.");
		*/
		
		/*String structDirName = ROOT_DIR + "/Structures/";
		data.removeEntriesWithZintlIons(structDirName);
		Status.basic(data.numEntries() + " remaining entries in data set with no Zintl ions.");
		*/
		
		Ion[][] likelyStates = new Ion[data.numEntries()][];
		if (!usePreAssignedStates) {
			LikelihoodCalculator evaluator = new LikelihoodCalculator(paramFileName);
			for (int entryNum = 0; entryNum < data.numEntries(); entryNum++) {
				Entry entry = data.getEntry(entryNum);
				likelyStates[entryNum] = evaluator.getLikelyOxidationStates(entry.getAllMoleculeIDs(), entry.getAllElementWeights()).getIons();
			}
		}
				
		//Ion[] oxygen = new Ion[] {Ion.get(new Molecule(Element.oxygen), -2)};
		Ion[] oxygen = new Ion[] {IonFactory.get(Element.oxygen, -2)};
		
		try {
			
			BufferedWriter writer = new BufferedWriter(new FileWriter(outFileName));
			
			for (int entryNum = 0; entryNum < data.numEntries(); entryNum++) {
				
				Entry entry = data.getEntry(entryNum);
				if (entry.numIons() != 2) {continue;}
				
				//Ion[] ions = entry.getAllIons();
				Ion[] ions = usePreAssignedStates ? entry.getAllIons() : likelyStates[entryNum];
				int numO = numMatchingIons(ions, oxygen);
				//if (numO == 0) {continue;}
	
				for (int entryNum2 = 0; entryNum2 < entryNum; entryNum2++) {
					
					Entry entry2 = data.getEntry(entryNum2);
					if (entry2.numIons() != 2) {continue;}
					
					//Ion[] ions2 = entry2.getAllIons();
					Ion[] ions2 = usePreAssignedStates ? entry2.getAllIons() : likelyStates[entryNum2];
					int numO2 = numMatchingIons(ions2, oxygen);
					//if (numO2 == 0) {continue;}
					
					int numMatchingIons = numMatchingIons(ions, ions2);				
					if (numMatchingIons != 1) {continue;}
	
					int numMatchingSubstructures = numMatchingStructures(ions, ions2);		
					//if (numMatchingElements != 2) {continue;}
					boolean formsTernary = false;

					for (int entryNum3 = 0; entryNum3 < data.numEntries(); entryNum3++) {
						
						Entry entry3 = data.getEntry(entryNum3);
						if (entry3.numIons() != 3) {continue;}
						
						//Ion[] ions3 = entry3.getAllIons();
						Ion[] ions3 = usePreAssignedStates ? entry3.getAllIons() : likelyStates[entryNum3];
						
						/*int numMatchingElements1 = numMatchingElements(ions, ions3);
						if (numMatchingElements1 != 2) {continue;}
						int numMatchingElements2 = numMatchingElements(ions2, ions3);
						if (numMatchingElements2 != 2) {continue;}*/
						
						int numMatchingIons1 = numMatchingIons(ions, ions3);
						if (numMatchingIons1 != 2) {continue;}
						int numMatchingIons2 = numMatchingIons(ions2, ions3);
						if (numMatchingIons2 != 2) {continue;}
						
						formsTernary = true;
						if (numMatchingSubstructures == 2) {
							mixedValenceTernaries.add(entry3);
						}
						break;
					}

					if (numMatchingSubstructures == 1) {
						numAttemptsNonMixed++;
					} else {
						numAttemptsMixed++;
					}
					
					if (formsTernary && (numMatchingSubstructures == 1)) {
						numSuccessNonMixed++;
					} else if (formsTernary) {
						numSuccessMixed++;
					}
					
					if (numAttemptsNonMixed % 1000 == 0) {
						System.out.println(numAttemptsNonMixed + ", " + numAttemptsMixed + ", " + numSuccessNonMixed + ", " + numSuccessMixed + ", " + 1.0 * numSuccessNonMixed / numAttemptsNonMixed + ", " + 1.0 * numSuccessMixed / numAttemptsMixed);
					}
					
					if (numMatchingSubstructures != 2) {continue;}
					
					String outline = entry.getComposition() + "\t" + entry2.getComposition() + "\t" + numMatchingSubstructures + "\t" + (formsTernary? 1 : 0);
					//System.out.println(outline);
					writer.write(outline);
					writer.newLine();
				}
			} 
			writer.flush();
			writer.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		} 
		
		for (Entry entry : mixedValenceTernaries) {
			System.out.println(entry.getComposition());
		}
	}
	
	
	public static void findMismatchedBV() {
		
		String dataFileName = ROOT_DIR + "/Training_Data/mpData.txt";
		//String paramFileName = ROOT_DIR + "/Parameters/parameters_No_Zintl_10x10.txt";
		String paramFileName = ROOT_DIR + "/Parameters/parameters_10x10.txt";
		String structDir = ROOT_DIR + "/Structures/";
		String moleculeDirName = ROOT_DIR + "/Molecules_MismatchedBV/";
		String misMatchDirName = ROOT_DIR + "/Structures_MismatchedBV_NoZintl/";
		
		new File(misMatchDirName).mkdirs();
		
		OxidationStateData data = new OxidationStateData(dataFileName, true, 0, true, false, structDir);
		
		//data.removeEntriesWithNonIntegerStates();
		//Status.basic(data.numEntries() + " remaining entries in data set with all-integer oxidation states.");
		
		double hullCutoff = 0.0001;
		data.removeUnstableEntries(hullCutoff);
		Status.basic(data.numEntries() + " remaining entries in data set within " + hullCutoff + " eV/atom of convex hull.");
		
		data.removeEntriesWithZeroOxidationStates();
		Status.basic(data.numEntries() + " remaining entries in data set with nonzero oxidation state.");

		Status.setLogLevelError();
		//LikelihoodCalculator evaluator = new LikelihoodCalculator(paramFileName);
		
		for (int entryNum = 0; entryNum < data.numEntries(); entryNum++) {
			Entry entry = data.getEntry(entryNum);
			String id = entry.getID();
			//if (!id.equals("mp-1006352") ) {continue;}
			//if (!id.equals("mp-1642")) {continue;}
			//if(!id.equals("mp-559911")) {continue;}
			//System.out.println(id);
			String infileName = structDir + "/" + id + ".vasp";
			POSCAR infile = new POSCAR(infileName);
			Structure structure = new Structure(infile).findPrimStructure().getCompactStructure();
			OxidationStateSet likelyStates = predictLikelyOxidationStates(structure, paramFileName);
			IonAssigner assigner = new IonAssigner(structure, likelyStates);
			double[] bvSums = assigner.getAnalyzer().getBondValenceStates();
			if (ArrayUtils.arrayContains(bvSums, 0)) {continue;}
			if (!assigner.equivalentIonsHaveSameState()) {
				System.out.println("Anomalous assignment: " + infileName);
				Ion[] ions = likelyStates.getIons();
				double[] weights =likelyStates.getWeights();
				for (int ionNum = 0; ionNum < ions.length; ionNum++) {
					System.out.print("" + weights[ionNum] + " " + ions[ionNum] + ", ");
				}
				System.out.println();
				
				if (!IonTools.extractIons(structure, moleculeDirName, infileName)) {
					String outfileName = misMatchDirName + id + ".vasp";
					POSCAR outfile = new POSCAR(structure.findPrimStructure().getCompactStructure());
					outfile.writeFile(outfileName);
				}
				System.out.println();
			}
			
		}
		
	}
	
	public static void getStatesForPDFData() {
		
		String[] compositions = new String[] {
				"Ce0.5Zr0.5O2",
				"Ce0.25Pr0.25Zr0.5O2",
				"Ce0.167Pr0.167Tb0.167Zr0.5O2",
				"La0.125Ce0.125P0.125Tb0.125Zr0.5O2",
				"Y0.1La0.1Ce0.1P0.1Tb0.1Zr0.5O2",
				"Ce0.1Pr0.1Nd0.1Sm0.1Y0.1Zr0.5O2",
				"Pr0.1Nd0.1Sm0.1Tb0.1Y0.1Zr0.5O2",
				"Ce0.5Sc0.1Zr0.1Hf0.1Ta0.1Ti0.1O2",
				"Ce0.5Zr0.475Sc0.025O2",
				"Pr0.5Zr0.5O2",
				"Tb0.5Zr0.5O2",
				"Ce0.25Tb0.25Zr0.5O2",
				"Pr0.25Tb0.25Zr0.5O2",
				"Ce0.167Pr0.167Tb0.167Zr0.167Hf0.167Ti0.167O2",
				"Ce0.5Zr0.167Hf0.167Ti0.167O2",
				"Ce0.25Y0.25Zr0.5O2",
				"Ce0.25Y0.25Zr0.25Ti0.25O2",
				"Ce0.167Pr0.167Y0.167Zr0.5O2",
				"Ce0.125Pr0.125Tb0.125Y0.125Zr0.5O2",
				"Ce0.45Y0.05Zr0.45Ti0.05O2",
				"Ce0.4Y0.1Zr0.4Ti0.1O2",
				"Ce0.25Gd0.25Zr0.25Ti0.25O2",
				"Ce0.25Tb0.25Zr0.25Ti0.25O2",
				"Ce0.25Dy0.25Zr0.25Ti0.25O2",
				"Ce0.25Ho0.25Zr0.25Ti0.25O2",
				"Ce0.25Yb0.25Zr0.25Ti0.25O2",
				"Ce0.25Lu0.25Zr0.25Ti0.25O2",
				"Ce0.5Zr0.25Hf0.25O2",
				"Ce0.5Zr0.25Ta0.25O2",
				"Ce0.5Zr0.25Nb0.25O2",
				"Ce0.45Gd0.05Zr0.45Ti0.05O2",
				"Ce0.45Tb0.05Zr0.45Ti0.05O2",
				"Ce0.45Dy0.05Zr0.45Ti0.05O2",
				"Ce0.45Ho0.05Zr0.45Ti0.05O2",
				"Ce0.45Yb0.05Zr0.45Ti0.05O2",
				"Ce0.45Lu0.05Zr0.45Ti0.05O2",
				"Ce0.25Sm0.25Zr0.25Ti0.25O2",
				"Ce0.25Nd0.25Zr0.25Ti0.25O2",
				"Ce0.25Pr0.25Zr0.25Ti0.25O2",
				"La0.25Ce0.25Zr0.25Ti0.25O2",
				"Ce0.45Sm0.05Zr0.45Ti0.05O2",
				"Ce0.45Nd0.05Zr0.45Ti0.05O2",
				"Ce0.45Pr0.05Zr0.45Ti0.05O2",
				"La0.05Ce0.45Zr0.45Ti0.05O2",
				"Ce0.45Sm0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Sm0.05Sc0.025Zr0.45Nb0.025O2",
				"Ce0.45Ca0.05Zr0.45Ta0.05O2",
				"Ce0.45Sr0.05Zr0.45Ta0.05O2",
				"Ce0.45Ca0.05Zr0.45Nb0.05O2",
				"Ce0.45Sr0.05Zr0.45Nb0.05O2",
				"Ce0.49Sm0.01Zr0.49Ti0.01O2",
				"Ce0.48Sm0.02Zr0.48Ti0.02O2",
				"Ce0.4Sm0.1Zr0.4Ti0.1O2",
				"Ce0.4Gd0.1Zr0.45Ti0.05O2",
				"Ce0.45Gd0.05Zr0.475Ti0.025O2",
				"Ce0.4Sm0.1Zr0.45Ti0.05O2",
				"Ce0.45Sm0.05Zr0.475Ti0.025O2",
				"Ce0.45Gd0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Gd0.05Sc0.025Zr0.45Nb0.025O2",
				"Ce0.435Pr0.025Zr0.54O2",
				"Ce0.475Pr0.025Zr0.5O2",
				"Ce0.4Pr0.05Zr0.475Dy0.05Ti0.025O2",
				"Ce0.45Sm0.025Gd0.025Zr0.4625Ti0.0375O2",
				"Ce0.45Sm0.025Dy0.025Zr0.4625Ti0.0375O2",
				"Ce0.45Pr0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.5Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Pr0.05Sc0.025Zr0.45Ta0.025O2",
				"La0.05Ce0.45Sc0.025Zr0.45Ta0.025O2",
				"Ce0.4Pr0.05Gd0.05Zr0.475Ti0.025O2",
				"Ce0.4Pr0.05Sm0.05Zr0.475Ti0.025O2",
				"Ce0.475Sm0.025Sc0.0125Zr0.475Ta0.0125O2",
				"Ce0.49Sm0.01Sc0.005Zr0.49Ta0.005O2",
				"Ce0.4Sm0.1Sc0.05Zr0.4Ta0.05O2",
				"Ce0.475Sm0.025Sc0.0125Zr0.475Nb0.0125O2",
				"Ce0.49Sm0.01Sc0.005Zr0.49Nb0.005O2",
				"Ce0.4Sm0.1Sc0.05Zr0.4Nb0.05O2",
				"Ce0.5Sc0.025Zr0.475O2",
				"Ce0.5Zr0.475Nb0.025O2",
				"Ce0.5Zr0.475Ta0.025O2",
				"Ce0.475Sm0.025Zr0.5O2",
				"Ce0.4Pr0.05Dy0.05Zr0.475Ti0.025O2",
				"Ce0.45Sm0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Sm0.05Sc0.025Zr0.45Nb0.025O2",
				"Ce0.45Sm0.05Sc0.025Zr0.45Nb0.0125Ta0.0125O2",
				"Ce0.45Gd0.05Sc0.025Zr0.45Nb0.0125Ta0.0125O2",
				"Ce0.45Pr0.05Sc0.025Zr0.45Nb0.0125Ta0.0125O2",
				"Ce0.45Nd0.05Sc0.025Zr0.45Nb0.0125Ta0.0125O2",
				"Ce0.45Nd0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Nd0.05Sc0.025Zr0.45Nb0.025O2",
				"Ce0.45Yb0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Yb0.05Sc0.025Zr0.45Nb0.025O2",
				"Ce0.45Yb0.05Sc0.025Zr0.45Nb0.0125Ta0.0125O2",
				"Ce0.45Dy0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Dy0.05Sc0.025Zr0.45Nb0.025O2",
				"Ce0.45Sm0.05Zr0.45Ta0.05O2",
				"Ce0.45Sm0.05Zr0.45Nb0.05O2",
				"Ce0.45Tb0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Tb0.05Sc0.025Zr0.45Nb0.025O2",
				"Ce0.45Sm0.05Sc0.0125Zr0.45Ta0.0125Ti0.025O2",
				"Ce0.45Gd0.05Sc0.0125Zr0.45Ta0.0125Ti0.025O2",
				"Ce0.45Nd0.05Sc0.0125Zr0.45Ta0.0125Ti0.025O2",
				"Ce0.45Gd0.05Sc0.0125Zr0.45Ta0.0125Ti0.025O2",
				"Ce0.45Sm0.05Tb0.025Zr0.45Ta0.025O2",
				"Ce0.45Pr0.025Sm0.025Sc0.0125Zr0.475Ta0.0125O2",
				"La0.025Ce0.45Sm0.025Sc0.0125Zr0.475Ta0.0125O2",
				"Ce0.45Nd0.025Sm0.025Sc0.0125Zr0.475Ta0.0125O2",
				"Ce0.45Sm0.05Sc0.0125Zr0.45Nb0.0125Ti0.025O2",
				"Ce0.475Sm0.025Sc0.0125Zr0.475Ta0.00625Ti0.00625O2",
				"Ce0.475Sm0.025Sc0.0125Zr0.475Nb0.00625Ta0.00625O2",
				"Ce0.475Sm0.025Sc0.0125Zr0.475Nb0.00625Ti0.00625O2",
				"Ce0.45Eu0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Eu0.05Sc0.025Zr0.45Nb0.025O2",
				"Ce0.45Sm0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Sm0.05Sc0.025Zr0.45Ta0.025O2",
				"Ce0.45Sm0.05Sc0.025Zr0.45Nb0.025O2",
				"Ce0.45Sm0.05Zr0.45Hf0.025Ta0.025O2",
				"Ce0.45Sm0.05Sc0.025Zr0.45Ti0.025O2",
				"La0.05Ce0.45Zr0.5O2",
				"Ce0.45Nd0.05Zr0.5O2",
				"Ce0.45Sm0.05Zr0.5O2",
				"Ce0.45Eu0.05Zr0.5O2",
				"Ce0.45Gd0.05Zr0.5O2",
				"Ce0.45Tb0.05Zr0.5O2",
				"Ce0.45Dy0.05Zr0.5O2",
				"Ce0.45Ho0.05Zr0.5O2",
				"Ce0.45Yb0.05Zr0.5O2",
				"Ce0.45Lu0.05Zr0.5O2",
				"Ce0.45Y0.05Zr0.5O2",
				"La0.01Ce0.49Zr0.5O2",
				"Ce0.49Pr0.01Zr0.5O2",
				"Ce0.49Nd0.01Zr0.5O2",
				"Ce0.49Sm0.01Zr0.5O2",
				"Ce0.49Eu0.01Zr0.5O2",
				"Ce0.49Gd0.01Zr0.5O2",
				"Ce0.49Tb0.01Zr0.5O2",
				"Ce0.49Dy0.01Zr0.5O2",
				"Ce0.49Ho0.01Zr0.5O2",
				"Ce0.49Yb0.01Zr0.5O2",
				"Ce0.49Lu0.01Zr0.5O2",
				"Ce0.49Y0.01Zr0.5O2",
				"Ce0.5Sc0.01Zr0.49O2",
				"Ce0.5Sc0.05Zr0.45O2",
				"Ce0.5Zr0.49Hf0.01O2",
				"Ce0.5Zr0.45Hf0.05O2",
				"Ce0.5Zr0.49Ti0.01O2",
				"Ce0.5Zr0.45Ti0.05O2",
		};
		
		Status.setLogLevelError();
		
		String paramFileName = "/home/timmueller/Projects/Oxidation state analysis/ICSD/Parameters/parameters_10x20.txt";
		LikelihoodCalculator evaluator = new LikelihoodCalculator(paramFileName);
		
		for (String composition: compositions) {
			OxidationStateSet set = evaluator.getLikelyOxidationStates(composition);
			System.out.println(composition + "|" + set + "|" + set.getMaxLikelihood());
			//outfile.writeFile(outFileName);
		}
		
	}

	
	public static void getStatesForJoeysData() {
		
		Status.setLogLevelError();
		String structDirName = "/home/timmueller/Projects/Oxygen vacancy formation energy/Structures/CIF";
		File structDir = new File(structDirName);
		File[] cifFiles = structDir.listFiles();
		for (File file : cifFiles) {
			if (!file.getName().endsWith("cif")) {continue;}
			Structure structure = new Structure(new CIF(file.getAbsolutePath()));
			structure = structure.findPrimStructure().getCompactStructure();
			if (!file.getName().equals("mp-29112.cif")) {continue;}
			System.out.println(file.getName());
			OxidationStateSet likelyStates = predictLikelyOxidationStates(structure);
			IonAssigner assigner = new IonAssigner(structure, likelyStates);
			//System.out.println(assigner.equivalentIonsHaveSameState());
			POSCAR outfile = new POSCAR(structure);
			outfile.writeSpeciesWithDescription(false);
			outfile.writeElementSymbolsOnly(false);
			String outfileDirName = "/home/timmueller/Projects/Oxygen vacancy formation energy/Structures/WithIons/POSCAR/";
			String outFileName = outfileDirName + file.getName().replace("cif", "vasp");
			//outfile.writeFile(outFileName);
		}
		
	}
		
	/*
	public static void testIonAssigner() {
		HashMap<String, Molecule> knownMolecules = getKnownMolecules();
		//= Molecule.getMoleculesForElements().values().toArray(new Molecule[0]);
		
		String structDirName = ROOT_DIR + "/Structures/";
		File structDir = new File(structDirName);
		File[] structFiles = structDir.listFiles();
		for (File structFile : structFiles) {
			POSCAR infile = new POSCAR(structFile.getAbsolutePath());
			Structure structure = new Structure(infile);
			MoleculeMapper assigner = new MoleculeMapper(structure, knownMolecules.values());
		}
	}*/
	
	public static void writeCAMDLikelihoods() {
		
		String camdFileName = ROOT_DIR + "/CAMD data/camd2022.json/data.csv";
		String structDirName = ROOT_DIR + "/CAMD data/camd2022.json/structures/";
		//String paramFileName = ROOT_DIR + "Parameters/parameters_hull_fromRandom_zeroAdded_10x20.txt";
		//String paramFileName = ROOT_DIR + "Parameters/parameters_Orig.txt";
		//String paramFileName = ROOT_DIR + "Parameters/parameters.txt";
		//String paramFileName = ROOT_DIR + "Parameters/parameters_10x5.txt";
		String paramFileName = ROOT_DIR + "Parameters/parameters_No_Zintl_10x5.txt";
		//String dataFileName = ROOT_DIR + "Training_Data/mpData_hull_fromRandom_zeroAdded_10x20_1.txt";
		//String outfileName = ROOT_DIR + "/CAMD data/camd2022.json/data_withlikelihoods_nozeros.csv";
		String outfileName = ROOT_DIR + "/CAMD data/camd2022.json/data_withlikelihoods_nozeros_No_Zintl.csv";
		
		//OxidationStateData data = getData(dataFileName);
		LikelihoodCalculator evaluator = new LikelihoodCalculator(paramFileName);
		
		HashMap<String, Double[]> dataByComposition = new HashMap<String, Double[]>();
		
		try {
			LineNumberReader reader = new LineNumberReader(new FileReader(camdFileName));
			String line = reader.readLine();
			for (int structNum = 0; line != null && line.trim().length() != 0; structNum++) {
				
				String[] fields = line.split(",");
				line = reader.readLine();
				String composition = fields[0];

				//if (structNum != 109783) {continue;}
				//if (structNum != 116084) {continue;}
				
				String structFileName = structDirName + (composition.trim().replaceAll(" ", "_")) + "_" + structNum + ".cif";
				CIF infile = new CIF(structFileName);
				ZintlIonFinder ionFinder = new ZintlIonFinder(new Structure(infile));
				if (ionFinder.numFoundIons() > 0) {continue;}
				
				double energy = Double.parseDouble(fields[1]);
				
				Double[] knownData = dataByComposition.get(composition);
				if (knownData != null) {
					double prevEnergy = knownData[0];
					if (energy < prevEnergy) {
						knownData[0] = energy;
					}
					continue;
				}
					
				Ion[] likelyStates = evaluator.getLikelyOxidationStates(fields[0]).getIons();
				if (likelyStates == null) {continue;}
				boolean zeroOxidation = false;
				for (Ion ion : likelyStates) {
					int oxidationState = (int) ion.getOxidationState();
					zeroOxidation |= (oxidationState == 0);
				}
				if (zeroOxidation) {
					continue;
				}
				double likelihood = evaluator.optimizeLikelihood(likelyStates).getMaxLikelihood();
				//System.out.println(composition + ", " + energy + ", " + likelihood);
				
				Double[] newData = new Double[] {energy, likelihood, structNum * 1.0};
				dataByComposition.put(composition, newData);
			}
			reader.close();
			
			BufferedWriter writer = new BufferedWriter(new FileWriter(outfileName));
			for (String composition : dataByComposition.keySet()) {
				Double[] values = dataByComposition.get(composition);
				boolean[] seenElements = new boolean[Element.numKnownElements() + 1];
				String[] elementSymbols = composition.split(" ");
				for (String token : elementSymbols) {
					String symbol = "";
					int charIndex = 0;
					while (Character.isLetter(token.charAt(charIndex))) {
						symbol += token.charAt(charIndex++);
					}
					seenElements[Element.getElement(symbol).getAtomicNumber()] = true;
				}
				writer.write(composition + ", " + (int) Math.round(values[2]) + ", " + values[0] + ", " + values[1]);
				for (int atomicNumber = 1; atomicNumber < seenElements.length; atomicNumber++) {
					int exists = seenElements[atomicNumber] ? 1 : 0;
					writer.write("," + exists);
				}
				writer.write("\n");
			}
			writer.flush();
			writer.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
		
	}

	public static void predictLikelyOxidationStates() {

		String paramFileName = ROOT_DIR + "/Parameters/Parameters 100 no added zero valence.txt";
		//String paramFileName = "/home/timmueller/Projects/Oxidation state analysis/Parameters/Parameters 100 no added zero valence with gaps.txt";
		//String paramFileName = "/home/timmueller/Projects/Oxidation state analysis/Parameters/Parameters_100.txt";
		
		//OxidationStateData data = getData();
		LikelihoodCalculator evaluator = new LikelihoodCalculator(paramFileName);
		
		// TODO consider making these singletons
		/*Molecule[] molecules = new Molecule[] {
				new Molecule(Element.iron),
				new Molecule(Element.manganese),
				new Molecule(Element.oxygen)
		};*/
		
		String[] moleculeIDs = new String[] {"Fe", "Mn", "O"};
		
		double[] counts = new double[] {2, 1, 4};
		
		Ion[] likelyStates = evaluator.getLikelyOxidationStates(moleculeIDs, counts).getIons();
		System.out.print("Likely species: ");
		for (Ion ion : likelyStates) {
			System.out.print(ion + ", ");
		}
		System.out.println();
		System.out.println("Max likelihood: " + evaluator.optimizeLikelihood(likelyStates).getMaxLikelihood());
		
	}
	

	public static OxidationStateSet predictLikelyOxidationStates(Structure structure) {

		String paramFileName = ROOT_DIR + "/Parameters/parameters.txt";
		//String paramFileName = ROOT_DIR + "/Parameters/parameters_No_Zintl_10x10.txt";
		return predictLikelyOxidationStates(structure, paramFileName);
	}
	
	public static OxidationStateSet predictLikelyOxidationStates(Structure structure, String paramFileName) {
		
		//OxidationStateData data = getData();
		LikelihoodCalculator evaluator = new LikelihoodCalculator(paramFileName);
		
		structure = structure.findPrimStructure().getCompactStructure();
		OxidationStateSet likelyStates = evaluator.getLikelyOxidationStates(structure);
		if (ArrayUtils.arrayContains(structure.getDistinctElements(), Element.mercury)) {
			if (ArrayUtils.arrayContains(structure.getDistinctElements(), Element.chromium)) {
			System.out.print("Likely species: ");
			for (Ion ion : likelyStates.getIons()) {
				double weight = likelyStates.getWeight(ion);
				System.out.print(weight + " " + ion + ", ");
			}
			System.out.println();
			System.out.println("Max likelihood: " + likelyStates.getMaxLikelihood());
			}
		}
		return likelyStates;

	}
			
	/*
	public static OxidationStateData getData() {
		String fileName = ROOT_DIR + "mpData_hull_fromRandom_zeroAdded_10x20_1.txt";
		return getData(fileName);
	}*/
	
	// TODO use the fact that Ions are now Singletons?
	public static int numMatchingIons(Ion[] ions1, Ion[] ions2) {
		
		int numMatches = 0;
		for (Ion ion1 : ions1) {
			for (Ion ion2 : ions2) {
				if (ion1.getSymbol().equals(ion2.getSymbol())) {
					
					// Temporary to screen out Zintl matches
					//Element element = Species.get(ion1.getSymbol()).getElement();
					//if (!ArrayUtils.arrayContains(ZINTL_ELEMENTS, element)) {return -1;}
					
					// Keep this
					numMatches++;
				}
			}
		}
		return numMatches;
		
	}
	
	public static int numMatchingStructures(Ion[] ions1, Ion[] ions2) {
		
		int numMatches = 0;
		for (Ion ion1 : ions1) {
			for (Ion ion2 : ions2) {
				if (ion1.getStructureSymbol().equals(ion2.getStructureSymbol())) {
					numMatches++;
				}
			}
		}
		return numMatches;
	}
	
	public static void printBondLengths() {
		String dirName = "/home/timmueller/Projects/Oxidation state analysis/ICSD/Oxide_ion_structures/0_periodic_dimensions/N1_O1/set_0/";
		File dir = new File(dirName);
		for (File file : dir.listFiles()) {
			if (!file.getName().endsWith(".vasp")) {continue;}
			POSCAR poscar = new POSCAR(file.getAbsolutePath());
			poscar.setVectorPeriodicity(0, false);
			poscar.setVectorPeriodicity(1, false);
			poscar.setVectorPeriodicity(2, false);
			Structure structure = new Structure(poscar);
			double distance = structure.getDefiningSite(0).distanceFrom(structure.getDefiningSite(1));
			System.out.println(file.getName() + "\t" + distance);
		}
	}

}
