import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabaseAdmin'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json()
    if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 })
    const slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name, slug }])
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
