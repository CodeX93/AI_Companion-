import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import CompanionCreator from '@/components/CompanionCreator';

export default async function CreateCompanionPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return <CompanionCreator />;
}
