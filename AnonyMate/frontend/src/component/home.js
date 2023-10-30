// Import the react JS packages
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
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
              Authorization: `Bearer ${accessToken}`,
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
      <div className="Overview-ctnr">
        <div className="Overview-txt">
          <h2 className="Overview-txt-txt">Overview </h2>
          <button className="button-10">
            <DashboardRoundedIcon></DashboardRoundedIcon>Dashboard
          </button>
        </div>
      </div>
      <div class="homepage-section">
        <div className="inner-ctnr-top">
          <div class="inner-cntr1">
            <div className="icon-ctnr">
              <object
                data={`${process.env.PUBLIC_URL}/fire.png`}
                className="fire-home"
              >
                {" "}
              </object>
            </div>
            <div className="streak-ctnr">
              <h3 className="ctnr-heading">My Streak</h3>
              <h2 className="ctnr-txt">24</h2>
            </div>
          </div>
          <div class="inner-cntr2">
            <button className="button-10-b">
              <span>see login history</span>
              <ArrowForwardRoundedIcon></ArrowForwardRoundedIcon>
            </button>
          </div>
        </div>
        <div className="inner-ctnr-top">
          <div class="inner-cntr1">
            <div className="icon-ctnr">
              <object
                data={`${process.env.PUBLIC_URL}/friends-pix.png`}
                className="fire-home"
              >
                {" "}
              </object>
            </div>
            <div className="streak-ctnr">
              <h3 className="ctnr-heading">My Friends</h3>
              <h2 className="ctnr-txt">friends hapa</h2>
            </div>
          </div>
          <div class="inner-cntr2">
            <button className="button-10-b">
              <span>find more friends</span>
              <ArrowForwardRoundedIcon></ArrowForwardRoundedIcon>
            </button>
          </div>
        </div>
        <div className="inner-ctnr-top">
          <div class="inner-cntr1">
            <div className="icon-ctnr">
              <object
                data={`${process.env.PUBLIC_URL}/grouppix.png`}
                className="fire-home"
              >
                {" "}
              </object>
            </div>
            <div className="streak-ctnr">
              <h3 className="ctnr-heading">My Groups</h3>
              <h2 className="ctnr-txt">24</h2>
            </div>
          </div>
          <div class="inner-cntr2">
            <button className="button-10-b">
              <span>Browse all groups</span>
              <ArrowForwardRoundedIcon></ArrowForwardRoundedIcon>
            </button>
          </div>
        </div>
      </div>
      <div class="homepage-section2">
        <div className="inner-ctnr-bottom">
        <div class="inner-ctnr-bottom1">
          <div className="pix">
            <object
              data={`${process.env.PUBLIC_URL}/pix.png`}
              className="pix-home"
            >
              {" "}
            </object>
          </div>

          <div className="cntr-bottom-deets">
            
          </div>
        </div>
        </div>
        
        <div className="inner-ctnr-top"></div>
      </div>
    </div>
  );
};
