package tri.oxidationstates.structure;

import matsci.engine.IContinuousFunctionState;
import matsci.location.Coordinates;
import matsci.location.basis.CartesianBasis;
import matsci.structure.Structure;
import matsci.structure.StructureBuilder; 

public class StructureOptimizer implements IContinuousFunctionState {
	
	private Structure[] m_TargetStructures;
	private double[] m_Parameters;
	
	private StructureOptimizer(StructureOptimizer oldOptimizer, double[] newParameters) {
		m_TargetStructures = oldOptimizer.m_TargetStructures;
		m_Parameters = newParameters;
	}
	
	// TODO this should call the lattice optimizer
	public StructureOptimizer(Structure[] targetStructures) {
		m_TargetStructures = targetStructures.clone();
		m_Parameters = new double[targetStructures[0].numDefiningSites() * 3];
		
		// Initial guess of the parameters
		Structure structure = targetStructures[0];
		int paramNum = 0;
		for (int siteNum = 0; siteNum < structure.numDefiningSites(); siteNum++) {
			double[] coordArray = structure.getSiteCoords(siteNum).getCoordArray(CartesianBasis.getInstance());
			for (double value : coordArray) {
				m_Parameters[paramNum++] = value; 
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
		for (int paramNum = 0; paramNum < template.length; paramNum++) {
			double param = parameters[paramNum];
			parameters[paramNum] = param + increment;
			double plusValue = this.setUnboundedParameters(parameters).getValue();
			parameters[paramNum] = param - increment;
			double minusValue = this.setUnboundedParameters(parameters).getValue();
			returnArray[paramNum] = (plusValue - minusValue) / (2 * increment);
		}
		return returnArray;
	}

	@Override
	public IContinuousFunctionState setUnboundedParameters(double[] parameters) {
		return new StructureOptimizer(this, parameters);
	}
	
	public double getDistanceError(Structure structure1, Structure structure2) {
			
		double returnValue = 0;
		int numPairs = 0;
		for (int siteNum = 0; siteNum < structure1.numDefiningSites(); siteNum++) {
			Coordinates site1Coords = structure1.getSiteCoords(siteNum);
			Coordinates site2Coords = structure2.getSiteCoords(siteNum);
			for (int siteNum2 = 0; siteNum2 < siteNum; siteNum2++) {
				double subDistance = structure1.getNearbySite(site1Coords, siteNum2).distanceFrom(site1Coords);
				double hostDistance = structure2.getNearbySite(site2Coords, siteNum2).distanceFrom(site2Coords);
				double ratio = hostDistance / subDistance;
				returnValue += Math.log(ratio) * Math.log(ratio);
				numPairs++;
			}
		}
		return returnValue / numPairs;
	}

	@Override
	public double getValue() {
		Structure structure = this.getStructure();
		
		double returnValue = 0;
		for (Structure structure2 : m_TargetStructures) {
			returnValue += this.getDistanceError(structure, structure2);
		}
		
		return returnValue / m_TargetStructures.length;
	}
	
	public Structure getStructure() {
		
		StructureBuilder builder = new StructureBuilder(m_TargetStructures[0]);
		
		int paramNum = 0;
		for (int siteNum = 0; siteNum < builder.numDefiningSites(); siteNum++) {
			double[] coordArray = new double[3];
			for (int dimNum = 0; dimNum < coordArray.length; dimNum++) {
				coordArray[dimNum] = m_Parameters[paramNum++];
			}
			Coordinates newCoords = new Coordinates(coordArray, CartesianBasis.getInstance());
			builder.setSiteCoordinates(siteNum, newCoords);
		}
		
		return new Structure(builder);
		
	}
	
}
