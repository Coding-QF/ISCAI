import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('appointments')
    .select('id,name,phone,visit_time,note,created_at')
    .order('visit_time', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ appointments: data }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, visit_time, note } = body;

  if (!name || !phone || !visit_time) {
    return NextResponse.json(
      { error: 'name, phone, and visit_time are required.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('appointments')
    .insert({ name, phone, visit_time, note: note || null })
    .select('id,name,phone,visit_time,note,created_at')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ appointment: data }, { status: 201 });
}
