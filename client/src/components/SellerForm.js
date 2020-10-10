import React, { useState } from "react";
import axios from "axios";

const SellerForm = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");

  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // this points to file in backend
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("there was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div className="card border-dark shadow-lg mt-5 pb-4 container">
      <h1 className="text-center">Furniture Submission Form</h1>

      <form onSubmit={onSubmit}>
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

        <div className="form-group col-md-4 custom-file mb-3">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>

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
