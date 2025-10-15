require('dotenv').config();
const mongoose = require('mongoose');
const Nome = require('./models/Nome');
const Apelido = require('./models/Apelido');
const Historico = require('./models/Historico');

const nomesIniciais = [
  'Ana', 'Bruno', 'Filipe',
  'Isabel', 'Maria', 'Paulo',
  'Sofia', 'Zé', 'Beatriz' 
];

const apelidosIniciais = [
  'Silva', 'Santos', 'Costa',
  'Sousa', 'Nunes', 'Almeida',
  'Monteiro', 'Rocha', 'Neves'
];

async function popularBaseDados() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Limpar dados existentes
    await Promise.all([
      Nome.deleteMany({}),
      Apelido.deleteMany({}),
      Historico.deleteMany({})
    ]);

    // Inserir nomes
    const nomes = await Nome.insertMany(
      nomesIniciais.map(nome => ({ nome }))
    );

    // Inserir apelidos
    const apelidos = await Apelido.insertMany(
      apelidosIniciais.map(apelido => ({ apelido }))
    );

    console.log('Base de dados populada com sucesso!');

  } catch (error) {
    console.error('Erro ao popular base de dados:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

popularBaseDados();
