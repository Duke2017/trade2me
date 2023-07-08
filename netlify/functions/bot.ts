import { Telegraf, Context, session } from "telegraf";
import { ConfigService } from "../../tgbot/config/config.service";
import { IConfigService } from "../../tgbot/config/config.interface";
import { IBotContext } from "../../tgbot/context/context.interface";
import { Command } from "../../tgbot/commands/command.class";
import { StartCommand } from "../../tgbot/commands/start.command";
import LocalSession from "telegraf-session-local";
import { Scenes } from 'telegraf';
import { advertSceneWizard, mainSceneWizard } from "../../tgbot/scenes";


const stage = new Scenes.Stage([mainSceneWizard, advertSceneWizard]);

class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];
    constructor (private readonly configservice: IConfigService) {
        this.bot = new Telegraf<IBotContext>(process.env.TOKEN || this.configservice.get("TOKEN"))
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
        
       // this.bot.launch();
    }
}

const bot = new Bot(new ConfigService());
bot.init();

export const handler = async (event:any) => {
    try {
      console.log("Received an update from Telegram!", event.body);
      await bot.bot.handleUpdate(JSON.parse(event.body))
      return { statusCode: 200, body: "" }
    } catch (e) {
      console.error("error in handler:", e)
      return { statusCode: 400, body: e }
    }
  }