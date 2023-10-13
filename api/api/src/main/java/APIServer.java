package oxs.api;

import java.security.Security;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.databind.node.TextNode;

import io.javalin.Javalin;
import oxs.helper.Request;
import oxs.helper.OxsHelper;
import io.javalin.openapi.plugin.OpenApiConfiguration;
import io.javalin.openapi.plugin.OpenApiPlugin;
import io.javalin.openapi.plugin.redoc.ReDocConfiguration;
import io.javalin.openapi.plugin.redoc.ReDocPlugin;
import io.javalin.openapi.plugin.swagger.SwaggerConfiguration;
import io.javalin.openapi.plugin.swagger.SwaggerPlugin;

public class APIServer {
    public static void main(String[] args) {
        var app = Javalin.create(config -> {
            OpenApiConfiguration openApiConfiguration = new OpenApiConfiguration();
            openApiConfiguration.getInfo().setTitle("Oxidation State App OpenAPI");
            config.plugins.register(new OpenApiPlugin(openApiConfiguration));
            config.plugins.register(new SwaggerPlugin(new SwaggerConfiguration()));
            config.plugins.register(new ReDocPlugin(new ReDocConfiguration()));
        });

        app.get("/api", ctx -> {
            ctx.result("Use the POST request to start using the Oxidation state services");
        });

        app.post("/api", ctx -> {
            Request req = ctx.bodyAsClass(Request.class);
            OxsHelper oxsHelper = new OxsHelper();
            String result = oxsHelper.GetOxidationJSON(req);
            ctx.result(result);
        });

        app.start(7070);
    }
}