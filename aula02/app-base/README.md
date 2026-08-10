# Aula 02 — App Base (Template Básico)

Código-fonte da **Aula 02** (Semana 2) da disciplina **DESENVOLVIMENTO-DE-API-BACK-END**.

O **`app-base`** é o projeto base para **uso em sala de aula** — referência para os exercícios do dia.  
Pode ser baixado na **página do curso** e no **GitHub** do professor:

https://github.com/prof-carvalholucas/DESENVOLVIMENTO-DE-API-BACK-END

**Exercício 1:** entender os métodos HTTP básicos — cada um retorna só um **Hello**.

---

## Tecnologias e versões

| Tecnologia | Versão (aprox.) | Para que serve |
|---|---|---|
| **Node.js** | 18+ ou 20 LTS | Runtime JavaScript no servidor |
| **npm** | 9+ | Gerenciador de pacotes |
| **NestJS** | 10.x | Framework para APIs em Node.js |
| **TypeScript** | 5.x | Tipagem sobre JavaScript |

```bash
node -v
npm -v
```

---

## Pré-requisitos

1. **Node.js** (LTS): https://nodejs.org/
2. Editor (VS Code / Cursor)
3. Cliente HTTP: Insomnia, Postman ou REST Client

---

## Como subir o projeto

```bash
npm install
npm run start:dev
```

API em: `http://localhost:3000`

---

## O que aparece após o `npm install` (normal em sala)

Ao rodar `npm install`, o terminal pode mostrar avisos. **Isso é comum** e, neste exercício, não impede de continuar.

### 1) Pacote deprecated (`glob`)

Exemplo:

```text
npm warn deprecated glob@10.4.5: Old versions of glob are not supported...
```

Significa que alguma dependência do NestJS ainda usa uma versão antiga do `glob`.  
**Para a aula:** pode ignorar e seguir com `npm run start:dev`.

### 2) Resumo da instalação

Exemplo:

```text
added 358 packages, and audited 359 packages in 1m
75 packages are looking for funding
  run `npm fund` for details
```

- `added ... packages` → dependências instaladas com sucesso em `node_modules/`
- `npm fund` → só mostra projetos que pedem financiamento; **não é obrigatório**

### 3) Vulnerabilidades (`npm audit`)

Exemplo:

```text
20 vulnerabilities (3 low, 11 moderate, 6 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force
```

| Comando | Quando usar |
|---|---|
| `npm audit` | Só consultar o relatório |
| `npm audit fix` | Tentar corrigir sem mudanças grandes |
| `npm audit fix --force` | **Evitar em sala** — pode quebrar o projeto |

**Para a aula:** se o `npm run start:dev` funcionar, pode seguir. Ajustes de segurança ficam para outro momento.

### 4) Aviso de scripts do NestJS (`allow-scripts`)

Exemplo:

```text
@nestjs/core@10.4.22 has install scripts that have not yet been approved by you
run `npm approve-scripts --allow-scripts-pending` to interactively review...
```

Em alguns ambientes (npm mais restrito), scripts de instalação precisam de aprovação.  
Se o Nest não subir por causa disso, rode:

```bash
npm approve-scripts --allow-scripts-pending
```

(ou siga a orientação do professor / do ambiente da máquina)

### 5) Aviso de nova versão do npm

Exemplo:

```text
New major version of npm available! 10.8.2 -> 11.0.0
npm install -g npm@11.0.0
```

É só um aviso de atualização. **Não é necessário** atualizar o npm para fazer este exercício.


## Estrutura do projeto

```text
app-back/
├── package.json
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── .gitignore
├── README.md
├── EXERCICIOS.md
└── src/
    ├── main.ts            # Sobe o servidor
    ├── app.module.ts      # Módulo raiz
    ├── app.controller.ts  # Rotas GET, POST, PUT, DELETE
    └── app.service.ts     # Retorna as mensagens Hello
```

---

## Explicação de cada arquivo

| Arquivo | Explicação |
|---|---|
| `package.json` | Dependências e scripts (`start:dev`, `build`…). |
| `nest-cli.json` | Configuração do Nest CLI (`sourceRoot: src`). |
| `tsconfig.json` | Configuração do TypeScript. |
| `tsconfig.build.json` | Config do build. |
| `.gitignore` | Ignora `node_modules/`, `dist/`, etc. |
| `main.ts` | Ponto de entrada: cria o app e escuta a porta 3000. |
| `app.module.ts` | Módulo raiz — registra controller e service. |
| `app.controller.ts` | Define as rotas com `@Get`, `@Post`, `@Put`, `@Delete`. |
| `app.service.ts` | Contém as mensagens `"Hello GET"`, `"Hello POST"`, etc. |

### Conceitos rápidos

- **Controller** → recebe a requisição HTTP
- **Service** → devolve a resposta
- **Module** → junta controller + service

---

## Comandos úteis

| Comando | Descrição |
|---|---|
| `npm run start:dev` | Sobe com hot-reload |
| `npm run start` | Sobe uma vez |
| `npm run build` | Compila para `dist/` |

Veja o roteiro em **[EXERCICIOS.md](./EXERCICIOS.md)**.
