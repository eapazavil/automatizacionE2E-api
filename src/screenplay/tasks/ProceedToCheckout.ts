import { Actor } from '../Actor';
import { ProductsPage } from '../ui/ProductsPage';

export class ProceedToCheckout {
    static fromCart() {
        return new ProceedToCheckout();
    }

    async performAs(actor: Actor): Promise<void> {
        const browser = actor.using<any>('BrowseTheWeb');
        await browser.click(ProductsPage.CART_LINK);
        await browser.click(ProductsPage.CHECKOUT_BUTTON);
    }
}