import { Actor } from '../Actor';
import { ProductsPage } from '../ui/ProductsPage';

export class FillShippingInfo {
    constructor(
        private firstName: string,
        private lastName: string,
        private postalCode: string
    ) {}

    static withData(firstName: string, lastName: string, postalCode: string): FillShippingInfo {
        return new FillShippingInfo(firstName, lastName, postalCode);
    }

    async performAs(actor: Actor): Promise<void> {
        const browser = actor.using<any>('BrowseTheWeb');
        await browser.fill(ProductsPage.FIRST_NAME, this.firstName);
        await browser.fill(ProductsPage.LAST_NAME, this.lastName);
        await browser.fill(ProductsPage.POSTAL_CODE, this.postalCode);
        await browser.click(ProductsPage.CONTINUE_BUTTON);
    }
}