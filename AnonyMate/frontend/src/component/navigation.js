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
        <Nav className="me-a">
          {isAuth ? (
            <Nav.Link href="/">
              <object
                data={`${process.env.PUBLIC_URL}/ghost.svg`}
                className="ghost-home"
              >
                {" "}
              </object>
            </Nav.Link>
          ) : null}
        </Nav>
        <Nav className="far-end">
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
        </Nav>
      </div>

      {isAuth ? (
        <div className="navwrapper2">
          <button className="button-17">
            <HomeIcon className="nav-icons"></HomeIcon>Home
          </button>

          <button className="button-17">
            <Diversity1RoundedIcon className="nav-icons"></Diversity1RoundedIcon>Groups
          </button>

          <button className="button-17">
            <RssFeedRoundedIcon className="nav-icons"></RssFeedRoundedIcon>Feed
          </button>

          <button className="button-17">
            <Diversity2RoundedIcon className="nav-icons"></Diversity2RoundedIcon>AI-friend
          </button>
        </div>
      ) : null}
    </Navbar>
  );
}
