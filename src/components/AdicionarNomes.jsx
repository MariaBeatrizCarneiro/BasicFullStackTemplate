import { useState, useEffect } from 'react';
import { carregarNomesAPI, adicionarNomeAPI } from '../services/api';

export default function AdicionarNomes() {
  const [nomes, setNomes] = useState([]);
  const [novoNome, setNovoNome] = useState('');

  async function carregarNomes() {
    try {
      const data = await carregarNomesAPI();
      setNomes(data);
    } catch (error) {
      console.error('Erro ao carregar nomes:', error);
    }
  }

  async function adicionarNome(e) {
    e.preventDefault();
    if (!novoNome) return;
    try {
      await adicionarNomeAPI(novoNome);
      setNovoNome('');
      await carregarNomes();
    } catch (error) {
      console.error('Erro ao adicionar nome:', error);
    }
  }

  useEffect(() => {
    carregarNomes();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Adicionar Nomes</h2>
      
      <form onSubmit={adicionarNome} className="flex gap-1 mb-3">
        <input
          type="text"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          placeholder="Nome"
          className="flex-1 border border-gray-300 ps-3 py-2 rounded"
        />
        <button type="submit" disabled={!novoNome} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Adicionar
        </button>
      </form>

      <div>
        {nomes.map((nome) => (
          <div key={nome._id}>{nome.nome}</div>
        ))}
      </div>
    </div>
  );
}
