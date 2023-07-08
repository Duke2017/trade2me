import { Context, Scenes, session } from "telegraf";
import { WizardContext } from "telegraf/typings/scenes";
import { Any } from "telegraf/typings/util";
export interface IBotSession extends Scenes.WizardSessionData {
    advertData: {
      title: string
      price: number
      description: string
      picture: string
    }
  }
  
  export interface IBotContext extends Context {
    // will be available under `ctx.session`
    // session: any;
  
    // // declare scene type
    scene: Scenes.SceneContextScene<IBotContext, IBotSession>
    // // declare wizard type
    wizard: Scenes.WizardContextWizard<IBotContext>
  }