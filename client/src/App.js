import React, { useState, createContext } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import SellerForm from "./components/SellerForm";
import Landing from "./components/Landing";
import AvailibleFurniture from "./components/AvailibleFurniture";
import ThankYou from "./components/ThankYou";

export const AuthContext = createContext();

export default () => {
  const [auth, setAuth] = useState({});

  const getUser = async () => {
    const { data } = await axios.get("/api/current_user");

    setAuth(data._id);
  };
  getUser();
  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <div className="">
          <Route path="/" component={Header} />
          <Route path="/landing" component={Landing} />
          <Route path="/sellerform" component={SellerForm} />
          <Route path="/availiblefurniture" component={AvailibleFurniture} />
          <Route path="/thankyou" component={ThankYou} />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
