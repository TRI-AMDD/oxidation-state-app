package tri.oxidationstates.fitting;
import matsci.engine.IContinuousFunctionState;
import tri.oxidationstates.calculator.LikelihoodCalculator;
import tri.oxidationstates.fitting.OxidationStateData.Entry;

public class ParamOptimizer {
	
	private OxidationStateData m_Data;
	private double m_RegularizationParameter = 1E-5;
	
	public ParamOptimizer(OxidationStateData data) {
		m_Data = data;
	}
	
	public void setRegularizationParameter(double value) {
		m_RegularizationParameter = value;
	}
	
	public double getRegularizationParamaeter() {
		return m_RegularizationParameter;
	}
	
	public OxidationStateData getData() {
		return m_Data;
	}
	
	public ParameterState getParameterState(LikelihoodCalculator calculator) {
		return new ParameterState(calculator);
	}
	
	public ParameterState getParameterState(String paramFileName) {
		LikelihoodCalculator calculator = new LikelihoodCalculator(paramFileName);
		return this.getParameterState(calculator);
	}
		
	public class ParameterState implements IContinuousFunctionState	{

		private LikelihoodCalculator m_Calculator;
		
		private ParameterState(LikelihoodCalculator calculator) {
			m_Calculator = calculator;
		}		
		
		private ParameterState(ParameterState oldState, double[] newParameters) {
			this(oldState.m_Calculator.setParameters(newParameters));
		}
		
		@Override
		public int numParameters() {
			return m_Calculator.numParameters();
		}

		@Override
		public double[] getUnboundedParameters(double[] template) {
			
			return m_Calculator.getParameters(template);
		}

		@Override
		public double[] getGradient(double[] template) {

			double[] parameters = m_Calculator.getParameters(null);
			double[] returnArray = (template != null) ? template : new double[parameters.length];
			
			LikelihoodCalculator origCalculator = m_Calculator;
			double delta = 1E-5;
			for (int paramNum = 0; paramNum < returnArray.length; paramNum++) {
				double oldParam = parameters[paramNum];
				parameters[paramNum] = oldParam + delta;
				m_Calculator = m_Calculator.setParameters(parameters);
				double plusValue = this.getValue();
				parameters[paramNum] = oldParam - delta;
				m_Calculator = m_Calculator.setParameters(parameters);
				double minusValue = this.getValue();
				parameters[paramNum] = oldParam;
				m_Calculator = origCalculator;
				returnArray[paramNum] = (plusValue - minusValue) / (2 * delta);
			}
			
			return returnArray;
		}
		
		@Override
		public IContinuousFunctionState setUnboundedParameters(double[] parameters) {
			
			return new ParameterState(this, parameters);
			
		}

		@Override
		public double getValue() {
			
			double score = 0;
			for (int entryNum = 0; entryNum < m_Data.numEntries(); entryNum++) {
				Entry entry = m_Data.getEntry(entryNum);
				//score += Math.log(1 + m_Calculator.optimizeLikelihood(entry).getMaxLikelihood());
				score += Math.log(m_Calculator.optimizeLikelihood(entry).getMaxLikelihood());
			}

			// Let's do log odds.
			/*double likelihood = Math.exp(logLikelihood);
			double odds = likelihood / (1 - likelihood);

			// The negative sign because optimization engines try to minimize stuff
			return -Math.log(odds) / m_Data.numEntries();*/
			
			// The negative sign because optimization engines try to minimize stuff
			//double regularizer = 0; //this.getRegularizationTerm();
			double regularizer = m_Calculator.getSumOfSpreads() * m_RegularizationParameter;
			//return -score / m_Data.numEntries() + Math.log(2) + regularizer;
			return -score / m_Data.numEntries() + regularizer;
		}
		
		public LikelihoodCalculator getCalculator() {
			return m_Calculator;
		}

	}
}
