import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";

import UserListing from "./UserListing";

const UserDashboard = () => {
  const auth = useContext(AuthContext);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (auth) {
      const getListings = async () => {
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
      {(auth && <h1 className="display-4 text-center">Your Offers</h1>) || (
        <div className="mt-5 pb-4 container">
          <h1 className="text-center display-4">Please log in.</h1>
        </div>
      )}
      <div className="container">
        {userListings.map((listings) => {
          return <UserListing key={listings._id} listings={listings} />;
        })}
      </div>
    </div>
  );
};

export default UserDashboard;
