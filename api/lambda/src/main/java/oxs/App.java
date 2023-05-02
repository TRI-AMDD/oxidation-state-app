package oxs.lambda;

import java.util.HashMap;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPResponse;
import demo.die.Die;
import java.util.Map;

/**
 * A Sample request handler for HTTP APIs using the standard RequestHandler input method 
 * Payload v2.0
 * @author georgmao
 *
 */
public class App implements RequestHandler<Map<String,String>, APIGatewayV2HTTPResponse>{
	  Gson gson = new GsonBuilder().setPrettyPrinting().create();
	  
	  @Override
	  
	  public APIGatewayV2HTTPResponse handleRequest(Map<String,String> event, Context context)
	  {

		    LambdaLogger logger = context.getLogger();
			logger.log("EVENT TYPE: " + event.getClass().toString());
		    
		    APIGatewayV2HTTPResponse response = new APIGatewayV2HTTPResponse();
		    response.setIsBase64Encoded(false);
		    response.setStatusCode(200);
	
		    HashMap<String, String> headers = new HashMap<String, String>();

			var num = Integer.parseInt(event.get("num"));
			Die die = new Die(num);
            int roll = die.roll();

		    headers.put("Content-Type", "text/plain");
		    response.setHeaders(headers);
			response.setBody("Hello " + event.get("name") + " : " + roll);

		    return response;		    
	  }
}