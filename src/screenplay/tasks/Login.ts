import { Actor } from '../Actor';
import { LoginPage } from '../ui/LoginPage';

export class Login {
    constructor(private username: string, private password: string) {}

    static withCredentials(username: string, password: string): Login {
        return new Login(username, password);
    }

    async performAs(actor: Actor): Promise<void> {
        const browser = actor.using<any>('BrowseTheWeb');
        
        await browser.fill(LoginPage.USERNAME_INPUT, this.username);
        await browser.fill(LoginPage.PASSWORD_INPUT, this.password);
        await browser.click(LoginPage.LOGIN_BUTTON);
    }
}