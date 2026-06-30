import { Toaster } from 'react-hot-toast'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { useEffect } from 'react'

const NO_LAYOUT_PATHS = ['/login', '/register', '/forgot-password', '/dashboard', '/enroll']

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const showLayout = !NO_LAYOUT_PATHS.some(p => location.pathname.startsWith(p))

  return (
    <>
      <ScrollToTop />
      <div className="noise-overlay" />
      {showLayout && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      {showLayout && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FAF4E8',
            color: '#1C1A2E',
            border: '1px solid rgba(28,26,46,0.12)',
            borderRadius: '12px',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </>
  )
}

