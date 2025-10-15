import { useState } from 'react';
import { carregarNomesAPI, carregarApelidosAPI, adicionarHistoricoAPI } from '../services/api';

export default function GerarNomeCompleto() {
  const [nomeCompleto, setNomeCompleto] = useState('');

  async function gerarNomeCompletoAPI() {
    try {
      const [nomes, apelidos] = await Promise.all([
        carregarNomesAPI(),
        carregarApelidosAPI()
      ]);

      if (nomes.length === 0 || apelidos.length === 0) {
        throw new Error('É necessário ter pelo menos um nome e um apelido cadastrados');
      }

      const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
      const apelidoAleatorio = apelidos[Math.floor(Math.random() * apelidos.length)];
      const nomeGerado = `${nomeAleatorio.nome} ${apelidoAleatorio.apelido}`;

      await adicionarHistoricoAPI(nomeGerado);

      setNomeCompleto(nomeGerado);
      window.dispatchEvent(new CustomEvent('historicoAtualizado'));

      return nomeGerado;

    } catch (error) {
      console.error('Erro ao gerar nome completo:', error);
      throw error;
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Gerar nome</h2>
      
      {nomeCompleto && (
        <h1 className="text-2xl font-bold mb-4 text-blue-600">{nomeCompleto}</h1>
      )}

      <button onClick={gerarNomeCompletoAPI} className="bg-blue-500 text-white px-6 py-3 rounded text-lg hover:bg-blue-600 disabled:opacity-50">
        Gerar nome
      </button>
    </div>
  );
}
