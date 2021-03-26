import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import createUID from 'create-unique-id';
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../store/Actions/rooms";
import ChatList from "../ChatList/ChatList"
let socket;
const CONNECTION_PORT = "http://localhost:9010/";
const connOpt = {
  transports: ["websocket"], // socket connectin options
};
socket = io(CONNECTION_PORT,connOpt)
function MessageContainer() {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const rooms = useSelector((state) => state.rooms.allRooms)
  const user = useSelector((state) => state.user.user)
  // After Login
  const [message, setMessage] = useState("");
  const [userId] = useState(user._id);
  const [messageList, setMessageList] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllRooms())
    socket.on("message", (msg) => setMessageList((messages) => messages.concat(msg)));
    socket.on("connect", () => console.log(socket.id,"USER ID")); 

    return () => socket.removeAllListeners(); //componentWillUnmount
  }, []);
  
  console.log(createUID(10),"RANDOM ID")
  const connectToRoom = () => {
    setLoggedIn(true);
    let newJoin = {
      room:room,
      userId,
      username:user.name
    }
    //Messages(room)
    console.log(newJoin,"the new user joined")
    socket.emit("joinRoom", newJoin);
  };

  const sendMessage = async (e) => {
    e.preventDefault()
    let messageContent = {
      room: room,
      message:message,
      sender:user.name,
      userId
    };
    console.log(messageContent,"message")
    await socket.emit("sendMessage", messageContent);
    setMessage("");
  };
  console.log(messageList, "MESSAGES")
  console.log(userId,"the current user id")
  return (
    <div className="App">
      <ChatList />
       {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Room..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
           <div className="messages">
           {messageList.map((val,i) => (
                <div
                key={i}
                  className="messageContainer"
                  //id={val.sender === username ? "You" : "Other"}
                >
                  <div className="messageIndividual">
                    {val.sender}: {val.text}
                  </div>
                </div>
              ))}     
          </div>

          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={(e) => sendMessage(e)}>Send</button>
          </div> 
        </div>
      )} 
    </div>
  );
}

export default MessageContainer;
