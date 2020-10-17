import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";

import UserListing from "./UserListing";

export default () => {
  const auth = useContext(AuthContext);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (auth) {
      const getListings = async () => {
        console.log(auth);
        const { data } = await axios.get(
          `api/listings/${auth}`,
          (req, res) => {}
        );
        setUserListings(data);
      };

      getListings();
    }
  }, [auth]);

  return (
    <div>
      <h1 className="display-4 text-center">Your listings</h1>
      {userListings.map((listings) => {
        return <UserListing key={listings._id} listings={listings} />;
      })}
    </div>
  );
};
