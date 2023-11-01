// Import the react JS packages
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
// Define the Login function.

export const Home = () => {
  const slideData = [
    {
      text: "skyline",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAEBQcDAgH/xAAvEAACAQIEAwUIAwAAAAAAAAABAgMEEQAFEiETMVFBYXGBkRQjMoKxssLwBiJC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAwQC/8QAIREAAQQBAwUAAAAAAAAAAAAAAQACAxEEEjHwBSFBYYH/2gAMAwEAAhEDEQA/AFYz3KA0UbVjI8jBNSxEqvifHp64fSURSxNSQOw8K3nzxNeLC2oVWX00hIKkoNPnZSADftAxSsnzWlzaiHBbdAFbWu6+O+KHYWrYArAmr0s56CopYjOt5Y99TD4k77dMc+0RG2mzX5Ww5pEWJSEqKhiu22kW9RgWfK6KpqONA1TTSsukknWhNulhbpsbd2JZuly1qaEzMsbFSmanqYT76ETqP9xHS4HhyPpgzJp3o5hPHUMkc4ZCrf1J+K3zCw27LnffDhoL722xjPlUVQtm1qNWqysQL9bcjhhkPBF+CiMYoo6k/mBWniiMBZ4xpNpgS3PckW/RgOXO5plVlnqujcSoCHbbkFP1GMhlNTGvuK1UW/L2WI/jjw5ZVstjmcy90KLF9gGKDlM71fPqMRlf/9k=",
    },
    {
      text: "ianmukua",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAEBQYHAv/EACwQAAEDAwEFCAMBAAAAAAAAAAECAwQABRESBiExQXETIiNRYZGhsRRSwQf/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A2VaCsUG/AyCpakpSOJJwKVzNvbLGcCEOaxzUTgDpxzUhdtqjc5ZEO4PvKUT2TaYoV2Y8gAoZ64JqyJar5DlrYJbdu0BC/wBVyUA/dBybaiU2XIrzT6cZy0sK+qxiVZp866POsrdkvBRW4oN6dIHHmcdKfWa2SC2gvSWoTqDlK0vHI6ADI96uGpWfcIxltIQmdhWB4jaUg53b+4Dkdafx7ibcw0xFeVokK0vAtJBCfQjfR7+wDBV4E+U0nOcFWr7rhH+fpAwq5PHcRkoSdx9Du+KCZRdl/kx57bim21btGvuhJz3ccgBjkcnJzniSm5F86ITMh5fmngf581UW3YW1wUpS6pcjScjtDu9qesx4sROlhpCQPIUH/9k=",
    },
    {
      text: "desszor",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAYAAEAAwEAAAAAAAAAAAAAAAAGAwQHBf/EADAQAAIBAwIEBQALAQAAAAAAAAECAwQFEQAhBhITMRQiQVFhFSMyM0JEcZGhwdEH/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQIA/8QAGxEAAgMAAwAAAAAAAAAAAAAAAAECEUEDEhP/2gAMAwEAAhEDEQA/ANQt6RNU1xVdhMoGO33aH+9RXF+ndqWUo5iWlnyApKklosZAB27742Gh9tqfpS0LPLItPJ0o35ESIiM8qqcc+cAAex+CdR1dTXMI6mC6VPXkikmTp0S5yWww5S/qFGBn0/DqHyPC1BaduE2yO2LT0ppopPpJX6YAjblNT5crsfsn+NXaykJ4ioZgBhaKpXOd93g/zQl2miqqrxslS0KQRMB4bBk88bEK2dmG+2TsD231yOIuJpKbwdRSTVFPP4aKR2EhPkLHC7nYZjGRv7HT6VguKwpcNSUFZbZ6y/VCUlppWSEsFDyluXChVAyNiNwD6+2ldpb/AJzdZ6e1Ut0uck0mRCplniztnl5gqj07E7n50YquGLZV03hqaaWjgZldo4wCGdQwDEnfOGPrjtqnQ8FrbbhTVtDdwJaeVZU6lPzeZSCOzDTYdGMrlYOFrPAtc5utOVqIUhU3Au0khcAEoSRyjuc52B21mt1eOS+wz0a1G8jo/M6yGRRy/WHChRk74xjykke6Op4cFZM8lwuhfM8k6JBF0wrvyE4yzbAopAGMfptqektlrtamSlVpKo/mJn5mA+PY/P7b76E6VXZlBn//2Q==",
    },
    {
      text: "liberty",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBIgACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAADBAYFAv/EAC0QAAEDAgQEAwkAAAAAAAAAAAECAwQFEQASIWEGMUFREyJxFDJSYpGhwdHh/8QAGAEAAwEBAAAAAAAAAAAAAAAAAQMEAgD/xAAeEQACAQMFAAAAAAAAAAAAAAABAgAREyEDEjJBQv/aAAwDAQACEQMRAD8AsFsbYCuPtjYWztgK2tsa3QFJjqjbYmalw6uRJelPqCE2JUpOtx6bdsWrxabF3XEIHzKAwoZUFRIEyMT28VJ/OOajDMC1U4hKpxNDp8hEd91tLy+aQq+X1On72wm/WWZ1Of8AZaszDlJzJSHmiqx6EEWHbodxfEsvhSqJflyC5HdcdW6prxHFEgLI5nKToAPXlvgNN4PqzGjwp0keGEgLdeTbe4Av/TicWzyNZS13yI/Hg0hyOl6o1JIqK02eU2C4OeoClam/fp0tjmVTqDQKcHXZzknx0qUGn0hXlJ943vl25ddOeAq4RqJOZMano6+SU9f7g4TXwxXpMtblREZacqbFLxUUlObLpkHxK+uGnVToxC6D1ys//9k=",
    },
  ];

  const [streak, setStreak] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [groupDetails, setGroupDetails] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      const accessToken = localStorage.getItem("access_token");
      (async () => {
        try {
          const { data } = await axios.post("http://localhost:8000/login/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setStreak(data.login_streak);
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
          console.log(groupData);
          setGroupDetails(groupData);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);
  useEffect(() => {
    // Check if quotes are in localStorage
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
      setQuotes(storedQuotes);
    } else {
      // Fetch quotes and store them in localStorage
      (async () => {
        try {
          const { data } = await axios.get(
            "https://api.api-ninjas.com/v1/cats/?name=abyssinian",
            {
              headers: {
                "Content-Type": "application/json",
                "X-Api-Key": "PclwjNbke9yFN7BcMuP+Nw==8g7Erlot7SlYNzMk",
              },
            }
          );

          setQuotes(data[0]);
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
      <div className="homepage-section">
        <div className="inner-ctnr-top">
          <div className="inner-cntr1">
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
              <h2 className="ctnr-txt">{streak}</h2>
            </div>
          </div>
          <div className="inner-cntr2">
            <button className="button-10-b">
              <span>see login history</span>
              <ArrowForwardRoundedIcon></ArrowForwardRoundedIcon>
            </button>
          </div>
        </div>
        <div className="inner-ctnr-top">
          <div className="inner-cntr1">
            <div className="icon-ctnr">
              <object
                data={`${process.env.PUBLIC_URL}/friends-pix.png`}
                className="fire-home"
              >
                {" "}
              </object>
            </div>
            <div className="streak-ctnr caro">
              <h3 className="ctnr-heading">My Friends</h3>
              <div className="caro-div">
                <ScrollingCarousel>
                  {slideData.map((d, i) => (
                    <div
                      className="imgcdiv"
                      key={i}
                      onClick={() => console.log("CLICK")}
                    >
                      <img
                        alt="ian"
                        style={{
                          borderRadius: "50%",
                          height: "50px",
                          marginBottom: "3px",
                          marginLeft: "3px",
                          marginRight: "8px",
                          marginTop: "3px",
                          width: "50px",
                          border: "2px solid #229fff",
                          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                        }}
                        src={d.img}
                      />
                      <span style={{ fontSize: "10px", textAlign: "center" }}>
                        {d.text}
                      </span>
                    </div>
                  ))}
                </ScrollingCarousel>
              </div>
            </div>
          </div>
          <div className="inner-cntr2">
            <button className="button-10-b">
              <span>find more friends</span>
              <ArrowForwardRoundedIcon></ArrowForwardRoundedIcon>
            </button>
          </div>
        </div>
        <div className="inner-ctnr-top">
          <div className="inner-cntr1">
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
              <div className="caro-div">
                <ScrollingCarousel>
                  {groupDetails.map((d, i) => (
                    <div className="imgcdiv" key={i}>
                      <img
                        alt="ian"
                        style={{
                          borderRadius: "50%",
                          height: "50px",
                          marginBottom: "3px",
                          marginLeft: "3px",
                          marginRight: "8px",
                          marginTop: "3px",
                          width: "50px",
                          border: "2px solid orange",
                          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                        }}
                        src={`${process.env.PUBLIC_URL}/groupprofilepic.jpg`}
                      />
                      <span style={{ fontSize: "10px", textAlign: "center" }}>
                        {d.group_name}
                      </span>
                    </div>
                  ))}
                </ScrollingCarousel>
              </div>{" "}
            </div>
          </div>
          <div className="inner-cntr2">
            <button className="button-10-b">
              <span>Browse all groups</span>
              <ArrowForwardRoundedIcon></ArrowForwardRoundedIcon>
            </button>
          </div>
        </div>
      </div>
      <div className="homepage-section2">
        <div className="inner-ctnr-bottom">
          <div className="inner-ctnr-bottom1">
            <div className="pix">
              <object
                data={`${process.env.PUBLIC_URL}/pix.png`}
                className="pix-home"
              >
                {" "}
              </object>
            </div>

            <div className="cntr-bottom-deets"></div>
          </div>
        </div>

        <div className="inner-ctnr-bottom2">
          <div className="quotes">
            <div className="pet-img-div">
              <img  className="catpic" alt="catpic" src={quotes.image_link} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
