import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUserDetails } from "../../Redux/action";
import { BiChevronRight } from "react-icons/bi";
import { BsMenuButtonWide } from "react-icons/bs";
import { MdComputer } from "react-icons/md";
import { BiBriefcaseAlt } from "react-icons/bi";
import { LuAirplay } from "react-icons/lu";

const Left = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  return (
    <>
      <section
        className="fixed h-full hidden md:relative z-10 top-0 left-0 bottom-0 w-full bg-white md:flex md:flex-col md:items-center md:w-4/12 lg:w-full bg-red-5 shadow-lg"
        style={{
          animation: "0.4 ease 0s 1 normal none running overlay-fade-in",
        }}
      >
        <div className="w-full px-5 mt-10">
          {" "}
          <Link to="/user/dashboard">
            <div className="flex justify-between text-left font">
              <BsMenuButtonWide
                size={30}
                className="text-gray-700 p-1 font-bold"
              />

              <p className="text-lg">Dashboard</p>
              <BiChevronRight className="mt-0.5" size={25} />
            </div>{" "}
          </Link>{" "}
          <Link to="/user/loans">
            <div className="flex justify-between py-10 font">
              <LuAirplay size={30} className="text-gray-700 p-1 font-bold" />

              <p className="text-lg">Loans</p>
              <BiChevronRight className="mt-0.5" size={25} />
            </div>{" "}
          </Link>{" "}
          <Link to="/user/fund-account">
            <div className="flex justify-between font">
              <BiBriefcaseAlt
                size={30}
                className="text-gray-700 p-1 font-bold"
              />

              <p className="text-lg">Fund Account</p>
              <BiChevronRight className="mt-0.5" size={25} />
            </div>{" "}
          </Link>
          <Link to="/user/withdraw">
            <div className="flex justify-between py-10 font">
              <BsMenuButtonWide
                size={30}
                className="text-gray-700 p-1 font-bold"
              />

              <p className="text-lg">Withdrawal</p>
              <BiChevronRight className="mt-0.5" size={25} />
            </div>
          </Link>
          <Link to="/user/transfer">
            <div className="flex justify-between font">
              <BsMenuButtonWide
                size={30}
                className="text-gray-700 p-1 font-bold"
              />

              <p className="text-lg">Transfer</p>
              <BiChevronRight className="mt-0.5" size={25} />
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(setToken(""));
              dispatch(setUserDetails({}));
              navigate("/public/login", { replace: true });
            }}
            className="flex justify-between pt-10 font"
          >
            <BsMenuButtonWide
              size={30}
              className="text-gray-700 p-1 font-bold"
            />

            <p className="text-lg">Logout</p>
            <BiChevronRight className="mt-0.5" size={25} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Left;
