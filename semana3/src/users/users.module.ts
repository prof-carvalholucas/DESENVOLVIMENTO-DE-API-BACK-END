import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

/**
 * UsersModule — só a camada de dados está pronta
 * ----------------------------------------------
 * O que JÁ está aqui:
 *   - Entidade User (tabela usuarios)
 *   - UserRepository (CRUD)
 *
 * TAREFA DO ALUNO (não implementar nesta camada):
 *   1. Criar users.service.ts
 *      - Injetar UserRepository
 *      - Colocar regras de negócio (ex.: e-mail duplicado, hash de senha)
 *
 *   2. Criar users.controller.ts
 *      - Rotas HTTP: POST /users, GET /users, GET /users/:id,
 *        PATCH /users/:id, DELETE /users/:id
 *      - O Controller chama o Service (nunca o Repository direto)
 *
 *   3. Registrar neste @Module:
 *      controllers: [UsersController]
 *      providers: [UserRepository, UsersService]
 *
 * TypeOrmModule.forFeature([User])
 *   registra a entidade neste módulo para o @InjectRepository(User) funcionar.
 *
 * exports
 *   deixa o UserRepository disponível para o Service quando você criá-lo.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
