/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package oxs.helper;

import java.util.Random;
import oxs.helper.Request;
import tri.oxidationstates.webapi.TableData;
import tri.oxidationstates.webapi.WebOxidationAnalyzer;

/**
 * Models a playing die with sides numbered 1 to N.
 * All sides have uniform probablity of being rolled.
 */
public class OxsHelper
{
    /**
     * Default constructor.<p>
     */
    public OxsHelper()
    {
    }


    /**
     * Get a json string using the oxidation library
     */
    
    public String GetOxidationJSON(Request request)
    {   
        String paramFileName = "input_files/oxidation_parameters.txt";
        String polyIonDir = "input_files/polyatomic_ions_web";
        String result = "";
        
        if (request.composition != "") {
            WebOxidationAnalyzer analyzer = new WebOxidationAnalyzer(paramFileName, polyIonDir);
            TableData tableData = analyzer.getTableDataFromComposition(request.composition);
            result = tableData.toJSON();            
        } else if (request.structure != "") {
            WebOxidationAnalyzer analyzer = new WebOxidationAnalyzer(paramFileName, polyIonDir);
            TableData tableData = analyzer.getTableDataFromStructure(request.structure);
            result = tableData.toJSON();
        }
        return result;
    }
}// end of OxsHelper class