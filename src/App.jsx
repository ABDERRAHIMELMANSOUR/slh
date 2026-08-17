import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { LangProvider } from './context/LangContext'
import { DataProvider, useData } from './context/DataContext'
import { DEFAULT_LOCALE, LEGACY_PATHS, LOCALES, ROUTES, pathFor } from './i18n/routes'

import Home             from './pages/Home'
import About            from './pages/About'
import Services         from './pages/Services'
import TechnicalServices from './pages/TechnicalServices'
import GreenHydrogen    from './pages/GreenHydrogen'
import Projects         from './pages/Projects'
import Events           from './pages/Events'
import Blog             from './pages/Blog'
import BlogPost         from './pages/BlogPost'
import Partners         from './pages/Partners'
import Contact          from './pages/Contact'

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

/* Send an old language-less URL to its Dutch equivalent, preserving any :slug. */
function LegacyRedirect({ pageKey }) {
  const { slug } = useParams()
  const key = slug ? 'blogPost' : pageKey
  return <Navigate to={pathFor(DEFAULT_LOCALE, key, { slug })} replace />
}

/*
 * One route tree per language, mounted under its own prefix with localized slugs.
 * The two trees never share a URL, so each language variant is crawled and ranked
 * on its own.
 */
function localizedRoutes(locale) {
  const slug = (key) => ROUTES[key][locale]
  return [
    <Route key={`${locale}-home`}      path={`/${locale}`}                          element={<Home />} />,
    <Route key={`${locale}-about`}     path={`/${locale}/${slug('about')}`}          element={<About />} />,
    <Route key={`${locale}-services`}  path={`/${locale}/${slug('services')}`}       element={<Services />} />,
    <Route key={`${locale}-technical`} path={`/${locale}/${slug('technical')}`}      element={<TechnicalServices />} />,
    <Route key={`${locale}-hydrogen`}  path={`/${locale}/${slug('hydrogen')}`}       element={<GreenHydrogen />} />,
    <Route key={`${locale}-projects`}  path={`/${locale}/${slug('projects')}`}       element={<Projects />} />,
    <Route key={`${locale}-events`}    path={`/${locale}/${slug('events')}`}         element={<Events />} />,
    <Route key={`${locale}-blog`}      path={`/${locale}/${slug('blog')}`}           element={<Blog />} />,
    <Route key={`${locale}-post`}      path={`/${locale}/${slug('blog')}/:slug`}     element={<BlogPost />} />,
    <Route key={`${locale}-partners`}  path={`/${locale}/${slug('partners')}`}       element={<Partners />} />,
    <Route key={`${locale}-contact`}   path={`/${locale}/${slug('contact')}`}        element={<Contact />} />,
    // Unknown page inside a language tree stays in that language
    <Route key={`${locale}-404`}       path={`/${locale}/*`}                         element={<Navigate to={`/${locale}`} replace />} />,
  ]
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Dutch is the default language and the x-default target */}
        <Route path="/" element={<Navigate to={pathFor(DEFAULT_LOCALE, 'home')} replace />} />

        {LOCALES.flatMap(localizedRoutes)}

        {/* Legacy language-less URLs → Dutch equivalents */}
        {Object.entries(LEGACY_PATHS).map(([from, key]) => (
          <Route key={from} path={from} element={<LegacyRedirect pageKey={key} />} />
        ))}
        <Route path="/blog/:slug" element={<LegacyRedirect pageKey="blog" />} />

        {/* Admin — outside the localized tree, never indexed */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin"       element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/*"     element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        {/* Anything else falls back to the default language home */}
        <Route path="*" element={<Navigate to={pathFor(DEFAULT_LOCALE, 'home')} replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </LangProvider>
    </BrowserRouter>
  )
}
