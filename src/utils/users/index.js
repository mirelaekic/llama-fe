import axios from "../token"


require('dotenv').config()
const LLAMA_API = process.env.REACT_APP_LLAMA_API

// REGISTER
export const register = async (credentials) => {
    try {
        const register = await axios.post(`${LLAMA_API}users/register`,credentials)
        console.log(register)
        return register.data
    } catch (error) {
        console.log(error)
        return null
    }
}
// LOGIN
export const login = async (credentials) => {
    try {
        const login = await axios.post(`${LLAMA_API}users/login`,credentials)
        console.log(login,"LOGIN")
        return login.data
    } catch (error) {
        return null
    }
}
// LOGOUT
export const logout = async () => {
    try {
        const logout = await axios.post(`${LLAMA_API}users/logout`)
        return logout.data
    } catch (error) {
        return null
    }
}
// FETCH CURRENT USER
export const me = async () => {
    try {
        const response = await axios.get(`${LLAMA_API}users/me`,{ withCredentials:true})
        console.log(response,"the resp from fetching me")
        const currentUser = await response.data
         console.log(currentUser,"current user")
        return currentUser
    } catch (error) {
        console.log(error)
        return null
    }
}
// GET ALL USERS 
export const users = async () => {
    try {
        const users = await axios.get(`${LLAMA_API}users`,{ withCredentials:true})
        return users.data
    } catch (error) {
        console.log(error)
        return null
    }
}    
// GET USER BY ID 
export const userById = async (id) => {
    try {
        const user = await axios.get(`${LLAMA_API}users/${id}`,{ withCredentials:true})
        return user.data
    } catch (error) {
        console.log(error)
        return null
    }
}
//GET USER BY SEARC 
export const userBySearch = async (text) => {
    try {
        console.log(text,"the text")
        const user = await axios.post(`${LLAMA_API}users/search`,text,{ withCredentials:true})
        return user.data
    } catch (error) {
        console.log(error)
        return null
    }
}
//UPDATE PROFILE
export const updateProfile = async (update) => {
    try {
        const response = await axios.put(`${LLAMA_API}users/me`,update,{ withCredentials:true})
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}
//ADD PROFILE PICTURE
export const addPicture = async (avatar) => {
    try {
        let formData = new FormData();
        formData.append("avatar",avatar)
        const response = await axios.put(`${LLAMA_API}users/me/profilePic`,formData,{ withCredentials:true})
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}
//DELETE PROFILE
export const deleteProfile = async () => {
    try {
        const response = await axios.delete(`${LLAMA_API}users/me`,{ withCredentials:true})
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}
//FOLLOW USER 
export const follow = async (id) => {
    try {
        const follow = await axios.post(`${LLAMA_API}users/follow/${id}`,{ withCredentials:true})
        console.log(follow)
        return follow.data
    } catch (error) {
        console.log(error)
        return null
    }
}
//UNFOLLOW USER
export const unfollow = async (id) => {
    try {
        const unfollow = await axios.post(`${LLAMA_API}users/unfollow/${id}`,{ withCredentials:true})
        return unfollow.data
    } catch (error) {
        console.log(error)
        return null
    }
}