//components/ProductList.js

import ProductRow from "./ProductRow";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductList() {
  const [groups, setGroups] = useState([]);
  const [show, setShow] = useState(false);
  const [groupname, setGroupname] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setShow(false);
    console.log(groupname);
    console.log(description);
  };

  const handleSubmit = async e => {
    setShow(false);
    e.preventDefault();
    const group = {
        group_name: groupname,
        group_description: description

    };
   
    try {
      const accessToken = localStorage.getItem('access_token');
      const { data } = await axios.post(
        "http://localhost:8000/api/group/create/",
        group,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      toast.success(`${groupname} created successfully!`, {
        position: "top-center",
        autoClose: 2998,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

        setTimeout(window.location.reload(),3000);

    } catch (error) {
      toast.error(`${groupname} not created, check name or sescription!`, {
        position: "top-center",
        autoClose: 4998,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      console.error(error);
      // handle error here  
    }

    setDescription("");
    setGroupname("")
}
  const handleShow = () => setShow(true);
  useEffect(() => {
    // Check if quotes are in localStorage
    const storedGroups = localStorage.getItem("groups");
    if (storedGroups) {
      setGroups(storedGroups);
    } else {
      // Fetch quotes and store them in localStorage
      (async () => {
        try {
          const accessToken = localStorage.getItem("access_token");
          const data = await axios.get(
            "http://127.0.0.1:8000/api/group/non2/",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setGroups(data.data);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);
  return (
    <>
      <div className="container ">
      <ToastContainer/>
        <div className="create-grp">
          <button onClick={handleShow} className="btn btn-primary">
            create group
          </button>
          <Modal
          centered
          show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Group name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="a name for your group"
                    autoFocus
                    required
                    value={groupname}
                    onChange={(e) => setGroupname(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Group Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="a name for your group"
                    autoFocus
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    as="textarea"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              <Button
                disabled={description.trim() === "" || groupname.trim() === ""}
                variant="primary"
                onClick={handleSubmit}
              >
                create group
              </Button>
              
            </Modal.Footer>
          </Modal>
          
        </div>
      </div>
      <div className="container main-content">
        {groups.map((group) => (
          <ProductRow
            imageUrl={`${process.env.PUBLIC_URL}/grouppix.png`}
            productName={group.group_name}
            productDescription={group.group_description}
            productId={group.group_id}
            isMember={group.is_member}
            key={group.group_id}
          />
        ))}
      </div>
    </>
  );
}

export default ProductList;
