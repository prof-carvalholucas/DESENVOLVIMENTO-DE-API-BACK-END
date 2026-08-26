import { Controller } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';

/**
 * FUNCIONARIO CONTROLLER
 *
 * Responsabilidade desta camada:
 * - receber requisições HTTP;
 * - receber parâmetros e body;
 * - chamar o FuncionarioService;
 * - devolver a resposta HTTP.
 *
 * O Controller NÃO deve acessar o banco nem usar o TypeORM.
 *
 * ATIVIDADE DO ALUNO — criar os endpoints:
 *   POST   /funcionarios
 *   GET    /funcionarios
 *   GET    /funcionarios/:id
 *   PUT    /funcionarios/:id
 *   DELETE /funcionarios/:id
 *
 * Exemplo didático (você deve implementar):
 *
 *   import { Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
 *
 *   @Post()
 *   criar(@Body() dados: any) {
 *     return this.funcionarioService.criar(dados);
 *   }
 *
 *   @Get()
 *   listar() {
 *     return this.funcionarioService.listar();
 *   }
 *
 *   @Get(':id')
 *   buscarPorId(@Param('id') id: string) {
 *     return this.funcionarioService.buscarPorId(Number(id));
 *   }
 *
 *   @Put(':id')
 *   atualizar(@Param('id') id: string, @Body() dados: any) {
 *     return this.funcionarioService.atualizar(Number(id), dados);
 *   }
 *
 *   @Delete(':id')
 *   remover(@Param('id') id: string) {
 *     return this.funcionarioService.remover(Number(id));
 *   }
 * 
 *  constructor(private readonly funcionarioService: FuncionarioService) {}
 */
@Controller('funcionarios')
export class FuncionarioController {
 
}
