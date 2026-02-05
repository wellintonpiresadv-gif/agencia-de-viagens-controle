
import React, { useState } from 'react';
import { CHANNELS } from '../constants';

interface Props {
  onSimulate: (payload: any) => void;
}

const WebhookSimulator: React.FC<Props> = ({ onSimulate }) => {
  const [selectedOrigin, setSelectedOrigin] = useState(CHANNELS[0].id);
  const [clientNumber, setClientNumber] = useState('+55119' + Math.floor(Math.random() * 90000000 + 10000000));
  const [clientName, setClientName] = useState('Cliente Teste');
  const [message, setMessage] = useState('Olá, esta é uma mensagem de teste!');

  const origin = CHANNELS.find(c => c.id === selectedOrigin);

  const handleSimulate = () => {
    onSimulate({
      origin_number: origin?.number,
      client_number: clientNumber,
      client_name: clientName,
      message: message,
      timestamp: new Date().toISOString(),
      provider: 'simulation_api'
    });
    setMessage('');
  };

  return (
    <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
      <h3 className="font-bold text-sm text-slate-700 mb-3 flex items-center">
        <span className="mr-2">🔌</span> Simulador de Webhook
      </h3>
      <div className="space-y-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase">Destino (Nossa Origem)</label>
          <select 
            className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
          >
            {CHANNELS.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.number})</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase">Num. Cliente</label>
            <input 
              className="w-full text-xs p-2 border border-slate-300 rounded"
              value={clientNumber}
              onChange={(e) => setClientNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase">Nome Cliente</label>
            <input 
              className="w-full text-xs p-2 border border-slate-300 rounded"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase">Mensagem</label>
          <textarea 
            className="w-full text-xs p-2 border border-slate-300 rounded h-16 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button 
          onClick={handleSimulate}
          className="w-full py-2 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-700 transition-colors"
        >
          Disparar Evento Webhook
        </button>
      </div>
    </div>
  );
};

export default WebhookSimulator;
