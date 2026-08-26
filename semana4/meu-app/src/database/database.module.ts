import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { Funcionario } from '../funcionario/funcionario';
import { Usuario } from '../usuario/usuario';

const pastaBanco = join(process.cwd(), 'database');

if (!existsSync(pastaBanco)) {
  mkdirSync(pastaBanco, { recursive: true });
}

/**
 * DATABASE MODULE
 *
 * Configura a conexão TypeORM com SQLite (driver better-sqlite3).
 *
 * - type: better-sqlite3
 * - database: arquivo database/meu-app.sqlite
 * - entities: Usuario e Funcionario
 * - synchronize: true → o TypeORM cria/atualiza as tabelas automaticamente
 *
 * Este módulo é importado no AppModule.
 * Os módulos de domínio (UsuarioModule, FuncionarioModule) usam
 * TypeOrmModule.forFeature(...) para injetar o repositório de cada entidade.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(pastaBanco, 'meu-app.sqlite'),
      entities: [Usuario, Funcionario],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
