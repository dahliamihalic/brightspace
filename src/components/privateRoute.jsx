import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export function PrivateRoute({ children }) {
  const { isLogin } = useAuth()
  return isLogin ? children : <Navigate to="/front" />
}