import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED
    })
  )

  app.useGlobalFilters(new RpcCustomExceptionFilter())

  await app.listen(env.port);
  console.log(`Gateway running on port: ${env.port}`) 
}
bootstrap();
