import cookies from "js-cookie"
import backend from "./token"
import { useSelector, useDispatch } from "react-redux";
import {getMe} from "../store/Actions/user"
export const getAccessToken = () => cookies.get('accessToken')
export const getRefreshToken = () => cookies.get('refreshToken')
export const isAuthenticated = () => !!getAccessToken()
console.log(isAuthenticated(),"Is user authenticated")

const redirectToLogin = () => {
    window.location.replace("/login")
  }

export const authenticate = async () => {
    if (getRefreshToken()) {
      try {
        const tokens = await backend()
  
        const expires = (tokens.expires_in || 60 * 60) * 1000
        const inOneHour = new Date(new Date().getTime() + expires)

        cookies.set('accessToken', tokens.access_token, { expires: inOneHour })
        cookies.set('refreshToken', tokens.refresh_token)
  
        return true
      } catch (error) {
        redirectToLogin()
        return false
      }
    }
    redirectToLogin()
    return false
  }

