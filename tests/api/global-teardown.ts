import { server } from './mocks/handlers';

async function globalTeardown() {
  server.close();
}

export default globalTeardown;