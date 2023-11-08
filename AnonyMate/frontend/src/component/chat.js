import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [username, setUsername] = useState("");
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
      setSender(receivedMessage.sender);
      console.log(sender);
      console.log(receivedMessage);
      console.log(receivedMessage.text);
      setMessages((prevMesssages) => [...prevMesssages, receivedMessage.text]);
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

  const sendMessage = () => {
    if (socket) {
      const data = JSON.stringify({ text: message, sender: username });
      console.log(`Sending message: ${data}`);
      socket.send(data);
      setMessage("");
    } else {
      console.log("Cannot send message, socket is not connected");
    }
  };

  return (
    <div className="chat-cntr">
      <div className="chat-convo-cntr">
        <div className="chat-header">
          <h3 className="">chats</h3>
        </div>
      </div>
      <div className=" chat-inbox-cntr">
        <div className="inbox-header">
          <h3 className="">chats</h3>
        </div>
        <div className="message-box-cntr">
          <div className="messagehold">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={sender === username ? "message" : "message1"}
              >
                <p className="message-txt">{msg}</p>
              </div>
            ))}
          </div>
          <input
            className="messageBox"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          ></input>
        </div>
      </div>
      <div className="chat-users-cntr">
        <div className="members-header">
          <h3 className="">members</h3>
        </div>
      </div>
    </div>
  );
};

export default Chat;
