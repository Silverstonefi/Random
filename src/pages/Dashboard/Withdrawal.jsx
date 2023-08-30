import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAccountNumber, setToken, setUserDetails } from "../../Redux/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../../components/Assets/dashNav";
import Left from "./Left";
import dots from "../../components/Bank site Img/dual-dot.png";
import { Tabs } from "antd";
import card from "../../components/Bank site Img/card.png";
import money from "../../components/Bank site Img/money.svg";
import { Bs1Square, BsFillQuestionCircleFill } from "react-icons/bs";

const { TabPane } = Tabs;

const Withdrawal = () => {
  const onChange = (key) => {
    console.log(key);
  };
  let navigate = useNavigate();
  const user = useSelector((state) => state.auth.user_details);

  const { email } = user;

  const notify = (word) => {
    toast.info(`${word}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // useRedirect("withdrawal");
  const [withdrawal, setWithdrawal] = useState({
    amount: "",
    email: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdrawal((prevWithdrawal) => ({
      ...prevWithdrawal,
      [name]: value,
    }));
  };

  const handleWithdrawal = async () => {
    console.log("first click");

    // Assuming withdrawal, user, email, notify, and setWithdrawal are accessible.

    if (!withdrawal.amount || !withdrawal.accountNumber || !withdrawal.email) {
      notify("Please provide all information");
      return; // Stop the function execution here if requirements are not met
    }

    if (withdrawal.amount > user.balance) {
      notify("Insufficient balance");
      return; // Stop the function execution here if balance is insufficient
    }

    try {
      const response = await fetch("https://rest.silverstonefi.com/withdraw", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: withdrawal.email, // Assuming withdrawal.email is the correct field
          withdrawal: withdrawal.amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();

      notify(`${result.msg}`);
    } catch (error) {
      // Handle fetch or response errors here
      notify("An error occurred. Please try again later.");
    }

    // Assuming 'setWithdrawal' will clear the withdrawal data after a successful withdrawal
    setWithdrawal({
      amount: "",
      accountNumber: "", // Changed 'address' to 'accountNumber' to match the check earlier.
      email: "", // Assuming email is part of withdrawal object and should be cleared as well.
    });
  };

  //  const handleWithdrawal = async () => {
  //    console.log('first click')
  //    if (!withdrawal.amount || !withdrawal.accountNumber || !withdrawal.email) {
  //      return notify("Please provide all information");
  //    }

  //    if (withdrawal.amount > user.balance) {
  //      return notify('Insufficient balance');
  //    }

  //    const response = await fetch(
  //      "https://rest.silverstonefi.com/withdraw",
  //      {
  //        method: "post",
  //        headers: { "Content-Type": "application/json" },
  //        body: JSON.stringify({
  //          email,
  //          withdrawal: withdrawal.amount,
  //        }),
  //      }
  //    );

  //    let result = await response.json();

  //    notify(`${result.msg}`);

  //    setWithdrawal({
  //      amount: "",
  //      address: "",
  //      addressType: "",
  //    });
  //  };
  return (
    <>
      <div>
        <div>
          <Nav />
        </div>
        <div className="md:flex">
          <div className="w-1/5">
            <Left />
          </div>
          <section className="flex-1 bg-gray-50">
            <h1 className="md:text-2xl text-xl text-black font-bold py-5 md:pl-10 px-5">
              Withdrawal
            </h1>
            <div>
              <div className="md:px-10 relative px-5">
                <img
                  className="md:w-full md:h-72 rounded-xl"
                  src={card}
                  alt=""
                />{" "}
                <div className="z-10 w-[90%] md:w-[92.5%] absolute top-0 md:px-10 px-5 py-5 md:py-10">
                  <div className="md:text-white/90 text-white md:mb-5">
                    <h1>Main Balance</h1>
                    <p className="md:text-5xl md:mt-3 text-xl font-semibold">
                      $ {user.balance}
                    </p>
                  </div>
                  <div className="flex justify-between py-3 md:py-0">
                    <img className="" src={dots} alt="" />
                    <p className="text-white font-semibold md:mt-0 mt-1">
                      5338192757
                    </p>
                  </div>
                  <div className="flex md:pt-10 md:gap-10 justify-between">
                    <div>
                      <h1>Account Type</h1>
                      <p className="text-white/90">Savings Account</p>
                    </div>
                    <div>
                      <h1>Card Holder</h1>
                      <p className="text-white/90 capitalize">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:hidden bg-white shadow-md shadow-gray-300 h-5 mx-10 rounded-b-lg"></div>
              <div className="flex md:hidden bg-white/60 shadow-md shadow-gray-300 h-5 mx-16 rounded-b-lg"></div>

              <div className="md:flex hidden bg-white shadow-md shadow-gray-300 md:w-[78%] md:ml-28 rounded-b-lg h-7"></div>
              <div className="md:flex hidden bg-white/60 shadow-md shadow-gray-300 md:w-[68%] md:ml-[10.3rem] rounded-b-lg h-7"></div>
            </div>

            <div className="bg-white md:mx-10 mx-5 mt-10 rounded-md shadow-md shadow-gray-300">
              <h1 className="text-xl text-black font-semibold border-b border-gray-200 py-4 md:pl-10 px-2">
                Withdraw Balance
              </h1>
              <div className="md:py-10 py-5 md:mx-10">
                <Tabs onChange={onChange} type="card">
                  <TabPane
                    tab={
                      <span className="">
                        <img className="w-6" src={money} alt="money" />
                      </span>
                    }
                    key="1"
                  >
                    <div>
                      <div className="md:px-10 px-5 tracking-wider text-md font-medium">
                        <p>
                          You are about to transfer your account's available
                          balance. This action cannot be reversed. Be sure to
                          enter correct details.
                        </p>
                      </div>
                      <form action="">
                        <ToastContainer />
                        <div className="px-10 pt-5">
                          <label className="font-semibold" htmlFor="">
                            Amount:
                          </label>
                          <div className="w-full border border-gray-300 rounded-xl my-1">
                            <input
                              className="outline-none py-2 w-full px-5"
                              placeholder="Enter Amount"
                              type="number"
                              name="amount"
                              value={withdrawal.amount}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="px-10 pt-3">
                          <label className="font-semibold" htmlFor="">
                            Account Number:
                          </label>
                          <div className="w-full border border-gray-300 rounded-xl my-1">
                            <input
                              className="outline-none py-2 w-full px-5"
                              placeholder="Enter Account Number"
                              type="number"
                              name="accountNumber"
                              value={withdrawal.accountNumber}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="px-10 py-3">
                          <label className="font-semibold" htmlFor="">
                            Email:
                          </label>
                          <div className="w-full border border-gray-300 rounded-xl my-1">
                            <input
                              className="outline-none py-2 w-full px-5"
                              placeholder="Enter Email Address"
                              type="email"
                              name="email"
                              value={withdrawal.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <button
                            onClick={handleWithdrawal}
                            className="rounded-lg w-[60%] bg-blue-500 text-white py-1 mt-3 mb-10"
                          >
                            Proceed
                          </button>
                        </div>
                      </form>
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <BsFillQuestionCircleFill
                          className="text-blue-500"
                          size={25}
                        />
                      </span>
                    }
                    key="2"
                  >
                    <div className="px-5 md:px-0">
                      <h1 className="text-black text-lg font-semibold">
                        Need Help ?
                      </h1>
                      <p className="py-3">
                        If you wish to withdraw your balance to your local
                        account, Please use the{" "}
                        <span className="text-red-500">transfer</span> method on
                        the <span className="text-red-500">Transfer</span> Page
                      </p>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
