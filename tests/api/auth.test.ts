import { test, expect } from './base.api';

test.describe('API Authentication Tests', () => {
  test('POST /login - successful login returns 200 and valid token', async ({ apiContext, validateJsonSchema }) => {
    const response = await apiContext.post('/login', {
      data: JSON.stringify({
        username: 'standard_user',
        password: 'secret_sauce'
      })
    });

    // Validar código de respuesta
    expect(response.status()).toBe(200);

    // Validar estructura de respuesta
    const responseBody = await response.json();
    validateJsonSchema('login.response.json', responseBody);
  });

  test('POST /login - invalid credentials returns 401', async ({ apiContext }) => {
    const response = await apiContext.post('/login', {
      data: {
        username: 'invalid_user',
        password: 'invalid_password'
      }
    });

    expect(response.status()).toBe(401);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
  });
});