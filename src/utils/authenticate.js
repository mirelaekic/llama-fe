import cookies from "js-cookie"
import backend from "./token"

export const getAccessToken = () => cookies.get('accessToken')
export const getRefreshToken = () => cookies.get('refreshToken')
export const isAuthenticated = () => !!getAccessToken()
console.log(isAuthenticated(),"TOKEN")
const accessCookie = cookies.get("accessToken")
console.log(accessCookie,"COOKIEE")
const redirectToLogin = () => {
    window.location.replace("/login")
    // or history.push('/login') if your Login page is inside the same app
  }

export const authenticate = async () => {
    if (getRefreshToken()) {
      try {
        const tokens = await backend() // call an API, returns tokens
  
        const expires = (tokens.expires_in || 60 * 60) * 1000
        const inOneHour = new Date(new Date().getTime() + expires)
  
        // you will have the exact same setters in your Login page/app too
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
