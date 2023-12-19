import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from '../../features/service/user'
import { fetchToken } from "../../features/service/token";
import { useNavigate } from "react-router-dom";
import { setRemember } from "../../features/remember";

function Form() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalid, setInvalid] = useState(false)
   

    const dispatch = useDispatch()
    const navigate = useNavigate();


    async function Login(e) {

        e.preventDefault()
        const remember = document.getElementById('remember-me').checked
        const userLogin = { email, password }
        const token = await dispatch(fetchToken(userLogin))
               

        if (!token) {
            setInvalid(true)
            navigate('/')
        }
        setInvalid(false)
        dispatch(fetchUser(token))

        remember ? setRemember(token, remember) : sessionStorage.setItem('token-info', token)
        navigate('/User');
    }  
      

    
    return(
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form >
                <div>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={(user) => setEmail(user.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(user) => setPassword(user.target.value)} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button onClick={(e)=>Login(e)} className="sign-in-button">Sign In</button>
                </div>
            </form>
            {invalid ? <div className='messageConnexionError'>invalid credentials</div> : null}
        </section>
        
    )
}

export default Form