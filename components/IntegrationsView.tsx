
import React from 'react';

const IntegrationsView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-black text-slate-800 mb-2">Como colocar em prática? 🚀</h1>
        <p className="text-slate-500 mb-8">Siga este roteiro técnico para transformar este dashboard em uma central de atendimento real.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold mb-4">1</div>
            <h3 className="font-bold text-indigo-900 mb-2">Hospedagem (VPS)</h3>
            <p className="text-xs text-indigo-700 leading-relaxed">
              Contrate uma VPS (DigitalOcean, AWS ou Hetzner). Você precisará de Docker instalado para rodar os provedores de mensagem com facilidade.
            </p>
          </div>
          
          <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold mb-4">2</div>
            <h3 className="font-bold text-emerald-900 mb-2">Evolution API</h3>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Instale a <b>Evolution API</b> via Docker. Ela permite gerenciar múltiplos números de WhatsApp em uma única instância com alta performance.
            </p>
          </div>
          
          <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
            <div className="w-10 h-10 bg-amber-600 text-white rounded-lg flex items-center justify-center font-bold mb-4">3</div>
            <h3 className="font-bold text-amber-900 mb-2">Nginx & SSL</h3>
            <p className="text-xs text-amber-700 leading-relaxed">
              Configure um Proxy Reverso (Nginx) com HTTPS (Let's Encrypt). O WhatsApp exige que seu endpoint de Webhook seja seguro (HTTPS).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Step 1: Install Evolution API */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-emerald-500">📦</span> Passo 1: Rodar Provedor (Evolution)
          </h3>
          <p className="text-xs text-slate-500 mb-4">Execute este comando na sua VPS para subir o serviço de mensagens:</p>
          <div className="bg-slate-900 p-4 rounded-xl font-mono text-[10px] text-slate-300 leading-relaxed overflow-x-auto">
            <div>docker run -d --name evolution-api \</div>
            <div>-p 8080:8080 \</div>
            <div>-e AUTH_API_KEY=sua_chave_mestra \</div>
            <div>-v evolution_instances:/evolution/instances \</div>
            <div>atendai/evolution-api:latest</div>
          </div>
        </div>

        {/* Step 2: Configure Webhook */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-indigo-500">🔗</span> Passo 2: Configurar Webhook
          </h3>
          <p className="text-xs text-slate-500 mb-4">Configure o Evolution para enviar mensagens para o seu backend:</p>
          <div className="bg-slate-900 p-4 rounded-xl font-mono text-[10px] text-emerald-400 leading-relaxed overflow-x-auto">
            <div>POST /webhook/set</div>
            <div>{`{`}</div>
            <div>  "url": "https://seu-dominio.com/api/webhook",</div>
            <div>  "enabled": true,</div>
            <div>  "events": ["MESSAGES_UPSERT", "SEND_MESSAGE"]</div>
            <div>{`}`}</div>
          </div>
        </div>
      </div>

      {/* Connection Flow Card */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white">
        <h2 className="text-xl font-bold mb-6 text-center">Conexão em Tempo Real (O Pulo do Gato) 🐈</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-slate-700">
              💬
            </div>
            <span className="text-xs font-bold text-slate-400">EVOLUTION API</span>
          </div>
          
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
              WEBHOOK (POST)
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-slate-700 ring-2 ring-indigo-500">
              🛠️
            </div>
            <span className="text-xs font-bold text-slate-400">SEU BACKEND</span>
          </div>

          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
              WEBSOCKET (IO)
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-slate-700">
              💻
            </div>
            <span className="text-xs font-bold text-slate-400">DASHBOARD</span>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-xs text-slate-400 leading-relaxed">
          <b>Dica de Ouro:</b> No seu backend, use <b>Socket.io</b>. Assim que o Webhook da Evolution bater na sua rota <code>/api/webhook</code>, você dispara um evento <code>io.emit('nova_mensagem', data)</code>. O Dashboard (este sistema que você está vendo) vai capturar esse evento instantaneamente e mostrar a mensagem na tela sem que o atendente precise atualizar a página.
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="text-blue-500">🛡️</span> Recomendações Legais e Anti-Bloqueio
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="font-bold text-sm mb-1">Aqueça o Chip</h4>
            <p className="text-[11px] text-slate-500">Nunca conecte um número novo e dispare 1000 mensagens. Use o número normalmente por 15 dias antes de automatizar.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h4 className="font-bold text-sm mb-1">Use APIs Oficiais para Escala</h4>
            <p className="text-[11px] text-slate-500">Se o volume passar de 500 mensagens/dia, migre para a API Business Cloud da Meta (via Twilio ou 360Dialog) para evitar banimentos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsView;
