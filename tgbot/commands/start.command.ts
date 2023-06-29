import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class StartCommand extends Command {
    constructor (bot: Telegraf<IBotContext>) {
    super (bot);
    }
    handle(): void {
        this.bot.start((ctx)=>{
            ctx.reply("Пить будешь?", Markup.inlineKeyboard([
                Markup.button.callback("Да", "yes"),
                Markup.button.callback("Нет", "no"),
            ]))
        });

        this.bot.action("yes", (ctx)=>{
            ctx.session.courseLike = true;
            ctx.editMessageText("Наливай!");
        })

        this.bot.action("no", (ctx)=>{
            ctx.session.courseLike = true;
            ctx.editMessageText("Ах ты нехочуха!");
        })
    }
}