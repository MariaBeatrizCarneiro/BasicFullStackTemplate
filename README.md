# 🚀 Gerador de Nomes - FullStack App

Uma aplicação FullStack para gerar nomes completos aleatórios a partir de nomes e apelidos armazenados. Desenvolvida com Next.js, Express e MongoDB.

## Tecnologias Utilizadas

- **Frontend**: Next.js 15 + React 19 + TailwindCSS
- **Backend**: Express.js + Node.js  
- **Base de Dados**: MongoDB + Mongoose
- **Dev Tools**: Nodemon, ESLint

## Funcionalidades

### Interface Única com 4 Componentes:
1. **AdicionarNomes.jsx** - Adicionar e listar nomes disponíveis
2. **AdicionarApelidos.jsx** - Adicionar e listar apelidos disponíveis  
3. **GerarNomeCompleto.jsx** - Gerar nomes aleatórios (botão + tecla Espaço)
4. **HistoricoNomes.jsx** - Visualizar histórico de nomes gerados

### API REST com 6 Endpoints:
- **Nomes**: `GET/POST /api/nomes`
- **Apelidos**: `GET/POST /api/apelidos`  
- **Histórico**: `GET/POST /api/historico`

### Base de Dados MongoDB:
- **nomes** → `{ nome: String }`
- **apelidos** → `{ apelido: String }`
- **historico** → `{ nomeCompleto: String, criadoEm: Date }`

## Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Criar ficheiro `.env` na raiz:
```env
MONGODB_URI=mongodb://localhost:27017/gerador-nomes
PORT=3000
```

### 3. Popular Base de Dados (Opcional)
```bash
npm run seed
```

### 4. Executar Aplicação
```bash
npm run dev
```

### 5. Aceder à Aplicação
- **Interface**: http://localhost:3000
- **API Nomes**: http://localhost:3000/api/nomes
- **API Apelidos**: http://localhost:3000/api/apelidos
- **API Histórico**: http://localhost:3000/api/historico

## Estrutura do Projeto

```
├── lib/
│   └── mongodb.js              # Conexão MongoDB
├── models/
│   ├── Nome.js                 # Schema Nomes
│   ├── Apelido.js             # Schema Apelidos
│   └── Historico.js           # Schema Histórico
├── src/
│   ├── components/
│   │   ├── AdicionarNomes.jsx
│   │   ├── AdicionarApelidos.jsx
│   │   ├── GerarNomeCompleto.jsx
│   │   ├── HistoricoNomes.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── index.js           # Página principal
│   │   ├── _app.js
│   │   └── _document.js
│   ├── services/
│   │   └── api.js             # Funções API
│   └── styles/
│       └── globals.css
├── server.js                  # Servidor Express
├── seed-nomes.js             # Script popular dados
├── package.json
└── README.md
```

## Como Usar

1. **Adicione nomes e apelidos** usando os formulários
2. **Gere nomes completos** clicando no botão ou pressionando **Espaço**
3. **Veja o histórico** de todos os nomes gerados
4. **Use as APIs** diretamente nos links fornecidos

## Scripts Disponíveis

- `npm run dev` - Executar em desenvolvimento
- `npm run build` - Construir para produção  
- `npm run start` - Executar em produção
- `npm run seed` - Popular base de dados com dados iniciais

## Características Especiais

- **Tecla Espaço** para gerar nomes rapidamente
- **Atualização automática** do histórico
- **Interface responsiva** com TailwindCSS
- **Validações** para evitar duplicatas
- **Performance otimizada** com carregamento assíncrono

---

## Desenvolvido por Maria Beatriz Carneiro
**Desafio FullStack** - Gerador de Nomes Completos
