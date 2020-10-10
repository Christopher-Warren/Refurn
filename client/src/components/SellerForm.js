import React from "react";
import FileUpload from "./FileUpload";

const SellerForm = () => {
  return (
    <div className="card border-dark shadow-lg mt-5 pb-4 container">
      <h1 className="text-center">Furniture Submission Form</h1>

      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFirstName">First Name</label>
            <input type="text" className="form-control" id="inputFirstName" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLastName">Last Name</label>
            <input type="text" className="form-control" id="inputPassword4" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFurnitureType">Furniture Type</label>
            <input
              type="text"
              className="form-control"
              id="inputFurnitureType"
              placeholder="e.g Love Seat"
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputCondition">Condition</label>
            <select id="inputCondition" className="form-control">
              <option defaultValue>Choose...</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputColor">Color</label>
            <input type="text" className="form-control" id="inputColor" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputPrice">Details</label>
            <input
              type="text"
              className="form-control"
              id="inputDetails"
              placeholder="This couch has endured many hours of very comfortable gaming."
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPrice">Asking Price</label>
            <input
              type="text"
              className="form-control"
              id="inputPrice"
              placeholder="$100"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputPrice">Asking Price</label>
            <input
              type="text"
              className="form-control"
              id="inputPrice"
              placeholder="$100"
            />
          </div>
        </div>

        <FileUpload />

        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit For Review
        </button>
      </form>
    </div>
  );
};

export default SellerForm;
