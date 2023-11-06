//components/ProductList.js

import ProductRow from "./ProductRow";
import { useEffect, useState } from "react";
import axios from "axios";



function ProductList() {
  const [groups, setGroups] = useState([]);
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
            "http://127.0.0.1:8000/api/group/1/members/?user_id=yes",
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
              },
            }
          );

          setGroups(data[0]);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);
  return (
    <div className="container main-content">
      <ProductRow
        imageUrl={`${process.env.PUBLIC_URL}/fire.png`}
        productName="Blue T-Shirt"
        productDescription="Ian ipsum dolor sit amet, consectetur adipiscing elit."
        productPrice="Join"
      />
    </div>
  );
}

export default ProductList;
