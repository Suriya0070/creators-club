import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, BookOpen, Award, Download, User, LogOut, LayoutDashboard, ChevronRight, Lock, CheckCircle, Mail, Phone, Calendar } from 'lucide-react'
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

function StatCard({ value, label, color = '#FF2222' }) {
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <div className="font-heading font-extrabold text-3xl mb-1" style={{ color }}>{value}</div>
      <div className="text-white/50 text-sm">{label}</div>
    </div>
  )
}

function CourseCard({ course }) {
  return (
    <div className="glass rounded-2xl overflow-hidden opacity-70 hover:opacity-90 transition-opacity">
      <div className="relative h-32 overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
          <Lock className="w-5 h-5 text-white/50" />
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-heading font-bold text-xs text-white mb-1 line-clamp-1">{course.title}</h3>
        <div className="text-white/40 text-[11px] mb-2">{course.duration} · {course.lessons} lessons</div>
        <Link to={`/enroll/${course.slug}`} className="block text-center text-[11px] font-semibold py-1.5 rounded-lg glass border border-white/10 text-cyan-400 hover:border-cyan-400/30 transition-all">
          Enroll — ₹{course.price.toLocaleString('en-IN')}
        </Link>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' })
  const [savingProfile, setSavingProfile] = useState(false)
  const { user, logout, updateUser } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const joinDate = user?.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Today'

  const handleLogout = () => {
    logout()
    toast.success('Logged out. See you soon!')
    navigate('/')
  }

  const handleProfileSave = async () => {
    setSavingProfile(true)
    try {
      await updateUser({ name: profileForm.name || user?.name, phone: profileForm.phone ?? user?.phone })
      toast.success('Profile updated!')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSavingProfile(false)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* ── Account confirmed banner ── */}
            <AnimatedSection>
              <div className="glass rounded-2xl p-5 border border-cyan-400/20" style={{ background: 'rgba(255,34,34,0.04)' }}>
                <div className="flex items-start gap-4">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/30 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="font-heading font-extrabold text-xl text-white">
                        {user?.name || 'Welcome!'}
                      </h2>
                      <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/25 text-green-400">
                        <CheckCircle className="w-3 h-3" /> Account Active
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-white/55">
                        <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{user?.email}</span>
                      </div>
                      {user?.phone && (
                        <div className="flex items-center gap-2 text-sm text-white/55">
                          <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-white/55">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Joined {joinDate}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveSection('profile')}
                    className="text-xs font-medium text-cyan-400 hover:text-white glass px-3 py-1.5 rounded-lg transition-all shrink-0 hidden sm:block"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <AnimatedItem><StatCard value="0" label="Courses Enrolled" /></AnimatedItem>
              <AnimatedItem><StatCard value="0%" label="Avg Progress" color="#22C55E" /></AnimatedItem>
              <AnimatedItem><StatCard value="0" label="Certificates" color="#F59E0B" /></AnimatedItem>
              <AnimatedItem><StatCard value="0" label="Projects Done" color="#A855F7" /></AnimatedItem>
            </AnimatedGroup>

            {/* Quick start */}
            <AnimatedSection delay={0.15}>
              <div className="glass rounded-2xl p-5">
                <h3 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
                  🚀 Get Started
                </h3>
                <div className="space-y-3">
                  {[
                    { step: '1', label: 'Enroll in your first course', desc: 'Pick Beginner Editing Mastery if you\'re new', link: '/courses', cta: 'Browse Courses' },
                    { step: '2', label: 'Join our Discord community', desc: 'Connect with 1,500+ creators and get feedback', link: '#', cta: 'Join Discord' },
                    { step: '3', label: 'Complete a project', desc: 'Build real work for your portfolio', link: '/courses', cta: 'View Projects' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: 'rgba(255,34,34,0.12)', border: '1px solid rgba(255,34,34,0.25)', color: '#FF2222' }}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">{item.label}</div>
                        <div className="text-xs text-white/40">{item.desc}</div>
                      </div>
                      <Link to={item.link} className="text-xs text-cyan-400 hover:text-white font-medium transition-colors shrink-0 mt-0.5">
                        {item.cta} →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Recommended courses */}
            <AnimatedSection delay={0.25}>
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-white">🎓 Available Courses</h3>
                  <Link to="/courses" className="text-xs text-cyan-400 hover:text-white transition-colors">View all →</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {COURSES.map(c => <CourseCard key={c.id} course={c} />)}
                </div>
              </div>
            </AnimatedSection>
          </div>
        )

      case 'courses':
        return (
          <div>
            <h2 className="font-heading font-bold text-xl text-white mb-6">My Courses</h2>
            <div className="glass rounded-2xl p-8 text-center mb-6">
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
              <p className="text-white/50 mb-4">Complete a course to earn your industry certificate.</p>
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
                  <div className="text-white/30 text-xs mt-0.5">Joined {joinDate}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    className="input-field"
                    value={profileForm.name || user?.name || ''}
                    onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Email</label>
                  <input className="input-field opacity-60" defaultValue={user?.email} disabled />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">Phone</label>
                  <input
                    className="input-field"
                    value={profileForm.phone !== '' ? profileForm.phone : (user?.phone || '')}
                    onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+91 xxxxx xxxxx"
                  />
                </div>
                <button
                  onClick={handleProfileSave}
                  disabled={savingProfile}
                  className="btn-primary w-full justify-center py-2.5 text-sm mt-2"
                >
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )

      default: return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0C0003' }}>
      {/* Subtle glow */}
      <div className="fixed top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'rgba(255,34,34,0.06)', filter: 'blur(120px)' }} />
      <div className="absolute inset-0 grid-bg opacity-25" style={{ position: 'fixed' }} />
      <div className="noise-overlay" />

      {/* Top bar */}
      <header className="sticky top-0 z-40 glass-strong border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center" style={{ boxShadow: '0 0 15px rgba(255,34,34,0.3)' }}>
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
                    ? 'text-white font-bold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                style={activeSection === id ? { background: '#FF2222', boxShadow: '0 0 15px rgba(255,34,34,0.3)' } : {}}
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

        {/* Mobile bottom nav */}
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

