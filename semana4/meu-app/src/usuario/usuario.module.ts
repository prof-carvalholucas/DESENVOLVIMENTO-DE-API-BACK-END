import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioService } from './usuario.service';

/**
 * USUARIO MODULE
 *
 * Junta as peças da funcionalidade de usuário:
 * - Controller (entrada HTTP)
 * - Service (regras de negócio — você vai implementar)
 * - Repository (persistência TypeORM — já está pronto)
 *
 * TypeOrmModule.forFeature([Usuario]) registra a entidade Usuario
 * para que o UsuarioRepository possa injetar o Repository<Usuario>.
 *
 * A injeção de dependência acontece aqui:
 * o NestJS lê os "providers" e "controllers" e conecta
 * automaticamente os constructors de cada classe.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}
