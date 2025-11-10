import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { Actor } from '../../src/screenplay/Actor';
import { BrowseTheWeb } from '../../src/screenplay/abilities/BrowseTheWeb';
import { Login } from '../../src/screenplay/tasks/Login';
import { ErrorMessage } from '../../src/screenplay/questions/ErrorMessage';
import { chromium, Page, Browser } from '@playwright/test';
import { AddToCart } from '../../src/screenplay/tasks/AddToCart';
import { ProceedToCheckout } from '../../src/screenplay/tasks/ProceedToCheckout';
import { FillShippingInfo } from '../../src/screenplay/tasks/FillShippingInfo';
import { CompletePurchase } from '../../src/screenplay/tasks/CompletePurchase';
import * as dotenv from 'dotenv';

dotenv.config();

let browser: Browser;
let page: Page;
let actor: Actor;

Given('I am on the login page', async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    actor = new Actor('Customer');
    actor.can(BrowseTheWeb.using(page));
    await page.goto(process.env.BASE_URL || 'https://www.saucedemo.com');
});

When('I login with valid credentials', async () => {
    await actor.attemptsTo(
        Login.withCredentials(
            process.env.VALID_USERNAME || 'standard_user',
            process.env.VALID_PASSWORD || 'secret_sauce'
        )
    );
});

When('I try to login with invalid credentials', async (dataTable: DataTable) => {
    const credentials = dataTable.hashes()[0];
    await actor.attemptsTo(
        Login.withCredentials(credentials.Username, credentials.Password)
    );
});

When('I add {string} to the cart', async (productName: string) => {
    await actor.attemptsTo(
        AddToCart.item(productName)
    );
});

When('I add the following items to cart', async (dataTable: DataTable) => {
    const items = dataTable.hashes();
    for (const item of items) {
        await actor.attemptsTo(
            AddToCart.item(item['Product Name'])
        );
    }
});

When('I proceed to checkout', async () => {
    await actor.attemptsTo(
        ProceedToCheckout.fromCart()
    );
});

When('I fill in the shipping information', async (dataTable: DataTable) => {
    const info = dataTable.hashes()[0];
    await actor.attemptsTo(
        FillShippingInfo.withData(info['First Name'], info['Last Name'], info['Postal Code'])
    );
});

When('I complete the purchase', async () => {
    await actor.attemptsTo(
        CompletePurchase.order()
    );
});

Then('I should see the confirmation message {string}', async (message: string) => {
    const browser = actor.using<BrowseTheWeb>('BrowseTheWeb');
    const actualMessage = await browser.getText('.complete-header');
    expect(actualMessage).toBe(message);
});

Then('I should see an error message {string}', async (message: string) => {
    const errorMessage = await actor.asks(ErrorMessage.displayed());
    expect(errorMessage).toBe(message);
});

Then('the cart total should be {string}', async (expectedTotal: string) => {
    const browser = actor.using<BrowseTheWeb>('BrowseTheWeb');
    const total = await browser.getText('.cart_total');
    expect(total).toBe(expectedTotal);
});

Then('the number of items in cart should be {string}', async (expectedCount: string) => {
    const browser = actor.using<BrowseTheWeb>('BrowseTheWeb');
    const count = await browser.getText('.shopping_cart_badge');
    expect(count).toBe(expectedCount);
});