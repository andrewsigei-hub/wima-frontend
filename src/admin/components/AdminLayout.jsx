import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout() {
  const { token } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-[#F7F5EE] flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col md:ml-60 min-h-screen">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-[#1E3D29] sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-display text-white font-bold text-base">WIMA Admin</span>
        </div>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
