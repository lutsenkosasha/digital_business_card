import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);

  Logger.log(`🚀 GraphQL Sandbox: http://localhost:${port}/graphql`, 'Bootstrap');
}

void start();