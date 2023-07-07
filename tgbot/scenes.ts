import { Scenes, Markup } from "telegraf"
import { IBotContext } from "./context/context.interface"
import { resolvers } from "./../backend/resolvers"


const cancelButton = Markup.inlineKeyboard([
  [Markup.button.callback("Отменить создание объявления", "cancel")],
])
const acceptOrRejectButton = Markup.inlineKeyboard([
  [
    Markup.button.callback("Создать", "accept"),
    Markup.button.callback("Отменить создание", "cancel"),
  ],
])

export const advertSceneWizard = new Scenes.WizardScene<IBotContext>(
  "createAdvertSceneId",

  //title
  async ctx => {
    console.log("Введите заголовок объявления")
    ctx.reply("Введите заголовок объявления", cancelButton)
    ctx.session.advertData = {}
    return ctx.wizard.next()
  },

  //from title to text
  async ctx => {
    //@ts-ignore
    const text = ctx.message?.text
    console.log("получен заголовок: ", text)
    if (text.length < 2) {
      ctx.reply("Слишком коротко, попробуем ещё раз")
      return
    } else {
      await ctx.reply(`Заголовок объявления: ${text}`)
      await ctx.reply("Введите текст объявления", cancelButton)
    }
    ctx.session.advertData.title = text
    return ctx.wizard.next()
  },

  //from text to price
  async ctx => {
    console.log("получен текст: ", ctx.message)
    //@ts-ignore
    const text = ctx.message?.text

    if (text.length < 2) {
      ctx.reply("Слишком коротко, попробуем ещё раз")
      return
    } else {
      ctx.session.advertData.description = text
      await ctx.reply(`Заголовок объявления: ${ctx.session.advertData.title}`)
      await ctx.reply(`Текст объявления: ${ctx.session.advertData.description}`)
      await ctx.reply("Введите цену", cancelButton)
    }

    return ctx.wizard.next()
  },

  async ctx => {
    //@ts-ignore
    const text = ctx.message?.text
    if (!Number(text)) {
      ctx.reply("Возможен только числовой ввод, попробуем ещё раз")
      return
    } else {
      ctx.session.advertData.price = Number(text)
      await ctx.reply(`Заголовок объявления: ${ctx.session.advertData.title}`)
      await ctx.reply(`Текст объявления: ${ctx.session.advertData.description}`)
      await ctx.reply(`Цена: ${ctx.session.advertData.price}`)

      await ctx.reply(
        'Всё верно? Создаем объявление?',
        acceptOrRejectButton
      )
    }

    console.log("End of creating advert", ctx.session.advertData)
  }
)
advertSceneWizard.action("cancel", async ctx => {
  await ctx.reply("Создание объявления отменено")
  ctx.scene.enter("mainSceneId")
})
advertSceneWizard.action("accept", async ctx => {
  //TODO убрать эту срамату, но потом
  const output = { ...ctx.session.advertData}
  output.picture = ""
  await resolvers.Mutation.createAdvert(null, {advertInput: output})
  await ctx.reply("Объявление создано успешно")
  ctx.scene.enter("mainSceneId")
})

// const [createAdvert, { data, loading, error }] = useMutation(CREATE_ADVERT)
// const saveAdvertToDatabase = (advertData: any) => {
//   createAdvert({
//     variables: {
//       advertInput: advertData,
//     },
//   })
// }

// advertDataWizard.use(ctx => {
//   console.log(123,ctx.scene.current)
//   if (ctx.scene.current?.id !== "createAdvertSceneId") {
//     ctx.replyWithMarkdownV2(
//       "Сперва необходимо закончить создание объявления или отменить создание"
//     )
//   }
// })

export const mainSceneWizard = new Scenes.WizardScene<IBotContext>(
  "mainSceneId",

  async ctx => {
    ctx.reply(
      "Добро пожаловать в главное меню",
      Markup.inlineKeyboard([
        [Markup.button.callback("Создать новое объявление", "create")],
        [Markup.button.callback("Моя страница", "url")],
      ])
    )
  }
)

mainSceneWizard.action("create", ctx => {
  ctx.scene.enter("createAdvertSceneId")
})
mainSceneWizard.action("url", ctx => {
  const formHtml = `Да как вы надоели, сохрани уже себе где-нибудь: <a>https://ya.ru</a>`
  ctx.replyWithHTML(formHtml, { disable_web_page_preview: true })
  return ctx.scene.leave()
})
