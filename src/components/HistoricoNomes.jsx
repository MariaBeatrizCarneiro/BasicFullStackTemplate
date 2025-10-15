import { useState, useEffect } from 'react';
import { carregarHistoricoAPI } from '../services/api';

export default function HistoricoNomes() {
  const [historico, setHistorico] = useState([]);

  async function carregarHistorico() {
    try {
      const data = await carregarHistoricoAPI();
      setHistorico(data);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  }

  useEffect(() => {
    carregarHistorico();

    const handleHistoricoAtualizado = () => {
      carregarHistorico();
    };

    window.addEventListener('historicoAtualizado', handleHistoricoAtualizado);

    return () => {
      window.removeEventListener('historicoAtualizado', handleHistoricoAtualizado);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Histórico</h2>
      
      <div>
        {historico.map((item) => (
          <div key={item._id}>
            {item.nomeCompleto}
          </div>
        ))}
      </div>
    </div>
  );
}
