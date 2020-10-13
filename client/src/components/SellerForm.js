import React, { useState, useContext, Fragment } from "react";
import { AuthContext } from "../App";
import axios from "axios";

const SellerForm = (props) => {
  const auth = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");

  const [uploadedFile, setUploadedFile] = useState({});

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [furnitureType, setFurnitureType] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [detailText, setDetailText] = useState("");
  const [askingPrice, setAskingPrice] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  // Uploads the user image to our
  // internal database, and shows
  // the user a review modal.
  const onSubmitReview = async (e) => {
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

      const { fileName, filePath, fileDir } = res.data;

      setUploadedFile({ fileName, filePath, fileDir });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("there was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  // Is called when user clicks Submit on
  // the review form and sends the form
  // data to our database.
  const onFinalClick = async (e) => {
    e.preventDefault();
    try {
      const listingData = {
        firstName,
        lastName,
        furnitureType,
        condition,
        color,
        detailText,
        askingPrice,
        imageURL: uploadedFile.fileDir,
      };
      // fileDir is the generated Image URL
      await axios.post("/api/submit", listingData);
      console.log(listingData);
      // Send the User to /thankyou or /dashboard
      props.history.push("/thankyou");
    } catch (err) {
      if (err.response.status === 500) {
        console.log("there was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <div className="mt-5 pb-4 container">
            <h1 className="text-center display-4">Furniture Submission Form</h1>
          </div>
        );
      default:
        return (
          <div className="card border-dark shadow-lg mt-5 pb-4 container">
            <h1 className="text-center display-4">Furniture Submission Form</h1>

            <form onSubmit={onSubmitReview}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputFirstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFirstName"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputLastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    onChange={(e) => setLastName(e.target.value)}
                  />
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
                    onChange={(e) => setFurnitureType(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputCondition">Condition</label>
                  <select
                    id="inputCondition"
                    className="form-control"
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option defaultValue>Choose...</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Poor</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="inputColor">Color</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputColor"
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-8">
                  <label htmlFor="inputPrice">Details</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDetails"
                    placeholder="This couch has endured many hours of very comfortable gaming."
                    onChange={(e) => setDetailText(e.target.value)}
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
                    onChange={(e) => setAskingPrice(e.target.value)}
                  />
                </div>
              </div>
              <p className="mb-2">Upload an Image</p>
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
              <button
                type="submit"
                data-toggle="modal"
                data-target="#staticBackdrop"
                className="btn btn-primary"
              >
                Submit For Review
              </button>

              <div
                className="modal fade"
                id="staticBackdrop"
                data-backdrop="static"
                data-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title" id="staticBackdropLabel">
                        Review Your Submission
                      </h1>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <h2>
                        Name: {firstName} {lastName}
                      </h2>
                      <h2>Furniture Type: {furnitureType}</h2>
                      <h2>Condition: {condition}</h2>
                      <h2>Color: {color}</h2>
                      <h2>Details: {detailText}</h2>
                      <h2>Asking Price: {askingPrice}</h2>
                      {uploadedFile && (
                        <img
                          src={uploadedFile.filePath}
                          alt={uploadedFile.fileName}
                        ></img>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-dismiss="modal"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-dismiss="modal"
                        onClick={onFinalClick}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
    }
  };

  return <Fragment>{renderContent()}</Fragment>;
};

export default SellerForm;
