import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import createUID from 'create-unique-id';

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
  const [username, setUsername] = useState("");

  // After Login
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [fetchMessages, setFetchMessages] = useState([])
  
  // useEffect(() => {
  //   socket.on("joinRoom", (data) => {
  //     setMessageList(data);
  //   });
  // });
  // 
  // console.log(fetchMessages,"FETCHED MESSAGES")
  useEffect(() => {
    socket.on("message", (msg) => setMessageList((messages) => messages.concat(msg)));
    //listening to any event of type "bmsg" and reacting by calling the function
    //that will append a new message to the "messages" array
    socket.on("connect", () => console.log(socket.id,"USER ID")); //check if socket is connected

    return () => socket.removeAllListeners(); //componentWillUnmount
  }, []);
  
  console.log(createUID(10),"RANDOM ID")
  const connectToRoom = () => {
    setLoggedIn(true);
    let newJoin = {
      room:room,
      userId,
      username:username
    }
    //Messages(room)
    socket.emit("joinRoom", newJoin);
  };

  const sendMessage = async (e) => {
    e.preventDefault()
    let messageContent = {
      room: room,
      message:message,
      sender:username,
      userId
    };
    await socket.emit("sendMessage", messageContent);
    //Messages(room)
    //setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };
  console.log(messageList, "MESSAGES")
  return (
    <div className="App">
       {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Name..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="userId..."
              onChange={(e) => {
                setUserId(e.target.value);
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
            <button onClick={sendMessage}>Send</button>
          </div> 
        </div>
      )} 
    </div>
  );
}

export default MessageContainer;
