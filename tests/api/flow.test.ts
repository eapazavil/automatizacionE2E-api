import { test, expect } from './base.api';

test.describe('API Flow Tests', () => {
  test('Complete shopping flow through API', async ({ apiContext }) => {
    // 1. Login
    const loginResponse = await apiContext.post('/login', {
      data: {
        username: 'standard_user',
        password: 'secret_sauce'
      }
    });
    expect(loginResponse.status()).toBe(200);
    const { token } = await loginResponse.json();

    // 2. Get Products
    const productsResponse = await apiContext.get('/products', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(productsResponse.status()).toBe(200);
    const products = await productsResponse.json();
    const productId = products[0].id;

    // 3. Add to Cart
    const addToCartResponse = await apiContext.post('/cart', {
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        productId,
        quantity: 1
      }
    });
    expect(addToCartResponse.status()).toBe(200);

    // 4. Get Cart
    const cartResponse = await apiContext.get('/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(cartResponse.status()).toBe(200);
    const cart = await cartResponse.json();
    expect(cart).toContainEqual(expect.objectContaining({
      productId,
      quantity: 1
    }));

    // 5. Checkout
    const checkoutResponse = await apiContext.post('/checkout', {
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345'
      }
    });
    expect(checkoutResponse.status()).toBe(200);
    const order = await checkoutResponse.json();
    expect(order).toHaveProperty('orderId');
  });
});