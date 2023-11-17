import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import Threads from "./threads";


const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [mood, setMood] = useState("happy");
  const [socket, setSocket] = useState(null);
  const [groupDetails, setGroupDetails] = useState([]);
  const groupName = window.location.href.split("/").pop();
  console.log(groupName);

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      const accessToken = localStorage.getItem("access_token");
      (async () => {
        try {
          try {
            const { data } = await axios.post(
              "http://localhost:8000/login/",
              null,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            setUsername(data.username);
            setMood(data.mood);
            console.log(data);
            const groupResponse = await axios.get(
              "http://127.0.0.1:8000/api/group/1/members/?user_id=yes",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            const groupData = groupResponse.data;
            setGroupDetails(groupData);
            console.log(groupData)
          } catch (error) {
            console.error(error);
            // handle error here
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8000/ws/${groupName}/`);
    newSocket.onopen = () => {
      console.log("connection made successfully");
      setSocket(newSocket);
    };

    newSocket.onmessage = (e) => {
      console.log(e.data);
      //handle incoming message
      const receivedMessage = JSON.parse(e.data);
      setMessages(prevMessages => [...prevMessages, receivedMessage]);
      console.log(receivedMessage);
      console.log(receivedMessage.text); 
      // clear messages list and add received message
    };

    newSocket.onclose = () => {
      console.log("websocket connection closed");
    };

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  const dummy = useRef();
  const sendMessage = () => {
    if (socket) {
      const data = JSON.stringify({ text: message, sender: username });
      console.log(`Sending message: ${data}`);
      socket.send(data);
      setMessage("");
      dummy.current.scrollIntoView({behavior:"smooth", block:"end"})
    } else {
      console.log("Cannot send message, socket is not connected");
    }
  };
  

  return (
    <div className="chat-cntr">
      
      <div className=" chat-inbox-cntr">
        
        
        <div className="message-box-cntr">
          <div className="chat">
            {messages.map((msg, index) => (
              <>
              
              <div
                key={index}
                className={msg.sender === username ? "msg sent" : "msg rcvd"}
              >
                <p className="msgsender">{msg.sender} - {mood}</p>
                <p className="message-txt">{msg.text}</p>
              </div>
              </>
              
            ))}
            <span ref={dummy} className="spacepan"> </span>
          </div>
          
          <input
            className="messageBox"
            value={message}
            placeholder="open up"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          ></input>
        </div>
      </div>
      
    </div>
  );
};

export default Chat;
