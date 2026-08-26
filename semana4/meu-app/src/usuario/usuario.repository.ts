import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario';

/**
 * USUARIO REPOSITORY
 *
 * Responsabilidade desta camada:
 * - persistir e consultar Usuario via TypeORM;
 * - devolver os dados para o Service.
 *
 * O Repository NÃO deve:
 * - validar regras de negócio;
 * - decidir se o e-mail é obrigatório;
 * - devolver resposta HTTP (status 400, 404, etc.).
 *
 * Quem chama esta classe é o UsuarioService — nunca o Controller.
 */
@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private readonly repositorio: Repository<Usuario>,
  ) {}

  /**
   * Insere um novo usuário na tabela usuarios.
   */
  async criar(usuario: Usuario): Promise<Usuario> {
    const novo = this.repositorio.create({
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      telefone: usuario.telefone ?? null,
      data_nascimento: usuario.data_nascimento ?? null,
    });

    return this.repositorio.save(novo);
  }

  /**
   * Busca um usuário pelo id.
   * Retorna null quando o id não existe.
   */
  async buscarPorId(id: number): Promise<Usuario | null> {
    return this.repositorio.findOneBy({ id });
  }

  /**
   * Lista todos os usuários cadastrados.
   */
  async listar(): Promise<Usuario[]> {
    return this.repositorio.find();
  }

  /**
   * Atualiza os dados de um usuário existente.
   */
  async atualizar(id: number, usuario: Usuario): Promise<void> {
    await this.repositorio.update(id, {
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      telefone: usuario.telefone ?? null,
      data_nascimento: usuario.data_nascimento ?? null,
    });
  }

  /**
   * Remove um usuário pelo id.
   */
  async remover(id: number): Promise<void> {
    await this.repositorio.delete(id);
  }
}
