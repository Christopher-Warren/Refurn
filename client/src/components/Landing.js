import React from "react";

const Landing = () => {
  return (
    <div className="jumbotron jumbotron-fluid bg-transparent text-light p-0">
      <div className="container">
        <h1 className="display-4">Welcome to Refurn</h1>
        <p className="lead">
          Everyday, perfectly usable furniture is thrown away. We are here to
          <strong> fix that</strong>, and put cash in your pockets while doing
          so.
          <br />
          <br />
          Do you have furniture that you need to get rid of asap and don't want
          the hassle of local, online, marketplaces? Sign up now, and show us
          what you've got.
        </p>
        <hr className="my-2" />
        <p className="lead text-warning mx-5">
          This app is in <strong>DEV MODE</strong>, granting all users admin
          functionality. *I could change this to accomodate a production build
          <br /> <strong>To use:</strong> <br />• Sign up with Google. * I DON'T
          sell data, my DB only gets your firstname and GoogleId
          <br />• Go to "Sell Your Furniture" located in the header.
          <br /> • Upload random image and Submit(Form is auto-generated for
          convenience) <br />• Go to "Admin Dashboard", located in the header,
          to see listings. <br />• Go to "User Dashboard" to see ONLY your
          listings, and if they have been approved or not.
        </p>
      </div>
    </div>
  );
};

export default Landing;
