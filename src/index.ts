import 'reflect-metadata';
import 'dotenv/config';

import HTTPServer from './shared/infra/http/server';
import queueProvider from '@shared/container/providers/QueueProvider';

async function main() {
  await queueProvider.init();

  console.log('✅ QUEEUE PROVIDER INITIALIZED');

  await queueProvider.producer('test', {
    value: '✅ QUEUE PRODUCER WOKRING! ',
  });

  const server = new HTTPServer();

  const api = await server.init();

  api.listen(process.env.API_PORT, () => {
    console.log(`✅ Server running on port ${process.env.API_PORT}`);
  });
}

main();
