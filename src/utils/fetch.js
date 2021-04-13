import axios from "axios"

const {LLAMA_API} = process.env

// FETCH PAST MESSAGES 
// GET ALL ROOMS THEN FILTER THEM BY THE CURRENT USERS ID 
const Messages = async (roomName) => {
   try {
     const res = await fetch(roomName)
     if (res.ok) {
       const msg = await res.json()
       setFetchMessages(msg)
     }
   } catch (error) {
     console.log(error)
   }
}