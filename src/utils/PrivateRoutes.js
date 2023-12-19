import { Navigate, Outlet } from "react-router-dom"

const useAuth=()=>{
    const user= (sessionStorage.getItem('AB-token-info')|| localStorage.getItem('AB-token-info'))

    return user ? true : false
}

const PrivateRoutes = () => {
    
    const auth=useAuth()
    return(
        auth ? <Outlet/> : <Navigate to='/login' />
    )
}

export default PrivateRoutes