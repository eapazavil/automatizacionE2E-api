import { Actor } from '../Actor';
import { ProductsPage } from '../ui/ProductsPage';

export class AddToCart {
    constructor(private productName: string) {}

    static item(productName: string): AddToCart {
        return new AddToCart(productName);
    }

    async performAs(actor: Actor): Promise<void> {
        const browser = actor.using<any>('BrowseTheWeb');
        await browser.click(ProductsPage.PRODUCT_ITEM(this.productName));
    }
}