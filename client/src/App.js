import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import SellerForm from "./components/SellerForm";
import Landing from "./components/Landing";
import AvailibleFurniture from "./components/AvailibleFurniture";
import ThankYou from "./components/ThankYou";
import AdminDashboard from "./components/AdminDashboard";

export const AuthContext = createContext();

export default () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/current_user");

      setAuth(data);
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <div className="">
          <Route path="/" component={Header} />
          <Route path="/landing" component={Landing} />
          <Route path="/sellerform" component={SellerForm} />
          <Route path="/availiblefurniture" component={AvailibleFurniture} />
          <Route path="/thankyou" component={ThankYou} />
          <Route path="/admindashboard" component={AdminDashboard} />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
