import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidade Usuario (TypeORM).
 *
 * Esta classe descreve a tabela `usuarios` no SQLite.
 * O TypeORM usa os decorators abaixo para criar/atualizar a tabela
 * automaticamente (synchronize: true no DatabaseModule).
 *
 * Atributos:
 * 1. id
 * 2. nome
 * 3. email
 * 4. cpf
 * 5. telefone
 * 6. data_nascimento
 */
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' })
  nome!: string;

  @Column({ type: 'text', unique: true })
  email!: string;

  @Column({ type: 'text', unique: true })
  cpf!: string;

  @Column({ type: 'text', nullable: true })
  telefone?: string | null;

  @Column({ type: 'text', nullable: true })
  data_nascimento?: string | null;
}
