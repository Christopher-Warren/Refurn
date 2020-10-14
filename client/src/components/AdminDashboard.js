import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { AuthContext } from "../App";
// Could possibly use a switch statement to determine
// if user is authenticated, and/or is an Admin user.
// If not, the request to /api/listings can't happen.
const AdminDashboard = () => {
  const auth = useContext(AuthContext);
  // probably need useEffect

  useEffect(() => {
    const getListings = async () => {
      // data will be an array of objects containing
      // different listings.
      const { data } = await axios.get("/api/listings");

      data.map((listing) => {
        return (
          <div>
            <div class="card" style={{ width: "18rem;" }}>
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{data.furnitureType}</h5>
                <p class="card-text">{data.detailText}</p>
                <a href="#" class="btn btn-primary">
                  Approve
                </a>
                <a href="#" class="btn btn-alert">
                  Deny
                </a>
              </div>
            </div>
          </div>
        );
      });
    };
    getListings();
  }, []);

  //   <div>
  //     <div class="card" style={{ width: "18rem;" }}>
  //       <img src="..." class="card-img-top" alt="..." />
  //       <div class="card-body">
  //         <h5 class="card-title">Card title</h5>
  //         <p class="card-text">
  //           Some quick example text to build on the card title and make up the
  //           bulk of the card's content.
  //         </p>
  //         <a href="#" class="btn btn-primary">
  //           Go somewhere
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  return <div></div>;
};

export default AdminDashboard;
