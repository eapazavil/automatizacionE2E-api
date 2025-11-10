export const ProductsPage = {
    PRODUCT_ITEM: (name: string) => `//div[text()="${name}"]/ancestor::div[@class="inventory_item"]//button`,
    CART_BADGE: '.shopping_cart_badge',
    CART_LINK: '.shopping_cart_link',
    CHECKOUT_BUTTON: '#checkout',
    CART_TOTAL: '.cart_total',
    CART_ITEMS: '.cart_item',
    COMPLETE_HEADER: '.complete-header',
    FIRST_NAME: '#first-name',
    LAST_NAME: '#last-name',
    POSTAL_CODE: '#postal-code',
    CONTINUE_BUTTON: '#continue',
    FINISH_BUTTON: '#finish'
};