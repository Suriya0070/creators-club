import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.creatorsclub.in/v1'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cc_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('cc_token')
      localStorage.removeItem('cc_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
