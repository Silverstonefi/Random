import React, { useState } from "react";
import { Drawer } from "antd";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken, setUserDetails } from "../../Redux/action";
import logo from "../Bank site Img/logo.png";
import { FileFilled, SettingOutlined } from "@ant-design/icons";
import { BiSearch } from "react-icons/bi";
import { CgMenuRight } from "react-icons/cg";
import { BsMenuButtonWide, BsLaptop } from "react-icons/bs";
import { MdCancel, MdAccountCircle } from "react-icons/md";
import { BiBriefcaseAlt } from "react-icons/bi";
import { LuAirplay } from "react-icons/lu";
import Left from "../../pages/Dashboard/Left";
import Logo from "./logo";

//
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logout = () => {
    dispatch(setToken(""));
    dispatch(setUserDetails({}));
    navigate("/public/login", { replace: true });
  };

  const logoutButton = (
    <button
      onClick={logout}
      className="upperdcase bg-blue-d500 roundedd-lg text-whdite w-full justify-centeJr flex  texFt-center my-3"
    >
      Log Out
    </button>
  );

  const items = [
    getItem(
      "Accounts",
      "sub1",
      <BsLaptop className="mr-[3.5rem]" size={25} />,
      [
        getItem(<Link to="/user/dashboard">Dashboard</Link>, "1"),
        getItem(<Link to="/user/transfer">Transfer</Link>, "2"),
        getItem(<Link to="/user/fund-account">Fund Account</Link>, "3"),
        getItem(<Link to="/user/transactions">Transaction History</Link>, "4"),
      ]
    ),
    {
      type: "divider",
    },
    getItem(
      "Applications",
      "sub2",
      <FileFilled className="mr-[3.5rem]" size={25} />,
      [
        getItem(<Link to="/user/loans">Loans</Link>, "5"),
        getItem(<Link to="/form/card">Get Card</Link>, "6"),
      ]
    ),
    getItem(
      "Settings",
      "sub3",
      <SettingOutlined className="mr-[4rem]" size={25} />,
      [getItem(logoutButton, "7")]
    ),
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClick = (e) => {
    console.log("click ", e);
  };

  // const dispatch = useDispatch();
  // let navigate = useNavigate();

  const user = useSelector((state) => state.auth.user_details);
  // console.log(user, "User_Details");
  return (
    <>
      <header className="flex md:gap-16 gap-2 py-5 px-5 md:px-10 bg-white">
        <div className="flex">
          <div className="flex justify-center mr-44 lg:mr-0">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex lg:gap-10">
            <div className="">
              <CgMenuRight
                onClick={showDrawer}
                className="md:mt-3 mt-2 text-blue-400"
                size={30}
              />
            </div>
            <div className="hidden md:flex w-64 h-10 px-5 border mt-2 border-gray-300 bg-white rounded-2xl gap-1 text-black">
              <BiSearch size={22} className="mt-2 text-gray-500" />
              <input
                className="outline-none py-2"
                type="text"
                placeholder="Search here.."
              />
            </div>
          </div>

          <div className="hidden md:flex mt-2">
            <div className="text-lg flex text-black capitalize">
              <MdAccountCircle size={35} />
              <p className="text-sm font-semibold font-fira tracking-tight mt-2">
                {user.firstName}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="lg:hidden flex">
        <Drawer
          placement={placement}
          width={window.innerWidth > 900 ? 800 : window.innerWidth - 45}
          className="lg:hidden flex"
          closable={false}
          onClose={onClose}
          open={open}
          key={placement}
        >
          <div className="flex justify-between">
            <div className="text-blue-500 mt-1">
              <MdCancel onClick={onClose} size={25} />
            </div>
            <Logo />
          </div>
          <div className="mt-16 text-lg">
            <Menu
              onClick={onClick}
              style={{
                width: 280,
                textAlign: "left",
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </div>

          {/* <div className="flex flex-col justify-center gap-5 pt-5 md:mt-10">
            <button
              onClick={() => {
                dispatch(setToken(""));
                dispatch(setUserDetails({}));
                navigate("/public/login", { replace: true });
              }}
              className="uppercase bg-[#3f51b5] text-white px-5 py-3"
            >
              {" "}
              Log Out
            </button>
          </div> */}
        </Drawer>
      </div>
    </>
  );
};

export default Nav;
