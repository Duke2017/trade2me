import { config, DotenvParseOutput } from "dotenv";
import { IConfigService } from "./config.interface";

export class ConfigService implements IConfigService {
    private config: DotenvParseOutput;
    constructor() {
        const {error, parsed} = config();
        if (error || !parsed) {
            throw new Error("Ошибка .env");
        }
        this.config = parsed;
    }
    get(key:string) : string {
        const res = process.env[key] || this.config[key] || '';
        return res;
    }
}