import dotenv from "dotenv";
import path from "path";

export function loadEnvironment(environment) {

    const envPath = path.resolve(
        process.cwd(),
        "config",
        "environment",
        `${environment}.env`
    );

    dotenv.config({

        path: envPath

    });

    console.log(process.env.BASE_URL);

}