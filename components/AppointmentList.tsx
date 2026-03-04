'use client';

import { useEffect, useState } from 'react';

type Appointment = {
  id: number;
  name: string;
  phone: string;
  visit_time: string;
  note: string | null;
  created_at: string;
};

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAppointments() {
      try {
        const response = await fetch('/api/appointments', { cache: 'no-store' });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Failed to fetch appointments.');
        }

        setAppointments(data.appointments || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unexpected error.';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, []);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p style={{ color: '#b91c1c' }}>Error: {error}</p>;
  }

  if (appointments.length === 0) {
    return <p>No appointments yet.</p>;
  }

  return (
    <div>
      {appointments.map((item) => (
        <article className="card" key={item.id}>
          <h3>{item.name}</h3>
          <p><strong>Phone:</strong> {item.phone}</p>
          <p><strong>Visit time:</strong> {new Date(item.visit_time).toLocaleString()}</p>
          {item.note && <p><strong>Note:</strong> {item.note}</p>}
          <small>Created: {new Date(item.created_at).toLocaleString()}</small>
        </article>
      ))}
    </div>
  );
}
