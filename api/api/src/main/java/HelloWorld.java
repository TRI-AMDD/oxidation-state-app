package oxs.api;

import io.javalin.Javalin;
import demo.die.Die;
import oxs.api.Request;

public class HelloWorld {
    public static void main(String[] args) {
        var app = Javalin.create(/*config*/);
        
        app.get("/api", ctx -> {
            ctx.result("Use the POST request to start using the Oxidation state services");
        });

        app.post("/api", ctx -> {
            Request req = ctx.bodyAsClass(Request.class);
            Die die = new Die(req.num);
            int roll = die.roll();
            ctx.result("Hello " + req.name + " : " + roll);
        });
        
        app.start(7070);
    }
}