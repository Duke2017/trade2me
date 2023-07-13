import { IConfigService } from "./config.interface";

export class ConfigService implements IConfigService {
    get(key:string) : string {
        return process.env.TOKEN || '';
    }
}