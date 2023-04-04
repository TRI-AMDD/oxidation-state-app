package tri.oxidationstates.ion;

import java.util.ArrayList;

import matsci.Element;
import matsci.Species;
import matsci.location.Coordinates;
import matsci.location.Vector;
import matsci.location.basis.CartesianBasis;
import matsci.structure.BravaisLattice;
import matsci.structure.IStructureData;
import matsci.structure.Structure;
import matsci.structure.Structure.Site;
import matsci.util.arrays.ArrayUtils;

public class OxideIonFinder implements IIonFinder {
	
	private static Element[] CATION_ELEMENTS = new Element[] {
			Element.boron,
			Element.carbon,
			Element.nitrogen,
			Element.aluminum,
			Element.silicon,
			Element.phosphorus,
			Element.sulfur,
			Element.arsenic,
			Element.selenium,
			Element.chlorine,
			Element.bromine
	};
	
	private static double MAX_COVALENT_RADIUS = 0;
	static {
		for (Element element : CATION_ELEMENTS) {
			MAX_COVALENT_RADIUS = Math.max(MAX_COVALENT_RADIUS, element.getCovalentRadius());
		}
	}
	
	private Structure m_Structure;
	private ArrayList<Structure> m_FoundIons = new ArrayList<Structure>();
	
	public OxideIonFinder(Structure structure) {
		
		m_Structure = structure;
		this.findIons();
		
	}
	
	private void findIons() {
		
		Element[] knownElements = m_Structure.getDistinctElements();
		if (!ArrayUtils.arrayContains(knownElements, Element.oxygen)) {return;}
		
		boolean[] allowedSites = new boolean[m_Structure.numDefiningSites()];
		for (int siteNum = 0; siteNum < allowedSites.length; siteNum++) {
			Element element = m_Structure.getSiteSpecies(siteNum).getElement();
			allowedSites[siteNum] = ArrayUtils.arrayContains(CATION_ELEMENTS, element) || (element == Element.oxygen);
		}
		
		for (int siteNum = 0; siteNum < allowedSites.length; siteNum++) {
			if (!allowedSites[siteNum]) {continue;}
			Structure.Site site = m_Structure.getDefiningSite(siteNum);
			IonBuilder builder = new IonBuilder(site, allowedSites);
			if (builder.numDefiningSites() <= 1) {continue;}
			m_FoundIons.add(new Structure(builder));
		}
		
	}
	
	public int numFoundIons() {
		return m_FoundIons.size();
	}
	
	public Structure getFoundIon(int index) {
		return m_FoundIons.get(index);
	}
	
	private class IonBuilder implements IStructureData {
		
		private static double RADIUS_FACTOR = 1.1;
		
		private Site[] m_Sites = new Site[m_Structure.numDefiningSites()];
		private int m_NumSites = 0;
		private BravaisLattice m_Lattice = new BravaisLattice(new Vector[0]);
		
		private IonBuilder(Site initialSite, boolean[] allowedSites) {
			this.addSites(initialSite, allowedSites);
		}
		
		// Returns true if this site is added, false if it isn't
		private boolean addSites(Site currentSite, boolean[] allowedSites) {
			
			Site knownSite = m_Sites[currentSite.getIndex()];
			boolean isOxygen = (currentSite.getSpecies().getElement() == Element.oxygen);
			if (knownSite == null) {
				if (!allowedSites[currentSite.getIndex()]) {return false;}
				m_Sites[currentSite.getIndex()] = currentSite;
				m_NumSites++;
				allowedSites[currentSite.getIndex()] = false;
				double currRadius = currentSite.getSpecies().getElement().getCovalentRadius();
				double maxNeighborRadius = isOxygen ? MAX_COVALENT_RADIUS : Element.oxygen.getCovalentRadius();
				double searchDistance = RADIUS_FACTOR * (currRadius + maxNeighborRadius);
				Structure.Site[] neighbors = m_Structure.getNearbySites(currentSite.getCoords(), searchDistance, false);
				for (Site neighbor : neighbors) {
					Element neighborElement = neighbor.getSpecies().getElement();
					if ((isOxygen) == (neighborElement == Element.oxygen)) {continue;} 
					double neighborRadius = neighbor.getSpecies().getElement().getCovalentRadius();
					double maxAllowedDistance = RADIUS_FACTOR * (currRadius + neighborRadius);
					double distance = neighbor.distanceFrom(currentSite);
					if (distance <= maxAllowedDistance) {
						addSites(neighbor, allowedSites);
					}
				}
				return true;
			}
			
			Vector translation = new Vector(currentSite.getCoords(), knownSite.getCoords());
			Vector remainder = m_Lattice.removeLattice(translation);
			if (remainder.length() > CartesianBasis.getPrecision()) { // A new dimension to the lattice
				//double[] translationArray = translation.getDirectionArray(currentSite.getStructure().getDirectBasis());
				//System.out.println(translationArray[0] + ", " + translationArray[1] + ", " + translationArray[2]);

				Vector[] periodicVectors = m_Lattice.getPeriodicVectors();
				periodicVectors = (Vector[]) ArrayUtils.appendElement(periodicVectors, translation);
				m_Lattice = new BravaisLattice(periodicVectors);
			}
			return false;			
		}

		@Override
		public String getDescription() {
			return "";
		}

		@Override
		public Vector[] getCellVectors() {
			return m_Lattice.getCellVectors();
		}

		@Override
		public boolean[] getVectorPeriodicity() {
			return m_Lattice.getDimensionPeriodicity();
		}

		@Override
		public int numDefiningSites() {
			return m_NumSites;
		}

		@Override
		public Coordinates getSiteCoords(int index) {
			return this.getSite(index).getCoords();
		}

		@Override
		public Species getSiteSpecies(int index) {
			return this.getSite(index).getSpecies();
		}
		
		private Site getSite(int index) {
			
			int currIndex = 0;
			for (Site site : m_Sites) {
				if (site == null) {continue;}
				if (currIndex == index) {return site;}
				currIndex++;
			}
			return null;
		}
		
	}
	
}
