import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// verifier si l'utilisateur est connecter pour pourvoir faire quelque modification de son  profile

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth)

  return userInfo ? <Outlet/> : <Navigate to={'/login'} replace/>
}

export default PrivateRoute
