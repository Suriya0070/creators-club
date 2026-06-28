import toast from 'react-hot-toast'

export const useToast = () => ({
  success: (msg) => toast.success(msg, {
    style: { background: '#071C2F', color: '#fff', border: '1px solid rgba(0,217,255,0.3)' },
    iconTheme: { primary: '#8AFFFF', secondary: '#071C2F' },
  }),
  error: (msg) => toast.error(msg, {
    style: { background: '#071C2F', color: '#fff', border: '1px solid rgba(239,68,68,0.4)' },
    iconTheme: { primary: '#EF4444', secondary: '#fff' },
  }),
  loading: (msg) => toast.loading(msg, {
    style: { background: '#071C2F', color: '#fff', border: '1px solid rgba(0,217,255,0.2)' },
  }),
  dismiss: toast.dismiss,
})
