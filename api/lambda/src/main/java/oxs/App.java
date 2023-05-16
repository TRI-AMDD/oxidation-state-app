package oxs.lambda;

import java.util.Base64;
import java.util.HashMap;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPResponse;
import oxs.helper.Request;
import oxs.helper.OxsHelper;

/**
 * A Sample request handler for HTTP APIs using the standard RequestHandler
 * input method
 * Payload v2.0
 * 
 * @author georgmao
 *
 */
public class App implements RequestHandler<APIGatewayV2HTTPEvent, APIGatewayV2HTTPResponse> {
	Gson gson = new GsonBuilder().setPrettyPrinting().create();

	@Override

	public APIGatewayV2HTTPResponse handleRequest(APIGatewayV2HTTPEvent event, Context context) {

		LambdaLogger logger = context.getLogger();
		logger.log("EVENT TYPE: " + event.getClass().toString());

		APIGatewayV2HTTPResponse response = new APIGatewayV2HTTPResponse();
		response.setIsBase64Encoded(false);
		response.setStatusCode(200);

		HashMap<String, String> headers = new HashMap<String, String>();

		String body = event.getBody() != null ? event.getBody() : "Empty body";
		String compositionReq = body;
		
		logger.log("EVENT IS ENCODED: " + event.getIsBase64Encoded());
		if (event.getIsBase64Encoded()) {
			byte[] decodedBytes = Base64.getDecoder().decode(body);
			compositionReq = new String(decodedBytes);
		}
		
		logger.log("REQUEST: " + compositionReq);
		Request req = gson.fromJson(compositionReq, Request.class);
		OxsHelper oxsHelper = new OxsHelper();
		String result = oxsHelper.GetOxidationJSON(req);

		headers.put("Content-Type", "text/json");
		response.setHeaders(headers);
		response.setBody(result);

		return response;
	}
}