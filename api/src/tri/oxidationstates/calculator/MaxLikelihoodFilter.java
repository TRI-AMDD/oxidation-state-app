package tri.oxidationstates.calculator;

import matsci.util.arrays.ArrayIndexer.Filter;
import matsci.util.arrays.ArrayUtils;
import tri.oxidationstates.calculator.LikelihoodCalculator.PotentialOptimizer;
import tri.oxidationstates.ion.IonFactory.Ion;

public class MaxLikelihoodFilter implements Filter {
	
	private LikelihoodCalculator m_Evaluator;
	private Ion[][] m_AllowedIons;
	private double m_MaxKnownLikelihood = 0;
	private double m_LastValidLikelihood = 0;
	private double m_LastValidFermiLevel = Double.NaN;

	public MaxLikelihoodFilter(LikelihoodCalculator calculator, Ion[][] allowedIons) {
		m_Evaluator = calculator;
		m_AllowedIons = (Ion[][]) ArrayUtils.copyArray(allowedIons);
	}
	
	public void setMaxKnownLikelihood(double value) {
		m_MaxKnownLikelihood = value; 
	}
	
	public double getMaxKnownLikelihood() {
		return m_MaxKnownLikelihood;
	}
	
	public double getLastValidLikelihood() {
		return m_LastValidLikelihood;
	}
	
	public double getLastValidFermiLevel() {
		return m_LastValidFermiLevel;
	}
	
	@Override
	public int getBranchIndex(int[] currentState) {

		double likelihood = 1;
		PotentialOptimizer optiimzer = null;
		for (int numIons = 2; numIons <= currentState.length; numIons++) {
		//for (int numSpecies = currentState.length; numSpecies <= currentState.length; numSpecies++) {
			Ion[] ions = new Ion[numIons];
			for (int ionNum = 0; ionNum < ions.length; ionNum++) {
				int stateIndex = currentState.length - ionNum - 1;
				int speciesIndex = currentState[stateIndex];
				ions[ionNum] = m_AllowedIons[stateIndex][speciesIndex];
			}
			optiimzer = m_Evaluator.optimizeLikelihood(ions);
			
			if (optiimzer.getMaxLikelihood() < m_MaxKnownLikelihood) {
				return currentState.length - numIons;
			}
		}
		
		m_LastValidLikelihood = optiimzer.getMaxLikelihood();
		m_LastValidFermiLevel = optiimzer.getOptimalFermiLevel();
		return -1;
		
	}

}
