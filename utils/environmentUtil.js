import dotenv from "dotenv";
import path from "path";
import fs from "fs";

export function loadEnvironment(environment) {

    const candidateDirs = [
        path.resolve(process.cwd(), "config", "environment"),
        path.resolve(process.cwd(), "config", "enviroment")
    ];

    const envPath = candidateDirs.reduce((found, dir) => {
        if (found) {
            return found;
        }

        const candidatePath = path.join(dir, `${environment}.env`);
        return fs.existsSync(candidatePath) ? candidatePath : found;
    }, null);

    if (envPath) {
        dotenv.config({ path: envPath });
    }

    console.log(process.env.BASE_URL);

}