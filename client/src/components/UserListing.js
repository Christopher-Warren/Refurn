import React from "react";

const UserListing = ({ listings }) => {
  const renderContent = () => {
    switch (listings.approved) {
      case false:
        return (
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn btn-danger btn-lg mx-3 w-50"
              disabled
            >
              Sorry!
              <br /> We have decided to decline your offer.
            </button>
          </div>
        );
      case true:
        return (
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn btn-success btn-lg mx-3 w-50"
              disabled
            >
              Approved!
              <br /> We will contact you shortly.
            </button>
          </div>
        );
      case null:
        return (
          <div className="text-center mb-3">
            <button
              type="button"
              className="btn btn-secondary btn-lg mx-3 w-50"
              disabled
            >
              Status:
              <br /> Pending
            </button>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{listings.furnitureType}</h5>
        <p className="card-text">
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
        {renderContent()}
      </div>
    </div>
  );
};

export default UserListing;
