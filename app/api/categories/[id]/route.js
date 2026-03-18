import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabaseAdmin'

export async function DELETE(request, { params }) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('categories').delete().eq('id', params.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
