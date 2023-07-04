import { Telegraf, Context, session } from "telegraf";
import { ConfigService } from "./config/config.service";
import { IConfigService } from "./config/config.interface";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import LocalSession from "telegraf-session-local";
import { Scenes } from 'telegraf';
import { advertDataWizard } from "./scenes";

const stage = new Scenes.Stage<IBotContext>([advertDataWizard]);

class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];
    constructor (private readonly configservice: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configservice.get("TOKEN"));
        this.bot.use(
            session()
            //new LocalSession({database: "example_db.json"}).middleware()
        );
        this.bot.use(stage.middleware());
    }
    init() {
        this.commands = [new StartCommand(this.bot)];
        for (const command of this.commands) {
            command.handle();
        }
        
        this.bot.launch();
    }
}

const bot = new Bot(new ConfigService());
bot.init();