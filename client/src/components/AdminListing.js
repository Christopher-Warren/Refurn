import React, { useEffect, useState } from "react";
import axios from "axios";

export default ({ listings }) => {
  const [approved, setApproved] = useState();
  const listingId = listings._id;

  useEffect(() => {
    setApproved(listings.approved);
  }, []);

  const handleDeny = async () => {
    const { data } = await axios.post(`/api/listings/deny/${listingId}`);
    console.log(data.approved);
    setApproved(data.approved);
  };

  const handleApprove = async () => {
    const { data } = await axios.post(`/api/listings/approve/${listingId}`);
    console.log(data.approved);
    setApproved(data.approved);
  };
  console.log(listings);
  const deleteListing = async () => {
    const { data } = await axios.delete(`/api/listings/${listingId}`);
  };

  const renderContent = () => {
    switch (approved) {
      case null:
        return (
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn btn-primary btn-lg mx-3 w-50"
              onClick={handleApprove}
            >
              Accept Offer
            </button>
            <button
              onClick={handleDeny}
              type="button"
              className="btn btn-danger btn-lg mx-3 w-50 mt-2"
              data-id={listings._id}
            >
              Deny Offer
            </button>
          </div>
        );
      case true:
        return (
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn btn-success btn-lg mx-3 w-50"
              onClick={handleApprove}
              disabled
            >
              Approved - Call {listings.phone}
            </button>
          </div>
        );
      default:
        return (
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn btn-danger btn-lg mx-3 w-50 mt-2"
              disabled
            >
              Offer Declined
            </button>
          </div>
        );
    }
  };

  return (
    <div className="card w-75 mb-5 shadow bg-light">
      <div className="position-absolute text-right">
        <button className="btn btn-danger" onClick={deleteListing}>
          X
        </button>
      </div>
      <img
        className="card-img-top"
        src={listings.imageURL}
        alt={listings.furnitureType}
      ></img>
      <div className="card-body">
        <h5 className="card-title display-4 text-center">
          {listings.furnitureType || "None"}
        </h5>
        <p className="card-text text-center">
          Name: {`${listings.firstName} ${listings.lastName}`}
          <br />
          Email: {`${listings.email || "None"}`}
          <br />
          Phone: {`${listings.phone || "None"}`}
          <br />
          Alt-Phone: {`${listings.altPhone || "None"}`}
          <br />
          Asking Price: {listings.askingPrice || "None"}
          <br />
          Condition: {listings.condition || "None"}
          <br />
          Color: {listings.color || "None"}
          <br />
          Details: {listings.detailText || "None"}
        </p>
      </div>
      {renderContent()}
      <div className="card-footer text-center">
        <small className="text-mute">Last updated 3 mins ago</small>
      </div>
    </div>
  );
};
