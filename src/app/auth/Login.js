import React, {useContext, useState, useEffect} from 'react'
import { StoreContext } from '../store/store'
import './styles/Auth.css'
import { AppInput } from '../components/ui/AppInputs'
import { Link } from 'react-router-dom'
import { googleAuth } from "./GoogleAuth"
import googleIcon from '../assets/imgs/google-icon.png'
import { auth } from '../firebase/fire'
import logo from '../assets/imgs/logo2.png'

export default function Login() {

  const {setAUser, setMyUser, setLoggingAuth} = useContext(StoreContext)
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [emailError, setEmailError] = useState('') 
  const [passError, setPassError] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const handleLogin = () => { 
    clearErrors()
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      authListener()
    })
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
            return setEmailError('Make sure to enter a valid email.')
        case "auth/user/disabled":
            return setEmailError('This user is disabled.')
        case "auth/user-not-found":
            return setEmailError('This user does not exist.')
        case "auth/wrong-password":
          setPassError('Password is incorrect')
        break
        default:
      }  
    }) 
  }
  const authListener = () => {
    auth.onAuthStateChanged(user => {
      if(user) {
        setAUser(user)
      }
      else {
        setAUser(null)
      }
    })
  }
  const clearErrors = () => {
    setEmailError('')
    setPassError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin()
  }

  useEffect(() => { 
    authListener() 
  },[])

  return (
    <div className="login-page">
      <div className="login-cover">
        <h1>Welcome to Horizon</h1>
        <h5>Join our platform of idenpendant business owners<br/>to boost your communication now.</h5>
      </div>
      <div className="login-info">
        <div className="container">
          <img src={logo} className="logo" alt="logo"/>
          <h4>Login</h4>
          <h6>Login to discover newly added courses every week.</h6>
          <div className="social-logins">
            <div className="google-btn btn" onClick={() => googleAuth(setMyUser)}>
              <img src={googleIcon} className="img-icon" alt="google-icon" />
              <span>Sign in with Google</span>
            </div>
          </div>
          <small className="sep-alt"><hr/><span>Or sign in with email</span><hr/></small>
          <form onSubmit={(e) => handleSubmit(e)}>
            <AppInput 
              title="Email" 
              placeholder="jane@horizon.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <h6 className="email-error">{emailError}</h6>
            <AppInput 
              title="Password" 
              placeholder="5 characters or more"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login-options">
              <label>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>
              <Link to="/forgot-password" className="linkable">Forgot password?</Link>
            </div>
            <button className="submit-btn shadow-hover gradient" onClick={handleLogin}>
              Login
              <i className="fal fa-arrow-right"></i>
            </button>
            <small className="no-account-text">
              Don't have an account yet? 
              <Link to="/register" onClick={() => setLoggingAuth(false)}>Create An Account</Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  )
}
