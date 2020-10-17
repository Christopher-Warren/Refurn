import React from "react";

export default ({ listings }) => {
  console.log(listings);

  return (
    <div className="card w-75 mb-5 shadow">
      <img
        className="card-img-top"
        src={listings.imageURL}
        alt="Card image cap"
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
      <div className="text-center mb-3">
        <button type="button" className="btn btn-primary btn-lg mx-3 w-50">
          Accept Offer
        </button>
        <button type="button" className="btn btn-danger btn-lg mx-3 w-50 mt-2">
          Deny Offer
        </button>
      </div>

      <div className="card-footer text-center">
        <small className="text-mute">Last updated 3 mins ago</small>
      </div>
    </div>
  );
};
