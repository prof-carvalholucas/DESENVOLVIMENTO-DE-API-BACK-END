import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Ponto de entrada da aplicação.
 * Inicia o servidor HTTP.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permite o front chamar a API
  app.enableCors();

  const port = 3000;
  await app.listen(port);

  console.log(` API rodando em: http://localhost:${port}`);
}

bootstrap();
