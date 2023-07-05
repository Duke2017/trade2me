import { Context, Scenes } from "telegraf";
// export interface SessionData {
//     courseLike: boolean;
// };

export interface IBotContext extends Scenes.WizardContext {
        // will be available under `ctx.session`
        session: any;
       
        // // declare scene type
        // scene: Scenes.SceneContextScene<IBotContext, Scenes.WizardSessionData>;
        // // declare wizard type
        // wizard: Scenes.WizardContextWizard<IBotContext>;
}