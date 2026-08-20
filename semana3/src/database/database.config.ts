import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * =====================================================================
 * CAMADA DE DADOS — configuração da conexão (SQLite + TypeORM)
 * =====================================================================
 *
 * O que é o TypeORM?
 *   É um ORM (Object-Relational Mapper). Ele traduz classes TypeScript
 *   em tabelas SQL e permite acessar o banco com métodos em vez de
 *   escrever SQL na mão o tempo todo.
 *
 * Por que SQLite nesta atividade?
 *   - Não precisa instalar um servidor (MySQL/Postgres).
 *   - O banco inteiro fica em UM arquivo no disco.
 *   - Ideal para estudar e desenvolver localmente.
 *
 * Fluxo resumido:
 *   1. Esta config diz AO TypeORM: "use SQLite neste arquivo".
 *   2. As entidades (ex.: User) descrevem as TABELAS.
 *   3. O Repository usa essas entidades para fazer o CRUD.
 *   4. Service e Controller (tarefa do aluno) usam o Repository.
 * =====================================================================
 */

const pastaDoBanco = join(process.cwd(), 'data');
const arquivoDoBanco = join(pastaDoBanco, 'app.sqlite');

if (!existsSync(pastaDoBanco)) {
  mkdirSync(pastaDoBanco, { recursive: true });
}

export const databaseConfig: TypeOrmModuleOptions = {
  /**
   * Driver: "better-sqlite3" é o cliente Node que fala com o arquivo SQLite.
   * Alternativa comum: type: 'sqlite' (pacote sqlite3).
   */
  type: 'better-sqlite3',

  /**
   * Caminho do arquivo do banco.
   * process.cwd() = pasta raiz do projeto (onde está o package.json).
   * Resultado: <projeto>/data/app.sqlite
   */
  database: arquivoDoBanco,

  /**
   * true = o Nest registra automaticamente as entidades declaradas em
   * TypeOrmModule.forFeature([...]) nos módulos (ex.: UsersModule).
   * Assim não precisamos listar cada entidade aqui na mão.
   */
  autoLoadEntities: true,

  /**
   * true = o TypeORM CRIA / ATUALIZA as tabelas ao subir a API,
   * com base nas entidades.
   *
   * Bom para aula e desenvolvimento.
   * Em produção o recomendado é synchronize: false + migrations.
   */
  synchronize: true,

  /**
   * true = imprime no terminal o SQL gerado (SELECT, INSERT, etc.).
   * Ajuda a enxergar o que o ORM está fazendo.
   */
  logging: true,
};
