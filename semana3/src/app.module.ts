import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

/**
 * AppModule — raiz da aplicação
 *
 * Ordem didática das camadas:
 *   DatabaseModule  → abre a conexão SQLite
 *   UsersModule     → entidade + repository (camada de dados)
 *   Service / Controller de usuários → tarefa do aluno
 */
@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
