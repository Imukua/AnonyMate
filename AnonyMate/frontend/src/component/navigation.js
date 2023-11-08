import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PermPhoneMsgRoundedIcon from "@mui/icons-material/PermPhoneMsgRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import Diversity2RoundedIcon from "@mui/icons-material/Diversity2Rounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Link } from 'react-router-dom';


export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") != null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  return (
    <Navbar className="my-top-nav">
      <div className="navwrapper1">
        {isAuth ? null : (
          <section className="wrapper">
            <div className="top">AnonyMate</div>
            <div className="bottom facncy" aria-hidden="true">
              Anonymate
            </div>
          </section>
        )}
      
        <Nav className="far-end">
          {isAuth ? (
            null
          ) : (
            <Nav.Link href="/login">
              <LoginRoundedIcon fontSize="large"></LoginRoundedIcon>
            </Nav.Link>
          )}
        </Nav>
      </div>

      {isAuth ? (
        <div className="navwrapper2">
          <Link to="/home">
          <button className="button-17">
            <HomeIcon className="nav-icons"></HomeIcon>Home
          </button>
          </Link>
    
          <Link to="/groups">
          <button className="button-17">
            <Diversity1RoundedIcon className="nav-icons"></Diversity1RoundedIcon>Groups
          </button>
          </Link>

          <Link to="/chat">
          <button className="button-17">
            <QuestionAnswerIcon className="nav-icons"></QuestionAnswerIcon>Chats
          </button>
          </Link>

          <Link to="/groups">
          <button className="button-17">
            <Diversity2RoundedIcon className="nav-icons"></Diversity2RoundedIcon>AI-friend
          </button>
          </Link>
          <nav class="ih">
          <Nav.Link href="/about">
            <InfoRoundedIcon className="nav-icons2" fontSize="large"></InfoRoundedIcon>
          </Nav.Link>
          <Nav.Link href="/contact">
            <PermPhoneMsgRoundedIcon className="nav-icons2" fontSize="large"></PermPhoneMsgRoundedIcon>
          </Nav.Link>
          {isAuth ? (
            <Nav.Link href="/settings">
              <ManageAccountsRoundedIcon className="nav-icons2" fontSize="large"></ManageAccountsRoundedIcon>
            </Nav.Link>
          ) : null}
          {isAuth ? (
            <Nav.Link href="/logout">
              <ExitToAppIcon fontSize="large" className="nav-icons22"></ExitToAppIcon>
            </Nav.Link>
          ) : (
            <Nav.Link href="/login">
              <LoginRoundedIcon fontSize="large"></LoginRoundedIcon>
            </Nav.Link>
          )}
          </nav>
        </div>
      ) : null}
    </Navbar>
  );
}
