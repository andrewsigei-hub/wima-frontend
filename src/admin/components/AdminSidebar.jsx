import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  MessageSquare,
  CalendarDays,
  BedDouble,
  LogOut,
  Leaf,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
  { to: '/admin/event-inquiries', icon: CalendarDays, label: 'Events' },
  { to: '/admin/rooms', icon: BedDouble, label: 'Rooms' },
]

export default function AdminSidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-[#1E3D29] flex flex-col z-20">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
            <Leaf className="w-5 h-5 text-gold" />
          </div>
          <div>
            <p className="font-display text-white font-bold text-base leading-tight">WIMA</p>
            <p className="text-white/50 text-xs tracking-widest uppercase">Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-white/10 text-white border-l-2 border-gold pl-[10px]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon className="w-4.5 h-4.5 flex-shrink-0" size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        {user && (
          <div className="px-3 py-2 mb-2">
            <p className="text-white/80 text-sm font-medium truncate">{user.name}</p>
            <p className="text-white/40 text-xs capitalize">{user.role}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut size={18} className="flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
