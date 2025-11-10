import { server } from './mocks/handlers';

async function globalSetup() {
  server.listen({
    onUnhandledRequest: 'error'
  });
  console.log('Server is listening on http://localhost:3000');
}

export default globalSetup;