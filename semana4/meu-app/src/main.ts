import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Ponto de entrada da aplicação NestJS.
 *
 * A ordem de inicialização é:
 * 1. O NestJS carrega o AppModule.
 * 2. O TypeORM abre o SQLite e cria/atualiza as tabelas.
 * 3. A API começa a escutar requisições HTTP.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const porta = process.env.PORT ?? 3000;

  await app.listen(porta);

  console.log('Aplicação iniciada.');
  console.log(`Servidor rodando em http://localhost:${porta}`);
}

void bootstrap();
