package tri.oxidationstates.fitting;

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.LineNumberReader;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.TreeSet;

import matsci.io.app.log.Status;
import matsci.io.clusterexpansion.PRIM;
import matsci.io.vasp.POSCAR;
import matsci.structure.Structure;
import matsci.util.MSMath;
import tri.oxidationstates.calculator.LikelihoodCalculator;
import tri.oxidationstates.ion.IonFactory;
import tri.oxidationstates.ion.IonFactory.Ion;
import tri.oxidationstates.ion.ZintlIonFinder;

public class OxidationStateData {
	
	private HashMap<String, String> m_KnownMoleculeIDs;
	private ArrayList<Entry> m_Entries = new ArrayList<Entry>();
	
	public OxidationStateData(String fileName) {
		readFile(fileName);
		Status.basic(this.numEntries() + " entries in initial data set.");
	}
	
	public OxidationStateData(String fileName, boolean removeNonInteger, double hullCutoff, boolean removeZeroOxidation, boolean removeZintl, String structDir) {

		//OxidationStateData data = new OxidationStateData("/home/timmueller/Projects/Oxidation state analysis/mpData.txt");
		//OxidationStateData data = new OxidationStateData("/home/timmueller/Projects/Oxidation state analysis/mpData_hull_fromRandom_zeroAdded_10x20_1.txt");
		this(fileName);
		//OxidationStateData data = new OxidationStateData(getKnownMolecules(), fileName);
		//OxidationStateData data = new OxidationStateData("/home/timmueller/Projects/Oxidation state analysis/mpData_recalc.txt");

		if (removeNonInteger) {
			this.removeEntriesWithNonIntegerStates();
		}
		
		if (hullCutoff >= 0) {
		//double hullCutoff = 0.0001;
			this.removeUnstableEntries(hullCutoff);
		}
		
		if (removeZeroOxidation) {
			this.removeEntriesWithZeroOxidationStates();
		}
		
		if (removeZintl) {
			//String structDirName = m_InputDir + "/Structures/";
			this.removeEntriesWithZintlIons(structDir);
		}
	}
	
	
	private void readFile(String fileName) {
		
		try {
			FileReader reader = new FileReader(fileName);
			readFile(reader);
			reader.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	private void readFile(Reader reader) throws IOException {
		
		LineNumberReader lineReader = new LineNumberReader(reader);
		String line = lineReader.readLine();
		while (line != null && line.trim().length() > 0) {
			String[] fields = line.split("\t");
			//String mpID = fields[0];
			String[] idFields = fields[0].split(" ");
			String id = (idFields.length == 1) ? idFields[0] : idFields[1];
			String composition = fields[1];
			String[] ionSymbols = fields[2].trim().split(" ");
			String[] sources = fields[3].trim().split(" ");
			double energyAboveHull = (fields.length > 4) ? Double.parseDouble(fields[4]) : 0;
			
			Ion[] ions = new Ion[ionSymbols.length];
			boolean knownIons = true;
			for (int ionNum = 0; ionNum < ions.length; ionNum++) {
				ions[ionNum] = IonFactory.get(ionSymbols[ionNum]);
				knownIons &= (ions[ionNum] != null);
			}
			
			if (knownIons) {
				Entry entry = new Entry(id, composition, ions, sources, energyAboveHull);
				m_Entries.add(entry);
			}
					
			line = lineReader.readLine();
		}
		
	}
	
	public void writeFile(String fileName) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(fileName));
			this.writeFile(writer);
			writer.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	public void writeFile(Writer writer) throws IOException {
		
		for (Entry entry : m_Entries) {
			String output = "";
			output = output + entry.getID() + "\t";
			output = output + entry.getComposition() + "\t";
			Ion[] ions = entry.getAllIons();
			for (int specNum = 0; specNum < ions.length; specNum++) {
				output = output + ions[specNum] + " ";
			}
			output = output + "\t";
			String[] sources = entry.getAllSources();
			for (String source : sources) {
				output = output + source + " ";
			}
			output = output + "\t";
			if (!Double.isNaN(entry.getEnergyAboveHull())) {
				output = output + entry.getEnergyAboveHull();
			}
			writer.write(output + "\n");
		}
		writer.flush();	
		
	}
	
	public void removeRandomEntries(double percentToRemove) {
		ArrayList<Entry> newEntryList = new ArrayList<Entry>();
		int numToKeep = (int) Math.round((1.0 - percentToRemove) * m_Entries.size());
		int[] randomIndexOrder = MSMath.getRandomShuffle(m_Entries.size());
		for (int entryNum = 0; entryNum < numToKeep; entryNum++) {
			newEntryList.add(m_Entries.get(randomIndexOrder[entryNum]));
		}
		
		m_Entries = newEntryList;
		Status.basic(this.numEntries() + " remaining entries in data set after " + (percentToRemove * 100) + " percent of entries were randomly removed.");
		
	}
	
	public void removeUncommonOxidationStates_orig(double minAllowedFraction) {

		ArrayList<Entry> newEntryList = new ArrayList<Entry>();
		HashMap<String, Integer> counts = new HashMap<String, Integer>();
		
		int numTotalIons = 0;
		for (Entry entry : m_Entries) {
			for (int ionNum = 0; ionNum < entry.numIons(); ionNum++) {
				Ion ion = entry.getIon(ionNum);
				String symbol = ion.getSymbol();
				int count = counts.containsKey(symbol) ? counts.get(symbol) : 0;
				counts.put(symbol, count + 1);
				numTotalIons++;
			}
		}
		
		int minAllowedCount = (int) Math.ceil(numTotalIons * minAllowedFraction);
		HashSet<String> forbiddenIons = new HashSet<String>();
		for (String symbol : counts.keySet()) {
			int count = counts.get(symbol);
			if (count < minAllowedCount) {forbiddenIons.add(symbol);}
		}
		
		for (Entry entry : m_Entries) {
			boolean isAllowed = true;
			for (int ionNum = 0; ionNum < entry.numIons(); ionNum++) {
				Ion ion = entry.getIon(ionNum);
				if (forbiddenIons.contains(ion.getSymbol())) {
					isAllowed = false;
					break;
				}
			}
			if (isAllowed) {
				newEntryList.add(entry);
			}
		}
		
		m_Entries = newEntryList;
		Status.basic(this.numEntries() + " remaining entries in data set after removing entries with ions with counts that were less than " + (minAllowedFraction * 100) + "% of all ions: " + forbiddenIons);		
	}
	
	public void removeUncommonOxidationStates(double minAllowedFraction) {

		ArrayList<Entry> newEntryList = new ArrayList<Entry>();
		HashMap<String, Integer> ionCounts = new HashMap<String, Integer>();
		HashMap<String, Integer> ionTypeCounts = new HashMap<String, Integer>();
		
		for (Entry entry : m_Entries) {
			for (int ionNum = 0; ionNum < entry.numIons(); ionNum++) {
				Ion ion = entry.getIon(ionNum);
				String symbol = ion.getSymbol();
				int count = ionCounts.containsKey(symbol) ? ionCounts.get(symbol) : 0;
				ionCounts.put(symbol, count + 1);
				
				String typeSymbol = ion.getStructureSymbol();
				int typeCount = ionTypeCounts.containsKey(typeSymbol) ? ionTypeCounts.get(typeSymbol) : 0;
				ionTypeCounts.put(typeSymbol, typeCount + 1);
			}
		}

		HashSet<String> forbiddenIons = new HashSet<String>();
		for (String typeSymbol : ionTypeCounts.keySet()) {
			int numTotalIons = ionTypeCounts.get(typeSymbol);
			int minAllowedCount = (int) Math.ceil(numTotalIons * minAllowedFraction);
			for (String symbol : ionCounts.keySet()) {
				if (!IonFactory.getStructureSymbol(symbol).equals(typeSymbol)) {continue;}
				int count = ionCounts.get(symbol);
				if (count < minAllowedCount) {forbiddenIons.add(symbol);}
			}
		}
		
		for (Entry entry : m_Entries) {
			boolean isAllowed = true;
			for (int ionNum = 0; ionNum < entry.numIons(); ionNum++) {
				Ion ion = entry.getIon(ionNum);
				if (forbiddenIons.contains(ion.getSymbol())) {
					isAllowed = false;
					break;
				}
			}
			if (isAllowed) {
				newEntryList.add(entry);
			}
		}
		
		m_Entries = newEntryList;
		Status.basic(this.numEntries() + " remaining entries in data set after removing entries with ions with counts that were less than " + (minAllowedFraction * 100) + "% of ions of each type: " + forbiddenIons);		
	}


	public void removeEntriesWithZeroOxidationStates() {
		ArrayList<Entry> newEntryList = new ArrayList<Entry>();
		for (Entry entry : m_Entries) {
			int numSpecies = entry.numIons();
			boolean allNonZero = true;
			for (int ionNum = 0; ionNum < numSpecies; ionNum++) {
				double oxidationState = entry.getIon(ionNum).getOxidationState();
				if (Math.abs(oxidationState) < 1E-2) {
					allNonZero = false;
					break;
				}
			}
			if (allNonZero) {
				newEntryList.add(entry);
			}
		}
		
		m_Entries = newEntryList;
		Status.basic(this.numEntries() + " remaining entries in data set with nonzero oxidation state.");
		
	}
	
	public void removeNonChargeBalancedStructures(String structDirName) {
		
		ArrayList<Entry> newEntryList = new ArrayList<Entry>();
		for (Entry entry : m_Entries) {
			String fileName = structDirName + entry.getID() + ".vasp";
			
			PRIM infile = new PRIM(fileName);
			Structure structure = new Structure(infile);

			for (int siteNum = 0; siteNum < structure.numDefiningSites(); siteNum++) {
				structure.getDefiningSite(siteNum).setSpecies(infile.getAllowedSpecies()[siteNum][0]);
			}
			if (structure.isChargeBalanced()) {
				newEntryList.add(entry);
			}
		}
		m_Entries = newEntryList;
		Status.basic(this.numEntries() + " remaining entries in data set that are charge balanced.");

	}
	
	public void removeEntriesWithZintlIons(String structDirName) {
		
		ArrayList<Entry> newEntryList = new ArrayList<Entry>();
		for (Entry entry : m_Entries) {
			//if (!entry.getID().endsWith("1087505")) {continue;}
			String fileName = structDirName + entry.getID() + ".vasp";
			
			POSCAR infile = new POSCAR(fileName);
			Structure structure = new Structure(infile);
			ZintlIonFinder ionFinder = new ZintlIonFinder(structure);
			if (ionFinder.numFoundIons() == 0) {
				newEntryList.add(entry);
				/*Molecule[] molecules = entry.getAllMolecules();
				for (Molecule molecule : molecules) {
					if (molecule.getID().equals("Si")) {
						System.out.println("Found Si");
					}
				}*/
			}
		}
		m_Entries = newEntryList;
		Status.basic(this.numEntries() + " remaining entries in data set with no Zintl ions.");
	}
	
	public HashMap<String, int[]> getKnownOxidationStates() {

		// Get the set of all oxidation states.
		HashMap<String, TreeSet<Integer>> oxidationStates = new HashMap();
		
		int numEntries = this.numEntries();
		for (int entryNum = 0; entryNum < numEntries; entryNum++) {
			Entry entry = this.getEntry(entryNum);
			for (int ionNum = 0; ionNum < entry.numIons(); ionNum++) {
				Ion ion = entry.getIon(ionNum);
				double oxidationState = ion.getOxidationState();
				int intOxidationState = (int) Math.round(oxidationState);
				if (Math.abs(intOxidationState - oxidationState) > 1E-2) {continue;}
				TreeSet<Integer> knownOxidationStates = oxidationStates.get(ion.getStructureSymbol());
				if (knownOxidationStates == null) {
					knownOxidationStates = new TreeSet<Integer>();
					oxidationStates.put(ion.getStructureSymbol(), knownOxidationStates);
				}
				if (!knownOxidationStates.contains(intOxidationState)) {
					knownOxidationStates.add(intOxidationState);
				}
			}
		}
		
		HashMap<String, int[]> returnMap = new HashMap();
		for (String moleculeID : oxidationStates.keySet()) {
			int[] intArray = oxidationStates.get(moleculeID).stream().mapToInt(i -> i).toArray();
			returnMap.put(moleculeID, intArray);
		}
		return returnMap;
	}
	
	public void removeEntriesWithNonIntegerStates() {
		ArrayList<Entry> newEntryList = new ArrayList<Entry>();
		for (Entry entry : m_Entries) {
			int numIons = entry.numIons();
			boolean allInts = true;
			for (int ionNum = 0; ionNum < numIons; ionNum++) {
				double oxidationState = entry.getIon(ionNum).getOxidationState();
				int intValue = (int) Math.round(oxidationState);
				if (Math.abs(oxidationState - intValue) > 1E-2) {
					allInts = false;
					break;
				}
			}
			if (allInts) {
				newEntryList.add(entry);
			}
		}
		
		m_Entries = newEntryList;
		Status.basic(this.numEntries() + " remaining entries in data set with all-integer oxidation states.");

	}
	
	public void removeUnstableEntries(double maxEnergyAboveHull) {
		ArrayList<Entry> newEntryList = new ArrayList<Entry>();
		for (Entry entry : m_Entries) {
			double energyAboveHull = entry.getEnergyAboveHull();
			if (energyAboveHull > maxEnergyAboveHull) {continue;}
			newEntryList.add(entry);
		}
		
		m_Entries = newEntryList;
		Status.basic(this.numEntries() + " remaining entries in data set within " + maxEnergyAboveHull + " eV/atom of convex hull.");
	}
	
	public int getMinIntegerOxidationState() {
		int returnValue = Integer.MAX_VALUE;
		for (Entry entry : m_Entries) {
			int numIons = entry.numIons();
			for (int ionNum = 0; ionNum < numIons; ionNum++) {
				double oxidationState = entry.getIon(ionNum).getOxidationState();
				int intValue = (int) Math.round(oxidationState);
				if (Math.abs(oxidationState - intValue) > 1E-2) {continue;}
				returnValue = Math.min(intValue, returnValue);
			}
		}
		return returnValue;
	}
	
	public int getMaxIntegerOxidationState() {
		int returnValue = Integer.MIN_VALUE;
		for (Entry entry : m_Entries) {
			int numSpecies = entry.numIons();
			for (int ionNum = 0; ionNum < numSpecies; ionNum++) {
				double oxidationState = entry.getIon(ionNum).getOxidationState();
				int intValue = (int) Math.round(oxidationState);
				if (Math.abs(oxidationState - intValue) > 1E-2) {continue;}
				returnValue = Math.max(intValue, returnValue);
			}
		}
		return returnValue;
	}
	
	public int numEntries() {
		return m_Entries.size();
	}
	
	public Entry getEntry(int entryNum) {
		return m_Entries.get(entryNum);
	}
	

	public void writeLikelihoods(LikelihoodCalculator calculator, String fileName) {
		
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(fileName));
			for (int entryNum = 0; entryNum < this.numEntries(); entryNum++) {
				Entry entry = this.getEntry(entryNum);
				double value = calculator.optimizeLikelihood(entry.getAllIons()).getMaxLikelihood();
				String outputString = entry.getID() + "\t" + entry.getComposition() + "\t" + value + "\t";
				for (int specNum = 0; specNum < entry.numIons(); specNum++) {
					outputString = outputString + entry.getIon(specNum) + ", ";
				}
				outputString = outputString + "\n";
				writer.write(outputString);
				//System.out.println(entry.getComposition() + ", " + value);
			}
			writer.flush();
			writer.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		} 
		
	}
	
	
	public class Entry {
		
		private String m_ID;
		private String m_Composition;
		private String[] m_MoleculeIDs;
		private double[] m_MoleculeWeights;
		private Ion[] m_Ions;
		private String[] m_Sources;
		private double m_EnergyAboveHull = Double.NaN;
		
		private Entry(String id, String composition, Ion[] ions, String[] sources, double energyAboveHull) {

			m_ID = id;
			m_Composition = composition;
			m_Ions = ions;
			m_Sources = sources;
			m_EnergyAboveHull = energyAboveHull;
			
			composition = removeSubrscript(composition);
			ArrayList<String> moleculeList = new ArrayList<String>();
			ArrayList<Double> moleculeWeightList = new ArrayList<Double>();
			
			int charIndex = 0;
			char character = composition.charAt(charIndex);
			while (charIndex < composition.length()) {
				String moleculeSymbol = "";
				String weightString = "";
				if (character == '(') {
					character = composition.charAt(++charIndex); // The "("
					while (character != ')') {
						moleculeSymbol = moleculeSymbol + character;
						character = composition.charAt(++charIndex);
					}
					character = composition.charAt(++charIndex); // The ")"
				} else {
					while (Character.isAlphabetic(character)) {
						moleculeSymbol = moleculeSymbol + character;
						character = composition.charAt(++charIndex);
					}
				}
				while (Character.isDigit(character)) {
					weightString = weightString + character;
					charIndex++;
					if (charIndex == composition.length()) {break;}
					character = composition.charAt(charIndex);
				}
				moleculeList.add(moleculeSymbol);
				moleculeWeightList.add(Double.parseDouble(weightString));				
			}
			
			m_MoleculeIDs = new String[moleculeList.size()];
			m_MoleculeWeights = new double[moleculeWeightList.size()];
			for (int moleculeNum = 0; moleculeNum < m_MoleculeIDs.length; moleculeNum++) {
				m_MoleculeIDs[moleculeNum] = moleculeList.get(moleculeNum);
				m_MoleculeWeights[moleculeNum] = moleculeWeightList.get(moleculeNum);
			}
		}
		
		// Adapted from https://stackoverflow.com/questions/8058768/superscript-in-java-string
		private static String removeSubrscript(String str) {
		    str = str.replaceAll("₀", "0");
		    str = str.replaceAll("₁", "1");
		    str = str.replaceAll("₂", "2");
		    str = str.replaceAll("₃", "3");
		    str = str.replaceAll("₄", "4");
		    str = str.replaceAll("₅", "5");
		    str = str.replaceAll("₆", "6");
		    str = str.replaceAll("₇", "7");
		    str = str.replaceAll("₈", "8");
		    str = str.replaceAll("₉", "9");
		    return str;
		}
		
		public double getEnergyAboveHull() {
			return m_EnergyAboveHull;
		}
		
		public String getID() {
			return m_ID;
		}
		
		public String getComposition() {
			return m_Composition;
		}
		
		public int numIons() {
			return m_Ions.length;
		}
		
		public Ion getIon(int specNum) {
			return m_Ions[specNum];
		}
		
		public Ion[] getAllIons() {
			return m_Ions.clone();
		}
		
		public void setIons(Ion[] ions) {
			m_Ions = ions.clone();
		}
		
		public String[] getAllSources() {
			return m_Sources.clone();
		}	
		
		public String[] getAllMoleculeIDs() {
			return m_MoleculeIDs.clone();
		}
		
		public double[] getAllElementWeights() {
			return m_MoleculeWeights.clone();
		}
				
	}

}
