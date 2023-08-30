// import react, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import MyLoader from "./loader";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/HomePage/About";
import Contact from "./pages/HomePage/Contact";
import { useSelector } from "react-redux";
import Dash from "./pages/Dashboard/Dash";
import Home from "./pages/HomePage/Home";
import Loans from "./pages/Dashboard/Loans";
import Fund from "./pages/Dashboard/Fund";
import Withdrawal from "./pages/Dashboard/Withdrawal";
import Transfer from "./pages/Dashboard/Transfer";
import Register from "./pages/Signup/Register";
import Login from "./pages/Signup/Login";
import Services from "./pages/HomePage/Services";
import AllUsers from "./pages/Admin/AllUsers";
import Users from "./pages/Admin/Users";
import EditUsers from "./pages/Admin/EditUsers";
import Transactions from "./pages/Dashboard/Transactions";
import Transacrions from "./pages/Admin/Transactions";
import Request from "./pages/Admin/Request";
import Loan from "./pages/Dashboard/Loan";
import Card from "./pages/Dashboard/Card";

const App = () => {
  const { email } = useSelector((state) => state.auth.user_details);
  const props = { email };

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/public/about" element={<About />} />
        <Route path="/public/contact" element={<Contact />} />
        <Route path="/user/dashboard" element={<Dash />} />
        <Route path="/user/loans" element={<Loan />} />
        <Route path="/form/card" element={<Card />} />
        <Route path="/user/fund-account" element={<Fund />} />
        <Route path="/user/withdraw" element={<Withdrawal />} />
        <Route path="/user/transfer" element={<Transfer />} />{" "}
        <Route path="/user/transactions" element={<Transactions />} />
        <Route path="/admin/transactions" element={<Transacrions />} />
        <Route path="/user/loader" element={<MyLoader />} />
        <Route path="/public/register" element={<Register />} />
        <Route path="/public/login" element={<Login />} />
        <Route path="/public/services" element={<Services />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/requests" element={<Request />} />
        <Route path="/admin/edituser" element={<EditUsers />} />
      </Routes>
    </div>
  );
};

export default App;
