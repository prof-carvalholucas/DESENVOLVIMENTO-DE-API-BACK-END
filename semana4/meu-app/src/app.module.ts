import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { UsuarioModule } from './usuario/usuario.module';

/**
 * APP MODULE
 *
 * Módulo raiz da aplicação.
 * Ele importa os módulos de cada parte do sistema:
 *
 * - DatabaseModule   → conexão TypeORM + SQLite e criação das tabelas
 * - UsuarioModule    → usuário (Controller, Service, Repository)
 * - FuncionarioModule → funcionário (Controller, Service, Repository)
 *
 * Quando a aplicação inicia, o NestJS carrega este módulo
 * e, em seguida, inicializa os módulos importados.
 */
@Module({
  imports: [DatabaseModule, UsuarioModule, FuncionarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
