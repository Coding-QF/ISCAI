'use client';

import { FormEvent, useState } from 'react';

type Status = {
  kind: 'idle' | 'success' | 'error';
  message: string;
};

export default function AppointmentForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus({ kind: 'idle', message: '' });

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          visit_time: visitTime,
          note,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to create appointment.');
      }

      setStatus({ kind: 'success', message: 'Appointment submitted successfully.' });
      setName('');
      setPhone('');
      setVisitTime('');
      setNote('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error.';
      setStatus({ kind: 'error', message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Book a Visit</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <label htmlFor="visitTime">Visit Time</label>
      <input
        id="visitTime"
        type="datetime-local"
        value={visitTime}
        onChange={(e) => setVisitTime(e.target.value)}
        required
      />

      <label htmlFor="note">Note</label>
      <textarea
        id="note"
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Appointment'}
      </button>

      {status.message && (
        <p style={{ color: status.kind === 'error' ? '#b91c1c' : '#166534' }}>{status.message}</p>
      )}
    </form>
  );
}
