import { test, expect } from './base.api';

test.describe('Products API Tests', () => {
  let authToken: string;

  test.beforeEach(async ({ apiContext }) => {
    // Obtener token de autenticación
    const loginResponse = await apiContext.post('/login', {
      data: {
        username: 'standard_user',
        password: 'secret_sauce'
      }
    });
    const loginBody = await loginResponse.json();
    authToken = loginBody.token;
  });

  test('GET /products - returns non-empty list of products', async ({ apiContext, validateJsonSchema }) => {
    const response = await apiContext.get('/products', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    // Validar código de respuesta
    expect(response.status()).toBe(200);

    // Validar estructura y contenido de respuesta
    const responseBody = await response.json();
    validateJsonSchema('products.response.json', responseBody);

    // Validar que la lista no esté vacía
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody.length).toBeGreaterThan(0);
  });

  test('GET /products - unauthorized returns 401', async ({ apiContext }) => {
    const response = await apiContext.get('/products');
    expect(response.status()).toBe(401);
  });
});