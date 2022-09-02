import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra DTO data
      forbidNonWhitelisted: true, // bad request with extra DTO data
    }),
  );
  await app.listen(3000);
}
bootstrap();
