# meu-app

Projeto didático de API Back-End com NestJS, TypeScript, TypeORM e SQLite.
O objetivo é aprender **arquitetura em camadas**, com persistência via TypeORM.

---

## 1. Nome do projeto

**meu-app**

---

## 2. Objetivo

Este projeto é entregue **parcialmente pronto**.

A infraestrutura básica já funciona, principalmente:

- conexão TypeORM com SQLite;
- criação automática das tabelas (synchronize);
- Repositories de Usuario e Funcionario.

Os alunos deverão construir depois:

- Controllers
- Services
- regras de negócio
- integração **Controller → Service → Repository**

A ideia é entender com clareza a responsabilidade de cada camada. O TypeORM fica **somente nos Repositories e nas entidades**.

---

## 3. Tecnologias

- NestJS
- TypeScript
- TypeORM
- SQLite (driver `better-sqlite3`)
- Node.js
- npm

A persistência é feita com **TypeORM** nos Repositories. Controller e Service não acessam o banco.

---

## 4. Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm (já vem com o Node.js)

Para conferir no terminal:

```bash
node -v
npm -v
```

Editor recomendado: Visual Studio Code ou Cursor.

---

## 5. Instalação

No terminal, entre na pasta do projeto e instale as dependências:

```bash
cd meu-app
npm install
```

---

## 6. Como executar

Com o terminal aberto na pasta `meu-app`:

```bash
npm run start:dev
```

Esse comando inicia a API em modo desenvolvimento (reinicia sozinho quando você salva um arquivo).

A API ficará disponível em:

```text
http://localhost:3000
```

Ao iniciar, o TypeORM conecta no SQLite e sincroniza as tabelas. A API fica disponível em:

```text
http://localhost:3000
```

O console deve mostrar que a aplicação iniciou, por exemplo:

```text
Aplicação iniciada.
Servidor rodando em http://localhost:3000
```

Para testar se a API está no ar, abra no navegador:

```text
http://localhost:3000
```

Você deve ver a mensagem de que a API está em execução.

---

## 7. Estrutura do projeto

```text
meu-app/
│
├── src/
│   │
│   ├── database/
│   │   └── database.module.ts      ← conexão TypeORM + SQLite (já pronto)
│   │
│   ├── usuario/
│   │   ├── usuario.ts              ← entidade TypeORM
│   │   ├── usuario.module.ts
│   │   ├── usuario.repository.ts   ← persistência TypeORM (já pronto)
│   │   ├── usuario.service.ts      ← regras de negócio (ATIVIDADE DO ALUNO)
│   │   └── usuario.controller.ts   ← endpoints HTTP (ATIVIDADE DO ALUNO)
│   │
│   ├── funcionario/
│   │   ├── funcionario.ts          ← entidade TypeORM
│   │   ├── funcionario.module.ts
│   │   ├── funcionario.repository.ts  ← persistência TypeORM (já pronto)
│   │   ├── funcionario.service.ts     ← regras de negócio (ATIVIDADE DO ALUNO)
│   │   └── funcionario.controller.ts  ← endpoints HTTP (ATIVIDADE DO ALUNO)
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── database/
│   └── meu-app.sqlite              ← criado automaticamente na primeira execução
│
├── package.json
├── tsconfig.json
└── README.md
```

**Importante:** não altere, neste primeiro momento, o `DatabaseModule` nem os Repositories.
O objetivo da atividade é implementar **Controller + Service** usando os Repositories já fornecidos.

---

## 8. Arquitetura em camadas

O fluxo de uma requisição HTTP é:

```text
HTTP Request
     ↓
Controller
     ↓
Service
     ↓
Repository
     ↓
SQLite
     ↓
Repository
     ↓
Service
     ↓
Controller
     ↓
HTTP Response
```

### Exemplo: cadastrar um usuário

```text
POST /usuarios
        ↓
UsuarioController
        ↓
UsuarioService
        ↓
UsuarioRepository
        ↓
SQLite
```

O mesmo padrão vale para Funcionario:

```text
POST /funcionarios
        ↓
FuncionarioController
        ↓
FuncionarioService
        ↓
FuncionarioRepository
        ↓
SQLite
```

---

## 9. Banco SQLite + TypeORM

O arquivo do banco fica em:

```text
database/meu-app.sqlite
```

Ele é criado **automaticamente** quando a aplicação inicia.

O `DatabaseModule` configura o TypeORM:

- abre a conexão SQLite (`better-sqlite3`);
- registra as entidades `Usuario` e `Funcionario`;
- cria/atualiza as tabelas com `synchronize: true`.

Os módulos de domínio usam `TypeOrmModule.forFeature(...)` para injetar o repositório de cada entidade.

Não há SQL escrito à mão. Os Repositories usam a API do TypeORM, por exemplo:

```ts
return this.repositorio.save(novo);
return this.repositorio.find();
return this.repositorio.findOneBy({ id });
await this.repositorio.update(id, dados);
await this.repositorio.delete(id);
```

---

## 10. Entidades

Há duas entidades nesta atividade:

| Entidade     | Tabela SQLite   | Pasta              |
| ------------ | --------------- | ------------------ |
| Usuario      | `usuarios`      | `src/usuario/`     |
| Funcionario  | `funcionarios`  | `src/funcionario/` |

Cada entidade possui:

- uma **entidade TypeORM** (mapeia a tabela);
- um **Repository** (grava e lê no SQLite via TypeORM);
- um **Service** (você vai implementar);
- um **Controller** (você vai implementar).

---

## 11. Atributos

### Usuario (tabela `usuarios`)

| Atributo          | Tipo SQL | Observação                          |
| ----------------- | -------- | ----------------------------------- |
| id                | INTEGER  | chave primária, autoincremento      |
| nome              | TEXT     | obrigatório                         |
| email             | TEXT     | obrigatório e único                 |
| cpf               | TEXT     | obrigatório e único                 |
| telefone          | TEXT     | opcional                            |
| data_nascimento   | TEXT     | opcional (use texto, ex.: 2000-01-15) |

Entidade TypeORM (resumo):

```ts
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' })
  nome: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', unique: true })
  cpf: string;

  @Column({ type: 'text', nullable: true })
  telefone?: string | null;

  @Column({ type: 'text', nullable: true })
  data_nascimento?: string | null;
}
```

### Funcionario (tabela `funcionarios`)

| Atributo | Tipo SQL | Observação                     |
| -------- | -------- | ------------------------------ |
| id       | INTEGER  | chave primária, autoincremento |
| nome     | TEXT     | obrigatório                    |
| cpf      | TEXT     | obrigatório e único            |
| email    | TEXT     | obrigatório e único            |
| cargo    | TEXT     | obrigatório                    |
| salario  | REAL     | obrigatório                    |

Entidade TypeORM (resumo):

```ts
@Entity('funcionarios')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' })
  nome: string;

  @Column({ type: 'text', unique: true })
  cpf: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  cargo: string;

  @Column({ type: 'real' })
  salario: number;
}
```

---

## 12. Regras de negócio

As regras abaixo devem ser implementadas no **Service**, não no Repository e não no Controller.

Neste primeiro momento elas estão **apenas documentadas**. Você irá programá-las na atividade.

### Usuario

- **RN01** — O nome do usuário é obrigatório.
- **RN02** — O e-mail é obrigatório.
- **RN03** — O e-mail deve ser único no banco.
- **RN04** — O CPF é obrigatório.
- **RN05** — O CPF deve ser único no banco.
- **RN06** — O telefone é opcional.
- **RN07** — A data de nascimento é opcional.
- **RN08** — O usuário deve ser persistido somente quando os dados obrigatórios forem válidos.

### Funcionario

- **RN01** — O nome do funcionário é obrigatório.
- **RN02** — O CPF é obrigatório.
- **RN03** — O CPF deve ser único.
- **RN04** — O e-mail é obrigatório.
- **RN05** — O e-mail deve ser único.
- **RN06** — O cargo é obrigatório.
- **RN07** — O salário é obrigatório.
- **RN08** — O salário deve ser maior que zero.
- **RN09** — O funcionário somente deverá ser criado se todas as informações obrigatórias forem válidas.

Dica: se um campo obrigatório estiver vazio, o Service deve impedir a gravação e informar o erro. Só então o Repository é chamado.

---

## 13. Responsabilidade de cada camada

### CONTROLLER

Responsável por:

- receber requisições HTTP;
- receber parâmetros;
- receber body;
- chamar o Service;
- retornar respostas HTTP.

**Não deve acessar o banco diretamente.**

### SERVICE

Responsável por:

- regras de negócio;
- validações;
- processamento;
- chamar o Repository.

**O Service NÃO deve acessar o TypeORM nem o banco diretamente.**

### REPOSITORY

Responsável por:

- acessar o SQLite via TypeORM;
- inserir;
- consultar;
- atualizar;
- excluir.

**O Repository NÃO deve possuir regras de negócio.**

### DATABASE

Responsável por:

- configurar o TypeORM;
- abrir a conexão SQLite;
- criar/atualizar as tabelas (synchronize).

### Resumo

```text
Controller  →  não acessa banco.
Service     →  não usa TypeORM.
Repository  →  não decide regra de negócio.
```

### Exemplo conceitual

Controller:

```ts
@Post()
criar(@Body() dados) {
    return this.service.criar(dados);
}
```

Service:

```ts
criar(dados) {
    // validar regras

    // chamar repository
    return this.repository.criar(dados);
}
```

Repository:

```ts
async criar(dados) {
    // persistir com TypeORM
}
```

### Injeção de dependência

O NestJS conecta as camadas sozinho, pelos `constructor`s.

Você **não** deve fazer:

```ts
const repository = new UsuarioRepository(); // errado
```

O correto é receber a dependência já pronta:

```ts
constructor(private readonly usuarioRepository: UsuarioRepository) {}
```

Isso só funciona porque o módulo declara as classes em `providers` e `controllers`.

---

## 14. Como testar

### 14.1. Testar se a API iniciou

1. Execute `npm run start:dev`.
2. Confira as mensagens do banco no console.
3. Acesse `http://localhost:3000`.

### 14.2. Testar o banco SQLite

Depois de iniciar a aplicação, o arquivo deve existir:

```text
meu-app/database/meu-app.sqlite
```

Se o arquivo apareceu e as tabelas foram criadas (mensagem no console), a camada de persistência está funcionando.

### 14.3. Testar os endpoints (depois de implementá-los)

Você pode usar:

- Insomnia
- Postman
- Thunder Client (extensão do VS Code)
- ou o próprio navegador (apenas para GET)

Exemplos com curl (depois que o Controller e o Service estiverem prontos):

**Criar usuário**

```bash
curl -X POST http://localhost:3000/usuarios ^
  -H "Content-Type: application/json" ^
  -d "{\"nome\":\"Maria Silva\",\"email\":\"maria@email.com\",\"cpf\":\"12345678900\",\"telefone\":\"62999999999\",\"data_nascimento\":\"2000-01-15\"}"
```

No Linux/macOS, troque `^` por `\` e não precisa escapar as aspas do JSON da mesma forma.

**Listar usuários**

```bash
curl http://localhost:3000/usuarios
```

**Buscar por id**

```bash
curl http://localhost:3000/usuarios/1
```

**Atualizar**

```bash
curl -X PUT http://localhost:3000/usuarios/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"nome\":\"Maria Souza\",\"email\":\"maria@email.com\",\"cpf\":\"12345678900\"}"
```

**Remover**

```bash
curl -X DELETE http://localhost:3000/usuarios/1
```

O mesmo vale para `/funcionarios`.

Exemplo de body de funcionário:

```json
{
  "nome": "João Pereira",
  "cpf": "98765432100",
  "email": "joao@email.com",
  "cargo": "Analista",
  "salario": 3500.50
}
```

---

## 15. ATIVIDADE DO ALUNO

**Não altere** a implementação do `DatabaseModule`, `UsuarioRepository` e `FuncionarioRepository` neste primeiro momento.

Seu objetivo é construir **Controller + Service**, usando os Repositories já fornecidos.

### PARTE 1 — UsuarioController

Arquivo: `src/usuario/usuario.controller.ts`

Criar os endpoints:

| Método | Rota              | Ação                         |
| ------ | ----------------- | ---------------------------- |
| POST   | `/usuarios`       | criar usuário                |
| GET    | `/usuarios`       | listar usuários              |
| GET    | `/usuarios/:id`   | buscar usuário por id        |
| PUT    | `/usuarios/:id`   | atualizar usuário            |
| DELETE | `/usuarios/:id`   | remover usuário              |

O Controller só recebe a requisição e chama o Service. Não acesse o banco nem o TypeORM aqui.

### PARTE 2 — UsuarioService

Arquivo: `src/usuario/usuario.service.ts`

Implementar:

- criar usuário;
- validar dados;
- verificar regras de negócio (RN01 a RN08);
- chamar `UsuarioRepository`.

O Repository já está injetado:

```ts
constructor(private readonly usuarioRepository: UsuarioRepository) {}
```

Métodos prontos no Repository:

- `criar(usuario)`
- `buscarPorId(id)`
- `listar()`
- `atualizar(id, usuario)`
- `remover(id)`

### PARTE 3 — FuncionarioController

Arquivo: `src/funcionario/funcionario.controller.ts`

Criar:

| Método | Rota                  | Ação                            |
| ------ | --------------------- | ------------------------------- |
| POST   | `/funcionarios`       | criar funcionário               |
| GET    | `/funcionarios`       | listar funcionários             |
| GET    | `/funcionarios/:id`   | buscar funcionário por id       |
| PUT    | `/funcionarios/:id`   | atualizar funcionário           |
| DELETE | `/funcionarios/:id`   | remover funcionário             |

### PARTE 4 — FuncionarioService

Arquivo: `src/funcionario/funcionario.service.ts`

Implementar:

- criação;
- validação;
- regras de negócio (RN01 a RN09);
- integração com `FuncionarioRepository`.

Lembre-se da RN08: o salário deve ser **maior que zero**.

### Exemplo didático do fluxo

Controller:

```ts
@Post()
criar(@Body() dados) {
    return this.service.criar(dados);
}
```

Service:

```ts
criar(dados) {
    // validar regras

    // chamar repository
    return this.repository.criar(dados);
}
```

Repository (já pronto):

```ts
async criar(dados) {
    // persistir com TypeORM
}
```

---

## 16. Problemas comuns

### A API não inicia

- Confirme que você está na pasta `meu-app`.
- Confirme que executou `npm install`.
- Veja se a porta 3000 já está em uso por outro programa.

### Erro dizendo que o módulo não foi encontrado

Em geral falta instalar as dependências:

```bash
npm install
```

### Controller criado, mas a rota não aparece

- Confira o `@Controller('usuarios')` ou `@Controller('funcionarios')`.
- Confira se o Controller está declarado no `controllers` do módulo.
- Confira se o módulo está importado no `app.module.ts` (já está).

### Service não encontra o Repository

- O Repository precisa estar em `providers` no módulo (já está).
- O Service precisa receber o Repository no `constructor` (já está).
- Não instancie o Repository com `new`.

### Erro ao cadastrar e-mail ou CPF repetido

A tabela tem `UNIQUE` nesses campos. Mesmo assim, a validação de unicidade deve ser feita no **Service** (regras de negócio), não no Repository.

### O banco não aparece na pasta `database`

- A aplicação precisa ter iniciado com sucesso.
- O arquivo é criado em `meu-app/database/meu-app.sqlite` (relativo à pasta de onde você executou o comando).
- Execute sempre `npm run start:dev` de dentro de `meu-app`.

### Alterações no código não recarregam

Use `npm run start:dev` (modo watch). O comando `npm start` não observa mudanças.

---

## 17. Problemas com o SQLite

O pacote `better-sqlite3` possui **componentes nativos**. Dependendo do sistema operacional, da versão do Node.js ou de ferramentas de compilação, o driver pode falhar na instalação.

Se aparecer erro relacionado ao driver SQLite ou ao módulo nativo, siga estes passos.

### 1. Remover `node_modules`

Linux / macOS:

```bash
rm -rf node_modules
```

Windows (Prompt de Comando):

```bat
rmdir /s /q node_modules
```

Windows (PowerShell):

```powershell
Remove-Item -Recurse -Force node_modules
```

### 2. Remover `package-lock.json` se necessário

```bash
del package-lock.json
```

No PowerShell:

```powershell
Remove-Item package-lock.json
```

### 3. Instalar novamente

```bash
npm install
```

### 4. Recompilar o driver

```bash
npm rebuild better-sqlite3
```

Se ainda falhar:

```bash
npm install better-sqlite3 --build-from-source
```

No Windows, a compilação a partir do código-fonte pode exigir ferramentas de build (Visual Studio Build Tools).

### 5. Subir a API novamente

```bash
npm run start:dev
```

### Por que isso acontece?

O `better-sqlite3` não é feito só de JavaScript. Ele usa um módulo nativo compilado para o seu sistema. Se o binário pronto não bater com a sua versão do Node.js, é preciso recompilar.

---

## Objetivo pedagógico

Ao final da atividade, você deverá compreender:

1. O que é um Controller.
2. O que é um Service.
3. O que é um Repository.
4. O que é uma camada de persistência.
5. Como o NestJS faz injeção de dependência.
6. Como um Service utiliza um Repository.
7. Como um Repository usa o TypeORM.
8. Como o SQLite armazena os dados.
9. Como uma requisição HTTP percorre as camadas da aplicação.

E deverá conseguir construir sozinho:

```text
POST /usuarios
       ↓
UsuarioController
       ↓
UsuarioService
       ↓
UsuarioRepository
       ↓
SQLite
```

repetindo o mesmo padrão para **Funcionario**.
