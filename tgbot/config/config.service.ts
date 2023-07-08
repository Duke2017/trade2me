import { config, DotenvParseOutput } from "dotenv";
import { IConfigService } from "./config.interface";

export class ConfigService implements IConfigService {
    private config: DotenvParseOutput | undefined;
    constructor() {
        const {error, parsed} = config();
        // if (error || !parsed) {
        //     throw new Error("Ошибка .env");
        // }
        this.config = parsed;
    }
    get(key:string) : string {
        let res = this.config ? this.config[key] : '';
        if (!res) {
            res = process.env.TOKEN || '';
        }
        return res;
    }
}