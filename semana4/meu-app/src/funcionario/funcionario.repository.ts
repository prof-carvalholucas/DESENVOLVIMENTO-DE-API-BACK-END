import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from './funcionario';

/**
 * FUNCIONARIO REPOSITORY
 *
 * Responsabilidade desta camada:
 * - persistir e consultar Funcionario via TypeORM;
 * - devolver os dados para o Service.
 *
 * O Repository NÃO deve:
 * - validar regras de negócio (salário > 0, campos obrigatórios, etc.);
 * - devolver resposta HTTP.
 *
 * Quem chama esta classe é o FuncionarioService — nunca o Controller.
 */
@Injectable()
export class FuncionarioRepository {
  constructor(
    @InjectRepository(Funcionario)
    private readonly repositorio: Repository<Funcionario>,
  ) {}

  /**
   * Insere um novo funcionário na tabela funcionarios.
   */
  async criar(funcionario: Funcionario): Promise<Funcionario> {
    const novo = this.repositorio.create({
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      email: funcionario.email,
      cargo: funcionario.cargo,
      salario: funcionario.salario,
    });

    return this.repositorio.save(novo);
  }

  /**
   * Busca um funcionário pelo id.
   * Retorna null quando o id não existe.
   */
  async buscarPorId(id: number): Promise<Funcionario | null> {
    return this.repositorio.findOneBy({ id });
  }

  /**
   * Lista todos os funcionários cadastrados.
   */
  async listar(): Promise<Funcionario[]> {
    return this.repositorio.find();
  }

  /**
   * Atualiza os dados de um funcionário existente.
   */
  async atualizar(id: number, funcionario: Funcionario): Promise<void> {
    await this.repositorio.update(id, {
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      email: funcionario.email,
      cargo: funcionario.cargo,
      salario: funcionario.salario,
    });
  }

  /**
   * Remove um funcionário pelo id.
   */
  async remover(id: number): Promise<void> {
    await this.repositorio.delete(id);
  }
}
