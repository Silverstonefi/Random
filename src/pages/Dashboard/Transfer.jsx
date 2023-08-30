import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken, setUserDetails } from "../../Redux/action";
import Nav from "../../components/Assets/dashNav";
import Left from "./Left";
import { CiCircleInfo } from "react-icons/ci";
import { Radio, Tabs } from "antd";
import money from "../../components/Bank site Img/money.svg";
import {
  Bs1Square,
  BsFillQuestionCircleFill,
  BsFillDatabaseFill,
} from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import { Modal } from "antd";
import { Button, message, Steps, theme } from "antd";
import Footerd from "../../components/Assets/dashFooter";

const { TabPane } = Tabs;

const Transfer = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const [bank, setBank] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [phone, setPhone] = useState("");
  const [swift, setSwift] = useState("");
  const [iban, setIban] = useState("");
  const [routing, setRouting] = useState("");
  const [password, setPassword] = useState("");
  const [senderAcct, setSenderAcct] = useState("");
  const [receiverAcct, setReceiverAcct] = useState("");
  const [amount, setAmount] = useState(0);
  const { token } = theme.useToken();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [activeTabKey, setActiveTabKey] = useState("1"); // Default active tab is '1'

  // Function to handle tab change
  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  const ok = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  let navigate = useNavigate();
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

  const userx = useSelector((state) => state.auth.user_details);

  const [user, setUser] = useState(userx);

  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    // if (login) {
    //   login = false;
    //   return;
    // }
    fetch("https://rest.silverstonefi.com/get-profile", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { user } = res;

        if (!user) return;
        setUser(user);
        dispatch(setUserDetails(user));
      })
      .catch((err) => console.log("error", err));
  }, []);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!bank) {
      newErrors.bankError = "Please select a bank";
      formIsValid = false;
    }

    if (!bank) {
      newErrors.bankNameError = "Bank Name is required";
      formIsValid = false;
    }

    if (!receiverAcct) {
      newErrors.receiverAcctError = "Receiver's Account Number is required";
      formIsValid = false;
    }

    if (!accountName) {
      newErrors.accountNameError = "Account Name is required";
      formIsValid = false;
    }

    if (!phone) {
      newErrors.phoneError = "Phone Number is required";
      formIsValid = false;
    }

    if (!amount) {
      newErrors.amountError = "Amount is required";
      formIsValid = false;
    }

    if (activeTabKey === "1") {
      if (!swift) {
        newErrors.swiftError = "Swift Code is required";
        formIsValid = false;
      }
    } else if (activeTabKey === "2") {
      if (!iban) {
        newErrors.ibanError = "IBAN is required";
        formIsValid = false;
      }
    } else if (activeTabKey === "3") {
      if (!routing) {
        newErrors.routingError = "Routing Number is required";
        formIsValid = false;
      }
    }

    if (!password) {
      newErrors.passwordError = "Account Password is required";
      formIsValid = false;
    } else if (password !== user.password) {
      newErrors.passwordError = "Incorrect Password";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };
  // console.log("user password", user.password)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [`${name}Error`]: "" }));
  };
  const continueTransfer = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      handleTransfer(e);
      setOpen(true); // Set modal handle to true if all conditions are met
    } else {
      setOpen(false);
      // Set modal handle to false if any condition is not met
    }
  };
  const handleTransfer = async (e) => {
    try {
      // https://rest.silverstonefi.com
      const response = await fetch("https://rest.silverstonefi.com/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromAccountNumber: user.accountNumber,
          toAccountNumber: receiverAcct,
          amount,
          bank,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        updateUser(email, setUser, dispatch);
      } else {
        // Transfer failed
        console.error(data.error, "transfer failed");
        // Handle the error, e.g., show an error message to the user
        notify("Transfer Failed");
      }
    } catch (error) {
      // Network error or other unhandled error
      console.error("An error occurred during the transfer:", error);
      notify("something went wrong, Check your details");
      // Handle the error, e.g., show an error message to the user
    }
  };
  return (
    <div>
      <div>
        <div>
          <Nav />
        </div>
        <div className="md:flex">
          <div className="w-1/5">
            <Left />
          </div>
          <Modal title="erere" open={isModalOpen} onCancel={handleClose}>
            <div className="text-gray-300 flex justify-center">
              <CiCircleInfo size={120} />
            </div>
            <div className="text-center">
              <h1 className="text-3xl text-black font-semibold ">
                Insufficient Balance
              </h1>
              <p className="text-gray-500 text-lg tracking-widest py-3">
                You are yet to fund your account.
              </p>
            </div>
          </Modal>
          <div className="flex-1 bg-gray-50 md:px-10 px-10">
            {" "}
            <span className="text-white">.</span>
            <div className="bg-white shadow-sm shadow-gray-200 font-semibold py-2 px-5 w-full md:my-5 rounded-lg">
              Transfer
            </div>
            <div className="w-[100%] mt-5 lg:mt-0 lg:flex lg:gap-20">
              <div className="lg:w-[50%]">
                <Tabs onChange={onChange} type="card">
                  <TabPane
                    tab={
                      <span className="">
                        <p className="uppercase text-sm">
                          Direct bank transfer
                        </p>
                      </span>
                    }
                    key="1"
                  >
                    <div className="border-x border-gray-200 px-5">
                      <form action="">
                        <div className="flex flex-col">
                          <label>Bank</label>
                          <select
                            name="bank"
                            value={bank}
                            onChange={(e) => setBank(e.target.value)}
                            className="py-2 outline-none border border-gray-300 rounded-md px-1 mt-1 text-sm"
                          >
                            <option value="">Please select a bank</option>
                            <option value="Silver Stone">Silver Stone</option>
                            <option value="Wells Fargo & Co">
                              Wells Fargo & Co.
                            </option>
                            <option value="Bank of America">
                              Bank of America Corp.
                            </option>
                            <option value="Citigroup">Citigroup Inc.</option>
                            <option value="U.S Bancorp">U.S Bancorp</option>
                            <option value="Truist">Truist Bank</option>
                            <option value="PNC Financial Services Group">
                              PNC Financial Services Group Inc.
                            </option>
                            <option value="TD Group US Holding">
                              TD Group US Holding LLC.
                            </option>
                            <option value="Bank of New York Mellon Corp">
                              Bank of New York Mellon Corp
                            </option>
                            <option value="HSBC">HSBC</option>
                            <option value="Capital One Financial Corp">
                              Capital One Financial Corp
                            </option>
                            <option value="Goldman Sachs">
                              Goldman Sachs Group
                            </option>
                            <option value="Fifth Third">
                              Fifth Third Bank
                            </option>
                            <option value="JPMorgan Chase">
                              JPMorgan Chase & Co.
                            </option>
                          </select>
                          {errors.bankError && (
                            <p className="text-red-500 text-xs">
                              {errors.bankError}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col pt-3">
                          <label>Bank Name</label>
                          <input
                            name="bankName"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            className="border border-gray-300 outline-none px-5 py-1 text-sm rounded-md"
                            type="text"
                          />
                          {errors.bankNameError && (
                            <p className="text-red-500 h-5 text-xs">
                              {errors.bankNameError}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col pt-3">
                          <label>Account Number</label>
                          <input
                            name="recieverAcct"
                            value={receiverAcct}
                            onChange={(e) => setReceiverAcct(e.target.value)}
                            className="border border-gray-300 outline-none px-5 py-1 text-sm rounded-md"
                            type="text"
                          />
                          {errors.receiverAcctError && (
                            <p className="text-red-500 h-5 text-xs">
                              {errors.receiverAcctError}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col pt-3">
                          <label>Account Name</label>
                          <input
                            name="accountName"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="border border-gray-300 outline-none px-5 py-1 text-sm rounded-md"
                            type="text"
                          />
                          {errors.accountNameError && (
                            <p className="text-red-500 text-xs">
                              {errors.accountNameError}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col pt-3">
                          <label>Phone Number</label>
                          <input
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border border-gray-300 outline-none px-5 py-1 text-sm rounded-md"
                            type="text"
                          />
                          {errors.phoneError && (
                            <p className="text-red-500 text-xs">
                              {errors.phoneError}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col pt-3">
                          <label>Amount</label>
                          <div className="flex gap-3">
                            <p className="px-2 py-1 text-sm bg-gray-400 rounded-l-md">
                              $
                            </p>
                            <input
                              type="Number"
                              name="amount"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="border w-full border-gray-300 outline-none px-5 py-1 text-sm rounded-r-md"
                            />
                          </div>
                          {errors.amountError && (
                            <p className="text-red-500 text-xs">
                              {errors.amountError}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col pt-3">
                          <Tabs
                            onChange={handleTabChange}
                            activeKey={activeTabKey}
                            type="card"
                          >
                            <TabPane
                              tab={
                                <span className="">
                                  <p className="uppercase text-sm">SWIFT</p>
                                </span>
                              }
                              key="1"
                            >
                              <div className="flex flex-col">
                                <label>Swift Code</label>
                                <input
                                  name="swift"
                                  value={swift}
                                  onChange={(e) => setSwift(e.target.value)}
                                  className="border w-full border-gray-300 outline-none px-3 py-1 text-sm rounded-md"
                                  type="text"
                                  placeholder="You'll need one if you're sending or receiving money internationally"
                                />
                                {errors.swiftError && (
                                  <p className="text-red-500 text-xs">
                                    {errors.swiftError}
                                  </p>
                                )}
                              </div>
                            </TabPane>
                            <TabPane
                              tab={
                                <span className="">
                                  <p className="uppercase text-sm">IBAN</p>
                                </span>
                              }
                              key="2"
                            >
                              <div className="flex flex-col">
                                <label>IBAN</label>
                                <input
                                  name="iban"
                                  value={iban}
                                  onChange={(e) => setIban(e.target.value)}
                                  className="border w-full border-gray-300 outline-none px-3 py-1 text-sm rounded-md"
                                  type="text"
                                  placeholder="You'll need an IBAN"
                                />
                                {errors.ibanError && (
                                  <p className="text-red-500 text-xs">
                                    {errors.ibanError}
                                  </p>
                                )}
                              </div>
                            </TabPane>
                            <TabPane
                              tab={
                                <span className="">
                                  <p className="uppercase text-sm">
                                    Routing Number
                                  </p>
                                </span>
                              }
                              key="3"
                            >
                              <div className="flex flex-col">
                                <label>Routing Number</label>
                                <input
                                  name="routing"
                                  value={routing}
                                  onChange={(e) => setRouting(e.target.value)}
                                  className="border w-full border-gray-300 outline-none px-3 py-1 text-sm rounded-md"
                                  type="text"
                                  placeholder="Money from the US you'll need a routing number"
                                />
                                {errors.routingError && (
                                  <p className="text-red-500 text-xs">
                                    {errors.routingError}
                                  </p>
                                )}
                              </div>
                            </TabPane>
                          </Tabs>
                          <div className="flex flex-col pt-3">
                            <label>Account Password</label>
                            <input
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="border border-gray-300 outline-none px-5 py-1 text-sm rounded-md"
                              type="password"
                            />
                            {errors.passwordError && (
                              <p className="text-red-500 text-xs">
                                {errors.passwordError}
                              </p>
                            )}
                          </div>
                        </div>
                      </form>
                      <div className="mt-3">
                        <button
                          onClick={continueTransfer}
                          className="bg-blue-500 text-white px-5 py-2 rounded-md"
                        >
                          Transfer
                        </button>
                      </div>
                      {/* <Button type="primary" onClick={showModal}>
                            Open Modal with customized footer
                          </Button> */}
                      <Modal
                        open={open}
                        title="Sending"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                          // <Button key="back" onClick={handleCancel}>
                          //   Return
                          // </Button>,
                          <div className="flex justify-center">
                            <Button
                              className="bg-blue-500 text-white flex justify-center px-10 rounded-none mt-5"
                              key="submit"
                              // loading={loading}
                              // onClose={handleCancel}
                              onClick={handleCancel}
                            >
                              OK
                            </Button>
                            ,
                          </div>,
                        ]}
                      >
                        <div className="flex justify-center">
                          <div className="text-center pt-5 w-1/2">
                            <p className="">Transfer is Processing </p>
                            <div className="tracking-tightuer">
                              ${amount} is on its way to the receipient
                            </div>

                            {/* <input
                              type="number"
                              className="w-1/3 text-sm py-2 mt-3 hover:transition hover:border-orange-500 hover:ease-in-out hover:duration-500 ease-out duration-500 outline-none border border-gray-200 rounded-md px-5 "
                              placeholder="Enter COT"
                            /> */}
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <p>Electronic Transfers</p>
                      </span>
                    }
                    key="2"
                  >
                    <div className="px-5 md:px-0">
                      <div className="border-x px-3 border-gray-200">
                        <div className="flex text-lg gap-3">
                          <AiFillCreditCard size={25} />
                          <p>Withdrawal Information</p>
                        </div>
                        <form action="">
                          <div className="flex flex-col">
                            <label>Select Withdrawal Method</label>
                            <select className="py-2 outline-none border border-gray-300 rounded-md px-1 mt-1 text-sm">
                              <option value="">Please select a method</option>
                              <option value="">Western Union</option>
                              <option value="">Skrill</option>
                              <option value="">Money Gram</option>
                              <option value="">Bitcoin Wallet</option>
                            </select>
                          </div>
                          <div className="flex flex-col pt-3">
                            <label>Amount:</label>
                            <div className="flex gap-3">
                              <p className="px-2 py-1 text-sm bg-gray-400 rounded-l-md">
                                $
                              </p>
                              <input
                                type="Number"
                                className="border w-full border-gray-300 outline-none px-5 py-1 text-sm rounded-r-md"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col pt-3">
                            <label>Beneficiary:</label>
                            <input
                              className="border border-gray-300 outline-none px-5 py-1 text-sm rounded-md"
                              type="text"
                            />
                            <p className="text-xs">
                              Bitcoin address, E-wallet ID, etc
                            </p>
                          </div>
                          <div className="flex flex-col pt-3">
                            <label>Account Password:</label>
                            <input
                              className="border border-gray-300 outline-none px-5 py-1 text-sm rounded-md"
                              type="password"
                            />
                          </div>
                        </form>
                        <div className="mt-3">
                          <button
                            onClick={continueTransfer}
                            className="bg-blue-500 text-white px-5 py-2 rounded-md"
                          >
                            Transfer
                          </button>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
              <div className="lg:w-[50%] lg:mx-0 mx-5 lg:mt-0 mt-5 flex flex-col text-black">
                <div className="flex justify-between">
                  <p className="lg:text-lg text-base font-fira text-[#150761] tracking-tighter">
                    Personal Account Details
                  </p>
                  <BsFillDatabaseFill className="text-black mt-2" />
                </div>
                <div className="border-y border-gray-200 py-5 mt-10">
                  <div>
                    <p className="font-semibold">Name:</p>
                    <p className="text-sm text-gray-500">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  <div className="pt-3">
                    <p className="font-semibold">Account type:</p>
                    <p className="text-sm text-gray-500">Savings Account</p>
                  </div>
                  <div className="pt-3">
                    <p className="font-semibold">Account Number:</p>
                    <p className="text-sm text-gray-500">
                      {user.accountNumber}
                    </p>
                  </div>
                  <div className="pt-3">
                    <p className="font-semibold">Account Balance:</p>
                    <p className="text-sm text-gray-500">${user.balance}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm">Registered: 27th Jul, 2023</p>
              </div>
            </div>
            <Footerd />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;

const updateUser = (email, setUser, dispatch) => {
  fetch("https://rest.silverstonefi.com/get-profile", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      const { user } = res;

      if (!user) return;
      setUser(user);
      dispatch(setUserDetails(user));
    })
    .catch((err) => console.log("error", err));
};
