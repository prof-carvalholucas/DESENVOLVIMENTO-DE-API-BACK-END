import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Entidade User  →  tabela "usuarios"
 * -----------------------------------
 * Cada propriedade da classe vira uma COLUNA no SQLite.
 * O TypeORM usa essa classe para gerar o SQL (CREATE TABLE, INSERT, etc.).
 *
 * @Entity('usuarios')  → nome da tabela no banco.
 * Sem o nome, o padrão seria "user".
 */
@Entity('usuarios')
export class User {
  /** Chave primária. INTEGER AUTOINCREMENT no SQLite. */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nome: string;

  /** unique: não permite dois usuários com o mesmo e-mail. */
  @Column({ type: 'varchar', length: 160, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  /** Preenchido automaticamente na inserção. */
  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  /** Atualizado automaticamente em cada UPDATE. */
  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
