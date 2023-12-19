import { Navigate, Outlet } from "react-router-dom"

const useAuth=()=>{
    const user= (sessionStorage.getItem('token-info')|| localStorage.getItem('token-info'))

    return user ? true : false
}

const PrivateRoutes = () => {
    
    const auth=useAuth()
    return(
        auth ? <Outlet/> : <Navigate to='/login' />
    )
}

export default PrivateRoutes