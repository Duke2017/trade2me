import { Context, Scenes, session } from "telegraf";
import { Any } from "telegraf/typings/util";
// export interface SessionData {
//     courseLike: boolean;
// };
interface IAdvert extends Scenes.WizardContext {
    advertData: {
        title: String,
        price: Number,
        description: String,
        picture: String
    }
}

export interface IBotContext extends Scenes.WizardContext {
        // will be available under `ctx.session`
        session: any;
       
        // // declare scene type
        // scene: Scenes.SceneContextScene<IBotContext, Scenes.WizardSessionData>;
        // // declare wizard type
        // wizard: Scenes.WizardContextWizard<IBotContext>;
}