import { apiClient } from './api';

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export const messagingService = {
  async getConversations(): Promise<Conversation[]> {
    const response = await apiClient.get('/api/messaging/conversations');
    return response.data;
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    const response = await apiClient.get(`/api/messaging/conversations/${conversationId}/messages`);
    return response.data;
  },

  async sendMessage(conversationId: string, content: string): Promise<Message> {
    const response = await apiClient.post(`/api/messaging/conversations/${conversationId}/messages`, {
      content
    });
    return response.data;
  },

  async markAsRead(conversationId: string): Promise<void> {
    await apiClient.post(`/api/messaging/conversations/${conversationId}/read`);
  }
};
