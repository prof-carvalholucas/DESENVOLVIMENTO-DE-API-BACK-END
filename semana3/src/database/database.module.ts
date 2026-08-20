import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';

/**
 * DatabaseModule
 * ---------------
 * Ponto único de conexão com o banco.
 *
 * TypeOrmModule.forRoot(...) abre a conexão quando a API sobe.
 * Este módulo é importado no AppModule — o restante da aplicação
 * não precisa (e não deve) abrir outra conexão.
 */
@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig)],
})
export class DatabaseModule {}
