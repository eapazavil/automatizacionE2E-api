import { test as base, APIRequestContext, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import Ajv from 'ajv';

type APITestFixtures = {
  apiContext: APIRequestContext;
  validateJsonSchema: (schema: any, json: any) => void;
};

export const test = base.extend<APITestFixtures>({
  apiContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    await use(apiContext);
    await apiContext.dispose();
  },

  validateJsonSchema: async ({}, use) => {
    const ajv = new Ajv();
    const validate = (schemaPath: string, json: any) => {
      const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', schemaPath), 'utf-8'));
      const validate = ajv.compile(schema);
      const valid = validate(json);
      if (!valid) {
        throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`);
      }
    };
    await use(validate);
  },
});

export { expect } from '@playwright/test';