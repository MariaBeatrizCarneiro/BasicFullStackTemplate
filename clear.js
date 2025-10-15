require('dotenv').config();
const mongoose = require('mongoose');
const Nome = require('./models/Nome');
const Apelido = require('./models/Apelido');
const Historico = require('./models/Historico');

async function limparBaseDados() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const resultados = await Promise.all([
      Nome.deleteMany({}),
      Apelido.deleteMany({}),
      Historico.deleteMany({})
    ]);

    console.log('Base de dados limpa com sucesso!');

  } catch (error) {
    console.error('Erro ao limpar base de dados:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

limparBaseDados();