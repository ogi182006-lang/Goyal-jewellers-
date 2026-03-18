'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminDashboardLayout({ children }) {
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.replace('/admin')
      } else {
        setChecking(false)
      }
    }
    checkAuth()
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl text-gold animate-pulse">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  )
}
