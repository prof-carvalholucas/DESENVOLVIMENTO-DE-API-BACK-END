import { Controller } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

/**
 * USUARIO CONTROLLER
 *
 * Responsabilidade desta camada:
 * - receber requisições HTTP;
 * - receber parâmetros e body;
 * - chamar o UsuarioService;
 * - devolver a resposta HTTP.
 *
 * O Controller NÃO deve:
 * - acessar o banco de dados;
 * - executar SQL ou usar o TypeORM;
 * - conter regras de negócio (validações ficam no Service).
 *
 * ATIVIDADE DO ALUNO — criar os endpoints:
 *   POST   /usuarios
 *   GET    /usuarios
 *   GET    /usuarios/:id
 *   PUT    /usuarios/:id
 *   DELETE /usuarios/:id
 *
 * Exemplo didático (você deve implementar):
 *
 *   import { Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
 *
 *   @Post()
 *   criar(@Body() dados: any) {
 *     return this.usuarioService.criar(dados);
 *   }
 *
 *   @Get()
 *   listar() {
 *     return this.usuarioService.listar();
 *   }
 *
 *   @Get(':id')
 *   buscarPorId(@Param('id') id: string) {
 *     return this.usuarioService.buscarPorId(Number(id));
 *   }
 *
 *   @Put(':id')
 *   atualizar(@Param('id') id: string, @Body() dados: any) {
 *     return this.usuarioService.atualizar(Number(id), dados);
 *   }
 *
 *   @Delete(':id')
 *   remover(@Param('id') id: string) {
 *     return this.usuarioService.remover(Number(id));
 * 
 *   constructor(private readonly usuarioService: UsuarioService) {}
 *   }
 */
@Controller('usuarios')
export class UsuarioController {

}
