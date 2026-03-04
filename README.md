# Visitor Appointment System

Next.js 14 App Router + TypeScript project for visitor appointment submissions and an admin dashboard.

## Environment variables

Set these in your Vercel project (and local `.env` if needed):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Supabase table

Create an `appointments` table with at least:

- `id` (primary key)
- `name` (text)
- `phone` (text)
- `visit_time` (timestamp)
- `note` (text, nullable)
- `created_at` (timestamp, default now)

## Routes

- `/` visitor appointment form
- `/admin` admin dashboard list (protected; redirects to `/login` when not authenticated)
- `/api/appointments` GET/POST API
- `/login` email/password login

Designed for direct deployment to Vercel.
