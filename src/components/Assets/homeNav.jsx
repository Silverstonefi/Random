import React, {useState} from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillCustomerService } from "react-icons/ai";
import {FaInfo} from "react-icons/fa";
import {MdOutlineContacts } from "react-icons/md";
import {SiLit} from "react-icons/si";
import { Button, Drawer, Radio, Space } from "antd";
import { CgMenuGridO, CgMenuRight } from "react-icons/cg";
import Logo from "./logo";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [op, setOp] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const openDrawer = () => {
    setOp(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
      <header className="bg-white">
        <div className="flex justify-between ml-2 lg:ml-20">
          <div className="flex py-7">
            <div className="md:hidden flex">
              <div className="text-blue-500">
                <CgMenuRight onClick={showDrawer} size={30} />
              </div>
              <div className="">
                <Drawer
                  placement={placement}
                  closable={false}
                  onClose={onClose}
                  open={open}
                  key={placement}
                >
                  <div className="flex justify-end mr-5">
                    <Logo />
                  </div>
                  <div className="text-black">
                    <div className="flex border-b border-gray-300 gap-10 w-full py-5">
                      <AiFillHome
                        className="text-gray-500 ml-5 mt-2"
                        size={20}
                      />
                      <Link className="text-lg pt-1 font-semibold" to="/">
                        Home
                      </Link>
                    </div>
                    <div className="flex border-b border-gray-300 gap-10 w-full py-5">
                      <FaInfo className="text-gray-500 ml-5 mt-2" size={20} />
                      <Link
                        className="text-lg pt-1 font-semibold"
                        to="/public/about"
                      >
                        About Us
                      </Link>
                    </div>
                    <div className="flex border-b border-gray-300 gap-10 w-full py-5">
                      <MdOutlineContacts
                        className="text-gray-700 ml-5 mt-2"
                        size={20}
                      />
                      <Link
                        className="text-lg pt-1 font-semibold"
                        to="/public/contact"
                      >
                        Contact
                      </Link>
                    </div>
                    <div className="flex border-b border-gray-300 gap-10 w-full py-5">
                      <AiFillCustomerService
                        className="text-gray-500 ml-5 mt-2"
                        size={20}
                      />
                      <Link
                        className="text-lg pt-1 font-semibold"
                        to="/public/services"
                      >
                        Services
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-5 pt-5 md:mt-10">
                    <button className="uppercase bg-[#3f51b5] text-white px-5 py-3">
                      <Link to="/public/register">SIGN UP </Link>
                    </button>

                    <button className="uppercase bg-[#3f51b5] text-white px-5 py-3">
                      {" "}
                      <Link to="/public/login">LOGIN </Link>
                    </button>
                  </div>
                </Drawer>
              </div>
            </div>
            <Logo />
          </div>

          <div className="hidden lg:flex gap-20  text-gray-500 uppercase font-semibbold pt-8 font-cond">
            <Link to="/">
              <h1 className="hover:transition hover:ease-in-out hover:duration-300 hover:text-blue-500 ease-out duration-300">
                Home
              </h1>
            </Link>
            <Link to="/public/about">
              <h1 className="hover:transition hover:ease-in-out hover:duration-300 hover:text-blue-500 ease-out duration-300">
                About
              </h1>
            </Link>
            <Link to="/public/services">
              <h1 className="hover:transition hover:ease-in-out hover:duration-300 hover:text-blue-500 ease-out duration-300">
                services
              </h1>
            </Link>
            <Link to="/">
              <h1 className="hover:transition hover:ease-in-out hover:duration-300 hover:text-blue-500 ease-out duration-300">
                Loan application
              </h1>
            </Link>
            <Link to="/public/contact">
              <h1 className="hover:transition hover:ease-in-out hover:duration-300 hover:text-blue-500 ease-out duration-300">
                Contact
              </h1>
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-10 pt-5 mr-5">
            <div className="flex gap-5">
              <Link className="hidden lg:flex" to="/public/login">
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link className="" to="/public/register">
                <button className="btn btn-primary">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Nav;
