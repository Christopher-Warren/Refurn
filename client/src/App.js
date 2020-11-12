import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SellerForm from "./components/SellerForm";
import Landing from "./components/Landing";

import ThankYou from "./components/ThankYou";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

export const AuthContext = createContext();
export const AdminContext = createContext({ admin: false, setAdmin: () => {} });
const App = () => {
  const [auth, setAuth] = useState(null);
  const [admin, setAdmin] = useState(false);
  const value = { admin, setAdmin };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/current_user");

      setAuth(data._id);
    };
    getUser();
  }, []);

  return (
    <AdminContext.Provider value={value}>
      <AuthContext.Provider value={auth}>
        <BrowserRouter>
          <Header />

          <Route exact path="/" component={Landing} />
          <Route exact path="/landing" component={Landing} />
          <Route path="/sellerform" component={SellerForm} />

          <Route path="/thankyou" component={ThankYou} />
          <Route path="/dashboard" component={UserDashboard} />

          <Route path="/admindashboard" component={AdminDashboard} />
          <div className="wrapper flex-grow-1"></div>
          <Route path="/" component={Footer} />
        </BrowserRouter>
      </AuthContext.Provider>
    </AdminContext.Provider>
  );
};

export default App;
