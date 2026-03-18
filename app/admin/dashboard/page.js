import { createServerSupabaseClient } from '@/lib/supabaseServer'
import Link from 'next/link'
import { Package, Tag, Plus, ArrowRight } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient()
  const [{ count: productCount }, { count: categoryCount }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { icon: <Package size={20} />, label: 'Total Products', value: productCount || 0, href: '/admin/dashboard/products' },
    { icon: <Tag size={20} />, label: 'Categories', value: categoryCount || 0, href: '/admin/dashboard/categories' },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-white">Dashboard</h1>
        <p className="text-xs font-body tracking-widest text-[#6B6B6B] uppercase mt-1">
          Goyal Jewellers — Admin Overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-[#111111] border border-[#2A2A2A] p-5 hover:border-gold/40 transition-colors group"
          >
            <div className="text-gold mb-3">{s.icon}</div>
            <p className="font-display text-4xl font-light text-white mb-1">{s.value}</p>
            <p className="text-[10px] font-body tracking-widest uppercase text-[#6B6B6B] group-hover:text-gold transition-colors">
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-[10px] font-body tracking-[0.3em] uppercase text-[#6B6B6B] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Add New Product', href: '/admin/dashboard/products/new', icon: <Plus size={15} /> },
            { label: 'Manage Products', href: '/admin/dashboard/products', icon: <Package size={15} /> },
            { label: 'Add Category', href: '/admin/dashboard/categories', icon: <Tag size={15} /> },
            { label: 'View Live Site', href: '/', icon: <ArrowRight size={15} /> },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              target={a.href === '/' ? '_blank' : undefined}
              className="flex items-center gap-3 bg-[#111111] border border-[#2A2A2A] px-4 py-3 hover:border-gold/40 hover:text-gold transition-all text-[#BFBFBF] text-xs font-body tracking-wider uppercase"
            >
              <span className="text-gold">{a.icon}</span>
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
