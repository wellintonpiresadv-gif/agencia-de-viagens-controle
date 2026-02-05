
import React from 'react';
import { Conversation, OriginChannel } from '../types';
import { CHANNELS } from '../constants';

interface Props {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<Props> = ({ conversation, isActive, onClick }) => {
  const origin = CHANNELS.find(c => c.id === conversation.originId);
  const time = conversation.lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div 
      onClick={onClick}
      className={`p-4 cursor-pointer transition-all border-b border-slate-100 flex items-start gap-3 hover:bg-slate-50 ${isActive ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'bg-white'}`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
          {conversation.clientName.charAt(0)}
        </div>
        {conversation.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
            {conversation.unreadCount}
          </span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold text-sm text-slate-900 truncate">{conversation.clientName}</h4>
          <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{time}</span>
        </div>
        <p className="text-xs text-slate-500 truncate mb-2">{conversation.lastMessage}</p>
        
        {origin && (
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${origin.color}`}></span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{origin.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
