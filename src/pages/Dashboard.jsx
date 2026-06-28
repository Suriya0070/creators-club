import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, BookOpen, Award, Download, User, LogOut, LayoutDashboard, Settings, ChevronRight, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../hooks/useToast'
import { COURSES } from '../data/courses'
import { AnimatedGroup, AnimatedItem, AnimatedSection } from '../components/ui/AnimatedSection'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'overview' },
  { icon: BookOpen, label: 'My Courses', id: 'courses' },
  { icon: Award, label: 'Certificates', id: 'certs' },
  { icon: Download, label: 'Downloads', id: 'downloads' },
  { icon: User, label: 'Profile', id: 'profile' },
]

function StatCard({ value, label, color = '#00D9FF' }) {
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <div className="font-heading font-extrabold text-3xl mb-1" style={{ color }}>{value}</div>
      <div className="text-white/50 text-sm">{label}</div>
    </div>
  )
}

function CourseCard({ course, enrolled = false }) {
  return (
    <div className={`glass rounded-2xl overflow-hidden ${!enrolled ? 'opacity-60' : ''}`}>
      <div className="relative h-36 overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        {!enrolled && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="text-center">
              <Lock className="w-6 h-6 text-white/60 mx-auto mb-1" />
              <span className="text-white/60 text-xs">Not enrolled</span>
            </div>
          </div>
        )}
        {enrolled && (
          <div className="absolute bottom-3 left-3">
            <span className="text-xs px-2 py-1 rounded-full bg-cyan-400/20 text-cyan-400 border border-cyan-400/30 font-medium">In Progress</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading font-bold text-sm text-white mb-1">{course.title}</h3>
        <div className="text-white/40 text-xs mb-3">{course.duration} · {course.lessons} lessons</div>
        {enrolled ? (
          <div>
            <div className="flex items-center justify-between text-xs text-white/40 mb-1.5">
              <span>Progress</span><span>12%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: '12%' }} />
            </div>
            <button className="mt-3 w-full text-xs font-semibold py-2 rounded-xl bg-cyan-400/15 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/25 transition-colors flex items-center justify-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-current" /> Continue
            </button>
          </div>
        ) : (
          <Link to="/courses" className="block text-center text-xs font-semibold py-2 rounded-xl glass border border-white/10 text-white/50 hover:text-white hover:border-cyan-400/30 transition-all">
            Enroll — ₹{course.price.toLocaleString('en-IN')}
          </Link>
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const { user, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out. See you soon!')
    navigate('/')
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div>
            <AnimatedSection>
              <h2 className="font-heading font-bold text-2xl text-white mb-2">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h2>
              <p className="text-white/50 text-sm mb-8">Continue your learning journey and track your progress.</p>
            </AnimatedSection>
            <AnimatedGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <AnimatedItem><StatCard value="0" label="Courses Enrolled" /></AnimatedItem>
              <AnimatedItem><StatCard value="0%" label="Average Progress" color="#22C55E" /></AnimatedItem>
              <AnimatedItem><StatCard value="0" label="Certificates Earned" color="#F59E0B" /></AnimatedItem>
              <AnimatedItem><StatCard value="0" label="Projects Submitted" color="#A855F7" /></AnimatedItem>
            </AnimatedGroup>
            <AnimatedSection delay={0.2}>
              <div className="glass rounded-2xl p-6 mb-6">
                <h3 className="font-heading font-semibold text-white mb-4">🎓 Recommended Courses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {COURSES.map(c => <CourseCard key={c.id} course={c} enrolled={false} />)}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-heading font-semibold text-white mb-3">🚀 Quick Start Guide</h3>
                <div className="space-y-3">
                  {[
                    { step: '1', label: 'Pick your first course', desc: 'Start with Beginner Editing Mastery if you\'re new', done: false },
                    { step: '2', label: 'Join our Discord community', desc: 'Connect with 1,500+ creators', done: false },
                    { step: '3', label: 'Complete your first project', desc: 'Build your portfolio with hands-on work', done: false },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                      <div className="w-7 h-7 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-xs font-bold shrink-0 mt-0.5">{item.step}</div>
                      <div>
                        <div className="text-sm font-semibold text-white">{item.label}</div>
                        <div className="text-xs text-white/40">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        )
      case 'courses':
        return (
          <div>
            <h2 className="font-heading font-bold text-xl text-white mb-6">My Courses</h2>
            <div className="glass rounded-2xl p-8 text-center">
              <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/50 mb-4">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="btn-primary text-sm px-6 py-2.5">Browse Courses</Link>
            </div>
          </div>
        )
      case 'certs':
        return (
          <div>
            <h2 className="font-heading font-bold text-xl text-white mb-6">My Certificates</h2>
            <div className="glass rounded-2xl p-8 text-center">
              <Award className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/50 mb-4">Complete a course to earn your certificate.</p>
              <Link to="/courses" className="btn-primary text-sm px-6 py-2.5">Start Learning</Link>
            </div>
          </div>
        )
      case 'downloads':
        return (
          <div>
            <h2 className="font-heading font-bold text-xl text-white mb-6">Downloads</h2>
            <div className="glass rounded-2xl p-8 text-center">
              <Download className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/50">Project files and resources will appear here after enrollment.</p>
            </div>
          </div>
        )
      case 'profile':
        return (
          <div>
            <h2 className="font-heading font-bold text-xl text-white mb-6">Profile Settings</h2>
            <div className="glass rounded-2xl p-6 max-w-md">
              <div className="flex items-center gap-4 mb-6">
                <img src={user?.avatar} alt={user?.name} className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/30" />
                <div>
                  <div className="font-heading font-bold text-white text-lg">{user?.name}</div>
                  <div className="text-white/50 text-sm">{user?.email}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input className="input-field" defaultValue={user?.name} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Email</label>
                  <input className="input-field" defaultValue={user?.email} disabled />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Phone</label>
                  <input className="input-field" defaultValue={user?.phone} placeholder="+91 xxxxx xxxxx" />
                </div>
                <button className="btn-primary w-full justify-center py-2.5 text-sm mt-2">Save Changes</button>
              </div>
            </div>
          </div>
        )
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="noise-overlay" />

      {/* Top bar */}
      <header className="sticky top-0 z-40 glass-strong border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current" style={{ color: '#071C2F' }} />
            </div>
            <span className="font-heading font-extrabold text-base text-white">Creators<span className="text-gradient-pure">Club</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover border border-cyan-400/30" />
            <span className="text-sm font-medium text-white/80 hidden sm:block">{user?.name}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 gap-8 relative">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0">
          <nav className="glass rounded-2xl p-3 space-y-1 sticky top-24">
            {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === id
                    ? 'bg-cyan-400/15 text-cyan-400 border border-cyan-400/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {activeSection === id && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            ))}
            <div className="border-t border-white/5 pt-1 mt-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-white/5 px-2 py-2 flex justify-around">
          {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
            <button key={id} onClick={() => setActiveSection(id)} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all text-xs ${activeSection === id ? 'text-cyan-400' : 'text-white/40'}`}>
              <Icon className="w-5 h-5" />
              <span>{label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 pb-20 lg:pb-0 min-w-0">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
