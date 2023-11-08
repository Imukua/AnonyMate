import React from "react";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ErrorIcon from '@mui/icons-material/Error';



const ProductRow = (props) => {
  const { imageUrl, productName, productDescription, productId, isMember } =
    props;
    const [show, setShow] = useState(false);
    const [lejoin, setLejoin] = useState("Leave")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleJoin = () => {
    console.log("clicked me");
    (async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const data = await axios.post(
          `http://127.0.0.1:8000/api/group/${productId}/join/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success(`group joined successfully!`, {
          position: "top-center",
          autoClose: 1998,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });

          setTimeout("window.location.reload()",2000);
      } catch (e) {
        toast.error(`Error:  join failed`, {
          position: "top-center",
          autoClose: 1998,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });

        console.log(e);
      }
    })();
  };
  const handleLeave = () => {
    console.log("clicked me");
    setShow(false);
    (async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const data = await axios.post(
          `http://127.0.0.1:8000/api/group/${productId}/leave/`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
          }
        );
        toast.success(`group left successfully!`, {
          position: "top-center",
          autoClose: 1998,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });

          setTimeout("window.location.reload()",2000);
          
      } catch (e) {
        toast.error( "request not accepted", {
          position: "top-center",
          autoClose: 2998,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        console.log(e);
      }
    })();
  };
  return (
    <div className="row product">
      <Modal
      size="sm"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header closeButton>
          <Modal.Title className="modalLeaveTitle"><ErrorIcon fontSize="large"></ErrorIcon> <span>Leaving so soon ?</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalLeave">
          Are you sure you want to leave <span className="gname">{productName}</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLeave}>{lejoin}</Button>
        </Modal.Footer>
      </Modal>
      <div className="col-md-2">
        <img src={imageUrl} alt={productName} height="100" />
      </div>
      <div className="col-md-8 product-detail">
        <h4>{productName}</h4>
        <p>{productDescription}</p>
      </div>
      <div className="col-md-2 product-price">
        {isMember ? (
          <GroupRemoveIcon
            fontSize="large"
            className="leavebtn"
            onClick={handleShow}
            cursor="pointer"
          ></GroupRemoveIcon>
        ) : (
          <GroupAddRoundedIcon
            fontSize="large"
            className="joinbtn"
            onClick={handleJoin}
            cursor="pointer"
          ></GroupAddRoundedIcon>
        )}
      </div>
    </div>
  );
};

export default ProductRow;
