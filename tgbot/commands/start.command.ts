import { Markup, Telegraf } from "telegraf"
import { IBotContext } from "../context/context.interface"
import { Command } from "./command.class"
import { advertDataWizard } from "../scenes"

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }
  handle(): void {
    console.log("bot started")
    this.bot.start(ctx => {
      ctx.reply(
        "Что тебе от меня надо, пёс?",
        Markup.inlineKeyboard([
          [Markup.button.callback("Создать новое объявление", "create")],
          [Markup.button.callback("Моя страница", "url")],
        ])
      )
    })

    this.bot.action("create", (ctx) => {
      //@ts-ignore
      return ctx.scene.enter("createAdvertSceneId");
    });

    this.bot.action("url", ctx => {
        const formHtml = `Да как вы надоели, сохрани уже себе где-нибудь: <a>https://ya.ru</a>`;
        ctx.replyWithHTML(formHtml, {disable_web_page_preview:true});
    })
  }
}
