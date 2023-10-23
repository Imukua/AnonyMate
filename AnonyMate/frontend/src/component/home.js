// Import the react JS packages
import { useEffect, useState } from "react";
import axios from "axios";
// Define the Login function.
export const Home = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      const accessToken = localStorage.getItem("access_token");
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/home/", {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
          });
          setMessage(data.message);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);
  return (
    <div className="homepage-ctnr">
    </div>
  );
};
