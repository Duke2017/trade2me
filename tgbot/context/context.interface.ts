import { Context, Scenes } from "telegraf";
// export interface SessionData {
//     courseLike: boolean;
// };
export interface IBotContext extends Context {
        // will be available under `ctx.session`
        //session: SessionData;
        
        // declare scene type
        scene: Scenes.SceneContextScene<IBotContext, Scenes.WizardSessionData>;
        // declare wizard type
        wizard: Scenes.WizardContextWizard<IBotContext>;
}