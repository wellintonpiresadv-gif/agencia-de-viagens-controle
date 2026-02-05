
import React from 'react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold mb-6 text-slate-800">Fluxo Lógico do Sistema (Arquitetura)</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Step 1: External Client */}
        <div className="flex flex-col items-center p-4 border-2 border-dashed border-slate-300 rounded-lg w-full md:w-48 text-center">
          <div className="text-3xl mb-2">📱</div>
          <span className="font-semibold text-sm">Cliente Final</span>
          <span className="text-xs text-slate-500">Qualquer App (WA, TG, SMS)</span>
        </div>

        <div className="hidden md:block text-slate-400">➔</div>

        {/* Step 2: API Provider */}
        <div className="flex flex-col items-center p-4 bg-slate-100 rounded-lg w-full md:w-48 text-center">
          <div className="text-3xl mb-2">☁️</div>
          <span className="font-semibold text-sm">Provider API</span>
          <span className="text-xs text-slate-500">Twilio / Evolution / WPPConnect</span>
        </div>

        <div className="hidden md:block text-slate-400">➔</div>

        {/* Step 3: Our Webhook */}
        <div className="flex flex-col items-center p-4 bg-indigo-600 text-white rounded-lg w-full md:w-48 text-center shadow-md">
          <div className="text-3xl mb-2">⚡</div>
          <span className="font-semibold text-sm">Nosso Webhook</span>
          <span className="text-xs text-indigo-100">Processamento & Validação</span>
        </div>

        <div className="hidden md:block text-slate-400">➔</div>

        {/* Step 4: Database & Front */}
        <div className="flex flex-col items-center p-4 bg-slate-800 text-white rounded-lg w-full md:w-48 text-center shadow-md">
          <div className="text-3xl mb-2">🖥️</div>
          <span className="font-semibold text-sm">Dashboard Admin</span>
          <span className="text-xs text-slate-400">Socket.io / React Front</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-2">1. Recebimento (Inbound)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            O Webhook recebe o JSON. O sistema identifica o <code className="bg-slate-200 px-1 rounded">origin_number</code>. 
            Busca no DB se existe conversa ativa. Se não, cria uma nova na fila pendente. Notifica via WebSocket para atualização em tempo real no Dashboard.
          </p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-2">2. Resposta (Outbound)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ao responder, o frontend envia o ID da conversa. O backend recupera qual <code className="bg-slate-200 px-1 rounded">origin_id</code> está atrelado e faz a requisição para o Provider correto usando as credenciais daquela origem específica.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
