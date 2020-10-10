import React from "react";

const FileUpload = () => {
  return (
    <div className="form-group col-md-4 custom-file mb-3">
      <input type="file" className="custom-file-input" id="customFile" />
      <label className="custom-file-label" htmlFor="customFile">
        Choose file
      </label>
    </div>
  );
};

export default FileUpload;
