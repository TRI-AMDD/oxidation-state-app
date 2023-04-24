package oxs;

import java.util.HashMap;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPResponse;

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
		    
		    APIGatewayV2HTTPResponse response = new APIGatewayV2HTTPResponse();
		    response.setIsBase64Encoded(false);
		    response.setStatusCode(200);
	
		    HashMap<String, String> headers = new HashMap<String, String>();
		    headers.put("Content-Type", "text/html");
		    response.setHeaders(headers);
		    response.setBody("<!DOCTYPE html><html><head><title>AWS Lambda sample</title></head><body>"+
		      "<h1>Welcome</h1><p>Page generated by a Lambda function.</p>" +
		      "</body></html>");
		    
		    return response;		    
	  }
}