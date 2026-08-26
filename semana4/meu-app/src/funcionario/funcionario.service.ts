/**
 * Os métodos abaixo são esqueletos da atividade (ainda sem implementação).
 * O ESLint é desativado neste arquivo de propósito, até o aluno preencher os TODOs.
 */
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Funcionario } from './funcionario';
import { FuncionarioRepository } from './funcionario.repository';

/**
 * FUNCIONARIO SERVICE
 *
 * Responsabilidade desta camada:
 * - regras de negócio;
 * - validações;
 * - chamar o FuncionarioRepository.
 *
 * O Service NÃO deve executar SQL nem usar o TypeORM diretamente.
 *
 * O Repository já está injetado pelo NestJS.
 *
 * ATIVIDADE DO ALUNO: implementar os métodos abaixo.
 */
@Injectable()
export class FuncionarioService {
  constructor(private readonly funcionarioRepository: FuncionarioRepository) {}

  /**
   * TODO (aluno): criar um funcionário.
   *
   * Passos sugeridos:
   * 1. Validar as regras de negócio (RN01 a RN09) — veja o README.
   * 2. Se alguma regra falhar, lançar um erro (ex.: BadRequestException).
   * 3. Chamar o repository:
   *      return this.funcionarioRepository.criar(dados);
   */
  async criar(dados: Funcionario): Promise<Funcionario> {
    // Exemplo do que você deve implementar:
    //
    // if (!dados.nome) {
    //   throw new BadRequestException('O nome do funcionário é obrigatório.');
    // }
    //
    // if (dados.salario <= 0) {
    //   throw new BadRequestException('O salário deve ser maior que zero.');
    // }
    //
    // return this.funcionarioRepository.criar(dados);

    throw new Error('TODO: implemente FuncionarioService.criar()');
  }

  /**
   * TODO (aluno): buscar um funcionário pelo id.
   *
   * Dica: use this.funcionarioRepository.buscarPorId(id)
   */
  async buscarPorId(id: number): Promise<Funcionario | null> {
    throw new Error('TODO: implemente FuncionarioService.buscarPorId()');
  }

  /**
   * TODO (aluno): listar todos os funcionários.
   *
   * Dica: return this.funcionarioRepository.listar();
   */
  async listar(): Promise<Funcionario[]> {
    throw new Error('TODO: implemente FuncionarioService.listar()');
  }

  /**
   * TODO (aluno): atualizar um funcionário.
   *
   * Dica:
   * 1. Verificar se o funcionário existe.
   * 2. Validar as regras de negócio.
   * 3. Chamar this.funcionarioRepository.atualizar(id, dados).
   */
  async atualizar(id: number, dados: Funcionario): Promise<void> {
    throw new Error('TODO: implemente FuncionarioService.atualizar()');
  }

  /**
   * TODO (aluno): remover um funcionário.
   *
   * Dica: this.funcionarioRepository.remover(id)
   */
  async remover(id: number): Promise<void> {
    throw new Error('TODO: implemente FuncionarioService.remover()');
  }
}
