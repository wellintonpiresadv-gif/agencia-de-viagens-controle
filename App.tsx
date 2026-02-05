
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Conversation, Message, OriginChannel, MessageSource } from './types';
import { CHANNELS, MOCK_CONVERSATIONS } from './constants';
import { getSmartSuggestion } from './services/geminiService';
import ConversationItem from './components/ConversationItem';
import ArchitectureView from './components/ArchitectureView';
import WebhookSimulator from './components/WebhookSimulator';
import IntegrationsView from './components/IntegrationsView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'architecture' | 'integrations'>('chats');
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string | null>(MOCK_CONVERSATIONS[0].id);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'conv-1': [
      { id: 'm1', conversationId: 'conv-1', sender: 'client', content: 'Olá, gostaria de saber sobre o boleto.', timestamp: new Date(Date.now() - 1000 * 60 * 5), originId: 'orig-2' }
    ],
    'conv-2': [
      { id: 'm2', conversationId: 'conv-2', sender: 'client', content: 'Pode me enviar o catálogo atualizado?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), originId: 'orig-1' },
      { id: 'm3', conversationId: 'conv-2', sender: 'agent', content: 'Claro Maria! Um momento por favor.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.9), originId: 'orig-1' }
    ]
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConvId);
  const currentMessages = activeConvId ? (messages[activeConvId] || []) : [];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeConvId]);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim() || !activeConvId || !activeConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId: activeConvId,
      sender: 'agent',
      content: inputValue,
      timestamp: new Date(),
      originId: activeConversation.originId
    };

    setMessages(prev => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMessage]
    }));

    setConversations(prev => prev.map(c => 
      c.id === activeConvId 
        ? { ...c, lastMessage: inputValue, lastUpdate: new Date(), unreadCount: 0 } 
        : c
    ));

    setInputValue('');
  }, [inputValue, activeConvId, activeConversation]);

  const handleWebhookEvent = (payload: any) => {
    const origin = CHANNELS.find(c => c.number === payload.origin_number);
    if (!origin) return;

    const existingConv = conversations.find(c => c.clientNumber === payload.client_number && c.originId === origin.id);
    const convId = existingConv ? existingConv.id : `conv-${Date.now()}`;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      sender: 'client',
      content: payload.message,
      timestamp: new Date(),
      originId: origin.id
    };

    if (existingConv) {
      setConversations(prev => prev.map(c => 
        c.id === convId 
          ? { ...c, lastMessage: payload.message, lastUpdate: new Date(), unreadCount: c.id === activeConvId ? 0 : c.unreadCount + 1 }
          : c
      ));
    } else {
      const newConv: Conversation = {
        id: convId,
        clientName: payload.client_name || 'Novo Cliente',
        clientNumber: payload.client_number,
        lastMessage: payload.message,
        lastUpdate: new Date(),
        originId: origin.id,
        unreadCount: activeConvId === convId ? 0 : 1,
        status: 'pending'
      };
      setConversations(prev => [newConv, ...prev]);
    }

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMessage]
    }));
  };

  const generateAIResponse = async () => {
    if (!activeConvId || currentMessages.length === 0) return;
    setIsGeneratingAI(true);
    const context = currentMessages.slice(-5).map(m => `${m.sender}: ${m.content}`).join('\n');
    const suggestion = await getSmartSuggestion(context);
    setInputValue(suggestion);
    setIsGeneratingAI(false);
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* App Sidebar */}
      <div className="w-20 flex flex-col items-center py-6 bg-slate-900 text-white border-r border-slate-800">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-10 shadow-lg shadow-indigo-500/30">
          <span className="text-xl font-black">OC</span>
        </div>
        
        <nav className="flex flex-col gap-6">
          <button 
            onClick={() => setActiveTab('chats')}
            title="Atendimentos"
            className={`p-3 rounded-xl transition-all ${activeTab === 'chats' ? 'bg-indigo-600 shadow-md' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
          
          <button 
            onClick={() => setActiveTab('architecture')}
            title="Arquitetura"
            className={`p-3 rounded-xl transition-all ${activeTab === 'architecture' ? 'bg-indigo-600 shadow-md' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </button>

          <button 
            onClick={() => setActiveTab('integrations')}
            title="Integrações Práticas"
            className={`p-3 rounded-xl transition-all ${activeTab === 'integrations' ? 'bg-indigo-600 shadow-md' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
          </button>
        </nav>

        <div className="mt-auto">
          <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-indigo-500 overflow-hidden">
            <img src="https://picsum.photos/100" alt="Avatar" />
          </div>
        </div>
      </div>

      {activeTab === 'chats' ? (
        <>
          <div className="w-80 md:w-96 flex flex-col bg-white border-r border-slate-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Mensagens</h2>
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">
                {conversations.length} Ativas
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.sort((a, b) => b.lastUpdate.getTime() - a.lastUpdate.getTime()).map(conv => (
                <ConversationItem 
                  key={conv.id} 
                  conversation={conv} 
                  isActive={activeConvId === conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
                  }}
                />
              ))}
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <WebhookSimulator onSimulate={handleWebhookEvent} />
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-slate-50 relative">
            {activeConversation ? (
              <>
                <header className="bg-white p-4 border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {activeConversation.clientName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 leading-none mb-1">{activeConversation.clientName}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{activeConversation.clientNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {CHANNELS.find(c => c.id === activeConversation.originId) && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
                        <span className={`w-2 h-2 rounded-full ${CHANNELS.find(c => c.id === activeConversation.originId)?.color}`}></span>
                        <span className="text-xs font-semibold text-slate-600">
                          {CHANNELS.find(c => c.id === activeConversation.originId)?.name}
                        </span>
                      </div>
                    )}
                  </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {currentMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm text-sm ${
                        msg.sender === 'agent' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <div className={`text-[10px] mt-2 flex items-center gap-1 ${msg.sender === 'agent' ? 'text-indigo-200 justify-end' : 'text-slate-400'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-slate-200">
                  <div className="max-w-4xl mx-auto space-y-3">
                    <div className="flex gap-2">
                       <button 
                        onClick={generateAIResponse}
                        disabled={isGeneratingAI}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        {isGeneratingAI ? '...' : '✨ Sugerir Resposta'}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <textarea
                        rows={1}
                        placeholder="Digite sua resposta..."
                        className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                      />
                      <button 
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50"
                      >
                        ➔
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <p>Selecione um chat para começar.</p>
              </div>
            )}
          </div>
        </>
      ) : activeTab === 'architecture' ? (
        <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
           <div className="max-w-5xl mx-auto">
             <ArchitectureView />
           </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
          <div className="max-w-5xl mx-auto">
            <IntegrationsView />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
