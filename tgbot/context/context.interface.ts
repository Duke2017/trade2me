import { Context, Scenes } from "telegraf"
import { advertType } from "../../types"

interface MyWizardSession extends Scenes.WizardSession {
	advertData: advertType;
}

export interface IBotContext extends Context {
  session: MyWizardSession

  // // declare scene type
  scene: Scenes.SceneContextScene<IBotContext, Scenes.WizardSessionData>
  // // declare wizard type
  wizard: Scenes.WizardContextWizard<IBotContext>
}
