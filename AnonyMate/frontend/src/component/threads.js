import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const Threads = (props) => {
  const { groupname, groupinfo, setMessages, setSocket } = props;
  const openChat = () => {

    window.location.href=`/chat/${groupname}`
    
  };
  return (
    <>
      <div className="singlethread" onClick={openChat} >
        <div className="thread-profile">
          <img
            src={`${process.env.PUBLIC_URL}/grouppix.png`}
            alt="threads-profile"
            height="50"
          />
        </div>
        <div className="info-thread">
          <div className="info-thread-gname">
            <span className="gname-spn">{groupname}</span>
          </div>
          <div className="info-thread-disc">
            <span className="desc-spn">{groupinfo}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Threads;
