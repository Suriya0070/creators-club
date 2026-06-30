import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider, useAuth } from './context/AuthContext'

const Home = lazy(() => import('./pages/Home.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const CoursesPage = lazy(() => import('./pages/CoursesPage.jsx'))
const EnrollPage = lazy(() => import('./pages/EnrollPage.jsx'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF4E8' }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(28,26,46,0.12)', borderTopColor: '#F5A623' }} />
      </div>
    </div>
  )
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  // Also check localStorage directly — guards against React state race on first render
  const hasSession = isAuthenticated || !!localStorage.getItem('cc_token')
  return hasSession ? children : <Navigate to="/login" replace />
}

function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const hasSession = isAuthenticated || !!localStorage.getItem('cc_token')
  return !hasSession ? children : <Navigate to="/dashboard" replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<LoadingFallback />}><Home /></Suspense>,
      },
      {
        path: 'courses',
        element: <Suspense fallback={<LoadingFallback />}><CoursesPage /></Suspense>,
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PublicOnlyRoute><Login /></PublicOnlyRoute>
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PublicOnlyRoute><Register /></PublicOnlyRoute>
          </Suspense>
        ),
      },
      {
        path: 'forgot-password',
        element: <Suspense fallback={<LoadingFallback />}><ForgotPassword /></Suspense>,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute><Dashboard /></PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: 'privacy',
        element: <Suspense fallback={<LoadingFallback />}><PrivacyPolicy /></Suspense>,
      },
      {
        path: 'terms',
        element: <Suspense fallback={<LoadingFallback />}><Terms /></Suspense>,
      },
      {
        path: 'enroll/:slug',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivateRoute><EnrollPage /></PrivateRoute>
          </Suspense>
        ),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

function RouterApp() {
  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  </StrictMode>
)

