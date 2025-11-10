import { Actor } from '../Actor';
import { LoginPage } from '../ui/LoginPage';

export class ErrorMessage {
    static displayed() {
        return {
            answeredBy: async (actor: Actor): Promise<string | null> => {
                const browser = actor.using<any>('BrowseTheWeb');
                return await browser.getText(LoginPage.ERROR_MESSAGE);
            }
        };
    }
}