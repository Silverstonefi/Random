import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken, setUserDetails } from "../../Redux/action";
import { Button, Modal } from "antd";
import { BsArrowUpShort } from "react-icons/bs";
import { HiInformationCircle } from "react-icons/hi";
import { FaRegCopy } from "react-icons/fa";
import { BiBookmark } from "react-icons/bi";
import { LuWallet, LuScroll } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Left from "./Left";
import Nav from "../../components/Assets/dashNav";
import "react-toastify/dist/ReactToastify.css";

const Fund = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deposit, setdeposit] = useState("");
  const onAmtChange = (e) => {
    setdeposit(e.target.value);
  };

  const notifier = () => toast("Copied!");

  const user = useSelector((state) => state.auth.user_details);
  console.log(user, "user auth");
  const { email } = user;

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

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://rest.silverstonefi.com/deposit", {
      signal: signal,
    }).then((response) => response.json());

    return () => controller.abort();
  }, []);

  const onDeposit = async () => {
    if (!deposit) {
      return notify("Please provide an amount");
    }

    const res = await fetch("https://rest.silverstonefi.com/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, deposit }),
    });

    const result = await res.json();

    notify(`${result.msg}`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalII = () => {
    setIsOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClose = () => {
    setIsOpen(false);
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
          <section className="flex-1 bg-gray-100 h-full">
            <h1 className="md:text-2xl text-xl px-5 text-black font-bold py-5 md:pl-10">
              Fund Account
            </h1>
            <div className="md:mx-10 mx-5">
              <div className="bg-white rounded-md md:px-10 px-3 py-5 shadow-sm shadow-gray-300">
                <div className="md:flex justify-between">
                  <div className="flex gap-5">
                    <LuWallet className="text-blue-400 mt-2" size={70} />
                    <h1 className="flex flex-col text-black font-bold text-xl mt-1">
                      Main Balance{" "}
                      <span className="text-3xl mt-4">${user.balance}</span>
                    </h1>
                  </div>
                  <div className="md:flex md:gap-32 md:mt-10 mt-5 font-semibold">
                    <div>
                      <h1>ACC TYPE</h1>
                      <p className="text-black">Savings Account</p>
                    </div>
                    <div className="my-3 md:my-0">
                      <h1>ACCOUNT OWNER</h1>
                      <p className="text-black capitalize">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-black">{user.accountNumber}</h1>
                    </div>
                  </div>
                </div>
                <div className="w-full md:mt-10 mt-5 h-5 rounded-xl bg-gray-300"></div>

                <div className="my-5 flex gap-10 text-blue-500 font-medium">
                  <button
                    className="border border-blue-400 w-full py-3 rounded-lg hover:bg-blue-500 hover:text-white hover:transition hover:ease-in-out hover:duration-300 ease out transition duration-300"
                    onClick={showModal}
                  >
                    +Crypto Deposit
                  </button>
                  <button
                    className="border border-blue-400 w-full py-3 rounded-lg hover:bg-blue-500 hover:text-white hover:transition hover:ease-in-out hover:duration-300 ease out transition duration-300"
                    onClick={showModalII}
                  >
                    +Fiat Deposit
                  </button>
                </div>
                <Modal
                  title="Crypto Deposit"
                  open={isModalOpen}
                  onCancel={handleCancel}
                >
                  <p className="border-t border-gray-300 w-full px-0 mx-0"></p>
                  <p className="flex gap-2 text-blue-500 bg-blue-50 rounded-md my-5 mx-10 py-3 px-3">
                    <HiInformationCircle size={20} className=" mt-0.5" />
                    Copy the address below and click 'Proceed' to complete the
                    action
                  </p>
                  <div className="flex mx-5">
                    <FaRegCopy
                      size={38}
                      className="p-2 rounded-l-lg text-green-600 border-2 border-green-600"
                    />
                    <div className="outline-none pt-1 text-gray-500 text-center border-l-0 border-2 border-green-600 rounded-r-lg w-full">
                      ug87g823hHVu7ye
                    </div>
                  </div>
                  <div className="mx-5 my-5">
                    <button className="bg-blue-500 text-white w-full py-2 hover:bg-blue-400 hover:transition hover:ease-in-out ease-out duration-300 hover:duration-300 rounded-md">
                      Proceed To Buy Crypto
                    </button>
                  </div>
                </Modal>

                <Modal
                  title="Fiat Deposit"
                  open={isOpen}
                  onCancel={handleClose}
                >
                  <p className="border-t border-gray-300 w-full px-0 mx-0"></p>
                  <HiInformationCircle
                    size={80}
                    className="text-[#f25235] mt-5"
                  />
                  <p className="bg-blue-50 text-blue-500 rounded-md my-5 py-3 px-3">
                    To make Fiat deposits, please contact us via email or live
                    support as monetary policies and regulation may vary with
                    different geographic locations.
                  </p>
                </Modal>
              </div>
              <div className="flex md:hidden bg-gray-100 shadow-md shadow-gray-300 h-5 mx-6 rounded-b-lg"></div>
              <div className="flex md:hidden bg-gray-200 shadow-md shadow-gray-300 h-5 mx-12 rounded-b-lg"></div>
              <div className="hidden md:flex bg-gray-200 w-[90%] ml-14 rounded-b-lg h-7 justify-center"></div>
              <div className="hidden bg-gray-300 w-[80%] ml-24 rounded-b-lg h-7 md:flex justify-center"></div>
            </div>
            <div className="md:mx-10 mx-5 py-10">
              <div className="md:flex md:gap-10 text-lg font-semibold">
                {" "}
                <Link
                  to="/user/transfer"
                  className="w-full bg-blue-500 shadow-sm shadow-gray-300 flex gap-5 py-3 px-10 rounded-md"
                >
                  <div className="flex content-center bg-white p-2 mt-3 h-fit rounded-full">
                    <BsArrowUpShort
                      className="text-blue-500 border-[3px] border-blue-500 rounded-full"
                      size={30}
                    />
                  </div>
                  <p className="text-white hover:text-gray-200 mt-5">
                    Transfer
                  </p>
                </Link>
                <Link
                  to="/user/transactions"
                  className="w-full bg-green-500 shadow-sm shadow-gray-300 flex md:mt-0 mt-5 gap-5 py-3 px-10 rounded-md"
                >
                  <div className="flex content-center bg-white p-2 mt-3 h-fit rounded-full">
                    <LuScroll className="text-green-500" size={30} />
                  </div>
                  <p className="text-white mt-5">View Transactions</p>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Fund;
