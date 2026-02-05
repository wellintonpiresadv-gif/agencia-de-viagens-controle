
import { OriginChannel, MessageSource } from './types';

export const CHANNELS: OriginChannel[] = [
  { id: 'orig-1', name: 'Suporte Vendas', number: '+5511999990001', type: MessageSource.WHATSAPP, color: 'bg-green-500' },
  { id: 'orig-2', name: 'Financeiro', number: '+5511999990002', type: MessageSource.WHATSAPP, color: 'bg-emerald-600' },
  { id: 'orig-3', name: 'SAC Geral', number: '+5511988881111', type: MessageSource.TELEGRAM, color: 'bg-sky-500' },
];

export const MOCK_CONVERSATIONS = [
  {
    id: 'conv-1',
    clientName: 'João Silva',
    clientNumber: '+5511912345678',
    lastMessage: 'Olá, gostaria de saber sobre o boleto.',
    lastUpdate: new Date(Date.now() - 1000 * 60 * 5),
    originId: 'orig-2',
    unreadCount: 1,
    status: 'pending' as const
  },
  {
    id: 'conv-2',
    clientName: 'Maria Oliveira',
    clientNumber: '+5511987654321',
    lastMessage: 'Pode me enviar o catálogo atualizado?',
    lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 2),
    originId: 'orig-1',
    unreadCount: 0,
    status: 'active' as const
  }
];
