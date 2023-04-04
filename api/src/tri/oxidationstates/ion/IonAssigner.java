package tri.oxidationstates.ion;

import java.util.ArrayList;

import matsci.Element;
import matsci.Species;
import matsci.io.app.log.Status;
import matsci.potential.oxidation.OxidationAnalyzer;
import matsci.structure.Structure;
import matsci.util.arrays.ArrayUtils;
import tri.oxidationstates.calculator.LikelihoodCalculator;
import tri.oxidationstates.calculator.LikelihoodCalculator.OxidationStateSet;
import tri.oxidationstates.ion.IonFactory.Ion;

public class IonAssigner {
	
	private Structure m_Structure;
	private OxidationStateSet m_StateSet;
	
	private OxidationAnalyzer m_OxidationAnalyzer;
	
	public IonAssigner(Structure structure, LikelihoodCalculator.OxidationStateSet stateSet) {
		m_Structure = structure;
		m_StateSet = stateSet;
		
		m_OxidationAnalyzer = new OxidationAnalyzer(structure);
		this.assignOxidationStates();
	}
	
	// TODO make this work with molecules
	private void assignOxidationStates() {

		double[] bvSums = m_OxidationAnalyzer.getBondValenceStates();
		int[] bvMap = ArrayUtils.getSortPermutation(bvSums);
		
		Element[] elements = m_Structure.getDistinctElements();
		Ion[] ions = m_StateSet.getIons();
		
		for (Element element : elements) {
			ArrayList<Ion> matchingIons = new ArrayList<Ion>();
			for (Ion ion : ions) {
				if (ion.getStructureSymbol().equals(element.getSymbol())) {
					matchingIons.add(ion);
				}
			}
			
			if (matchingIons.size() == 1) {
				Species species = Species.get(element).setOxidationState(matchingIons.get(0).getOxidationState());
				for (int siteIndex = 0; siteIndex < m_Structure.numDefiningSites(); siteIndex++) {
					if (m_Structure.getSiteSpecies(siteIndex).getElement() == element) {
						m_Structure.getDefiningSite(siteIndex).setSpecies(species);
					}
				}
				continue;
			}
			
			double[] weights = new double[matchingIons.size()];
			double[] oxidationStates = new double[matchingIons.size()];
			double totalWeight = 0;
			for (int ionNum = 0; ionNum < matchingIons.size(); ionNum++) {
				Ion ion = matchingIons.get(ionNum);
				weights[ionNum] = m_StateSet.getWeight(ion);
				oxidationStates[ionNum] = ion.getOxidationState();
				totalWeight += weights[ionNum];
			}
			
			int[] stateMap = ArrayUtils.getSortPermutation(oxidationStates);
			double weightPerAtom = totalWeight / m_Structure.numDefiningSitesWithElement(element);
			
			for (int ionNum = 0; ionNum < oxidationStates.length; ionNum++) {
				double numAtomsPerIon = weights[ionNum] / weightPerAtom;
				if (Math.abs(numAtomsPerIon - Math.round(numAtomsPerIon)) > 0.1) {
					Status.warning("Non-integer number of ions per unit cell");
				}
			}
			
			int ionNum = 0;
			for (int siteNum = 0; siteNum < bvMap.length; siteNum++) {
				int siteIndex = bvMap[siteNum];
				if (m_Structure.getSiteSpecies(siteIndex).getElement() != element) {continue;}
				double remainingWeight = weights[stateMap[ionNum]];
				while (remainingWeight < 0.5) {
					weights[stateMap[ionNum]] -= remainingWeight;
					ionNum++;
					weights[stateMap[ionNum]] += remainingWeight;
					remainingWeight = weights[stateMap[ionNum]];
				}
				
				weights[stateMap[ionNum]] -= weightPerAtom;
				Species species = Species.get(element).setOxidationState(oxidationStates[stateMap[ionNum]]);
				m_Structure.getDefiningSite(siteIndex).setSpecies(species);
			}
			
		}
			
	}
	
	public OxidationAnalyzer getAnalyzer() {
		return m_OxidationAnalyzer;
	}
	
	public boolean equivalentIonsHaveSameState() {
		
		double tolerance = 1E-2;
		double[] bvSums = m_OxidationAnalyzer.getBondValenceStates();
		int[] map = ArrayUtils.getSortPermutation(bvSums);
		
		for (int siteNum = 1; siteNum < map.length; siteNum++) {
			double delta = Math.abs(bvSums[map[siteNum]] - bvSums[map[siteNum - 1]]);
			if (delta > tolerance) {continue;}
			Species spec1 = m_Structure.getSiteSpecies(map[siteNum - 1]);
			Species spec2 = m_Structure.getSiteSpecies(map[siteNum]);
			if (spec1.getElement() != spec2.getElement()) {continue;}
			if (spec1.getOxidationState() != spec2.getOxidationState()) {return false;}
		}
		
		return true;
		
	}

}
