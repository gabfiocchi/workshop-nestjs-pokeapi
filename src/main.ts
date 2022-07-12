import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const host = process.env.host || 'localhost';
  const port = process.env.PORT || 3001;

  console.log('Running in:', `http://${host}:${port}`);
  if (process.env.DOCKER) {
    await app.listen(port);
  } else {
    await app.listen(port, host);
  }
}
bootstrap();
