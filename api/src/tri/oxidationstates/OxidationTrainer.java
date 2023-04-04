package tri.oxidationstates;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Random;
import java.util.TreeSet;

import matsci.Species;
import matsci.engine.minimizer.CGMinimizer;
import matsci.io.app.log.Status;
import matsci.io.clusterexpansion.PRIM;
import matsci.io.structure.CIF;
import matsci.io.vasp.POSCAR;
import matsci.structure.Structure;
import matsci.util.arrays.ArrayUtils;
import tri.oxidationstates.calculator.LikelihoodCalculator;
import tri.oxidationstates.calculator.LikelihoodCalculator.OxidationStateSet;
import tri.oxidationstates.fitting.OxidationStateData;
import tri.oxidationstates.fitting.OxidationStateData.Entry;
import tri.oxidationstates.fitting.ParamOptimizer;
import tri.oxidationstates.fitting.ParamOptimizer.ParameterState;
import tri.oxidationstates.ion.IonFactory.Ion;

public class OxidationTrainer {
	
	private String m_OutputDir;
	
	public OxidationTrainer(String outputDir) {
		m_OutputDir = outputDir;
	}
	
	public void prepareTrainingDataFromICSD() {
		
		File cifDir = new File(m_OutputDir + "/ICSD_CIFS/All CIFs/");
		String poscarDirName = m_OutputDir + "/Structures/";
		String outputFileName = m_OutputDir + "/Training_Data/icsd.txt";
		
		/*
		if (new File(outputFileName).exists()) {
			throw new RuntimeException("File already exists: " + outputFileName);
		}*/
		
		double occupancyTolerance = 0.02;
		double chargeBalanceTolerance = 1E-6;
		
		int numSuccess = 0;
		int numNotChargeBalanced = 0;
		int numNotOrdered = 0;
		int numNotAllIntegers = 0;
		int numAllZeros = 0;
		int numParseErrors = 0;
		
		//TreeSet<String> removedStructures = new TreeSet<String>();

		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(outputFileName));
			
			for (File cifFile : cifDir.listFiles()) {
				if (!cifFile.isFile()) {continue;}
				if (!cifFile.getName().endsWith(".cif")) {continue;}
				CIF cif = null;
				Structure structure = null;
				try {
					cif = new CIF(cifFile.getAbsolutePath());
					if (cif.numDefiningSites() == 0) {continue;}
					if (!cif.isOrdered(occupancyTolerance)) {
						numNotOrdered++;
						continue;
					}
					structure = new Structure(cif);
				} catch (Exception e) {
					Status.warning("Failed to parse CIF: " + cifFile.getName());
					numParseErrors++;
					continue;
				}
				String id = cifFile.getName().replace(".cif", "");
				
				String compositionString = structure.getCompositionString();
				String origins = "ICSD";
				
				boolean hasNonZeroOxidationStates = false;
				boolean notAllIntegers = false;
				Species[] allSpecies = structure.getDistinctSpecies();
				String speciesString = "";
				for (Species species : allSpecies) {
					speciesString += " " + species.getSymbol();
					double oxidationState = species.getOxidationState();
					if (oxidationState != 0) {
						hasNonZeroOxidationStates = true;
					}
					if (!(oxidationState == Math.round(oxidationState))) {
						notAllIntegers = true; 
					}
				}
				if (!hasNonZeroOxidationStates) {
					numAllZeros++;
					continue;
				}
				if (notAllIntegers) {
					numNotAllIntegers++;
					continue;
				}
				
				if (!structure.isChargeBalanced(chargeBalanceTolerance)) {
					numNotChargeBalanced++;
					continue;
				}
	
				
				PRIM outfile = new PRIM(structure);
				outfile.writeSpeciesWithDescription(false);
				outfile.writeElementSymbolsOnly(false);
				outfile.writeFile(poscarDirName + id + ".vasp");
				
				String outputString = numSuccess + ": " + id + "\t" + compositionString + "\t" + speciesString + "\t" + origins + "\t" + "NaN" + "\t" + "false";
				System.out.println(outputString);
				writer.write(outputString + "\n");
				numSuccess++;
			}
		
			writer.flush();
			writer.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
		Status.basic(numNotOrdered + " disordered structures removed.");
		Status.basic(numNotChargeBalanced + " non-charge-balanced structures removed.");
		Status.basic(numAllZeros + " structures with all zero oxidation states removed.");
		Status.basic(numNotAllIntegers + " structures with non-integer oxidation states removed.");
		Status.basic(numParseErrors + " structures had parse errors.");
		Status.basic(numSuccess + " structures successfully added.");
	}
	
	public void fitParameters(OxidationStateData data, LikelihoodCalculator initCalculator) {
		
		CGMinimizer optimizer = new CGMinimizer();
		optimizer.setMaxAllowedIterations(20);

		ParamOptimizer paramOptimizer = new ParamOptimizer(data);
		ParamOptimizer.ParameterState state = paramOptimizer.getParameterState(initCalculator);

		for (int passNum = 0; passNum < 20; passNum++) {
			Status.flow("Pass number " + passNum + ".  Initial score: " + state.getValue());
			optimizer.minimize(state);
			state = (ParamOptimizer.ParameterState) optimizer.getMinimumState();
			state.getCalculator().writeBoundaries(System.out);
			String paramFileName = m_OutputDir + "/Parameters/parameters_centered2_MinBounds_NoZero_NoRareIons2-0.003_PolyOxide_NoZintl_0.2Removed_Continue_1E-5Reg.txt";
			String boundaryFileName = paramFileName.replaceFirst("/parameters", "/boundaries");
			Status.flow("Writing parameters to " + paramFileName);
			Status.flow("Writing boundaries to " + boundaryFileName);
			state.getCalculator().writeParameters(paramFileName);
			state.getCalculator().writeBoundaries(boundaryFileName);			
		}
		
		System.out.println("Final score: " + state.getValue());
		System.out.println();
		
	}
		
	public void fitParameters(OxidationStateData data) {
		
		// Add the zero oxidation state
		HashMap<String, int[]> oxidationStates = data.getKnownOxidationStates();
		for (String moleculeID : oxidationStates.keySet()) {
			int[] statesForElement = oxidationStates.get(moleculeID);
			/*if (!ArrayUtils.arrayContains(statesForElement, 0)) {
				statesForElement = ArrayUtils.appendElement(statesForElement, 0);
				Arrays.sort(statesForElement);
			}*/
			oxidationStates.put(moleculeID, statesForElement);
		}

		LikelihoodCalculator calculator = new LikelihoodCalculator(oxidationStates);

		Random random = new Random();
		double[] initParams = random.doubles(calculator.numParameters()).toArray();
		calculator = calculator.setParameters(initParams);	
		
		this.fitParameters(data, calculator);
		
	}
	
	public void writeLikelyOxidationStates(OxidationStateData data, LikelihoodCalculator calculator, String fileName) {

		ParamOptimizer optimizer = new ParamOptimizer(data);
		optimizer.setRegularizationParameter(0);
		//Status.basic("Initial value with no regularizer: " + optimizer.getParameterState(calculator).getValue());
		
		Status.setLogLevelDetail();
		//String paramFileName = m_RootDir + "Parameters/parameters_hull_fromRandom_zeroAdded_10x20.txt";
		//String dataFileName = m_RootDir + "Training_Data/mpData_hull_fromRandom_zeroAdded_10x20.txt";
		//String paramFileName = "/home/timmueller/Projects/Oxidation state analysis/Parameters/Parameters 100 no added zero valence with gaps.txt";
		//String paramFileName = "/home/timmueller/Projects/Oxidation state analysis/Parameters/Parameters_100.txt";
		
		//OxidationStateData data = getData(dataFileName, true, 0, true, false);
		
		//LikelihoodCalculator evaluator = new LikelihoodCalculator(paramFileName);
		for (int entryNum = 0; entryNum < data.numEntries(); entryNum++) {
			Entry entry = data.getEntry(entryNum);
			OxidationStateSet stateSet = calculator.getLikelyOxidationStates(entry.getAllMoleculeIDs(), entry.getAllElementWeights());
			Ion[] oxidationStates = stateSet.getIons();
			if (!areEqual(oxidationStates, entry.getAllIons())) {
				double oldLikelihood = calculator.optimizeLikelihood(entry.getAllIons()).getMaxLikelihood();
				double newLikelihood  = stateSet.getMaxLikelihood();	
				double delta = newLikelihood - oldLikelihood;
				String outString = "Oxidation state change: ";
				outString += entry.getID() + ",\t";
				outString += oldLikelihood + ",\t";
				outString += newLikelihood + ",\t";
				outString += delta + ",\t";
				outString += entry.getComposition() + ", ";
				for (int specNum = 0; specNum < entry.numIons(); specNum++) {
					outString += entry.getIon(specNum) + " ";
				}
				outString += " --> ";
				for (int specNum = 0; specNum < oxidationStates.length; specNum++) {
					outString += oxidationStates[specNum] + " ";
				}
				System.out.println(outString);
			}
			entry.setIons(oxidationStates);
		}
		//data.writeFile(m_OutputDir + "/Training_Data/mpData_hull_fromRandom_zeroAdded_10x20_2_noZeros.txt");
		data.writeFile(m_OutputDir + "/Oxidation_State_Results/" + fileName);
		
	}
	
	private static boolean areEqual(Ion[] ionSet1, Ion[] ionSet2) {
		
		if (ionSet1.length != ionSet2.length) {return false;}
		for (Ion ion1 : ionSet1) {
			boolean foundMatch = false;
			for (Ion ion2 : ionSet2) {
				if (!ion1.getStructureSymbol().equals(ion2.getStructureSymbol())) {continue;}
				foundMatch |= (Math.abs(ion1.getOxidationState() - ion2.getOxidationState()) < 1E-2);
			}
			if (!foundMatch) {return false;}			
		}
		return true;
	}
	
	public void writeLikelihoods(OxidationStateData data, LikelihoodCalculator calculator, String fileName) {
		Status.setLogLevelDetail();
		//String paramFileName = m_RootDir + "Parameters/parameters_hull_fromRandom_zeroAdded_10x20.txt"; // Used for slides
		//String dataFileName = m_RootDir + "Training_Data/mpData_hull_fromRandom_zeroAdded_10x20_1.txt"; // Used for slides
		//String dataFileName = ROOT_DIR + "mpData.txt";

		//OxidationStateData data = getData(dataFileName, true, 0, true, false);
		
		//LikelihoodCalculator evaluator = new LikelihoodCalculator(paramFileName);
		//ParamOptimizer optimizer = new ParamOptimizer(data);
		//ParameterState state = optimizer.getParameterState(calculator);
		//String outDirName = m_RootDir + "/likelihoods_fromRandom_zeroAdded_10x20_1.xls";
		String outFileName = m_OutputDir + "/" + fileName;
		data.writeLikelihoods(calculator, outFileName);
		
	}

}
