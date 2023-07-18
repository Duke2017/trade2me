import { Scenes, Markup } from "telegraf"
import { IBotContext } from "./context/context.interface"
import { resolvers } from "./../backend/resolvers"
import cloudinary from "cloudinary"

cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
})

const uploadImage = async (imagePath: string) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  }

  try {
    // Upload the image
    const result = await cloudinary.v2.uploader.upload(imagePath, options)
    console.log(result)
    return result.url
  } catch (error) {
    console.error(error)
  }
}

const cancelButton = Markup.inlineKeyboard([
  [Markup.button.callback("Отменить создание объявления", "cancel")],
])
const acceptOrRejectButton = Markup.inlineKeyboard([
  [
    Markup.button.callback("Создать", "accept"),
    Markup.button.callback("Отменить", "cancel"),
  ],
])
const photoButtons = Markup.inlineKeyboard([
  [Markup.button.callback("Создать без фотографии", "without")],
  [Markup.button.callback("Отменить создание объявления", "cancel")],
])

export const advertSceneWizard = new Scenes.WizardScene<IBotContext>(
  "createAdvertSceneId",

  //title
  async ctx => {
    console.log("Введите заголовок объявления")
    ctx.reply("Введите заголовок объявления", cancelButton)
    ctx.session.advertData = {
      title: "",
      price: 0,
      description: "",
      picture: "",
      userId: "",
    }
    return ctx.wizard.next()
  },

  //from title to text
  async ctx => {
    // @ts-ignore
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
      ctx.session.advertData.userId = String(ctx.from?.id)
      await ctx.reply(`Заголовок объявления: ${ctx.session.advertData.title}`)
      await ctx.reply(`Текст объявления: ${ctx.session.advertData.description}`)
      await ctx.reply(`Цена: ${ctx.session.advertData.price}`)
      await ctx.reply("Прикрепите фотографию", photoButtons)

      return ctx.wizard.next()
    }
  },

  async ctx => {
    await ctx.reply(`Заголовок объявления: ${ctx.session.advertData.title}`)
    await ctx.reply(`Текст объявления: ${ctx.session.advertData.description}`)
    await ctx.reply(`Цена: ${ctx.session.advertData.price}`)
    //@ts-ignore
    const photoArray = ctx.message?.photo
    console.log("photo=", photoArray)
    if (photoArray && photoArray.length) {
      const photo = photoArray[photoArray.length - 1]
      const file = await ctx.telegram.getFile(photo.file_id)
      ctx.session.advertData.picture = file.file_path || ""
    }

    await ctx.reply("Всё верно? Создаем объявление?", acceptOrRejectButton)
  }
)
advertSceneWizard.action("cancel", async ctx => {
  await ctx.reply("Создание объявления отменено")
  ctx.scene.enter("mainSceneId")
})
advertSceneWizard.action("accept", async ctx => {
  if (ctx.session.advertData.picture) {
    ctx.session.advertData.picture =
      (await uploadImage(
        `https://api.telegram.org/file/bot${process.env.TOKEN}/${ctx.session.advertData.picture}`
      )) || ""
  }

  await resolvers.Mutation.createAdvert(null, {
    advertInput: ctx.session.advertData,
  })
  await ctx.reply("Объявление создано успешно")
  console.log("advert created", ctx.session.advertData)
  ctx.scene.enter("mainSceneId")
})
advertSceneWizard.action("without", async ctx => {
  return ctx.wizard.next()
})

// advertDataWizard.use(ctx => {
//   console.log(123,ctx.scene.current)
//   if (ctx.scene.current?.id !== 'createAdvertSceneId') {
//     ctx.replyWithMarkdownV2(
//       'Сперва необходимо закончить создание объявления или отменить создание'
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
  const formHtml = `Ссылка на страницу: <a>https://frabjous-parfait-ee98d1.netlify.app/user/${ctx.from?.id}</a>`
  ctx.replyWithHTML(formHtml, { disable_web_page_preview: true })
  //return ctx.scene.leave()
})
