import React,{useState} from 'react'
import { useHistory } from "react-router";
import {useDispatch} from "react-redux"
import {loginAction} from "../../store/Actions/user"
import { Redirect } from "react-router-dom"
import "../styles.css"
import LoginCard from "../../components/LoginCard/LoginCard"
export default function Login() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const dispatch = useDispatch()
const history = useHistory()

const handleSubmit = async(e) => {
    e.preventDefault()
    await dispatch(loginAction({email,password}))  
}

    return (
      <div className="login-page">
        <LoginCard /> 
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Log in to your Llama account.</h1>
            <div className="reg-form mt-4">
            <input
              required
              id="username"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Username or username"
            />
            <input
              type="password"
              required
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="reg-button">
            Log In
          </button>
        </form>
        </div>
    )
}
