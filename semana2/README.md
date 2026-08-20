# DESENVOLVIMENTO-DE-API-BACK-END

Repositório da disciplina **DESENVOLVIMENTO DE API BACK-END** (UniEVANGÉLICA).

O **código-fonte de cada aula** é disponibilizado em pastas nomeadas pela referência do dia da aula (ex.: `aula02`). Use o material de cada pasta como base e referência para os exercícios daquele encontro.

O **`app-base`** é o projeto base para **uso em sala de aula**. Pode ser baixado na **página do curso** e neste repositório no **GitHub**:

https://github.com/prof-carvalholucas/DESENVOLVIMENTO-DE-API-BACK-END

Texto pronto para a página dos estudantes: **[PAGINA-ESTUDANTES.md](./PAGINA-ESTUDANTES.md)**.

---

## Pastas das aulas

Cada pasta concentra o avanço daquele dia de aula — código desenvolvido em sala e material de referência.

| Pasta | Referência | Conteúdo |
|---|---|---|
| `aula02/app-base/` | Aula 02 (Semana 2) | Projeto base NestJS — métodos HTTP (GET, POST, PUT, DELETE) retornando Hello |

**Slides da Aula 02:** *Aula 02 — DABE — HTTP, HTTPS, REST* (disponíveis na página do curso).

Novas pastas (`aula03/`, `aula04/`, …) serão adicionadas conforme o andamento da disciplina.

---

## Tecnologias usadas

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

## Como usar o código de uma aula

Entre na pasta do projeto da aula desejada e siga o `README.md` interno. Exemplo com a Aula 02:

```bash
cd aula02/app-base
npm install
npm run start:dev
```

API em: `http://localhost:3000`

Detalhes do projeto base estão em **[aula02/app-base/README.md](./aula02/app-base/README.md)**.

