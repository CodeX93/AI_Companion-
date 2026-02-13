import { User, Companion, Message } from '@/types';
import bcrypt from 'bcryptjs';
import { supabase } from './supabase';
import { encrypt, decrypt } from './encryption';

// Database operations
export const db = {
  users: {
    async create(email: string, password: string, name: string): Promise<User> {
      const id = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(password, 10);

      const { error } = await supabase
        .from('users')
        .insert({
          id,
          email,
          password: hashedPassword,
          name,
        });

      if (error) throw new Error(`Failed to create user: ${error.message}`);

      return {
        id,
        email,
        name,
        createdAt: new Date(),
      };
    },

    async findByEmail(email: string): Promise<(User & { password: string }) | null> {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) return null;

      return {
        ...data,
        createdAt: new Date(data.created_at),
        subscriptionTier: data.subscription_tier,
        dailyUsageStart: data.daily_usage_start ? new Date(data.daily_usage_start) : undefined,
        lastActiveDate: data.last_active_date ? new Date(data.last_active_date) : undefined,
      };
    },

    async findById(id: string): Promise<User | null> {
      const { data, error } = await supabase
        .from('users')
        .select('*') // Select all to get subscription info
        .eq('id', id)
        .single();

      if (error || !data) return null;

      return {
        ...data,
        createdAt: new Date(data.created_at),
        subscriptionTier: data.subscription_tier,
        dailyUsageStart: data.daily_usage_start ? new Date(data.daily_usage_start) : undefined,
        lastActiveDate: data.last_active_date ? new Date(data.last_active_date) : undefined,
      };
    },

    async update(id: string, updates: Partial<User>): Promise<void> {
      const dbUpdates: any = {};
      if (updates.subscriptionTier) dbUpdates.subscription_tier = updates.subscriptionTier;
      if (updates.dailyUsageStart) dbUpdates.daily_usage_start = updates.dailyUsageStart.toISOString();
      if (updates.lastActiveDate) dbUpdates.last_active_date = updates.lastActiveDate.toISOString();

      const { error } = await supabase.from('users').update(dbUpdates).eq('id', id);
      if (error) throw new Error(`Failed to update user: ${error.message}`);
    },

    async verifyPassword(email: string, password: string): Promise<User | null> {
      const user = await this.findByEmail(email);
      if (!user) return null;

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return null;

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    },
  },

  companions: {
    async create(companionData: Omit<Companion, 'id' | 'createdAt'>): Promise<Companion> {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();

      const { error } = await supabase
        .from('companions')
        .insert({
          id,
          user_id: companionData.userId,
          name: companionData.name,
          gender: companionData.gender,
          age: companionData.age,
          personality: companionData.personality,
          appearance: companionData.appearance,
          system_prompt: companionData.systemPrompt,
          created_at: now,
          last_message_at: now,
        });

      if (error) throw new Error(`Failed to create companion: ${error.message}`);

      return {
        ...companionData,
        id,
        createdAt: new Date(now),
        lastMessageAt: new Date(now),
      };
    },

    async findByUserId(userId: string): Promise<Companion[]> {
      // Get companions
      const { data: companions, error } = await supabase
        .from('companions')
        .select('*')
        .eq('user_id', userId)
        .order('last_message_at', { ascending: false });

      if (error || !companions) return [];

      // Get unread counts for each companion
      const companionsWithCounts = await Promise.all(companions.map(async (c: any) => {
        const { count } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('companion_id', c.id)
          .eq('role', 'assistant') // Only count assistant messages as unread for user
          .is('read_at', null);

        return {
          ...c,
          userId: c.user_id,
          systemPrompt: c.system_prompt,
          createdAt: new Date(c.created_at),
          lastMessageAt: c.last_message_at ? new Date(c.last_message_at) : undefined,
          unreadCount: count || 0,
        };
      }));

      return companionsWithCounts;
    },

    async findById(id: string): Promise<Companion | null> {
      const { data, error } = await supabase
        .from('companions')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) return null;

      return {
        ...data,
        userId: data.user_id,
        systemPrompt: data.system_prompt,
        createdAt: new Date(data.created_at),
        lastMessageAt: data.last_message_at ? new Date(data.last_message_at) : undefined,
      };
    },

    async update(id: string, updates: Partial<Companion>): Promise<Companion | null> {
      // Map frontend fields to DB fields
      const dbUpdates: any = { ...updates };
      if (updates.userId) dbUpdates.user_id = updates.userId;
      if (updates.systemPrompt) dbUpdates.system_prompt = updates.systemPrompt;
      if (updates.lastMessageAt) dbUpdates.last_message_at = updates.lastMessageAt;

      // Remove fields not in DB or handled separately
      delete dbUpdates.userId;
      delete dbUpdates.systemPrompt;
      delete dbUpdates.createdAt;
      delete dbUpdates.lastMessageAt;
      delete dbUpdates.unreadCount;

      const { data, error } = await supabase
        .from('companions')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error || !data) return null;

      return {
        ...data,
        userId: data.user_id,
        systemPrompt: data.system_prompt,
        createdAt: new Date(data.created_at),
        lastMessageAt: data.last_message_at ? new Date(data.last_message_at) : undefined,
      };
    },

    async delete(id: string): Promise<boolean> {
      const { error } = await supabase
        .from('companions')
        .delete()
        .eq('id', id);

      return !error;
    },
  },

  messages: {
    async create(companionId: string, role: 'user' | 'assistant', content: string): Promise<Message> {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();

      const encryptedContent = encrypt(content);

      const { error } = await supabase
        .from('messages')
        .insert({
          id,
          companion_id: companionId,
          role,
          content: encryptedContent,
          timestamp: now,
        });

      if (error) throw new Error(`Failed to create message: ${error.message}`);

      // Update companion last_message_at
      await supabase
        .from('companions')
        .update({ last_message_at: now })
        .eq('id', companionId);

      return {
        id,
        companionId,
        role,
        content, // Return original content to UI
        timestamp: new Date(now),
      };
    },

    async findByCompanionId(companionId: string): Promise<Message[]> {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('companion_id', companionId)
        .order('timestamp', { ascending: true });

      if (error) return [];

      return data.map((m: any) => ({
        ...m,
        companionId: m.companion_id,
        content: decrypt(m.content), // Decrypt content for UI
        timestamp: new Date(m.timestamp),
        readAt: m.read_at ? new Date(m.read_at) : undefined,
      }));
    },

    async markRead(companionId: string): Promise<void> {
      await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('companion_id', companionId)
        .eq('role', 'assistant')
        .is('read_at', null);
    },

    async deleteByCompanionId(companionId: string): Promise<void> {
      await supabase
        .from('messages')
        .delete()
        .eq('companion_id', companionId);
    },
  },

  scheduledMessages: {
    async create(companionId: string, userId: string, scheduledAt: Date, promptContext: string): Promise<void> {
      const { error } = await supabase
        .from('scheduled_messages')
        .insert({
          id: crypto.randomUUID(),
          companion_id: companionId,
          user_id: userId,
          scheduled_at: scheduledAt.toISOString(),
          prompt_context: promptContext,
          status: 'pending'
        });

      if (error) console.error('Failed to schedule message:', error);
    },

    async findPending(): Promise<any[]> {
      const { data, error } = await supabase
        .from('scheduled_messages')
        .select('*, companions(*)') // Join companion to get system prompt/details
        .eq('status', 'pending')
        .lte('scheduled_at', new Date().toISOString());

      if (error) return [];
      return data || [];
    },

    async markProcessed(id: string): Promise<void> {
      await supabase
        .from('scheduled_messages')
        .update({ status: 'processed' })
        .eq('id', id);
    }
  }
};
