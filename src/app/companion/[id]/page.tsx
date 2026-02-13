import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import ChatInterface from '@/components/ChatInterface';

export default async function CompanionChatPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return <ChatInterface companionId={params.id} />;
}
