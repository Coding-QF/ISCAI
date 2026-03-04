import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Visitor Appointment System',
  description: 'Simple visitor appointment booking and admin dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
