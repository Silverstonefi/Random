import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToken, setUserDetails } from "../../Redux/action";
import Nav from "../../components/Assets/dashNav";
import Left from "./Left";
import { Menu, Progress, Space } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, message, Tooltip, Modal } from "antd";
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
import { MdArrowDropDown } from "react-icons/md";
import { RxPinTop } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import Footerd from "../../components/Assets/dashFooter";

const Card = () => {
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
  const user = useSelector((state) => state.auth.user_details);

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!card) {
      newErrors.cardError = "Please select a type of card";
      formIsValid = false;
    }

    if (!name) {
      newErrors.nameError = "Name is required";
      formIsValid = false;
    }

    if (!id) {
      newErrors.idError = "ID is required";
      formIsValid = false;
    }

    if (!address) {
      newErrors.addressError = "Address is required";
      formIsValid = false;
    }

    if (!phone) {
      newErrors.phoneError = "Phone Number is required";
      formIsValid = false;
    }

    if (!email) {
      newErrors.emailError = "Email is required";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const continueTransfer = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      // handleTransfer(e);
      console.log("transfer");
      setIsModalOpen(true); // Set modal handle to true if all conditions are met
    } else {
      setIsModalOpen(false);
      console.log("first", errors);
      // Set modal handle to false if any condition is not met
    }
  };

  return (
    <div>
      <Nav />
      <div>
        <div>
          <div className="md:flex">
            <div className="w-1/5">
              <Left />
            </div>

            <section className="flex-1 bg-gray-50 pb-10f">
              <h1 className=" text-xl text-black py-5 md:pl-10 px-5">
                <p className="flex gap-5">
                  My Account
                  <span className="flex text-sm">
                    <FaHome size={20} className="mr-1 mt-1 text-[#1a146b]" />{" "}
                    <span className="mt-1.5 ">- Credit Card Application</span>
                  </span>
                </p>
              </h1>
              <div className="flex md:mx-10 mx-5 bg-white mb-10 border border-gray-200 rounded-t-md justify-between px-5 py-5">
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
              <div className="md:flex gap-10 bg-white border border-gray-200 rounded-b-md px-5 py-5 md:mx-10 mx-5">
                <div className="md:w-1/2 text-black">
                  <form action="">
                    <div className="md:grid md:grid-cols-2 md:gap-y-5 md:gap-x-10 grid grid-cols-1 gap-y-5">
                      <div className="flex flex-col">
                        <label htmlFor="">Full Name:</label>
                        <input
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="outline-none border rounded-md border-gray-300 px-3 py-1 text-sm"
                          type="text"
                        />
                        {errors.nameError && (
                          <p className="text-red-500 text-xs">
                            {errors.nameError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Type of Card:</label>
                        <select
                          className="outline-none border border-gray-300 rounded-md px-3 py-1 text-sm"
                          name="card"
                          value={card}
                          onChange={(e) => setCard(e.target.value)}
                        >
                          <option value="">Please select a card</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="Debit Card">Debit Card</option>
                          <option value="Charge Card">Charge Card</option>
                          <option value="Store-valued Card">
                            Store-valued Card
                          </option>
                        </select>
                        {errors.cardError && (
                          <p className="text-red-500 text-xs">
                            {errors.cardError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Residential Address:</label>
                        <input
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="outline-none border rounded-md border-gray-300 px-3 py-1 text-sm"
                          type="text"
                        />
                        {errors.addressError && (
                          <p className="text-red-500 text-xs">
                            {errors.addressError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Reference ID:</label>
                        <input
                          name="id"
                          value={id}
                          onChange={(e) => setId(e.target.value)}
                          className="outline-none border rounded-md border-gray-300 px-3 py-1 text-sm"
                          type="text"
                        />
                        {errors.idError && (
                          <p className="text-red-500 text-xs">
                            {errors.idError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Phone Number:</label>
                        <input
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="outline-none border rounded-md border-gray-300 px-3 py-1 text-sm"
                          type="text"
                        />
                        {errors.phoneError && (
                          <p className="text-red-500 text-xs">
                            {errors.phoneError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Email:</label>
                        <input
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="outline-none border rounded-md border-gray-300 px-3 py-1 text-sm"
                          type="email"
                        />
                        {errors.emailError && (
                          <p className="text-red-500 text-xs">
                            {errors.emailError}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                  <div className="mt-5">
                    <button
                      onClick={continueTransfer}
                      className="text-xs bg-blue-600 text-white px-5 py-1 rounded-md"
                    >
                      Sumbit Application
                    </button>
                  </div>
                </div>
                <Modal
                  open={isModalOpen}
                  title="Ordered a Card"
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[
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
                    <div className="text-center pt-5 w-1/">
                      <h1 className="text-lg">
                        Your Order is being Processed.
                      </h1>
                    </div>
                  </div>
                </Modal>
                <div className="md:w-1/2 text-black mt-5 md:mt-0">
                  <div>
                    <h1 className="font-semibold">Application Status</h1>
                  </div>

                  <div className="mt-5">
                    <div className="bg-blue-50 border border-gray-300 rounded-md text-center text-lg font-semibold py-10 px-10 ">
                      <h1>No Requests Yet</h1>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <Footerd />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
