package oxs.lambda;

import oxs.lambda.Request;
import java.util.HashMap;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPResponse;
import tri.oxidationstates.webapi.TableRow;
import tri.oxidationstates.webapi.WebOxidationAnalyzer;


/**
 * A Sample request handler for HTTP APIs using the standard RequestHandler input method 
 * Payload v2.0
 * @author georgmao
 *
 */
public class App implements RequestHandler<APIGatewayV2HTTPEvent, APIGatewayV2HTTPResponse>{
	  Gson gson = new GsonBuilder().setPrettyPrinting().create();
	  
	  @Override
	  
	  public APIGatewayV2HTTPResponse handleRequest(APIGatewayV2HTTPEvent event, Context context)
	  {

		    LambdaLogger logger = context.getLogger();
			logger.log("EVENT TYPE: " + event.getClass().toString());
		    
		    APIGatewayV2HTTPResponse response = new APIGatewayV2HTTPResponse();
		    response.setIsBase64Encoded(false);
		    response.setStatusCode(200);
	
		    HashMap<String, String> headers = new HashMap<String, String>();

			String body = event.getBody() != null ? event.getBody() : "Empty body";
			Request request = gson.fromJson(body, Request.class);

			String paramFileName = "input_files/oxidation_parameters.txt";
            String polyIonDir = "input_files/polyatomic_ions_web";
            
            WebOxidationAnalyzer analyzer = new WebOxidationAnalyzer(paramFileName, polyIonDir);

		    headers.put("Content-Type", "text/json");
		    response.setHeaders(headers);
			response.setBody(analyzer.getTableData(request.composition));

		    return response;		    
	  }
}