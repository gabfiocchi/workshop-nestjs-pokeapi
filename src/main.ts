import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Pokeapi example')
    .setDescription('The pokemon API description')
    .setVersion('1.0')
    .addTag('pokemons')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);


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
