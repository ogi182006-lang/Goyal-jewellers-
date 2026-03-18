'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { LayoutDashboard, Package, Tag, LogOut, ExternalLink, Plus } from 'lucide-react'

const links = [
  { href: '/admin/dashboard', icon: <LayoutDashboard size={15} />, label: 'Dashboard' },
  { href: '/admin/dashboard/products', icon: <Package size={15} />, label: 'Products' },
  { href: '/admin/dashboard/products/new', icon: <Plus size={15} />, label: 'Add Product' },
  { href: '/admin/dashboard/categories', icon: <Tag size={15} />, label: 'Categories' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Logged out')
    router.push('/admin')
    router.refresh()
  }

  return (
    <aside className="w-56 bg-[#0D0D0D] border-r border-[#1E1E1E] flex flex-col shrink-0 hidden md:flex">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-[#1E1E1E]">
        <p className="font-display text-xl font-semibold gold-shimmer">Goyal Jewellers</p>
        <p className="text-[9px] font-body tracking-[0.3em] text-[#6B6B6B] uppercase mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`admin-nav-link ${pathname === l.href ? 'active' : ''}`}
          >
            {l.icon}
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#1E1E1E] space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-nav-link"
        >
          <ExternalLink size={14} />
          View Website
        </a>
        <button onClick={handleLogout} className="admin-nav-link w-full text-left">
          <LogOut size={14} />
          Log Out
        </button>
      </div>
    </aside>
  )
}
