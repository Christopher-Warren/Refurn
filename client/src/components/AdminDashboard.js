import React, { useState, useContext, useEffect } from "react";

import axios from "axios";

import Listing from "./AdminListing";

import { AuthContext } from "../App";

const AdminDashboard = () => {
  const auth = useContext(AuthContext);
  const [listings, setListings] = useState([]);

  const getListings = async () => {
    try {
      const { data } = await axios.get("/api/listings");
      setListings(data);
    } catch (err) {
      if (err.response.status === 401) {
      } else if (err.response.status === 403) {
      }
    }
  };
  useEffect(() => {
    getListings();
  }, []);

  const renderListings = () => {
    switch (auth) {
      case null || undefined:
        return <div>You Must Log In.</div>;
      case "5f8bb02eda6cf40017de82da":
        return (
          <div className="container">
            <h1 className="text-center text-light display-3">Current Offers</h1>
            <div className="row justify-content-center">
              {listings.map((listing) => {
                return (
                  <Listing
                    listings={listing}
                    getListings={getListings}
                    key={listing._id}
                  />
                );
              })}
            </div>
          </div>
        );
      default:
        return;
    }
  };

  return <div>{renderListings()}</div>;
};

export default AdminDashboard;
