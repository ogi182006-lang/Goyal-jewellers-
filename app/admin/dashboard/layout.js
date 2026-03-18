import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Admin Dashboard – Goyal Jewellers',
}

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  )
}
