import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from './funcionario';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioRepository } from './funcionario.repository';
import { FuncionarioService } from './funcionario.service';

/**
 * FUNCIONARIO MODULE
 *
 * Junta as peças da funcionalidade de funcionário:
 * - Controller (entrada HTTP)
 * - Service (regras de negócio — você vai implementar)
 * - Repository (persistência TypeORM — já está pronto)
 *
 * TypeOrmModule.forFeature([Funcionario]) registra a entidade Funcionario
 * para que o FuncionarioRepository possa injetar o Repository<Funcionario>.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Funcionario])],
  controllers: [FuncionarioController],
  providers: [FuncionarioService, FuncionarioRepository],
})
export class FuncionarioModule {}
