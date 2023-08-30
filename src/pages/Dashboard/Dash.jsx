import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken, setUserDetails } from "../../Redux/action";
import card from "../../components/Bank site Img/card.png";
import dots from "../../components/Bank site Img/dual-dot.png";
import Nav from "../../components/Assets/dashNav";
import { ImExit } from "react-icons/im";
import { Menu, Progress, Space } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, message, Tooltip } from "antd";
import { FaInfoCircle, FaHistory } from "react-icons/fa";
import { RiShareForwardFill } from "react-icons/ri";
import {
  BiBookmark,
  BiCard,
  BiChevronRight,
  BiTransfer,
  BiLogOutCircle,
} from "react-icons/bi";
import {
  BsMenuButtonWide,
  BsPersonFill,
  BsCashCoin,
  BsFillCreditCardFill,
} from "react-icons/bs";
import { RxPinTop } from "react-icons/rx";
import Left from "./Left";
import { GiReceiveMoney } from "react-icons/gi";
import { MdArrowDropDown } from "react-icons/md";
import { AiTwotoneSetting } from "react-icons/ai";
import Footerd from "../../components/Assets/dashFooter";

const Dash = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const handleButtonClick = (e) => {
    // message.info("Click on left button.");
    setMenu(Menu);
  };
  const handleMenuClick = (e) => {
    // message.info("Click on menu item.");
    // console.log("click", e);
  };

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

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
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

  return (
    <div>
      <Nav />
      <div>
        <div>
          {/* LEFT SECTION */}
          <div className="md:flex">
            <div className="w-1/5">
              <Left />
            </div>

            <section className="flex-1 bg-gray-50">
              <h1 className="md:text-2xl text-xl text-black font-bold py-5 md:pl-10 px-5">
                Dashboard
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

              <div className="lg:flex justify-between mt-5">
                <div className="flex md:mx-10 mx-5 md:w-1/3 bg-white border border-gray-200 rounded-md justify-between px-3 py-5">
                  <div className="flex flex-col">
                    <div className="flex gap-16 lg:gap-20">
                      <div className="text-sm text-center">
                        {currentDateTime.toLocaleString()}
                      </div>
                      <div className="text-sm">
                        <p>Savings Account</p>
                        <p className="flex gap-2">
                          <FaInfoCircle className="text-blue-500" />
                          <span className="uppercase text-xs">Active</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between pt-4">
                      <div>
                        <BsPersonFill className="text-black/80" size={55} />
                      </div>
                      <div>
                        <p>{user.firstName}</p>
                        <p>{user.accountNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:mx-10 mx-5 md:w-1/3 bg-white border border-gray-200 rounded-md justify-between px-3 py-5">
                  {" "}
                  <h1 className="text-center">Transactions</h1>
                  <div className="flex justify-between text-black/80 text-sm">
                    <div>
                      <Link to="/user/transactions">
                        <FaHistory
                          className="ml-5 hover:text-blue-600 hover:transition hover:ease-in-out hover:duration-300 ease-out duration-500"
                          size={45}
                        />
                        <p className="text-gray-500 pt-2">Transfer History</p>
                      </Link>
                    </div>

                    <div>
                      <Link to="/user/transfer">
                        <BiTransfer
                          className="ml-5 hover:text-blue-600 hover:transition hover:ease-in-out hover:duration-300 ease-out duration-500"
                          size={45}
                        />
                        <p className="text-gray-500 pt-2">Transfer Money</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-5">
                <div className="md:mx-10 mx-5 md:w-1/3 w-full bg-white border border-gray-200 rounded-md justify-between px-3 py-5">
                  {" "}
                  <h1 className="text-center">Transactions</h1>
                  <div className="flex justify-between text-black/80 text-sm">
                    <div>
                      <Link to="/user/fund-account">
                        <BsFillCreditCardFill
                          className="lg:ml-3 hover:text-blue-600 hover:transition hover:ease-in-out hover:duration-300 ease-out duration-500"
                          size={45}
                        />
                        <p className="text-gray-500 pt-2">Deposit</p>
                      </Link>
                    </div>
                    <div>
                      <Link to="/user/withdraw">
                        <GiReceiveMoney
                          className="lg:ml-3 hover:text-blue-600 hover:transition hover:ease-in-out hover:duration-300 ease-out duration-500"
                          size={45}
                        />
                        <p className="text-gray-500 pt-2">Withdrawal</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <Footerd />
              {/* <div>
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
                        ${user.balance}
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
                        <p className="text-white/90 capitalize">{user.firstName} {user.lastName}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:hidden bg-white shadow-md shadow-gray-300 h-5 mx-10 rounded-b-lg"></div>
                <div className="flex md:hidden bg-white/60 shadow-md shadow-gray-300 h-5 mx-16 rounded-b-lg"></div>

                <div className="md:flex hidden bg-white shadow-md shadow-gray-300 md:w-[78%] md:ml-28 rounded-b-lg h-7"></div>
                <div className="md:flex hidden bg-white/60 shadow-md shadow-gray-300 md:w-[68%] md:ml-[10.3rem] rounded-b-lg h-7"></div>
              </div>
              <div className="md:mx-10 px-5 my-10">
                <div className="flex md:gap-10 gap-3 text-lg font-semibold">
                  <Link className="w-full" to="/user/withdraw">
                    <div className="w-full bg-white shadow-sm shadow-gray-300 flex justify-between py-8 md:px-10 px-3 rounded-md">
                      <p>Withdraw</p>
                      <ImExit className="text-red-500" size={25} />
                    </div>
                  </Link>

                  <Link className="w-full" to="/user/fund-account">
                    <div className="w-full bg-white shadow-sm shadow-gray-300 flex justify-between py-8 md:px-10 px-3 rounded-md">
                      <p>Deposit</p>
                      <RiShareForwardFill
                        className="text-green-500 border-2 border-green-500"
                        size={25}
                      />
                    </div>
                  </Link>
                </div>
              </div> */}

              {/* <div className="bg-white md:m-10 mx-5 px-3 md:pb-10 pb-5 rounded-md shadow-sm shadow-gray-400">
                <div className="py-5 pl-10">
                  <h1 className="text-black text-xl font-sans font-semibold">
                    Account Overview
                  </h1>
                </div>
                <div className="grid grid-cols-2 md:mx-10  md:gap-10 gap-5 text-white text-center">
                  <div className="w-full bg-purple-600 py-14 rounded-md">
                    <Space wrap>
                      <Progress type="dashboard" percent={0} />
                    </Space>
                    <p>Withdrawals</p>
                  </div>
                  <div className="w-full bg-green-600  py-14 rounded-md">
                    <Space wrap>
                      <Progress type="dashboard" percent={0} />
                    </Space>
                    <p>Transfers</p>
                  </div>
                  <div className="w-full border-2 border-teal-300 bg-white text-black py-14 rounded-md">
                    <Space wrap>
                      <Progress type="dashboard" percent={10} />
                    </Space>
                    <p>Investments</p>
                  </div>
                  <div className="w-full bg-blue-600 py-14 rounded-md">
                    <Space wrap>
                      <Progress type="dashboard" percent={0} />
                    </Space>
                    <p>Loans</p>
                  </div>
                </div>
              </div> */}
            </section>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Dash;
