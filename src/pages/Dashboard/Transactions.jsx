import React, { useState, useEffect } from "react";
import Nav from "../../components/Assets/dashNav";
import {
  BiBookmark,
  BiCard,
  BiChevronRight,
  BiTransfer,
  BiLogOutCircle,
} from "react-icons/bi";
import { RxPinTop } from "react-icons/rx";
import {
  BsMenuButtonWide,
  BsPersonFill,
  BsCashCoin,
  BsFillCreditCardFill,
} from "react-icons/bs";
import Left from "./Left";
import { Menu, Progress, Space } from "antd";
import { Button, Dropdown, message, Tooltip } from "antd";
import { MdArrowDropDown } from "react-icons/md";
import {
  Bs1Square,
  BsFillQuestionCircleFill,
  BsFillDatabaseFill,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken, setUserDetails } from "../../Redux/action";
import Footerd from "../../components/Assets/dashFooter";
import TransactionTable from "./Table";

const Transactions = () => {
  const [email, setEmail] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/transactions",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setTransactions(data.transactions);
        } else if (response.status === 404) {
          setTransactions([]);
          setErrorMessage("Transactions not found.");
        } else {
          setTransactions([]);
          setErrorMessage(
            "An error occurred while retrieving user transactions."
          );
        }
      } catch (error) {
        console.error("Error fetching user transactions:", error);
        setErrorMessage("An error occurred while fetching user transactions.");
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array means this effect runs only on component mount

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const handleButtonClick = (e) => {
    // message.info("Click on left button.");
    setMenu(Menu);
    console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    // message.info("Click on menu item.");
    // console.log("click", e);
  };
  const user = useSelector((state) => state.auth.user_details);

  const items = [
    {
      label: (
        <div>
          <Link to="/user/fund-account">
            <p>Deposit</p>
          </Link>
        </div>
      ),
      key: "1",
      icon: <BsCashCoin />,
    },
    {
      label: (
        <div>
          <Link to="/user/withdraw">
            <p>Withdrawal</p>
          </Link>
        </div>
      ),
      key: "2",
      icon: <RxPinTop />,
    },
    {
      label: (
        <div>
          <Link to="/user/transfer">
            <p>Direct Transfer</p>
          </Link>
        </div>
      ),
      key: "3",
      icon: <BiTransfer />,
    },
    {
      label: (
        <div
          onClick={() => {
            dispatch(setToken(""));
            dispatch(setUserDetails({}));
            navigate("/public/login", { replace: true });
          }}
        >
          logout
        </div>
      ),
      key: "4",
      icon: <BiLogOutCircle />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  function formatDate(dateString) {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", options);

    const day = date.getDate();
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }

    return formattedDate.replace(",", `${suffix},`);
  }

  // const inputDate = "2023-07-31T14:05:28.343Z";
  // const formattedDate = formatDate(inputDate);
  // console.log(formattedDate); // Output: "31st July, 2023 - 2:05 PM"
  return (
    <div className="overflow-hidden over">
      <div>
        <div>
          <Nav />
        </div>

        <div className="md:flex">
          <div className="w-1/5">
            <Left />
          </div>

          <section className="flex-1 bg-gray-50">
            <h1 className="md:text-2xl text-xl text-blue-500 font-semibold tracking-tighter font-fira py-5 md:pl-10 px-5">
              Transactions
            </h1>

            <div className="flex md:mx-10 mx-5 bg-white border border-gray-200 rounded-md justify-between px-5 py-5">
              <div className="text-blue-500 font-semibold">
                <p className="lg:text-lg font-bold">
                  Welcome, {user.firstName} {user.lastName}
                </p>
                <p className="text-sm">Balance: USD {user.balance}</p>
              </div>
              <div>
                <Dropdown.Button
                  menu={menuProps}
                  placement="bottom"
                  icon={
                    <MdArrowDropDown
                      size={20}
                      onClick={handleButtonClick}
                      className="ml-1 text-blue-600"
                    />
                  }
                >
                  Menu
                </Dropdown.Button>
              </div>
            </div>

            <div className="border-t lg:py-10 py-5 border-gray-200 mt-10 mx-10">
              <div className="md:w-[100%] lg:flex lg:gap-10 lg:jdustify-between">
                <TransactionTable transactions={transactions} />
                {/* <div className="md:w-[50%]">
                  <h1 className="text-4xl text-center font-bold mb-4">
                    User Transactions
                  </h1>
                  <div className="mb-4 hidden">
                    <label className="block mb-2 ">Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      className="border rounded p-2 w-64"
                      // placeholder="Enter user email"
                    />
                  </div>
                  <button
                    onClick={handleGetTransactions}
                    className="bg-blue-500 hidden hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Get Transactions
                  </button>
                  {errorMessage && (
                    <p className="text-red-500 mt-4">{errorMessage}</p>
                  )}
                  <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">User History:</h2>
                    {transactions &&
                    Array.isArray(transactions) &&
                    transactions.length > 0 ? (
                      <ul>
                        {transactions.map((transaction) => (
                          <div className="flex justify-between px-5 py-3 my-10 bg-white rounded-md text-black">
                            <div>
                              <h1 className="text-lg">
                                {transaction.amount}{" "}
                                <span className="text-2xs">USD</span>
                              </h1>
                              <p className="uppercase text-xm">
                                {transaction.action}
                              </p>
                            </div>
                            <div className="">
                              <h1 className="bg-green-500 py-1 px-5 rounded-md text-center text-white">
                                {transaction.status}
                              </h1>
                              <p className="text-xs text-center pt-1">
                                Date <span>{formatDate(transaction.date)}</span>
                              </p>
                            </div>
                          </div>
                          // <li key={transaction._id}>
                          //   {transaction.action} - {transaction.amount}{" "}
                          //   {transaction.status}
                          // </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="bg-blue-300 w-full px-5 rounded-full text-white">
                        {transactions && transactions.length === 0
                          ? "No transactions found for this user."
                          : "loading.."}
                      </p>
                    )}
                  </div>
                </div> */}

                <div className="md:w-[50%] lg:mx-0 mx-5 lg:mt-0 mt-5 flex flex-col text-black">
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
            </div>
            <Footerd />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
