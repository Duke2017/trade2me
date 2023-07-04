import { Scenes, Markup } from "telegraf"
import { IBotContext } from "./context/context.interface";
//export const advertDataWizard = new Scenes.BaseScene('createAdvertSceneId')

// advertDataWizard.enter((ctx) => {
//   console.log('enter to advertDataWizard')
//   ctx.reply('What is your drug?', Markup.inlineKeyboard([
//     Markup.button.callback('Movie', 'MOVIE_ACTION'),
//     Markup.button.callback('Theater', 'THEATER_ACTION'),
//   ]));
// });

// advertDataWizard.action('THEATER_ACTION', (ctx) => {
//   ctx.reply('You choose theater');
//   //@ts-ignore
//   return ctx.scene.enter('SOME_OTHER_SCENE_ID'); // switch to some other scene
// });

// advertDataWizard.action('MOVIE_ACTION', (ctx) => {
//   ctx.reply('You choose movie, your loss');
//   //@ts-ignore
//   return ctx.scene.leave(); // exit global namespace
// });

// advertDataWizard.leave((ctx) => {
//   ctx.reply('Thank you for your time!');
// });

//advertDataWizard.use((ctx) => ctx.replyWithMarkdown('Please choose either Movie or Theater'));

export const advertDataWizard = new Scenes.WizardScene<IBotContext>(
  "createAdvertSceneId",
  async ctx => {
    console.log("Введите заголовок объявления")
    await ctx.reply("Первое сообщение")
    // ctx.wizard.state.advertData = {};
    return ctx.wizard.next()
  },
  async ctx => {
    // validation example
    console.log(111, ctx.message)
    await ctx.reply("Второе сообщение")
    // if (ctx.message?.text?.length < 2) {
    //   ctx.reply('Please enter name for real');
    //   return;
    // }
    // ctx.wizard.state.advertData.title = ctx.message.text;
    // ctx.reply('Enter your e-mail');
    return ctx.wizard.next()
  },
  async ctx => {
    console.log("Фсё")
    await ctx.reply("Третье сообщение")
    // ctx.wizard.state.advertData.email = ctx.message.text;
    // ctx.reply('Thank you for your replies, well contact your soon');
    // await mySendAdvertDataMomentBeforeErase(ctx.wizard.state.advertData);
    return ctx.scene.leave()
  }
)
