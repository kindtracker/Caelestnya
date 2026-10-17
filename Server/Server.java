import io.javalin.Javalin;
import java.nio.file.Path;

public class Server {
  public static void main(String[] args) {
    var App = Javalin.create(Config -> {
      Config.staticFiles.add(
        StaticFiles -> {
          StaticFiles.directory = "Web";
          StaticFiles.hostedPath = "/";
          StaticFiles.location =
            io.javalin.http.staticfiles.Location.EXTERNAL;
        }
      );

      Config.routes.get("/Api/Images/{Id}", Ctx -> {
        String Id = Ctx.pathParam("Id");

        if (!Id.matches("[a-zA-Z0-9_-]+")) {
          Ctx.status(400);
          return;
        }

        Path Image = Path.of(
          "ServerStorage", "Images", Id + ".png"
        );

        if (!java.nio.file.Files.isRegularFile(Image)) {
          Ctx.status(404);
          return;
        }

        Ctx.contentType("image/png");
        Ctx.result(Image.toFile().toURI().toURL().openStream());
      });
    }).start(8000);

    System.out.println("Server running at http://localhost:8000/");
  }
}
