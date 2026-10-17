import io.javalin.Javalin;
import java.nio.file.Path;

public class Server {
    public static void main(String[] args) {
        var app = Javalin.create(config -> {
            config.staticFiles.add(
                staticFiles -> {
                    staticFiles.directory = "Web";
                    staticFiles.hostedPath = "/";
                    staticFiles.location =
                        io.javalin.http.staticfiles.Location.EXTERNAL;
                }
            );

            config.routes.get("/Api/Images/{Id}", ctx -> {
                String id = ctx.pathParam("Id");

                if (!id.matches("[a-zA-Z0-9_-]+")) {
                    ctx.status(400);
                    return;
                }

                Path image = Path.of(
                    "ServerStorage", "Images", id + ".png"
                );

                if (!java.nio.file.Files.isRegularFile(image)) {
                    ctx.status(404);
                    return;
                }

                ctx.contentType("image/png");
                ctx.result(image.toFile().toURI().toURL().openStream());
            });
        }).start(8000);

        System.out.println("Server running at http://localhost:8000/");
    }
}
