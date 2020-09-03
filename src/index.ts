import "reflect-metadata";
import express from "express";
import path from "path";
import hbs from "express-handlebars";
import morgan from "morgan";
import helmet from "helmet";
import session from "express-session";
import { friendRt } from "./routes/friendRt";
import { get404 } from "./controllers/errorCon";
import { createConnection } from "typeorm";

(async () => {
    await createConnection("default");

    const app: express.Application = express();
    app.use(helmet());

    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "../src/views"));
    app.engine(".hbs", hbs({
        defaultLayout: "main", extname: ".hbs",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials")
    }));

    app.use(session({
        secret: "stevestjohn",
        resave: false,
        saveUninitialized: false
    }));

    app.use(express.static(path.join(__dirname, "../src/public")));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use("/friends", friendRt);
    app.use(get404);

    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();

