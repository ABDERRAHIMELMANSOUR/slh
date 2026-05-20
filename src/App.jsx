import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LangProvider } from './context/LangContext'
import { DataProvider, useData } from './context/DataContext'

import Home         from './pages/Home'
import About        from './pages/About'
import Services     from './pages/Services'
import GreenHydrogen from './pages/GreenHydrogen'
import Projects     from './pages/Projects'
import Events       from './pages/Events'
import Blog         from './pages/Blog'
import BlogPost     from './pages/BlogPost'
import Partners     from './pages/Partners'
import Contact      from './pages/Contact'

import AdminLogin     from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

/* Scroll to top on navigation */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

/* Guard admin routes */
function ProtectedRoute({ children }) {
  const { adminLoggedIn } = useData()
  return adminLoggedIn ? children : <Navigate to="/admin/login" replace />
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/services"  element={<Services />} />
        <Route path="/hydrogen"  element={<GreenHydrogen />} />
        <Route path="/projects"  element={<Projects />} />
        <Route path="/events"    element={<Events />} />
        <Route path="/blog"      element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/partners"  element={<Partners />} />
        <Route path="/contact"   element={<Contact />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin"       element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/*"     element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <DataProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </DataProvider>
    </LangProvider>
  )
}
