export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  readBy: Set<string>;
}

export interface Conversation {
  id: string;
  participantIds: [string, string];
  messages: Message[];
}

class MessagingRepo {
  conversations: Map<string, Conversation> = new Map();

  private convKey(a: string, b: string) {
    return [a, b].sort().join('|');
  }

  private ensureConversation(a: string, b: string) {
    const key = this.convKey(a, b);
    let c = this.conversations.get(key);
    if (!c) {
      c = { id: `conv_${Date.now()}_${Math.random().toString(36).slice(2,6)}`, participantIds: [a, b], messages: [] };
      this.conversations.set(key, c);
    }
    return c;
  }

  sendMessage(senderId: string, recipientId: string, content: string) {
    const conv = this.ensureConversation(senderId, recipientId);
    const msg: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
      conversationId: conv.id,
      senderId,
      content,
      timestamp: new Date().toISOString(),
      readBy: new Set([senderId]),
    };
    conv.messages.push(msg);
    return { conversation: conv, message: msg };
  }

  listConversations(userId: string) {
    const list: Conversation[] = [];
    this.conversations.forEach((c) => {
      if (c.participantIds.includes(userId)) list.push(c);
    });
    return list.map((c) => {
      const last = c.messages[c.messages.length - 1];
      const unread = c.messages.filter((m) => !m.readBy.has(userId)).length;
      return { id: c.id, participants: c.participantIds, lastMessage: last, unread };
    });
  }

  markRead(userId: string, messageId: string) {
    for (const c of this.conversations.values()) {
      const m = c.messages.find((x) => x.id === messageId);
      if (m) {
        m.readBy.add(userId);
        return true;
      }
    }
    return false;
  }
}

export const messagingRepo = new MessagingRepo();


