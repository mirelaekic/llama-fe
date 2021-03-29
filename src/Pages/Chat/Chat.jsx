import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatList from '../../components/ChatList/ChatList'
import MessageContainer from "../../components/MessageContainer/MessageContainer"
import "../styles.css"
import { getMe } from "../../store/Actions/user";
import { getAllRooms } from '../../store/Actions/rooms'
export default function Chat() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMe())
        dispatch(getAllRooms())
    },[])
    const user = useSelector((state) => state.user.user)
    return user ? (
        <div className="chat-page">
            <ChatList />
            
        </div>
    ) : null
}
