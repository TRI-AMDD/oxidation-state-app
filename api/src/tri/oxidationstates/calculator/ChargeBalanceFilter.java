package tri.oxidationstates.calculator;

import matsci.util.arrays.ArrayIndexer.Filter;
import matsci.util.arrays.ArrayUtils;
import tri.oxidationstates.ion.IonFactory.Ion;

public class ChargeBalanceFilter implements Filter {
	
	private Ion[][] m_AllowedIons;
	private double[] m_Weights;

    // If the total charge, starting from the end, is outside these bounds then it cannot be charge balanced
    private double[] m_MinAllowedCharges;
    private double[] m_MaxAllowedCharges;
    
    private double m_NonSigmaCharge;
    
    public ChargeBalanceFilter(Ion[][] allAllowedIons, double[] weights) {
    	
    	m_AllowedIons = (Ion[][]) ArrayUtils.copyArray(allAllowedIons);
    	m_Weights = weights.clone();
      
    	m_MinAllowedCharges = new double[allAllowedIons.length];
      	m_MaxAllowedCharges= new double[allAllowedIons.length];
      
      	double tolerance = 1E-2; // TOOD consider making this flexible
      
      	double maxAllowedCharge = tolerance;
      	double minAllowedCharge = -tolerance;
      	for (int moleculeNum = 0; moleculeNum < m_MinAllowedCharges.length; moleculeNum++) {
      		m_MinAllowedCharges[moleculeNum] = minAllowedCharge;
      		m_MaxAllowedCharges[moleculeNum] = maxAllowedCharge;
      		double minForSite = Double.POSITIVE_INFINITY;
      		double maxForSite = Double.NEGATIVE_INFINITY;
      		Ion[] allowedIons = m_AllowedIons[moleculeNum];
      		for (int specNum = 0; specNum < allowedIons.length; specNum++) {
      			double oxidationState = allowedIons[specNum].getOxidationState();
      			minForSite = Math.min(minForSite, oxidationState * weights[moleculeNum]);
      			maxForSite = Math.max(maxForSite, oxidationState * weights[moleculeNum]);
      		}
      		maxAllowedCharge -= minForSite;
      		minAllowedCharge -= maxForSite;
      	}
    }

    public int getBranchIndex(int[] currentState) {

      double totalCharge = m_NonSigmaCharge;
      double minDeltaCharge = 0; // To account for mixed valence
      for (int moleculeIndex = currentState.length - 1; moleculeIndex >= 0; moleculeIndex--) {
    	  int stateIndex = currentState[moleculeIndex];
    	  double charge = m_AllowedIons[moleculeIndex][stateIndex].getOxidationState();
    	  totalCharge += charge * m_Weights[moleculeIndex];
    	  if (stateIndex > 0) {
    		  //double prevCharge = m_AllowedIons[moleculeIndex][stateIndex - 1].getOxidationState();
    		  double prevCharge = m_AllowedIons[moleculeIndex][0].getOxidationState();
    		  double deltaCharge = (prevCharge - charge) * m_Weights[moleculeIndex];
    		  minDeltaCharge = Math.min(minDeltaCharge, deltaCharge);
    	  }
    	  if (totalCharge < m_MinAllowedCharges[moleculeIndex]) {
    		  return moleculeIndex;
    	  }
    	  if (totalCharge + minDeltaCharge > m_MaxAllowedCharges[moleculeIndex]) {
    		  return moleculeIndex;
    	  }
      }
      return -1;
    }
 
}
