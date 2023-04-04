package tri.oxidationstates.ion;

import java.io.File;
import java.util.HashMap;
import java.util.HashSet;

import matsci.Element;
import matsci.Species;
import matsci.io.vasp.POSCAR;
import matsci.location.Vector;
import matsci.location.basis.CartesianBasis;
import matsci.location.basis.LinearBasis;
import matsci.structure.IStructureData;
import matsci.structure.Structure;
import matsci.structure.StructureBuilder;

public class IonFactory {
	
	private static HashMap<String, Structure> KNOWN_STRUCTURES = new HashMap<String, Structure>();
	private static HashMap<String, Ion> KNOWN_IONS = new HashMap<String, Ion>();
	private static double OXIDATION_TOLERANCE = 0.001;
	
	// Initialize with known elements
	static {
		for (int atomicNumber = 1; atomicNumber <= Element.numKnownElements(); atomicNumber++) {
			Element element = Element.getElement(atomicNumber);
			StructureBuilder builder = new StructureBuilder();
			builder.setDescription(element.getSymbol());
			builder.setCellVectors(LinearBasis.fill3DBasis(new Vector[0]));
			builder.setVectorPeriodicity(new boolean[] {false, false, false});
			builder.addSite(CartesianBasis.getInstance().getOrigin(), Species.get(element));
			KNOWN_STRUCTURES.put(element.getSymbol(), new Structure(builder));
		}	
	}
	
	public static boolean addSubStructure(String symbol, IStructureData structureData) {
		
		if (KNOWN_STRUCTURES.containsKey(symbol)) {return false;}
		Structure structure = new Structure(structureData);
		structure.setDescription(symbol);
		KNOWN_STRUCTURES.put(symbol, structure);
		return true;
		
	}
	
	public static Structure getStructure(String key) {
		return KNOWN_STRUCTURES.get(key);
	}
	
	public static Ion get(String symbol) {
		
		Ion returnIon = KNOWN_IONS.get(symbol);
		if (returnIon != null) {return returnIon;}
		
		String structureSymbol = getStructureSymbol(symbol);
		if (!KNOWN_STRUCTURES.containsKey(structureSymbol)) {return null;}
		
		double oxidationState = getOxidationState(symbol);
		
    	returnIon = new Ion(structureSymbol, oxidationState);
    	KNOWN_IONS.put(returnIon.getSymbol(), returnIon);
    	return returnIon;
	}
	
	public static Ion get(Species species) {
		return get(species.getElementSymbol(), species.getOxidationState());
	}
	
	public static Ion get(Element element, double oxidationState) {
		return get(element.getSymbol(), oxidationState);
	}
	
	public static Ion get(String structureSymbol, double oxidationState) {
		
		if (!KNOWN_STRUCTURES.containsKey(structureSymbol)) {return null;}
		
		String symbol = getIonSymbol(structureSymbol, oxidationState);
		Ion ion = KNOWN_IONS.get(symbol);
		if (ion == null) {
			ion = new Ion(structureSymbol, oxidationState);
			KNOWN_IONS.put(ion.getSymbol(), ion);
		}
		return ion;
	}
		
	public static String getIonSymbol(String structureSymbol, double oxidationState) {
		Structure structure = KNOWN_STRUCTURES.get(structureSymbol);
		if (structure == null) {
			return null;
		}
		if (structure.numDefiningSites() > 1) {
			return "(" + structureSymbol.trim() + ")" + getOxidationString(oxidationState);
		}
		return structureSymbol.trim() + getOxidationString(oxidationState);
	}
	
	protected static boolean oxidationCloseEnough(double oxidation1, double oxidation2) {
		double diff = Math.abs(oxidation1 - oxidation2);
	    return diff < OXIDATION_TOLERANCE;
	}
	
	public static String getStructureSymbol(String ionSymbol) {
		if (ionSymbol.contains("(")) {
			int start = ionSymbol.indexOf("(");
			int end = ionSymbol.indexOf(")");
			return ionSymbol.substring(start + 1, end).trim();
		} 
		int start = 0;
		int end = 0;
		while (end < ionSymbol.length() && Character.isLetter(ionSymbol.charAt(end))) {
			end++;
		}
		return ionSymbol.substring(start, end).trim();
	}
	
	public static double getOxidationState(String ionSymbol) {
	    String endString = ionSymbol.substring(ionSymbol.length() - 1);
	    double sign = (endString.equals("+") ? 1 : (endString.equals("-") ? -1 : 0));
	    if (sign == 0) {return 0;};
	    
	    int start = ionSymbol.indexOf(")") + 1;
	    if (start == 0) {
	    	while (Character.isLetter(ionSymbol.charAt(start))) {
	    		start++;
	    	}
	    }
	    String stateString = ionSymbol.substring(start, ionSymbol.length() - 1).trim();
	    double magnitude = stateString.length() == 0 ? 1 : Double.parseDouble(stateString);
	    return sign * magnitude;
	}
  
	public static String getOxidationString(double oxidationState) {
	    if (oxidationState == 0) {return "";}
	    double absValue = Math.abs(oxidationState);
	    boolean isPositive = (oxidationState > 0);
	    int intState = (int) Math.round(absValue);
	    if (oxidationCloseEnough(intState, absValue)) {
	      return isPositive ? intState + "+" : intState + "-";
	    }
	    return isPositive ? absValue + "+" : absValue + "-";
	}
	

	public static HashMap<String, Structure> loadKnownMolecules(String moleculeDir) {
		
		HashMap<String, Structure> returnMap = new HashMap<String, Structure>();
		//String moleculeDir = ROOT_DIR + "/Molecules/";
		File[] moleculeFiles = new File(moleculeDir).listFiles();
		for (File file : moleculeFiles) {
			/*String fileName = file.getName();
			String symbol = fileName.substring(0, fileName.length() - 5);
			POSCAR infile = new POSCAR(file.getAbsolutePath());*/
			//infile.writeFile(file.getAbsolutePath());
			/*Element[] elements = new Element[infile.numDefiningSites()];
			Coordinates[] coordinates = new Coordinates[elements.length];
			for (int siteNum = 0; siteNum < infile.numDefiningSites(); siteNum++) {
				elements[siteNum] = infile.getSiteSpecies(siteNum).getElement();
				coordinates[siteNum] = infile.getSiteCoords(siteNum);
			}
			Molecule.put(elements, coordinates, symbol);*/
			//Molecule.put(infile, symbol);
			int dotIndex = file.getName().lastIndexOf(".");
			String moleculeID = file.getName().substring(0, dotIndex);
			Structure molecule = loadIonStructureFromFile(file.getAbsolutePath());
			if (addSubStructure(moleculeID, molecule)) {
				returnMap.put(moleculeID, molecule);
			}
		}
		return returnMap;		
	}
	
	public static Structure loadIonStructureFromFile(String path) {
		POSCAR infile = new POSCAR(path);
		String description = infile.getDescription();
		String periodicityString = description.split(" ")[0];
		String[] periodicity = periodicityString.split("_");
		for (int dimNum = 0; dimNum < periodicity.length; dimNum++) {
			infile.setVectorPeriodicity(dimNum, periodicity[dimNum].toLowerCase().equals("t"));
		}
		return new Structure(infile);
	}

	public static class Ion {

		//private Molecule m_Molecule;
		private Structure m_Structure;
		private String m_StructureSymbol;
		private String m_Symbol;
		private double m_OxidationState;
		
		private Ion(String structureSymbol, double oxidationState) {
			m_Structure = IonFactory.getStructure(structureSymbol);
			m_StructureSymbol = structureSymbol;
			m_Symbol = IonFactory.getIonSymbol(structureSymbol, oxidationState);
			m_OxidationState = oxidationState;
		}
		
		public Structure getStructure() {
			return m_Structure;
		}
		
		public double getOxidationState() {
			return m_OxidationState;
		}
		
		public String getStructureSymbol() {
			return m_StructureSymbol;
		}
		
		public String getSymbol() {
			return m_Symbol;
		}
		
		public String toString() {
			return this.getSymbol();
		}
	}

}
