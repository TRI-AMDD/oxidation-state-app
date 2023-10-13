package oxs.api;

import java.security.Security;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.databind.node.TextNode;

import io.javalin.Javalin;
import io.javalin.http.Context;
import oxs.helper.Request;
import oxs.helper.OxsHelper;
import io.javalin.openapi.HttpMethod;
import io.javalin.openapi.OpenApi;
import io.javalin.openapi.OpenApiByFields;
import io.javalin.openapi.OpenApiContent;
import io.javalin.openapi.OpenApiRequestBody;
import io.javalin.openapi.OpenApiResponse;
import io.javalin.openapi.plugin.OpenApiConfiguration;
import io.javalin.openapi.plugin.OpenApiPlugin;
import io.javalin.openapi.plugin.redoc.ReDocConfiguration;
import io.javalin.openapi.plugin.redoc.ReDocPlugin;
import io.javalin.openapi.plugin.swagger.SwaggerConfiguration;
import io.javalin.openapi.plugin.swagger.SwaggerPlugin;
import io.javalin.openapi.Visibility;

import static io.javalin.apibuilder.ApiBuilder.*;

@OpenApiByFields(Visibility.PROTECTED)
class PostRequest extends Request {

}

class API {

    @OpenApi(
        summary = "Submit chemical",
        operationId = "APIpost",
        path = "/api",
        methods = HttpMethod.POST,
        description = "Enter a chemical composition or upload a structure file to generate a ranked list of ways in which oxidation states can be assigned to the elements.",
        requestBody = @OpenApiRequestBody(
                description = "Enter a composition string like 'LiMn2O4' or text from a structure file (.cif).",
                content = {
                        @OpenApiContent(from = PostRequest.class)
                }
        ),
        responses = {
            @OpenApiResponse(status = "200", content = {@OpenApiContent(from = String.class)})
        }
    )
    public static void post(Context ctx) {
        Request req = ctx.bodyAsClass(Request.class);
        OxsHelper oxsHelper = new OxsHelper();
        String result = oxsHelper.GetOxidationJSON(req);
        ctx.result(result);
    }

    @OpenApi(
        summary = "Health Check",
        operationId = "APIget",
        path = "/api",
        methods = HttpMethod.GET,
        description = "If this works, then the API is up.",
        responses = {
            @OpenApiResponse(status = "200", content = {@OpenApiContent(from = String.class)})
        }
    )
    public static void get(Context ctx) {
        ctx.result("Use the POST request to start using the Oxidation state services");
    }
}

public class APIServer {
    public static void main(String[] args) {
        var app = Javalin.create(config -> {
            String newDocsPath = "/api_openapi";

            OpenApiConfiguration openApiConfiguration = new OpenApiConfiguration();
            openApiConfiguration.setDocumentationPath(newDocsPath);
            openApiConfiguration.getInfo().setTitle("Oxidation State App OpenAPI");
            openApiConfiguration.getInfo().setDescription("This tool can be used to quickly identify likely oxidation states for a given composition, or assign likely oxidation states to sites in a given structure, using the methods described here.");
            config.plugins.register(new OpenApiPlugin(openApiConfiguration));
            
            SwaggerConfiguration swaggerConfiguration = new SwaggerConfiguration();
            swaggerConfiguration.setUiPath("/api_swagger");
            swaggerConfiguration.setDocumentationPath(newDocsPath);
            config.plugins.register(new SwaggerPlugin(swaggerConfiguration));

            ReDocConfiguration reDocConfiguration = new ReDocConfiguration();
            reDocConfiguration.setUiPath("/api_redoc");
            reDocConfiguration.setDocumentationPath(newDocsPath);
            config.plugins.register(new ReDocPlugin(reDocConfiguration));
        }).routes(() -> {
            path("api", () -> {
                get(API::get);
                post(API::post);
            });
        });

        app.start(7070);
    }
}