import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import Listing from "./Listing";

import { AuthContext } from "../App";
// Could possibly use a switch statement to determine
// if user is authenticated, and/or is an Admin user.
// If not, the request to /api/listings can't happen.
const AdminDashboard = () => {
  const auth = useContext(AuthContext);
  const [status, setStatus] = useState("");
  const [listings, setListings] = useState([]);
  // probably need useEffect

  useEffect(() => {
    const getListings = async () => {
      // data will be an array of objects containing
      // different listings.
      try {
        const { data } = await axios.get("/api/listings", (req, res) => {
          console.log(res.status);
        });
        setListings(data);
      } catch (err) {
        if (err.response.status === 401) {
          setStatus("You must log in");
        } else if (err.response.status === 403) {
          setStatus("Access forbidden");
        }
      }
    };
    getListings();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center display-3">Current Listings</h1>
      <div className="row justify-content-center">
        {listings.map((listing) => {
          return <Listing listings={listing} key={listing._id} />;
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
