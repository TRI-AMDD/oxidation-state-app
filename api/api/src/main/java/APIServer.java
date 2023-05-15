package oxs.api;

import io.javalin.Javalin;
import oxs.api.Request;
import tri.oxidationstates.webapi.TableData;
import tri.oxidationstates.webapi.WebOxidationAnalyzer;
import java.io.File;

public class APIServer {
    public static void main(String[] args) {
        var app = Javalin.create(/* config */);

        app.get("/api", ctx -> {
            ctx.result("Use the POST request to start using the Oxidation state services");
        });

        app.post("/api", ctx -> {
            Request req = ctx.bodyAsClass(Request.class);
            String paramFileName = "input_files/oxidation_parameters.txt";
            String polyIonDir = "input_files/polyatomic_ions_web";
            
            WebOxidationAnalyzer analyzer = new WebOxidationAnalyzer(paramFileName, polyIonDir);
            TableData tableData = analyzer.getTableDataFromComposition(req.composition);
			String result = tableData.toJSON();
            ctx.contentType("json");
            ctx.result(result);
        });

        app.start(7070);
    }
}