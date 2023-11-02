import React, { useState, useEffect } from "react";
import WebSocketClient from "websocket";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const Chat = () => {
  const [mesage, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect ({})

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
        <div class="message-box-cntr">
          <input className="messageBox"></input>
          <div class="send-msg">
            <SendRoundedIcon></SendRoundedIcon>
          </div>
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
