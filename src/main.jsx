import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AllRoomsPage from './components/AllRoomsPage.jsx'
import RoomDetailPage from './components/RoomDetailPage.jsx'
import { AuthProvider } from './admin/context/AuthContext.jsx'
import LoginPage from './admin/components/LoginPage.jsx'
import AdminLayout from './admin/components/AdminLayout.jsx'
import Dashboard from './admin/components/Dashboard.jsx'
import InquiriesPage from './admin/components/InquiriesPage.jsx'
import EventInquiriesPage from './admin/components/EventInquiriesPage.jsx'
import RoomsPage from './admin/components/RoomsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public site */}
          <Route path="/" element={<App />} />
          <Route path="/rooms" element={<AllRoomsPage />} />
          <Route path="/rooms/:slug" element={<RoomDetailPage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inquiries" element={<InquiriesPage />} />
            <Route path="event-inquiries" element={<EventInquiriesPage />} />
            <Route path="rooms" element={<RoomsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
