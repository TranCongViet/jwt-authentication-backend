import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  app.enableCors({
    origin: ['http://localhost:5173', 'https://trancongviet.github.io'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(port);
  Logger.log(`🚀 Server đang run tại http://localhost:${port}`, 'Bootstrap');
}
bootstrap();