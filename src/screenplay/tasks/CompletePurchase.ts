import { Actor } from '../Actor';
import { ProductsPage } from '../ui/ProductsPage';

export class CompletePurchase {
    static order() {
        return new CompletePurchase();
    }

    async performAs(actor: Actor): Promise<void> {
        const browser = actor.using<any>('BrowseTheWeb');
        await browser.click(ProductsPage.FINISH_BUTTON);
    }
}