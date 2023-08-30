import React from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { setAdUser } from "../../../Redux/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DepApp = ({ user }) => {
  // console.log("who is", user);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const approve = async () => {
    // console.log("appprv na");
    const notify = () =>
      toast.info("DONE", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    notify();
    const { email } = user;
    const isNotThere = await (
      await fetch(
        "https://doubtful-foal-suspenders.cyclic.app/deposit/approve",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, pdgwdl: user.pdgwdl }),
        }
      )
    ).json();
    console.log("approve", isNotThere);
  };
  const decline = async () => {
    // console.log("appprv na");
    const notify = () =>
      toast.info("DONE", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    notify();
    const { email } = user;
    const isNotThere = await (
      await fetch(
        "https://doubtful-foal-suspenders.cyclic.app/deposit/decline",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, pdgwdl: user.pdgwdl }),
        }
      )
    ).json();
    console.log("decline", isNotThere);
  };

  return (
    <div className="lg:p-5 p-3 border rounded-md text-black shadow-xl border-white  flex-1 flex justify-between lg:items-center lg:flex-row flex-col gap-3">
      <div className="text-base font-semibold gap-5">
        <p>{`Name: ${user.name}`}</p>
        <p>{`Email: ${user.email}`}</p>
      </div>
      <div className="mt-1 text-gray-600 flex justify-between ml-6">
        <button
          className="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-3 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={approve}
        >
          Approve
        </button>
        <button
          className="bg-red-400 text-white active:bg-blue-600 font-bold uppercase text-xs px-2 py-0.5 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={decline}
        >
          Declined
        </button>
      </div>
    </div>
  );
};

export default DepApp;
