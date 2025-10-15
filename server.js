const express = require('express');
const next = require('next');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./lib/mongodb');
const Nome = require('./models/Nome');
const Apelido = require('./models/Apelido');
const Historico = require('./models/Historico');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
app.use(cors());
app.use(express.json());




// GET /api/nomes - Retorna todos os nomes existentes
app.get('/api/nomes', async (req, res) => {
  try {
    const nomes = await Nome.find().sort({ nome: 1 });
    res.json(nomes);
  } catch (error) {
    console.error('Erro ao carregar nomes:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// POST /api/nomes - Adiciona um novo nome à coleção "nomes"
app.post('/api/nomes', async (req, res) => {
  try {
    const { nome } = req.body;
    
    if (!nome || !nome.trim()) {
      return res.status(400).json({ erro: 'Nome é obrigatório' });
    }

    const novoNome = new Nome({ nome: nome.trim() });
    const nomeSalvo = await novoNome.save();
    res.status(201).json(nomeSalvo);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ erro: 'Este nome já existe' });
    }
    console.error('Erro ao criar nome:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});


// GET /api/apelidos - Retorna todos os apelidos existentes
app.get('/api/apelidos', async (req, res) => {
  try {
    const apelidos = await Apelido.find().sort({ apelido: 1 });
    res.json(apelidos);
  } catch (error) {
    console.error('Erro ao carregar apelidos:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

app.post('/api/apelidos', async (req, res) => {
  try {
    const { apelido } = req.body;
    
    if (!apelido || !apelido.trim()) {
      return res.status(400).json({ erro: 'Apelido é obrigatório' });
    }

    const novoApelido = new Apelido({ apelido: apelido.trim() });
    const apelidoSalvo = await novoApelido.save();
    res.status(201).json(apelidoSalvo);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ erro: 'Este apelido já existe' });
    }
    console.error('Erro ao criar apelido:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// GET /api/historico - Retorna o histórico de nomes completos gerados
app.get('/api/historico', async (req, res) => {
  try {
    const historico = await Historico.find().sort({ criadoEm: -1 });
    res.json(historico);
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// POST /api/historico - Adiciona o nome completo gerado à coleção de "histórico"
app.post('/api/historico', async (req, res) => {
  try {
    const { nomeCompleto } = req.body;
    
    if (!nomeCompleto || !nomeCompleto.trim()) {
      return res.status(400).json({ erro: 'Nome completo é obrigatório' });
    }

    const novoHistorico = new Historico({ nomeCompleto: nomeCompleto.trim() });
    const historicoSalvo = await novoHistorico.save();
    res.status(201).json(historicoSalvo);
  } catch (error) {
    console.error('Erro ao salvar no histórico:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});



// ===== INICIALIZAÇÃO DO SERVIDOR =====

app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await nextApp.prepare();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor Next.js + Express a correr em http://localhost:${PORT}`);
      console.log(`📡 API disponível em:`);
      console.log(`   - Nomes: http://localhost:${PORT}/api/nomes`);
      console.log(`   - Apelidos: http://localhost:${PORT}/api/apelidos`);
      console.log(`   - Histórico: http://localhost:${PORT}/api/historico`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();
