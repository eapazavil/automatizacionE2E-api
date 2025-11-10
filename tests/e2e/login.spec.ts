import { test, expect } from '@playwright/test';
import { Actor } from '../../src/screenplay/Actor';
import { BrowseTheWeb } from '../../src/screenplay/abilities/BrowseTheWeb';
import { Login } from '../../src/screenplay/tasks/Login';
import { ErrorMessage } from '../../src/screenplay/questions/ErrorMessage';

test.describe('Login Feature', () => {
    let actor: Actor;

    test.beforeEach(async ({ page }) => {
        actor = new Actor('User');
        actor.can(BrowseTheWeb.using(page));
        await page.goto(process.env.BASE_URL || 'https://www.saucedemo.com');
    });

    test('should login successfully with valid credentials', async () => {
        await actor.attemptsTo(
            Login.withCredentials(
                process.env.VALID_USERNAME || 'standard_user',
                process.env.VALID_PASSWORD || 'secret_sauce'
            )
        );
        
        // Verify we're on the inventory page
        const page = actor.using<BrowseTheWeb>('BrowseTheWeb').getPage();
        await expect(page.url()).toContain('/inventory.html');
    });

    test('should show error with invalid credentials', async () => {
        await actor.attemptsTo(
            Login.withCredentials('invalid_user', 'invalid_pass')
        );

        const errorMessage = await actor.asks(ErrorMessage.displayed());
        expect(errorMessage).toContain('Username and password do not match');
    });
});