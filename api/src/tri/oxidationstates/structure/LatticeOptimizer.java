package tri.oxidationstates.structure;

import matsci.engine.IContinuousFunctionState;
import matsci.location.Vector;
import matsci.location.basis.CartesianBasis;
import matsci.structure.BravaisLattice;
import tri.structure.mapper.GeneralStructureMapper;

public class LatticeOptimizer implements IContinuousFunctionState {
	
	private BravaisLattice[] m_TargetLattices;
	private int m_NumPeriodicDimensions;
	private double[] m_Parameters;
	
	private LatticeOptimizer(LatticeOptimizer oldOptimizer, double[] newParameters) {
		m_TargetLattices = oldOptimizer.m_TargetLattices;
		m_NumPeriodicDimensions = oldOptimizer.m_NumPeriodicDimensions;
		m_Parameters = newParameters;
	}
	
	public LatticeOptimizer(BravaisLattice[] targetLattices) {
		m_TargetLattices = targetLattices.clone();
		m_NumPeriodicDimensions = targetLattices[0].numPeriodicVectors();
		m_Parameters = new double[m_NumPeriodicDimensions * 3];
		
		// Initial guess of the parameters
		BravaisLattice lattice = targetLattices[0];
		Vector[] periodicVectors = lattice.getPeriodicVectors();
		int paramNum = 0;
		for (Vector vector : periodicVectors) {
			double[] coordArray = vector.getDirectionArray(CartesianBasis.getInstance());
			for (double value : coordArray) {
				m_Parameters[paramNum++] = value; // Make the parameters unbounded
			}
		}
	}

	@Override
	public int numParameters() {
		return m_Parameters.length;
	}

	@Override
	public double[] getUnboundedParameters(double[] template) {
		return m_Parameters.clone();
	}

	@Override
	public double[] getGradient(double[] template) {
		double[] returnArray = (template == null) ? new double[this.numParameters()] : template;
		double increment = 1E-5;
		double[] parameters = m_Parameters.clone();
		double baseValue = this.getValue();
		for (int paramNum = 0; paramNum < template.length; paramNum++) {
			double param = parameters[paramNum];
			parameters[paramNum] = param + increment;
			double plusValue = this.setUnboundedParameters(parameters).getValue();
			parameters[paramNum] = param - increment;
			double minusValue = this.setUnboundedParameters(parameters).getValue();
			returnArray[paramNum] = (plusValue - minusValue) / (2 * increment);
			System.out.println(returnArray[paramNum] + ", " + minusValue + ", " + baseValue + ", " + plusValue);
			parameters[paramNum] = param;
		}
		
		double[] nextParams = new double[parameters.length];
		for (int paramNum = 0; paramNum < template.length; paramNum++) {
			double param = parameters[paramNum];
			nextParams[paramNum] = param - increment * returnArray[paramNum];
		}
		double nextValue = this.setUnboundedParameters(nextParams).getValue();
		System.out.println("Improvement: " + (baseValue - nextValue));
		
		return returnArray;
	}

	@Override
	public IContinuousFunctionState setUnboundedParameters(double[] parameters) {
		for (double value : parameters) {
			if (Double.isNaN(value)) {
				System.currentTimeMillis();
			}
		}
		return new LatticeOptimizer(this, parameters);
	}

	@Override
	public double getValue() {
		Vector[] tempVectors = new Vector[] {
				new Vector(new double[] {2.8277125638551,2.8277125638551,5.4537696826067}, CartesianBasis.getInstance()),
				new Vector(new double[] {0,-5.65542512771021,0}, CartesianBasis.getInstance()),
				new Vector(new double[] {-5.65542512771021,0,0}, CartesianBasis.getInstance()),
		};
		BravaisLattice tempLattice = new BravaisLattice(tempVectors);
		double tempTotalSkewFactor = 0;
		for (BravaisLattice knownLattice : m_TargetLattices) {
			double skewFactor = GeneralStructureMapper.getSkewFactor(knownLattice, tempLattice);
			tempTotalSkewFactor += skewFactor * skewFactor; // It's important to square this to hit the middle; otherwise multiple values are equally likely
		}
		double tempScore = tempTotalSkewFactor / m_TargetLattices.length;

		BravaisLattice lattice = this.getLattice();
		double totalSkewFactor = 0;
		for (BravaisLattice knownLattice : m_TargetLattices) {
			double skewFactor = GeneralStructureMapper.getSkewFactor(knownLattice, lattice);
			totalSkewFactor += skewFactor * skewFactor; // It's important to square this to hit the middle; otherwise multiple values are equally likely
		}
		return totalSkewFactor / m_TargetLattices.length;
	}
	
	public BravaisLattice getLattice() {
		
		Vector[] cellVectors = new Vector[m_Parameters.length / 3];
		int paramNum = 0;
		for (int vecNum = 0; vecNum < cellVectors.length; vecNum++) {
			double[] direction = new double[3];
			for (int dimNum = 0; dimNum < direction.length; dimNum++) {
				direction[dimNum] = m_Parameters[paramNum++];
			}
			cellVectors[vecNum] = new Vector(direction, CartesianBasis.getInstance());
		}
		return new BravaisLattice(cellVectors);
		
	}
	
}
