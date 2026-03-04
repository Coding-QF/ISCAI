import Link from 'next/link';
import AppointmentForm from '@/components/AppointmentForm';

export default function VisitorPage() {
  return (
    <main>
      <h1>Visitor Appointment System</h1>
      <p>Submit your appointment details below.</p>
      <AppointmentForm />
      <Link href="/admin">Go to admin dashboard</Link>
    </main>
  );
}
