
export enum MessageSource {
  WHATSAPP = 'whatsapp',
  TELEGRAM = 'telegram',
  SMS = 'sms'
}

export interface OriginChannel {
  id: string;
  name: string;
  number: string;
  type: MessageSource;
  color: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'client' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  originId: string; // The ID of our number that received/sent the message
}

export interface Conversation {
  id: string;
  clientName: string;
  clientNumber: string;
  lastMessage: string;
  lastUpdate: Date;
  originId: string;
  unreadCount: number;
  status: 'pending' | 'active' | 'closed';
}

export interface WebhookPayload {
  origin_number: string;
  client_number: string;
  client_name?: string;
  message: string;
  timestamp: string;
  provider: string;
  media_url?: string;
}
