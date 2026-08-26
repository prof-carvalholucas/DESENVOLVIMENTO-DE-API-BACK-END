/**
 * Os métodos abaixo são esqueletos da atividade (ainda sem implementação).
 * O ESLint é desativado neste arquivo de propósito, até o aluno preencher os TODOs.
 */
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario';
import { UsuarioRepository } from './usuario.repository';

/**
 * USUARIO SERVICE
 *
 * Responsabilidade desta camada:
 * - regras de negócio;
 * - validações;
 * - chamar o UsuarioRepository.
 *
 * O Service NÃO deve:
 * - executar SQL ou usar o TypeORM diretamente;
 * - acessar o banco diretamente;
 * - conhecer detalhes de status HTTP (isso é do Controller).
 *
 * O Repository já está injetado pelo NestJS.
 * Você NÃO precisa fazer "new UsuarioRepository()".
 *
 * ATIVIDADE DO ALUNO: implementar os métodos abaixo.
 */
@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  /**
   * TODO (aluno): criar um usuário.
   *
   * Passos sugeridos:
   * 1. Validar as regras de negócio (RN01 a RN08) — veja o README.
   * 2. Se alguma regra falhar, lançar um erro (ex.: BadRequestException).
   * 3. Chamar o repository:
   *      return this.usuarioRepository.criar(dados);
   */
  async criar(dados: Usuario): Promise<Usuario> {
    // Exemplo do que você deve implementar:
    //
    // if (!dados.nome) {
    //   throw new BadRequestException('O nome do usuário é obrigatório.');
    // }
    //
    // return this.usuarioRepository.criar(dados);

    throw new Error('TODO: implemente UsuarioService.criar()');
  }

  /**
   * TODO (aluno): buscar um usuário pelo id.
   *
   * Dica: use this.usuarioRepository.buscarPorId(id)
   * Se não encontrar, você pode lançar NotFoundException.
   */
  async buscarPorId(id: number): Promise<Usuario | null> {
    throw new Error('TODO: implemente UsuarioService.buscarPorId()');
  }

  /**
   * TODO (aluno): listar todos os usuários.
   *
   * Dica: return this.usuarioRepository.listar();
   */
  async listar(): Promise<Usuario[]> {
    throw new Error('TODO: implemente UsuarioService.listar()');
  }

  /**
   * TODO (aluno): atualizar um usuário.
   *
   * Dica:
   * 1. Verificar se o usuário existe.
   * 2. Validar as regras de negócio.
   * 3. Chamar this.usuarioRepository.atualizar(id, dados).
   */
  async atualizar(id: number, dados: Usuario): Promise<void> {
    throw new Error('TODO: implemente UsuarioService.atualizar()');
  }

  /**
   * TODO (aluno): remover um usuário.
   *
   * Dica: this.usuarioRepository.remover(id)
   */
  async remover(id: number): Promise<void> {
    throw new Error('TODO: implemente UsuarioService.remover()');
  }
}
