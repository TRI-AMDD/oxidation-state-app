package oxs.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import io.javalin.Javalin;
import io.javalin.http.servlet.JavalinServlet;
import java.util.concurrent.CountDownLatch;
import jakarta.servlet.http.HttpServletRequest;
import com.amazonaws.serverless.proxy.*;
import com.amazonaws.serverless.proxy.internal.servlet.*;
import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import java.io.*;
import oxs.api.APIServer;

class JavalinAwsHandler<RequestType, ResponseType> extends
		AwsLambdaServletContainerHandler<RequestType, ResponseType, HttpServletRequest, AwsHttpServletResponse> {
	protected final JavalinServlet javalinServlet;

	public JavalinAwsHandler(Class<RequestType> requestTypeClass,
			Class<ResponseType> responseTypeClass,
			RequestReader<RequestType, HttpServletRequest> requestReader,
			ResponseWriter<AwsHttpServletResponse, ResponseType> responseWriter,
			SecurityContextWriter<RequestType> securityContextWriter,
			ExceptionHandler<ResponseType> exceptionHandler,
			JavalinServlet javalinServlet) {
		super(requestTypeClass, responseTypeClass, requestReader, responseWriter, securityContextWriter,
				exceptionHandler);
		this.javalinServlet = javalinServlet;
	}

	public static JavalinAwsHandler<AwsProxyRequest, AwsProxyResponse> getJavalinAwsHandler(
			JavalinServlet javalinServlet) {
		JavalinAwsHandler handler = new JavalinAwsHandler(
				AwsProxyRequest.class,
				AwsProxyResponse.class,
				new AwsProxyHttpServletRequestReader(),
				new AwsProxyHttpServletResponseWriter(),
				new AwsProxySecurityContextWriter(),
				new AwsProxyExceptionHandler(),
				javalinServlet);
		handler.initialize();
		return handler;
	}

	@Override
	public void initialize() {
		getServletContext().addServlet("javalin", this.javalinServlet);
	}

	@Override
	protected AwsHttpServletResponse getContainerResponse(HttpServletRequest request, CountDownLatch latch) {
		return new AwsHttpServletResponse(request, latch);
	}

	@Override
	protected void handleRequest(HttpServletRequest containerRequest, AwsHttpServletResponse containerResponse,
			Context lambdaContext) throws Exception {

		if (AwsHttpServletRequest.class.isAssignableFrom(containerRequest.getClass())) {
			((AwsHttpServletRequest) containerRequest).setServletContext(getServletContext());
		}

		// process filters
		doFilter(containerRequest, containerResponse, this.javalinServlet);
	}
}

public class App implements RequestStreamHandler {
	private final Javalin app;
	private final JavalinAwsHandler<AwsProxyRequest, AwsProxyResponse> handler;

	public App() {
		this.app = APIServer.makeAppStandalone();
		this.handler = JavalinAwsHandler.getJavalinAwsHandler(this.app.javalinServlet());
	}

	@Override
	public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
		handler.proxyStream(inputStream, outputStream, context);
	}
}