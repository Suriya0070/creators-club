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
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
        <p className="text-white/30 text-sm">Loading...</p>
      </div>
    </div>
  )
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />
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
