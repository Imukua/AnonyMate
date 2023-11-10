// Import the react JS packages
import { useEffect, useState } from "react";
import Header from "./header"
import Hero from "./Hero"
export const Landing = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") != null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <>
      <Header></Header>
      <Hero></Hero>
    </>
  );
};
