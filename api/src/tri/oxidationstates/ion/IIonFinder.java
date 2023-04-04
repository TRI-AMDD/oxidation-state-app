package tri.oxidationstates.ion;

import matsci.structure.Structure;

public interface IIonFinder {
	
	public int numFoundIons();
	public Structure getFoundIon(int ionNum);

}
