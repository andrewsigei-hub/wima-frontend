import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout() {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-[#F7F5EE] flex">
      <AdminSidebar />
      <main className="ml-60 flex-1 min-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
