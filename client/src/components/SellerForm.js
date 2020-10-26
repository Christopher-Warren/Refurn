import React, { useState, useContext, Fragment } from "react";
import { AuthContext } from "../App";
import axios from "axios";

const SellerForm = (props) => {
  const auth = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");

  const [uploadedFile, setUploadedFile] = useState({});

  // Form State
  //const [id, setId] = useState("")
  const [firstName, setFirstName] = useState("Chris");
  const [lastName, setLastName] = useState("Warren");
  const [furnitureType, setFurnitureType] = useState("Three Seater");
  const [condition, setCondition] = useState("Excellent");
  const [color, setColor] = useState("Purple");
  const [detailText, setDetailText] = useState(
    "This couch is pretty good, I don't have many complaints"
  );
  const [askingPrice, setAskingPrice] = useState("$78");
  const [email, setEmail] = useState("chrisalmith@gmail.com");
  const [phone, setPhone] = useState("555-555-5555");
  const [altPhone, setAltPhone] = useState("555-555-5555");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmitReview = async (e) => {
    e.preventDefault();
    // File Upload Data
    const formData = new FormData();
    // this points to file in backend
    formData.append("file", file);
    const res = await axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { fileName, fileURL, gcFileName } = res.data;
    setUploadedFile({ fileName, fileURL, gcFileName });
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
        email,
        phone,
        altPhone,
        imageURL: uploadedFile.fileURL,
        gcFileName: uploadedFile.gcFileName,
        fileName,
        userId: auth,
        approved: null,
      };
      await axios.post("/api/submit", listingData);
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

  const renderForm = () => {
    switch (auth) {
      case null:
        return;
      case false || undefined:
        return (
          <div className="mt-5 pb-4 container">
            <h1 className="text-center display-4">Please log in.</h1>
          </div>
        );
      default:
        return (
          <div className="bg-light rounded-lg shadow-lg pb-4 px-4">
            <h1 className="text-center">Furniture Submission Form</h1>
            <hr />
            <form onSubmit={onSubmitReview}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputFirstName">
                    <strong>First Name</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputLastName">
                    <strong>Last Name</strong>
                  </label>
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
                  <label htmlFor="inputFirstName">
                    <strong>Email</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputLastName">
                    <strong>Phone</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputLastName">
                    <strong>Alt. Phone</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAltPhone"
                    onChange={(e) => setAltPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputFurnitureType">
                    <strong>Furniture Type</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFurnitureType"
                    placeholder="e.g Love Seat"
                    onChange={(e) => setFurnitureType(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputCondition">
                    <strong>Condition</strong>
                  </label>
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
                  <label htmlFor="inputColor">
                    <strong>Color</strong>
                  </label>
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
                  <label htmlFor="inputPrice">
                    <strong>Details</strong>
                  </label>
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
                  <label htmlFor="inputPrice">
                    <strong>Asking Price</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPrice"
                    placeholder="$100"
                    onChange={(e) => setAskingPrice(e.target.value)}
                  />
                </div>
              </div>
              <p className="mb-2">
                <strong>Upload an Image</strong>
              </p>
              <div className="form-group col-md-4 custom-file mb-3">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChange}
                  name="file"
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
                          className="card-img"
                          src={uploadedFile.fileURL}
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
  // <div className=" bg-light " style={{ height: "200px" }}></div>
  return <div className="container">{renderForm()}</div>;
};

export default SellerForm;
