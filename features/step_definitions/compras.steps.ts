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

Given('que estoy en la página de inicio de sesión', async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    actor = new Actor('Cliente');
    actor.can(BrowseTheWeb.using(page));
    await page.goto(process.env.BASE_URL || 'https://www.saucedemo.com');
});

When('inicio sesión con credenciales válidas', async () => {
    await actor.attemptsTo(
        Login.withCredentials(
            process.env.VALID_USERNAME || 'standard_user',
            process.env.VALID_PASSWORD || 'secret_sauce'
        )
    );
});

When('intento iniciar sesión con credenciales inválidas', async (dataTable: DataTable) => {
    const credentials = dataTable.hashes()[0];
    await actor.attemptsTo(
        Login.withCredentials(credentials.Usuario, credentials.Contraseña)
    );
});

When('agrego {string} al carrito', async (productName: string) => {
    await actor.attemptsTo(
        AddToCart.item(productName)
    );
});

When('agrego los siguientes productos al carrito', async (dataTable: DataTable) => {
    const items = dataTable.hashes();
    for (const item of items) {
        await actor.attemptsTo(
            AddToCart.item(item['Nombre del Producto'])
        );
    }
});

When('procedo al pago', async () => {
    await actor.attemptsTo(
        ProceedToCheckout.fromCart()
    );
});

When('completo la información de envío', async (dataTable: DataTable) => {
    const info = dataTable.hashes()[0];
    await actor.attemptsTo(
        FillShippingInfo.withData(info.Nombre, info.Apellido, info['Código Postal'])
    );
});

When('finalizo la compra', async () => {
    await actor.attemptsTo(
        CompletePurchase.order()
    );
});

Then('debo ver el mensaje de confirmación {string}', async (message: string) => {
    const browser = actor.using<BrowseTheWeb>('BrowseTheWeb');
    const actualMessage = await browser.getText('.complete-header');
    expect(actualMessage).toBe(message);
});

Then('debo ver un mensaje de error {string}', async (message: string) => {
    const errorMessage = await actor.asks(ErrorMessage.displayed());
    expect(errorMessage).toBe(message);
});

Then('el total del carrito debe ser {string}', async (expectedTotal: string) => {
    const browser = actor.using<BrowseTheWeb>('BrowseTheWeb');
    const total = await browser.getText('.cart_total');
    expect(total).toBe(expectedTotal);
});

Then('el número de productos en el carrito debe ser {string}', async (expectedCount: string) => {
    const browser = actor.using<BrowseTheWeb>('BrowseTheWeb');
    const count = await browser.getText('.shopping_cart_badge');
    expect(count).toBe(expectedCount);
});