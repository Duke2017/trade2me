import { Markup, Telegraf } from "telegraf"
import { IBotContext } from "../context/context.interface"
import { Command } from "./command.class"

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }
  handle(): void {
    console.log("bot started")
    this.bot.start(ctx => {
      return ctx.scene.enter("mainSceneId");
    })
  }
}
