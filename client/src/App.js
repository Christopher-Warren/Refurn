import React, { useState, createContext } from "react";
import axios from "axios";

import Header from "./components/Header";
import SellerForm from "./components/SellerForm";

export const AuthContext = createContext();

export default () => {
  const [auth, setAuth] = useState(null);

  const getUser = async () => {
    const { data } = await axios.get("/api/current_user");
    setAuth(data._id);
  };
  getUser();
  return (
    <AuthContext.Provider value={auth}>
      <div className="">
        <Header />
        <SellerForm />
      </div>
    </AuthContext.Provider>
  );
};
