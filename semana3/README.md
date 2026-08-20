# Semana 3 — API NestJS com SQLite e TypeORM

Atividade de **Desenvolvimento de API Back-End**.

A **camada de dados já está pronta** (conexão SQLite, entidade `User` e `UserRepository` com CRUD).  
Sua tarefa é implementar o **Service** e o **Controller**, apenas **chamando o repositório**.

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 18 ou superior
- npm

### 1. Instalar dependências

Na pasta raiz do projeto (onde está o `package.json`):

```bash
npm install
```

### 2. Subir a API

Modo desenvolvimento (reinicia sozinho quando você salvar um arquivo):

```bash
npm run start:dev
```

Se estiver tudo certo, o terminal mostra algo como:

```text
API rodando em http://localhost:3000
Banco SQLite: pasta data/app.sqlite (criada automaticamente)
```

Abra no navegador: [http://localhost:3000](http://localhost:3000)  
Deve aparecer `Hello World!`.

### 3. Banco de dados

Não é preciso instalar MySQL ou Postgres.

- O banco é um arquivo SQLite: `data/app.sqlite`
- A pasta `data/` e o arquivo são criados automaticamente na primeira execução
- As tabelas são criadas/atualizadas pelo TypeORM (`synchronize: true`)

### Outros comandos

| Comando | O que faz |
| --- | --- |
| `npm run start:dev` | Sobe a API com hot-reload (use este) |
| `npm run start` | Sobe a API uma vez |
| `npm run build` | Compila TypeScript para a pasta `dist/` |
| `npm run lint` | Verifica o código com ESLint |

Para parar o servidor: `Ctrl + C` no terminal.

---

## O que já está pronto (não altere)

| Arquivo | Função |
| --- | --- |
| `src/database/database.config.ts` | Conexão com o SQLite |
| `src/database/database.module.ts` | Módulo que abre o banco |
| `src/users/entities/user.entity.ts` | Tabela `usuarios` (id, nome, email, senha, datas) |
| `src/users/repositories/user.repository.ts` | CRUD no banco |
| `src/users/users.module.ts` | Registra entidade e repositório |

Você **não precisa escrever SQL**. O `UserRepository` já faz create, listar, buscar, atualizar e remover.

---

## Arquitetura (lembre as camadas)

```text
HTTP  →  Controller  →  Service  →  Repository  →  SQLite
         (rotas)        (regras)    (já pronto)     (arquivo)
```

- **Controller**: recebe a requisição HTTP e devolve a resposta. **Não** fala com o banco.
- **Service**: regra de negócio (usuário não encontrado, e-mail duplicado, etc.). Chama o **Repository**.
- **Repository**: só persiste dados. Já está implementado.

---

## Tarefa do aluno

Implementar o **CRUD de usuários** no **Controller** e no **Service**.

A camada de acesso a dados **já está pronta**. No Service, **injete e chame** o `UserRepository`.

### Arquivos que você deve criar

1. `src/users/users.service.ts`
2. `src/users/users.controller.ts`

Depois, registre os dois em `src/users/users.module.ts` (veja o passo 3).

### Rotas que a API deve ter

Base: `http://localhost:3000/users`

| Método | Rota | O que faz |
| --- | --- | --- |
| `POST` | `/users` | Cria um usuário |
| `GET` | `/users` | Lista todos |
| `GET` | `/users/:id` | Busca um pelo id |
| `PATCH` | `/users/:id` | Atualiza (parcial) |
| `DELETE` | `/users/:id` | Remove |

### Corpo esperado no POST

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "123456"
}
```

No `PATCH`, envie só o que quiser alterar, por exemplo:

```json
{
  "nome": "Maria Souza"
}
```

---

### Passo 1 — Service (`users.service.ts`)

Injete o `UserRepository` no construtor e use os métodos prontos:

| Método do repository | Quando usar |
| --- | --- |
| `create({ nome, email, senha })` | Cadastrar |
| `findAll()` | Listar |
| `findById(id)` | Buscar um (devolve `null` se não existir) |
| `findByEmail(email)` | Verificar e-mail duplicado |
| `update(id, dados)` | Atualizar (devolve `null` se o id não existir) |
| `remove(id)` | Remover (devolve `true` / `false`) |

Exemplo de injeção (não copie o CRUD pronto — implemente você):

```ts
constructor(private readonly userRepository: UserRepository) {}
```

**Regras mínimas obrigatórias**

- Se o usuário **não existir** (`findById` / `update` / `remove`): lançar `NotFoundException`.
- No cadastro, se o e-mail **já existir** (`findByEmail`): lançar `ConflictException`.
- No update, se mudar o e-mail e outro usuário já usar esse e-mail: lançar `ConflictException`.

O Controller **não** deve chamar o Repository. Só o Service.

---

### Passo 2 — Controller (`users.controller.ts`)

Use os decorators do NestJS e **apenas chame o Service**.

Sugestão de esqueleto (complete os métodos):

```ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: { nome: string; email: string; senha: string }) {
    return this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { nome?: string; email?: string; senha?: string },
  ) {
    return this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
```

Imports necessários: `Controller`, `Get`, `Post`, `Patch`, `Delete`, `Param`, `Body` de `@nestjs/common`.

---

### Passo 3 — Registrar no módulo

Em `src/users/users.module.ts`, o arquivo hoje só tem o repositório. Ajuste para:

```ts
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
  exports: [UserRepository],
})
export class UsersModule {}
```

Não esqueça os `import` do `UsersController` e do `UsersService` no topo do arquivo.

O `UsersModule` já está importado no `AppModule`. Não precisa mexer em `app.module.ts`.

---

## Como testar

Com a API rodando (`npm run start:dev`), use Insomnia, Postman, Thunder Client ou o terminal.

**Criar**

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{\"nome\":\"Maria Silva\",\"email\":\"maria@email.com\",\"senha\":\"123456\"}"
```

**Listar**

```bash
curl http://localhost:3000/users
```

**Buscar um**

```bash
curl http://localhost:3000/users/1
```

**Atualizar**

```bash
curl -X PATCH http://localhost:3000/users/1 -H "Content-Type: application/json" -d "{\"nome\":\"Maria Souza\"}"
```

**Remover**

```bash
curl -X DELETE http://localhost:3000/users/1
```

No Windows PowerShell, se o `curl` acima falhar, use o Insomnia/Postman.

**O que conferir**

- `POST` com e-mail novo → `201` ou `200` e o usuário com `id`
- `POST` com e-mail repetido → `409 Conflict`
- `GET /users/999` (id inexistente) → `404 Not Found`
- `DELETE` de id inexistente → `404 Not Found`
- No terminal da API aparece o SQL gerado pelo TypeORM (`logging: true`)

---

## Critérios de entrega

- [ ] Projeto sobe com `npm install` e `npm run start:dev`
- [ ] As 5 rotas de `/users` funcionam
- [ ] Service usa **somente** o `UserRepository` (não usa `Repository` do TypeORM direto)
- [ ] Controller chama **somente** o Service (não chama o Repository)
- [ ] `404` quando o id não existe
- [ ] `409` quando o e-mail já está cadastrado
- [ ] Não alterar `user.entity.ts`, `user.repository.ts` nem a pasta `database/`

---

## Dicas

1. Leia `src/users/repositories/user.repository.ts` — os métodos e os comentários dizem exatamente o que cada um faz.
2. `id` na URL chega como **string**. Converta com `Number(id)` antes de passar ao Service.
3. Métodos do repositório são `async`: use `await` no Service.
4. Exceções HTTP do Nest: `throw new NotFoundException('Usuário não encontrado')` e `throw new ConflictException('E-mail já cadastrado')`.
5. Se o Nest disser que não consegue injetar `UsersService` ou `UsersController`, volte no passo 3 e confira o `users.module.ts`.
