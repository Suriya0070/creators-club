const STORAGE_KEYS = { TOKEN: 'cc_token', USER: 'cc_user', USERS_DB: 'cc_users_db' }

const getUsersDB = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '[]') }
  catch { return [] }
}
const saveUsersDB = (users) => localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))

const generateToken = (userId) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ sub: userId, iat: Date.now(), exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }))
  const sig = btoa(`${userId}-${Date.now()}`)
  return `${header}.${payload}.${sig}`
}

export const authService = {
  async register({ name, email, password, phone }) {
    await new Promise(r => setTimeout(r, 800))
    const users = getUsersDB()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.')
    }
    const user = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8AFFFF&color=071C2F&size=200`,
      enrolledCourses: [],
      certificates: [],
      joinedAt: new Date().toISOString(),
    }
    users.push(user)
    saveUsersDB(users)
    const token = generateToken(user.id)
    const { password: _, ...safeUser } = user
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(safeUser))
    return { user: safeUser, token }
  },

  async login({ email, password }) {
    await new Promise(r => setTimeout(r, 700))
    const users = getUsersDB()
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password. Please try again.')
    }
    const token = generateToken(user.id)
    const { password: _, ...safeUser } = user
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(safeUser))
    return { user: safeUser, token }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
  },

  getCurrentUser() {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USER)
      const t = localStorage.getItem(STORAGE_KEYS.TOKEN)
      if (!u || !t) return null
      return JSON.parse(u)
    } catch { return null }
  },

  isAuthenticated() {
    return !!this.getCurrentUser()
  },

  async sendPasswordReset(email) {
    await new Promise(r => setTimeout(r, 600))
    const users = getUsersDB()
    if (!users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('No account found with this email address.')
    }
    return { message: 'Password reset link sent to your email.' }
  },

  async updateProfile(updates) {
    await new Promise(r => setTimeout(r, 500))
    const users = getUsersDB()
    const current = this.getCurrentUser()
    const idx = users.findIndex(u => u.id === current.id)
    if (idx === -1) throw new Error('User not found.')
    users[idx] = { ...users[idx], ...updates }
    saveUsersDB(users)
    const { password: _, ...safeUser } = users[idx]
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(safeUser))
    return safeUser
  },
}
