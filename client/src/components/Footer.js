import React from "react";
// style={{ backgroundColor: "#0cb6c2" }}>
const Footer = () => {
  return (
    <footer
      class="text-light text-center mt-3 shadow-sm"
      style={{ backgroundColor: "#0cb6c2" }}
    >
      <div class="footer-copyright text-center py-3">
        © 2020 Copyright:
        <a className="text-primary" href="https://www.chriswarren.tech/">
          {" "}
          Christopher Warren
        </a>
      </div>
    </footer>
  );
};

export default Footer;
