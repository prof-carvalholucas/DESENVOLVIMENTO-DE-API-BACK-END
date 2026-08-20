import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

/**
 * UserRepository — camada de dados (CRUD)
 * ---------------------------------------
 * Responsabilidade: APENAS falar com o banco.
 *
 * Não valida regra de negócio e não responde HTTP.
 * Isso fica no Service e no Controller (tarefa do aluno).
 *
 * Como o Service vai usar:
 *   constructor(private readonly userRepository: UserRepository) {}
 *   const usuario = await this.userRepository.findById(1);
 */
@Injectable()
export class UserRepository {
  constructor(
    /**
     * InjectRepository(User) entrega o repositório padrão do TypeORM
     * já ligado à tabela "usuarios".
     */
    @InjectRepository(User)
    private readonly orm: Repository<User>,
  ) {}

  /** CREATE — insere um novo usuário e devolve o registro salvo (com id). */
  async create(dados: Pick<User, 'nome' | 'email' | 'senha'>): Promise<User> {
    const usuario = this.orm.create(dados);
    return this.orm.save(usuario);
  }

  /** READ — lista todos os usuários. */
  async findAll(): Promise<User[]> {
    return this.orm.find({
      order: { id: 'ASC' },
    });
  }

  /** READ — busca um usuário pela chave primária. null se não existir. */
  async findById(id: number): Promise<User | null> {
    return this.orm.findOne({ where: { id } });
  }

  /** READ — busca por e-mail (útil no cadastro para evitar duplicidade). */
  async findByEmail(email: string): Promise<User | null> {
    return this.orm.findOne({ where: { email } });
  }

  /**
   * UPDATE — altera só os campos enviados.
   * Devolve o usuário atualizado, ou null se o id não existir.
   */
  async update(
    id: number,
    dados: Partial<Pick<User, 'nome' | 'email' | 'senha'>>,
  ): Promise<User | null> {
    const existente = await this.findById(id);
    if (!existente) {
      return null;
    }

    this.orm.merge(existente, dados);
    return this.orm.save(existente);
  }

  /**
   * DELETE — remove pelo id.
   * true = removeu | false = id não encontrado.
   */
  async remove(id: number): Promise<boolean> {
    const resultado = await this.orm.delete(id);
    return (resultado.affected ?? 0) > 0;
  }
}
