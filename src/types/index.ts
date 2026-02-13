export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  subscriptionTier?: 'free' | 'premium';
  dailyUsageStart?: Date;
  lastActiveDate?: Date;
}

export interface Companion {
  id: string;
  userId: string;
  name: string;
  gender: 'female' | 'male';
  age: number;
  personality: {
    traits: string[];
    description: string;
  };
  appearance: {
    hairColor: string;
    eyeColor: string;
    style: string;
    description: string;
  };
  systemPrompt: string;
  createdAt: Date;
  lastMessageAt?: Date;
  unreadCount?: number;
}

export interface Message {
  id: string;
  companionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  readAt?: Date;
}

export interface ChatHistory {
  companionId: string;
  messages: Message[];
}
