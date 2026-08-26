import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidade Funcionario (TypeORM).
 *
 * Esta classe descreve a tabela `funcionarios` no SQLite.
 * O TypeORM usa os decorators abaixo para criar/atualizar a tabela
 * automaticamente (synchronize: true no DatabaseModule).
 *
 * Atributos:
 * 1. id
 * 2. nome
 * 3. cpf
 * 4. email
 * 5. cargo
 * 6. salario
 */
@Entity('funcionarios')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' })
  nome!: string;

  @Column({ type: 'text', unique: true })
  cpf!: string;

  @Column({ type: 'text', unique: true })
  email!: string;

  @Column({ type: 'text' })
  cargo!: string;

  @Column({ type: 'real' })
  salario!: number;
}
