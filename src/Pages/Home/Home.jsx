import React,{useEffect} from "react";
import { useHistory } from "react-router";
import { useDispatch , useSelector} from "react-redux";
import { getMe, logoutAction } from "../../store/Actions/user";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe)
  },[])
 
   const user = useSelector((state) => state.user.authorized)
   console.log(user,"user auth")
const handleLogout = (e) => {
    e.preventDefault()
     dispatch(logoutAction())
  }
  return  (
    <div>
        <h1>HOME</h1>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  ) 
}
