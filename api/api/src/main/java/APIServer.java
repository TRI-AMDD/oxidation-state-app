package oxs.api;

import io.javalin.Javalin;
import oxs.helper.Request;
import oxs.helper.OxsHelper;

public class APIServer {
    public static void main(String[] args) {
        var app = Javalin.create(/* config */);

        app.get("/api", ctx -> {
            ctx.result("Use the POST request to start using the Oxidation state services");
        });

        app.post("/api", ctx -> {
            Request req = ctx.bodyAsClass(Request.class);
            OxsHelper oxsHelper = new OxsHelper();
            String result = oxsHelper.GetOxidationJSON(req);
            ctx.contentType("json");
            ctx.result(result);
        });

        app.start(7070);
    }
}