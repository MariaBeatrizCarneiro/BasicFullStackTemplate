import { useState, useEffect } from 'react';
import { carregarApelidosAPI, adicionarApelidoAPI } from '../services/api';

export default function AdicionarApelidos() {
  const [apelidos, setApelidos] = useState([]);
  const [novoApelido, setNovoApelido] = useState('');

  async function carregarApelidos() {
    try {
      const data = await carregarApelidosAPI();
      setApelidos(data);
    } catch (error) {
      console.error('Erro ao carregar apelidos:', error);
    }
  }

  async function adicionarApelido(e) {
    e.preventDefault();
    if (!novoApelido) return;
    try {
      await adicionarApelidoAPI(novoApelido);
      setNovoApelido('');
      await carregarApelidos();
    } catch (error) {
      console.error('Erro ao adicionar apelido:', error);
    }
  }

  useEffect(() => {
    carregarApelidos();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Adicionar Apelidos</h2>
      
      <form onSubmit={adicionarApelido} className="flex gap-1 mb-3">
        <input
          type="text"
          value={novoApelido}
          onChange={(e) => setNovoApelido(e.target.value)}
          placeholder="Apelido"
          className="flex-1 border border-gray-300 ps-3 py-2 rounded"
        />
        <button type="submit" disabled={!novoApelido} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Adicionar
        </button>
      </form>

      <div>
        {apelidos.map((apelido) => (
          <div key={apelido._id}>{apelido.apelido}</div>
        ))}
      </div>
    </div>
  );
}
