package tri.oxidationstates.calculator;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.LineNumberReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

import matsci.Element;
import matsci.Species;
import matsci.io.app.log.Status;
import matsci.io.app.param.Parameters;
import matsci.structure.Structure;
import matsci.util.arrays.ArrayIndexer;
import matsci.util.arrays.ArrayUtils;
import tri.oxidationstates.fitting.OxidationStateData.Entry;
//import tri.oxidationstates.structure.Molecule;
import tri.oxidationstates.ion.IonFactory;
import tri.oxidationstates.ion.IonFactory.Ion;

public class LikelihoodCalculator {
	
	//private int[][] m_OxidationStatesByElement = new int[Element.numKnownElements() + 1][0];
	//private HashMap<String, Molecule> m_KnownMolecules;
	private int[][] m_OxidationStatesByIonType = new int[Element.numKnownElements() + 1][0];
	private String[] m_IonTypes;
	private HashMap<String, Integer> m_IonTypeIndices = new HashMap<String, Integer>();
	private int[][] m_StateIndexByParam;
	private int[][] m_ParamIndexByState;

	private double[] m_Parameters;
	
	private LikelihoodCalculator(LikelihoodCalculator source, double[] newParameters) {
		m_OxidationStatesByIonType = source.m_OxidationStatesByIonType;
		m_IonTypes = source.m_IonTypes;
		m_IonTypeIndices = source.m_IonTypeIndices;
		m_StateIndexByParam = source.m_StateIndexByParam;
		m_ParamIndexByState = source.m_ParamIndexByState;
		m_Parameters = newParameters.clone();
	}
	
	public LikelihoodCalculator(String paramFileName) {
		m_Parameters = readParameters(paramFileName);
	}
	
	/*
	public LikelihoodCalculator(ArrayList<Integer>[] allowedOxidationStatesByElement) {
		m_OxidationStatesByElement = new ArrayList
	}
	*/
	
/*	public LikelihoodCalculator(Collection<Integer>[] oxidationStates) {
		
		this.initializeOxidationStates(oxidationStates);
		
	}*/
	
	public LikelihoodCalculator(HashMap<String, int[]> oxidationStateMap) {
		
		ArrayList<String> moleculeIDs = new ArrayList<String>(oxidationStateMap.keySet());
		AtomicMassComparator comparator = new AtomicMassComparator();
		moleculeIDs.sort(comparator);
		
		ArrayList<int[]> oxidationStates = new ArrayList<int[]>();
		for (String moleculeID : moleculeIDs) {
			oxidationStates.add(oxidationStateMap.get(moleculeID));
		}
		
		this.initializeOxidationStates(oxidationStates, moleculeIDs);
	}

	private void initializeOxidationStates(List<int[]> oxidationStates, List<String> ionTypes) {

		// Create the molecule index maps
		//int moleculeIndex = 0;
		int numParams = 0;
		m_OxidationStatesByIonType = new int[oxidationStates.size()][];
		m_IonTypes = new String[oxidationStates.size()];
		for (int ionTypeIndex = 0; ionTypeIndex < ionTypes.size(); ionTypeIndex++) {
			String ionType = ionTypes.get(ionTypeIndex);
			//Structure molecule = Ion.getSubStructure(moleculeID);
		//for (Molecule molecule : oxidationStates.keySet()) {
			m_IonTypeIndices.put(ionType, ionTypeIndex);
			m_IonTypes[ionTypeIndex] = ionType;
			//m_OxidationStatesByMolecule[moleculeIndex] = oxidationStates.get(molecule).clone();
			m_OxidationStatesByIonType[ionTypeIndex] = oxidationStates.get(ionTypeIndex);// oxidationStates.get(molecule).clone();
			Arrays.sort(m_OxidationStatesByIonType[ionTypeIndex]);
			int numStates = m_OxidationStatesByIonType[ionTypeIndex].length;
			//numParams += Math.max(numStates - 1, 0);
			numParams += (numStates == 0) ? 0 : numStates + 1;
			//moleculeIndex++;
		}		
		
		m_Parameters = new double[numParams];
		m_StateIndexByParam = new int[numParams][];
		m_ParamIndexByState = new int[m_OxidationStatesByIonType.length][];
		
		int paramNum = 0;
		for (int ionTypeIndex = 0; ionTypeIndex < m_OxidationStatesByIonType.length; ionTypeIndex++) {
			int numStates = m_OxidationStatesByIonType[ionTypeIndex].length;
			//int numParamsForMolecule = Math.max(numStates - 1, 0);
			int numParamsForIonType = (numStates == 0) ? 0 : numStates + 1;
			m_ParamIndexByState[ionTypeIndex] = new int[numParamsForIonType];
			for (int paramNumForElement = 0; paramNumForElement < numParamsForIonType; paramNumForElement++) {
				m_StateIndexByParam[paramNum] = new int[] {ionTypeIndex, paramNumForElement};
				m_ParamIndexByState[ionTypeIndex][paramNumForElement] = paramNum;
				paramNum++;
			}
		}
		
	}
	
	public boolean hasParamsForElement(Element element) {
		return m_IonTypeIndices.containsKey(element.getSymbol());
		//return m_KnownMolecules.containsKey(element.getSymbol());
	}
	
	public int numParameters() {
		return m_Parameters.length;
	}
	
	public double[] getParameters(double[] template) {
		
		double[] returnArray = (template != null) ? template : new double[m_Parameters.length];
		
		for (int paramIndex = 0; paramIndex < returnArray.length; paramIndex++) {
			int stateIndex = m_StateIndexByParam[paramIndex][1];
			if (stateIndex == 0) {
				returnArray[paramIndex] = m_Parameters[paramIndex];
			} else {
				returnArray[paramIndex] = Math.max(m_Parameters[paramIndex], returnArray[paramIndex - 1]);
			}
		}
		
		System.arraycopy(m_Parameters, 0, returnArray, 0, m_Parameters.length);
		return returnArray;
	}

	public LikelihoodCalculator setParameters(double[] parameters) {
		
		return new LikelihoodCalculator(this, parameters);
		
	}
	
	/*public LikelihoodCalculator setParametersFromFile(String fileName) {
		return (LikelihoodCalculator) this.setParameters(this.readParameters(fileName));
	}*/
	
	/*
	public double[] readParameters(String fileName) {
		
		double[] parameters = new double[this.numParameters()];
		try {
			LineNumberReader reader = new LineNumberReader(new FileReader(fileName));
			String line = reader.readLine();
			while (line != null && line.trim().length() != 0) {
				String[] fields = line.split(" ");
				Species species = Species.get(fields[0]);
				String elementSymbol = species.getElementSymbol();
				int atomicNumber = species.getElement().getAtomicNumber();
				ArrayList<Integer> oxidationStates = m_OxidationStatesByElement[atomicNumber];
				
				if (oxidationStates.size() * 2 - 1 > fields.length) {
					throw new RuntimeException("Number of oxidation states in file is less than number of known oxidation states for element " + elementSymbol + ".");
				}
				if (Math.abs(species.getOxidationState() - oxidationStates.get(0)) > 1E-3) {
					throw new RuntimeException("First oxidation state in file is not the same as first known oxidation state for element " + elementSymbol + ".");
				}
				for (int stateIndex = 2; stateIndex < fields.length; stateIndex += 2) {
					species = Species.get(fields[stateIndex]);
					int intOxidationState = (int) Math.round(species.getOxidationState());
					if (!oxidationStates.contains(intOxidationState)) {
						throw new RuntimeException("Species " + species + " exists in parameters file but is not in data file.");
					}
					double parameter = Double.parseDouble(fields[stateIndex - 1]);
					int stateNum = (stateIndex / 2) - 1;
					int paramNum = m_ParamIndexByState[atomicNumber][stateNum];
					parameters[paramNum] = parameter;
				}
				line = reader.readLine();
			}
			reader.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		} 

		return parameters;
	}
	*/
	
	public double[] readParameters(String fileName) {
		
		ArrayList<Double> parameters = new ArrayList<Double>();
		ArrayList<int[]> oxidationStates = new ArrayList<int[]>();
		ArrayList<String> moleculeIDs =new ArrayList<String>();
		//HashMap<Molecule, int[]> oxidationStates = new HashMap();
	
		try {
			LineNumberReader reader = new LineNumberReader(new FileReader(fileName));
			String line = reader.readLine();
			while (line != null && line.trim().length() != 0) {
				String[] fields = line.split(" ");
				
				/*Ion ion = Ion.get(fields[0]);
				int[] statesForMolecule = new int[(fields.length + 1) / 2];
				statesForMolecule[0] = (int) Math.round(ion.getOxidationState());*/
				
				double firstParam = Double.parseDouble(fields[0]);
				parameters.add(firstParam);
				int[] statesForMolecule = new int[(fields.length - 1) / 2];
				//Molecule molecule = Ion.get(m_KnownMolecules, fields[1]).getMolecule();
				//Structure molecule = Ion.get(fields[1]).getStructure();
				String subStructureID = IonFactory.getStructureSymbol(fields[1]);

				for (int stateIndex = 2; stateIndex < fields.length; stateIndex += 2) {
					//Ion ion = Ion.get(m_KnownMolecules, fields[stateIndex - 1]);
					Ion ion = IonFactory.get(fields[stateIndex - 1]);
					statesForMolecule[stateIndex / 2 - 1] = (int) Math.round(ion.getOxidationState());
					double parameter = Double.parseDouble(fields[stateIndex]);
					parameters.add(parameter);
				}
				
				//oxidationStates.put(molecule, statesForMolecule);
				oxidationStates.add(statesForMolecule);
				moleculeIDs.add(subStructureID);
				line = reader.readLine();
			}
			reader.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		} 

		this.initializeOxidationStates(oxidationStates, moleculeIDs);
		return parameters.stream().mapToDouble(i -> i).toArray();
	}
	
	private double[] getBounds(int ionTypeIndex) {
		
		int numOxidationStates = this.numOxidationStates(ionTypeIndex);
		if (numOxidationStates == 0) {
			return new double[0];
		}
		double[] returnArray = new double[numOxidationStates + 1];
		
		double param = this.getParameter(ionTypeIndex, 0);
		double center = param;// * param;
		double width = 0;
		for (int stateNum = 0; stateNum < numOxidationStates; stateNum++) {
			param = this.getParameter(ionTypeIndex, stateNum + 1);
			width += param * param;
		}
		returnArray[0] = center - (width / 2);
	
		for (int boundNum = 1; boundNum < returnArray.length; boundNum++) {
			param = this.getParameter(ionTypeIndex, boundNum);
			returnArray[boundNum] = returnArray[boundNum - 1] + param * param;
		}
		
		return returnArray;
	}
	
	public void writeBoundaries(String fileName) {
		
		try {
			OutputStream stream = new FileOutputStream(fileName);
			this.writeBoundaries(stream);
			stream.flush();
			stream.close();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}
	
	public void writeBoundaries(OutputStream stream) {
		PrintWriter writer = new PrintWriter(stream);
		for (int moleculeIndex = 0; moleculeIndex < m_IonTypes.length; moleculeIndex++) {
			int numOxidationStates = this.numOxidationStates(moleculeIndex);
			if (numOxidationStates == 0) {continue;}
			
			double[] bounds = getBounds(moleculeIndex);
			writer.print(bounds[0] + " ");
			
			for (int stateNum = 0; stateNum < numOxidationStates; stateNum++) {
				int oxidationState = this.getOxidationState(moleculeIndex, stateNum);
				Ion ion = IonFactory.get(m_IonTypes[moleculeIndex], oxidationState);
				writer.print(ion.getSymbol() + " ");
				
				/*double param = this.getParameter(moleculeIndex, stateNum + 1);
				bound += param * param;*/
				double bound = bounds[stateNum + 1];
				writer.print(bound + " ");
			}
			
			/*double bound = 0;
			for (int stateNum = 0; stateNum < numOxidationStates; stateNum++) {
				int oxidationState = this.getOxidationState(moleculeIndex, stateNum);
				Ion ion = Ion.get(m_Molecules[moleculeIndex], oxidationState);
				writer.print(ion.getSymbol() + " ");
				if (stateNum < numOxidationStates - 1) {
					double param = this.getParameter(moleculeIndex, stateNum);
					bound += param * param;
					writer.print(bound + " ");
				}
			}*/
			writer.println();
		}
		writer.flush();
	}
	
	public void writeDataFiles(String directoryName) {
		
		File outDir = new File(directoryName);
		if (!outDir.exists()) {
			outDir.mkdirs();
		}
		
		for (int moleculeNumber = 0; moleculeNumber < m_IonTypes.length; moleculeNumber++) {
			
			int[] oxidationStates = m_OxidationStatesByIonType[moleculeNumber];
			if (oxidationStates.length < 1) {continue;}
			String moleculeID = m_IonTypes[moleculeNumber];
			String fileName = directoryName + "/" + moleculeID + ".csv";
			this.writeDataFile(moleculeID, fileName);
			
		}
		
	}
	

	public void writeDataFiles(String directoryName, double lowerBound, double upperBound, double increment) {

		File outDir = new File(directoryName);
		if (!outDir.exists()) {
			outDir.mkdirs();
		}
				
		for (int moleculeIndex = 0; moleculeIndex < m_IonTypes.length; moleculeIndex++) {
			
			int[] oxidationStates = m_OxidationStatesByIonType[moleculeIndex];
			if (oxidationStates.length <= 1) {continue;}
			String moleculeID = m_IonTypes[moleculeIndex];
			String fileName = directoryName + "/" + moleculeID + ".csv";
			this.writeDataFile(moleculeID, fileName, lowerBound, upperBound, increment);
			
		}
		
	}
	
	public void writeDataFile(String moleculeID, String fileName) {
		
		double minLowerBound = Double.POSITIVE_INFINITY;
		double maxUpperBound = Double.NEGATIVE_INFINITY;
		double nextMinLowerBound = Double.POSITIVE_INFINITY;
		double nextMaxUpperBound = Double.NEGATIVE_INFINITY;
		
		for (int moleculeIndex = 0; moleculeIndex < m_ParamIndexByState.length; moleculeIndex++) {
			//int[] paramIndices = m_ParamIndexByState[moleculeIndex];
			double[] bounds = getBounds(moleculeIndex);
			if (bounds == null || bounds.length == 0) {continue;}
			//double firstParam = m_Parameters[paramIndices[0]];
			double lowerBound = bounds[0]; // firstParam * firstParam;
			if (lowerBound < minLowerBound) {
				minLowerBound = lowerBound;
			} else if (lowerBound < nextMinLowerBound) {
				nextMinLowerBound = lowerBound;
			}
			
			/*double upperBound = 0;
			for (int paramIndex : paramIndices) { */
			/*double upperBound = lowerBound;
			for (int paramIndex = 1; paramIndex < paramIndices.length; paramIndex++) {
				double param = m_Parameters[paramIndex];
				upperBound += param * param;
			}*/
			double upperBound = bounds[bounds.length - 1];
			if (upperBound > maxUpperBound) {
				maxUpperBound = upperBound;
			} else if (upperBound > nextMaxUpperBound) {
				nextMaxUpperBound = upperBound;
			}
		}
		
		// Go with the extreme values for now -- I kept the nextMax code in there in case I want to switch later

		// So we can visualize the extreme values
		minLowerBound -= 3;
		maxUpperBound += 3;
		double increment = (maxUpperBound - minLowerBound) / 1000;
		this.writeDataFile(moleculeID, fileName, minLowerBound, maxUpperBound, increment);
	}
	
	public void writeDataFileShortForm(String moleculeID, String fileName, double lowerBound, double upperBound, double increment) {
		
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(fileName));
			//String header = "potential";
			String header = "potential,lower_bound";
			int moleculeIndex = m_IonTypeIndices.get(moleculeID);
			int[] oxidationStates = m_OxidationStatesByIonType[moleculeIndex];
			for (int oxidationState : oxidationStates) {
				header = header + "," + oxidationState;
			}
			writer.write(header);
			writer.newLine();
			for (double potential = lowerBound; potential <= upperBound + 1E-7; potential += increment) {
				writer.write("" + potential);
				//int[] paramIndices = m_ParamIndexByState[moleculeIndex];
				double[] bounds = getBounds(moleculeIndex);
				/*double cutoff = 0;
				for (int paramIndex : paramIndices) {*/
				double cutoff = bounds[0]; //getLowerBound(moleculeIndex); 
				double value = 1 / (1 + Math.exp(potential - cutoff));
				writer.write("," + value);
				for (int paramIndex = 1; paramIndex < bounds.length; paramIndex++) {
					/*double param = m_Parameters[paramIndex];
					cutoff += param * param;*/
					cutoff = bounds[paramIndex];
					value = 1 / (1 + Math.exp(potential - cutoff));
					writer.write("," + value);
				}
				//writer.write(",1"); // For the highest oxidation state
				writer.newLine();
			}
			writer.flush();
			writer.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
	}
	

	public void writeDataFile(String moleculeID, String fileName, double lowerBound, double upperBound, double increment) {
		
		int moleculeIndex = m_IonTypeIndices.get(moleculeID);
		int[] paramIndices = m_ParamIndexByState[moleculeIndex];
		int[] oxidationStates = m_OxidationStatesByIonType[moleculeIndex];
		
		// Long form
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(fileName));
			String header = "potential,oxidationState,likelihood";
			writer.write(header);
			writer.newLine();
			for (double potential = lowerBound; potential <= upperBound + 1E-7; potential += increment) {
				
				double[] bounds = getBounds(moleculeIndex);
				/*double param = m_Parameters[paramIndices[0]];
				double cutoff = param * param;*/
				double cutoff = bounds[0]; // getLowerBound(moleculeIndex);
				//double likelihood = 1 / (1 + Math.exp((potential - cutoff)));
				double likelihood = potential < cutoff ? 1 : 0; // For a sharp cutoff
				writer.write(potential + ",0," + likelihood);  // This is left of the lower bound
				writer.newLine();
				
				for (int stateNum = 0; stateNum < oxidationStates.length; stateNum++) {
					int oxidationState = oxidationStates[stateNum];
					/*double param = m_Parameters[paramIndices[stateNum + 1]];
					cutoff += param * param;*/
					cutoff = bounds[stateNum + 1];
					//likelihood = 1 / (1 + Math.exp((potential - cutoff)));
					likelihood = potential < cutoff ? 1 : 0; // For a sharp cutoff
					writer.write(potential + "," + oxidationState + "," + likelihood);
					writer.newLine();
				}
				/*for (int stateNum = 0; stateNum < oxidationStates.length; stateNum++) {
					int oxidationState = oxidationStates[stateNum];
					double param = Double.POSITIVE_INFINITY;
					if (stateNum < oxidationStates.length - 1) {
						param = m_Parameters[paramIndices[stateNum]];
					}
					cutoff += param * param;
					double likelihood = 1 / (1 + Math.exp((potential - cutoff)));
					writer.write(potential + "," + oxidationState + "," + likelihood);
					writer.newLine();
				}*/
			}
			writer.flush();
			writer.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
	}
	
	public void writeParameters(String fileName) {
		
		try {
			OutputStream stream = new FileOutputStream(fileName);
			this.writeParameters(stream);
			stream.flush();
			stream.close();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}
	
	public void writeParameters(OutputStream stream) {
		PrintWriter writer = new PrintWriter(stream);
		for (int moleculeIndex = 0; moleculeIndex < m_IonTypes.length; moleculeIndex++) {
			String moleculeID = m_IonTypes[moleculeIndex];
			int numOxidationStates = this.numOxidationStates(moleculeIndex);
			if (numOxidationStates == 0) {continue;}
			double param = this.getParameter(moleculeIndex, 0);
			writer.print(param + " ");
			for (int stateNum = 0; stateNum < numOxidationStates; stateNum++) {
				int oxidationState = this.getOxidationState(moleculeIndex, stateNum);
				Ion ion = IonFactory.get(moleculeID, oxidationState);
				writer.print(ion + " ");
				param = this.getParameter(moleculeIndex, stateNum + 1);
				writer.print(param + " ");
			}
			/*for (int stateNum = 0; stateNum < numOxidationStates; stateNum++) {
				int oxidationState = this.getOxidationState(moleculeIndex, stateNum);
				Ion ion = Ion.get(molecule, oxidationState);
				writer.print(ion + " ");
				if (stateNum < numOxidationStates - 1) {
					double param = this.getParameter(moleculeIndex, stateNum);
					writer.print(param + " ");
				}
			}*/
			writer.println();
		}
		writer.flush();
	}
	
	public double getSumOfSpreads() {
		/*double returnValue = 0;
		for (int moleculeIndex = 0; moleculeIndex < m_ParamIndexByState.length; moleculeIndex++) {
			int[] paramIndices = m_ParamIndexByState[moleculeIndex];
			for (int paramIndex = 1; paramIndex < paramIndices.length; paramIndex++) {
				double param = m_Parameters[paramIndices[paramIndex]];
				double prevParam = m_Parameters[paramIndices[paramIndex - 1]];
				double delta = param - prevParam;
				if (delta >= 0) {continue;}
				returnValue += delta * delta;
			}
		}
		return returnValue * m_RegularizationParameter;*/
		double returnValue = 0;
		for (int ionIndex = 0; ionIndex < m_ParamIndexByState.length; ionIndex++) {
			double[] bounds = getBounds(ionIndex);
			returnValue += bounds[bounds.length - 1] - bounds[0];
			/*int[] paramIndices = m_ParamIndexByState[ionIndex];
			//double lowerBound = paramIndices[0] * paramIndices[0];  // This is all unnecessary math.
			//double currBound = lowerBound;
			for (int paramIndex = 1; paramIndex < paramIndices.length; paramIndex++) {
				double param = m_Parameters[paramIndices[paramIndex]];
				returnValue += param * param;
			}*/
			//returnValue += currBound - lowerBound;
		}
		return returnValue;		
	}

	public double getLikelihood(double fermiLevel, Ion ion) {
		return getLikelihood(fermiLevel, new Ion[] {ion});
	}
	
	public PotentialOptimizer optimizeLikelihood(Species[] allSpecies) {
		
		Ion[] ions = new Ion[0];
		for (int specNum = 0; specNum < allSpecies.length; specNum++) {
			Species species = allSpecies[specNum];
			if (species == Species.vacancy) {continue;}
			if (!m_IonTypeIndices.containsKey(species.getElementSymbol())) {
				return null;
			}
			/*Molecule molecule = m_KnownMolecules.get(species.getElementSymbol());
			if (molecule == null) {
				return null;
			}
			Ion ion = Ion.get(molecule, species.getOxidationState());*/
			Ion ion = IonFactory.get(species.getElementSymbol(), species.getOxidationState());
			ions = (Ion[]) ArrayUtils.appendElement(ions, ion);
		}
		return new PotentialOptimizer(ions);
	}
	
	public PotentialOptimizer optimizeLikelihood(Ion[] ions) {
		return new PotentialOptimizer(ions);
	}

	public PotentialOptimizer optimizeLikelihood(Ion[] ions, double initialFermiLevel) {
		return new PotentialOptimizer(ions, initialFermiLevel);
	}
	
	public double getLikelihood_old(double fermiLevel, Ion[] allIons) {
		
		double returnValue = 1;
		for (Ion ion : allIons) {
			int oxidationState = (int) Math.round(ion.getOxidationState());
			String ionStructureSymbol = ion.getStructureSymbol();
			int ionTypeIndex = m_IonTypeIndices.get(ionStructureSymbol);
			int[] oxidationStates = m_OxidationStatesByIonType[ionTypeIndex];
			int stateNum = Arrays.binarySearch(oxidationStates, oxidationState);
			
			double[] bounds = getBounds(ionTypeIndex);
			double lowerBound = bounds[stateNum];
			double upperBound = bounds[stateNum + 1];
			/*int paramIndex = m_ParamIndexByState[ionTypeIndex][0];
			double param = m_Parameters[paramIndex];*/
			/*double lowerBound = Double.NEGATIVE_INFINITY;
			//double upperBound = param * param;
			double upperBound = getLowerBound(ionTypeIndex);
			for (int stateIndex = 0; stateIndex <= stateNum; stateIndex++) {
				lowerBound = upperBound;
				int paramIndex = m_ParamIndexByState[ionTypeIndex][stateIndex + 1];
				double param = m_Parameters[paramIndex];
				upperBound += param * param; // Makes sure it's positive
			}*/
			
			double lowerDelta = fermiLevel - lowerBound;
			returnValue /= (1 + Math.exp(-lowerDelta));
			
			double upperDelta = fermiLevel - upperBound;
			returnValue /= (1 + Math.exp(upperDelta));
			
			/*double lowerBound = 0; // Setting this outside the loop makes it faster to calculate the upper bound
			if (stateNum > 0) { // Lower bound
				for (int boundaryIndex = 0; boundaryIndex < stateNum; boundaryIndex++) {
					int paramIndex = m_ParamIndexByState[moleculeIndex][boundaryIndex];
					double param = m_Parameters[paramIndex];
					lowerBound += param * param; // Makes sure it's positive
				}
				double delta = fermiLevel - lowerBound;
				returnValue /= (1 + Math.exp(-delta));
			}
			
			if (stateNum < oxidationStates.length - 1) { // Upper bound
				int upperBoundIndex = stateNum;
				int paramIndex = m_ParamIndexByState[moleculeIndex][upperBoundIndex];
				//double upperBound = m_Parameters[paramIndex];
				double param = m_Parameters[paramIndex];
				double upperBound = lowerBound + param * param;
				double delta = fermiLevel - upperBound;
				returnValue /= (1 + Math.exp(delta));
			}*/
		}
		
		return returnValue;
		
	}
	
	public double getLikelihood(double fermiLevel, Ion[] allIons) {
		
		double returnValue = 1;
		for (Ion ion : allIons) {
			int oxidationState = (int) Math.round(ion.getOxidationState());
			String ionStructureSymbol = ion.getStructureSymbol();
			int ionTypeIndex = m_IonTypeIndices.get(ionStructureSymbol);
			int[] oxidationStates = m_OxidationStatesByIonType[ionTypeIndex];
			int stateNum = Arrays.binarySearch(oxidationStates, oxidationState);
			
			double[] bounds = getBounds(ionTypeIndex);
			double lowerBound = bounds[stateNum];
			double upperBound = bounds[stateNum + 1];
			/*int paramIndex = m_ParamIndexByState[ionTypeIndex][0];
			double param = m_Parameters[paramIndex];*/
			/*double lowerBound = Double.NEGATIVE_INFINITY;
			//double upperBound = param * param;
			double upperBound = getLowerBound(ionTypeIndex);
			for (int stateIndex = 0; stateIndex <= stateNum; stateIndex++) {
				lowerBound = upperBound;
				int paramIndex = m_ParamIndexByState[ionTypeIndex][stateIndex + 1];
				double param = m_Parameters[paramIndex];
				upperBound += param * param; // Makes sure it's positive
			}*/
			
			double lowerDelta = fermiLevel - lowerBound;
			double lowerValue = 1 / (1 + Math.exp(-lowerDelta));
			
			double upperDelta = fermiLevel - upperBound;
			double upperValue = 1 / (1 + Math.exp(upperDelta));
			
			//double denominator = getLikelihoodSum(fermiLevel, ion);
			
			//returnValue *= (upperValue + lowerValue - 1);
			//returnValue *= upperValue;
			//returnValue *= lowerValue;
			returnValue *= Math.min(upperValue, lowerValue);
			
			/*double lowerBound = 0; // Setting this outside the loop makes it faster to calculate the upper bound
			if (stateNum > 0) { // Lower bound
				for (int boundaryIndex = 0; boundaryIndex < stateNum; boundaryIndex++) {
					int paramIndex = m_ParamIndexByState[moleculeIndex][boundaryIndex];
					double param = m_Parameters[paramIndex];
					lowerBound += param * param; // Makes sure it's positive
				}
				double delta = fermiLevel - lowerBound;
				returnValue /= (1 + Math.exp(-delta));
			}
			
			if (stateNum < oxidationStates.length - 1) { // Upper bound
				int upperBoundIndex = stateNum;
				int paramIndex = m_ParamIndexByState[moleculeIndex][upperBoundIndex];
				//double upperBound = m_Parameters[paramIndex];
				double param = m_Parameters[paramIndex];
				double upperBound = lowerBound + param * param;
				double delta = fermiLevel - upperBound;
				returnValue /= (1 + Math.exp(delta));
			}*/
		}
		
		return returnValue;
		
	}
	
	public PotentialOptimizer optimizeLikelihood(Entry entry) {
		return optimizeLikelihood(entry.getAllIons());
		//return optimizeLikelihood(entry.getAllElements(), entry.getAllElementWeights());
	}
	
	public PotentialOptimizer optimizeLikelihood(String[] moleculeIDs, double[] weights) {
		return new PotentialOptimizer(this.getLikelyOxidationStates(moleculeIDs, weights).getIons());
	}
	
	public OxidationStateSet getLikelyOxidationStates(String compositionString) {
		
		// Insert spaces in the composition string if necessary
		String spacedString = "" + compositionString.charAt(0);
		for (int charIndex = 1; charIndex < compositionString.length(); charIndex++) {
			char currChar = compositionString.charAt(charIndex);
			char prevChar = compositionString.charAt(charIndex - 1);
			if (Character.isDigit(prevChar) && Character.isAlphabetic(currChar)) {
				spacedString += " ";
			}
			spacedString += currChar;
		}
		compositionString = spacedString;
		
		String[] fields = compositionString.trim().split(" ");
		String[] moleculeIDs = new String[fields.length];
		double[] counts = new double[fields.length];
		for (int fieldNum = 0; fieldNum < fields.length; fieldNum++) {
			String field = fields[fieldNum];
			String moleculeSymbol= "";
			int charIndex = 0;
			while (Character.isAlphabetic(field.charAt(charIndex))) {
				moleculeSymbol = moleculeSymbol + field.charAt(charIndex++);
			}
			//molecules[fieldNum] = m_KnownMolecules.get(moleculeSymbol);
			moleculeIDs[fieldNum] = moleculeSymbol;
			counts[fieldNum] = Double.parseDouble(field.substring(charIndex, field.length()));
		}
		return this.getLikelyOxidationStates(moleculeIDs, counts);
	}
	
	public OxidationStateSet getLikelyOxidationStates(Structure structure) {
		
		// TODO smarter identification of ions
		Element[] elements = structure.getDistinctElements();
		String[] moleculeIDs = new String[0];
		double[] counts = new double[0];
		for (Element element : elements) {
			if (element == Element.vacancy) {continue;}
			/*Molecule molecule = m_KnownMolecules.get(element.getSymbol());
			molecules = (Molecule[]) ArrayUtils.appendElement(molecules, molecule);*/
			moleculeIDs = (String[]) ArrayUtils.appendElement(moleculeIDs, element.getSymbol());
			double count = structure.numDefiningSitesWithElement(element);
			counts = (double[]) ArrayUtils.appendElement(counts, count);
		}
		
		return this.getLikelyOxidationStates(moleculeIDs, counts);
		
	}

	public OxidationStateSet getLikelyOxidationStates_orig(String[] moleculeIDs, double[] weights) {
		
		// Set up a brute force search -- should be fast enough in most cases
		int[] numStates = new int[moleculeIDs.length];
		Ion[][] allowedIons = new Ion[moleculeIDs.length][];
		for (int moleculeNum = 0; moleculeNum < moleculeIDs.length; moleculeNum++) {
			String moleculeID = moleculeIDs[moleculeNum];
			if (!m_IonTypeIndices.containsKey(moleculeID)) {
				Status.warning("No parameters available for molecule: " + moleculeID);
				return null;
			}
			int moleculeIndex = m_IonTypeIndices.get(moleculeID);
			numStates[moleculeNum] = this.numOxidationStates(moleculeIndex);
			allowedIons[moleculeNum] = new Ion[numStates[moleculeNum]];
			for (int stateNum = 0; stateNum < numStates[moleculeNum]; stateNum++) {
				double oxidationState = this.getOxidationState(moleculeIndex, stateNum);
				allowedIons[moleculeNum][stateNum] = IonFactory.get(moleculeID, oxidationState);
			}
		}
		MaxLikelihoodFilter maxLikelihoodFilter = new MaxLikelihoodFilter(this, allowedIons);
		ChargeBalanceFilter chargeBalanceFilter = new ChargeBalanceFilter(allowedIons, weights);
		ArrayIndexer.Filter[] filters = new ArrayIndexer.Filter[] {maxLikelihoodFilter, chargeBalanceFilter};
		ArrayIndexer indexer = new ArrayIndexer(numStates);
		
		int[] stateIndices = indexer.getInitialState(filters);
		Ion[] baseIons = new Ion[moleculeIDs.length];
		OxidationStateSet result = null;
		do {

			double likelihood = maxLikelihoodFilter.getLastValidLikelihood();
			
			// Set the oxidation states and calculate the net charge
			double netCharge = 0;
			//double likelihood = 1;
			for (int moleculeNum = 0; moleculeNum < stateIndices.length; moleculeNum++) {
				int moleculeIndex = m_IonTypeIndices.get(moleculeIDs[moleculeNum]);
				int stateNum = stateIndices[moleculeNum];
				int oxidationState = this.getOxidationState(moleculeIndex, stateNum);
				baseIons[moleculeNum] = allowedIons[moleculeNum][stateNum];
				netCharge += oxidationState * weights[moleculeNum];
			}

			/*FermiOptimizer optimizer = new FermiOptimizer(baseSpecies);
			likelihood = optimizer.getMaxLikelihood();*/
			
			//if (likelihood < maxLikelihood) {continue;} // We can't possibly beat the max, even by adding another species
			//if (likelihood < filter.getMaxKnownLikelihood()) {continue;}
			
			if (Math.abs(netCharge) < 1E-2) {
				result = new OxidationStateSet(baseIons, weights, likelihood, Double.NaN);
				maxLikelihoodFilter.setMaxKnownLikelihood(likelihood);
				//returnArray = (Ion[]) ArrayUtils.copyArray(baseIons);
			} else if (netCharge > 1E-2) { // Consider mixed valence.  We only need to consider lowering valence to cover all cases
				for (int elementNum = 0; elementNum < moleculeIDs.length; elementNum++) {
					int moleculeIndex = m_IonTypeIndices.get(moleculeIDs[elementNum]);
					int stateIndex = stateIndices[elementNum];
					int oxidationState = this.getOxidationState(moleculeIndex, stateIndex);
					int newStateIndex = stateIndex - 1;
					if (newStateIndex < 0) {continue;}
					int newOxidationState = this.getOxidationState(moleculeIndex, newStateIndex);
					double delta = newOxidationState - oxidationState;
					double maxChange = delta * weights[elementNum];
					if (netCharge + maxChange > 0) {continue;} // Can't reach zero
					Ion newIon = allowedIons[elementNum][newStateIndex];
					Ion[] allIons = (Ion[]) ArrayUtils.appendElement(baseIons, newIon);

					// Balance the charge
					double[] newWeights = new double[weights.length + 1];
					System.arraycopy(weights, 0, newWeights, 0, weights.length);
					newWeights[newWeights.length - 1] = -netCharge / delta;
					newWeights[elementNum] -= -netCharge / delta;
					
					// Recalculate the likelihood
					likelihood = this.optimizeLikelihood(allIons).getMaxLikelihood();
					
					//likelihood = this.optimizeLikelihood(allSpecies, optimizer.getOptimalFermiLevel());
					if (likelihood > maxLikelihoodFilter.getMaxKnownLikelihood()) {
						/*if (returnArray != null && likelihood > 1E-2 && Math.abs(likelihood - maxLikelihoodFilter.getMaxKnownLikelihood()) < 1E-4) {
							String speciesString = "";
							for (Species species : returnArray) {
								speciesString += species + " ";
							}
							speciesString += ",   ";
							for (Species species : allSpecies) {
								speciesString += species + " ";
							}							
							Status.detail("Oxidation states with similar likelihood: " + speciesString);
						}*/
						maxLikelihoodFilter.setMaxKnownLikelihood(likelihood);
						result = new OxidationStateSet(allIons, newWeights, likelihood, Double.NaN);
					}
				}
			} 
			
		} while (indexer.increment(stateIndices, filters));
		
		
		return result;
		
	}


	public OxidationStateSet getLikelyOxidationStates(String[] moleculeIDs, double[] weights) {
		
		// Set up a brute force search -- should be fast enough in most cases
		int[] numStates = new int[moleculeIDs.length];
		Ion[][] allowedIons = new Ion[moleculeIDs.length][];
		for (int moleculeNum = 0; moleculeNum < moleculeIDs.length; moleculeNum++) {
			String moleculeID = moleculeIDs[moleculeNum];
			if (!m_IonTypeIndices.containsKey(moleculeID)) {
				Status.warning("No parameters available for molecule: " + moleculeID);
				return null;
			}
			int moleculeIndex = m_IonTypeIndices.get(moleculeID);
			numStates[moleculeNum] = this.numOxidationStates(moleculeIndex);
			allowedIons[moleculeNum] = new Ion[numStates[moleculeNum]];
			for (int stateNum = 0; stateNum < numStates[moleculeNum]; stateNum++) {
				double oxidationState = this.getOxidationState(moleculeIndex, stateNum);
				allowedIons[moleculeNum][stateNum] = IonFactory.get(moleculeID, oxidationState);
			}
		}
		MaxLikelihoodFilter maxLikelihoodFilter = new MaxLikelihoodFilter(this, allowedIons);
		ChargeBalanceFilter chargeBalanceFilter = new ChargeBalanceFilter(allowedIons, weights);
		ArrayIndexer.Filter[] filters = new ArrayIndexer.Filter[] {maxLikelihoodFilter, chargeBalanceFilter};
		ArrayIndexer indexer = new ArrayIndexer(numStates);
		
		int[] stateIndices = indexer.getInitialState(filters);
		if (stateIndices == null) {return null;} // No match possible
		Ion[] baseIons = new Ion[moleculeIDs.length];
		OxidationStateSet result = null;
		do {

			double likelihood = maxLikelihoodFilter.getLastValidLikelihood();
			double fermiLevel = maxLikelihoodFilter.getLastValidFermiLevel();
			
			// Set the oxidation states and calculate the net charge
			double netCharge = 0;
			//double likelihood = 1;
			for (int moleculeNum = 0; moleculeNum < stateIndices.length; moleculeNum++) {
				int moleculeIndex = m_IonTypeIndices.get(moleculeIDs[moleculeNum]);
				int stateNum = stateIndices[moleculeNum];
				int oxidationState = this.getOxidationState(moleculeIndex, stateNum);
				baseIons[moleculeNum] = allowedIons[moleculeNum][stateNum];
				netCharge += oxidationState * weights[moleculeNum];
			}

			/*FermiOptimizer optimizer = new FermiOptimizer(baseSpecies);
			likelihood = optimizer.getMaxLikelihood();*/
			
			//if (likelihood < maxLikelihood) {continue;} // We can't possibly beat the max, even by adding another species
			//if (likelihood < filter.getMaxKnownLikelihood()) {continue;}
			
			if (Math.abs(netCharge) < 1E-2) {
				result = new OxidationStateSet(baseIons, weights, likelihood, fermiLevel);
				maxLikelihoodFilter.setMaxKnownLikelihood(likelihood);
				//returnArray = (Ion[]) ArrayUtils.copyArray(baseIons);
			} else { // Consider mixed valence.  We only need to consider lowering valence to cover all cases
				for (int elementNum = 0; elementNum < moleculeIDs.length; elementNum++) {
					int moleculeIndex = m_IonTypeIndices.get(moleculeIDs[elementNum]);
					int stateIndex = stateIndices[elementNum];
					int oxidationState = this.getOxidationState(moleculeIndex, stateIndex);
					for (int decrement = 1; decrement <= stateIndex; decrement++) {
						int newStateIndex = stateIndex - decrement;
						//if (newStateIndex < 0) {continue;}
						int newOxidationState = this.getOxidationState(moleculeIndex, newStateIndex);
						double delta = newOxidationState - oxidationState;
						double maxChange = delta * weights[elementNum];
						if (netCharge + maxChange > 0) {continue;} // Can't reach zero
						Ion newIon = allowedIons[elementNum][newStateIndex];
						Ion[] allIons = (Ion[]) ArrayUtils.appendElement(baseIons, newIon);

						// Balance the charge
						double[] newWeights = new double[weights.length + 1];
						System.arraycopy(weights, 0, newWeights, 0, weights.length);
						newWeights[newWeights.length - 1] = -netCharge / delta;
						newWeights[elementNum] -= -netCharge / delta;
					
						// Recalculate the likelihood
						PotentialOptimizer optimizer = this.optimizeLikelihood(allIons);
						likelihood = optimizer.getMaxLikelihood();
						fermiLevel = optimizer.getOptimalFermiLevel();
					
						//likelihood = this.optimizeLikelihood(allSpecies, optimizer.getOptimalFermiLevel());
						if (likelihood > maxLikelihoodFilter.getMaxKnownLikelihood()) {
							maxLikelihoodFilter.setMaxKnownLikelihood(likelihood);
							result = new OxidationStateSet(allIons, newWeights, likelihood, fermiLevel);
						}
					}
				}
			} 
			
		} while (indexer.increment(stateIndices, filters));
		
		
		return result;
		
	}

	public int numOxidationStates(int moleculeIndex) {
		
		return m_OxidationStatesByIonType[moleculeIndex].length;
		
	}
	
	public int getOxidationState(int moleculeIndex, int stateNum) {
		return m_OxidationStatesByIonType[moleculeIndex][stateNum];
	}
	
	public double getParameter(int moleculeIndex, int paramNumForMolecule) {
		int paramNum = m_ParamIndexByState[moleculeIndex][paramNumForMolecule];
		return m_Parameters[paramNum];
	}
	
	public class PotentialOptimizer {
		
		private Ion[] m_AllIons;
		
		private double m_InitialFermiLevel;
		private double m_InitialStepSize = 0.5;
		
		private double m_FinalFermiLevel = Double.NaN;
		private double m_FinalLikelihood = Double.NaN;
		
		private PotentialOptimizer(Ion[] allIons) {
			
			m_AllIons = allIons.clone();
			
			m_InitialFermiLevel = findMiddleFermiLevel();
			if (Double.isNaN(m_FinalFermiLevel)) {
				this.optimize();
			}
			
		}
		
		private PotentialOptimizer(Ion[] allIons, double initialFermiLevel) {
			
			m_AllIons = allIons.clone();
			
			if (!Double.isInfinite(initialFermiLevel)) {
				m_InitialFermiLevel = initialFermiLevel;
			}
			
			double middleFermiLevel = findMiddleFermiLevel();
			if (Double.isNaN(m_FinalFermiLevel)) {
				m_InitialStepSize = Math.abs(m_InitialFermiLevel - middleFermiLevel);
				this.optimize();
			}
			
		}
		
		public double getOptimalFermiLevel() {
			return m_FinalFermiLevel;
		}
		
		public double getMaxLikelihood() {
			return m_FinalLikelihood;
		}
		
		private double findMiddleFermiLevel() {
			// First find a good guess
			double maxLowerBound = Double.NEGATIVE_INFINITY;
			double minUpperBound = Double.POSITIVE_INFINITY;
			for (Ion ion : m_AllIons) {
				int oxidationState = (int) Math.round(ion.getOxidationState());
				String moleculeID = ion.getStructureSymbol();
				int moleculeIndex = m_IonTypeIndices.get(moleculeID);
				int[] oxidationStates = m_OxidationStatesByIonType[moleculeIndex];
				int stateNum = Arrays.binarySearch(oxidationStates, oxidationState);
				if (stateNum < 0) {return Double.NaN;}
				
				double[] bounds = getBounds(moleculeIndex);
				double lowerBound = bounds[stateNum];
				double upperBound = bounds[stateNum + 1];
				/*int paramIndex = m_ParamIndexByState[moleculeIndex][0];
				double param = m_Parameters[paramIndex];*/
				/*double lowerBound = Double.NEGATIVE_INFINITY;
				//double upperBound = param * param;
				double upperBound = getLowerBound(moleculeIndex);
				
				for (int stateIndex = 0; stateIndex <= stateNum; stateIndex++) {
					lowerBound = upperBound;
					int paramIndex = m_ParamIndexByState[moleculeIndex][stateIndex + 1];
					double param = m_Parameters[paramIndex];
					upperBound += param * param; // Makes sure it's positive
				}*/
				
				maxLowerBound = Math.max(maxLowerBound, lowerBound);
				minUpperBound = Math.min(upperBound, minUpperBound);
				/*double lowerBound = 0; // Setting this outside the loop makes it faster to calculate the upper bound
				if (stateNum > 0) { // Lower bound
					for (int boundaryIndex = 0; boundaryIndex < stateNum; boundaryIndex++) {
						int paramIndex = m_ParamIndexByState[moleculeIndex][boundaryIndex];
						double param = m_Parameters[paramIndex];
						lowerBound += param * param; // Makes sure it's positive
					}
					maxLowerBound = Math.max(maxLowerBound, lowerBound);
				} 
				
				if (stateNum < oxidationStates.length - 1) { // Upper bound
					int upperBoundIndex = stateNum;
					int paramIndex = m_ParamIndexByState[moleculeIndex][upperBoundIndex];
					//double upperBound = m_Parameters[paramIndex];
					double param = m_Parameters[paramIndex];
					double upperBound = lowerBound + param * param;
					minUpperBound = Math.min(upperBound, minUpperBound);
				}*/
			}
			
			/*if (Double.isInfinite(minUpperBound)) {
				m_FinalFermiLevel = Double.POSITIVE_INFINITY;
				m_FinalLikelihood = 1;
				return Double.POSITIVE_INFINITY;
			}
			
			if (Double.isInfinite(maxLowerBound)) {
				m_FinalFermiLevel = Double.NEGATIVE_INFINITY;
				m_FinalLikelihood = 1;
				return Double.NEGATIVE_INFINITY;
			}*/
			
			return (maxLowerBound + minUpperBound) / 2;
						
		}
		
		private void optimize() {

			// Binary search
			//double stepSize = Math.abs(maxLowerBound - fermiLevel);
			double fermiLevel = m_InitialFermiLevel;
			double stepSize = m_InitialStepSize;
			Ion[] allIons = m_AllIons;
			
			// TODO use a line minimize here (e.g. GRLinearMinimizer2)
			//double stepSize = 2; // Based on width of logistic function
			double centerValue = getLikelihood(fermiLevel, allIons);
			while (stepSize > 1E-6) {

				double leftValue = getLikelihood(fermiLevel - stepSize, allIons);
				double rightValue = getLikelihood(fermiLevel + stepSize, allIons);
				
				if ((centerValue >= leftValue) && (centerValue >= rightValue)) {
					stepSize /= 2;
					continue;
				}
				
				if (leftValue > centerValue) {
					fermiLevel -= stepSize;
					centerValue = leftValue;
				} else {
					fermiLevel += stepSize;
					centerValue = rightValue;
				}
				
			}
			
			m_FinalFermiLevel = fermiLevel;
			m_FinalLikelihood = centerValue;
		}
		
	}
	
	public class OxidationStateSet {
		
		private Ion[] m_Ions;
		private double[] m_Weights;
		private double m_MaxLikelihood;
		private double m_FermiLevel;
		
		private OxidationStateSet(Ion[] ions, double[] weights, double maxLikelihood, double optimalFermiLevel) {
			m_Ions = ions.clone();
			m_Weights = weights.clone();
			m_MaxLikelihood = maxLikelihood;
			m_FermiLevel = optimalFermiLevel;
		}
		
		public Ion[] getIons() {
			return m_Ions.clone();
		}
		
		public double[] getWeights() {
			return m_Weights.clone();
		}
		
		public double getMaxLikelihood() {
			return m_MaxLikelihood;
		}
		
		public double getOptimalFermiLevel() {
			return m_FermiLevel;
		}
		
		public double getWeight(Ion ion) {
			int ionIndex = ArrayUtils.findIndex(m_Ions, ion);
			return m_Weights[ionIndex];
		}
		
		public String toString() {
			String returnString = "";
			for (int ionNum = 0; ionNum < m_Ions.length; ionNum++) {
				Ion ion = m_Ions[ionNum];
				double weight = m_Weights[ionNum];
				returnString += "[" + ion.getSymbol() + "]" + weight + " ";
			}
			return returnString;
		}
	}
	
	private class AtomicMassComparator implements Comparator<String> {

		@Override
		public int compare(String structure1ID, String structure2ID) {
			
			Structure structure1 = IonFactory.getStructure(structure1ID);
			Structure structure2 = IonFactory.getStructure(structure2ID);
			
			if (structure1 == null) {
				throw new RuntimeException("No substructure known for ID " + structure1ID);
			}
			
			if (structure2 == null) {
				throw new RuntimeException("No substructure known for ID " + structure2ID);
			}
			
			return (int) Math.signum(structure1.getAtomicWeightPerUnitCell() - structure2.getAtomicWeightPerUnitCell());
		}
	}

}
