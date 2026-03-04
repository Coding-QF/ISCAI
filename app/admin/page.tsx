import Link from 'next/link';
import AppointmentList from '@/components/AppointmentList';

export default function AdminPage() {
  return (
    <main>
      <h1>Admin Dashboard</h1>
      <p>View submitted visitor appointments.</p>
      <AppointmentList />
      <Link href="/">Back to visitor form</Link>
    </main>
  );
}
