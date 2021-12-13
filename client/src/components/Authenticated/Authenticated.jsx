import { useGetEmail } from '../../actions'
import { Navigate } from 'react-router-dom'

export const Authenticated = (props) => {
  const { element } = props
  const getEmail = useGetEmail()
  const isAuthenticated = !!getEmail()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return element;
}