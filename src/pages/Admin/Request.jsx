import React, { useState } from "react";
import AdminNav from "./AdminNav";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineRollback } from "react-icons/ai";

const Request = ({ route }) => {
  const location = useLocation();

  const transferId = location.state.transactionId;
  console.log({ location: transferId });
  //console.log({ s:});
  let navigate = useNavigate();
  const adUser = useSelector((state) => state.auth.user);

  const [transaction, setTransaction] = useState({
    email: adUser.status,
    accbal: adUser.balance,
    depos: adUser.amount,
    firstName: adUser.firstName,
    lastName: adUser.lastName,
    wdl: adUser.userId,
    accountNumber: adUser.accountNumber,
    phone: adUser.email,
  });

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

  const onApprove = async (event) => {
    const isApproved = await fetch(
      `https://rest.silverstonefi.com/transfer/approve/${transferId}`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "approved",
        }),
      }
    );

    let resp = await isApproved.json();
    console.log("Approve resp", resp);
    event.preventDefault();
    navigate("/admin/transactions", { replace: true });
  };

  const onDecline = async (event) => {
    const isDeclined = await fetch(
      `https://rest.silverstonefi.com/transfer/approve/${transferId}`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "declined",
        }),
      }
    );

    let resp = await isDeclined.json();
    console.log("Declined resp", resp);
    event.preventDefault();
    navigate("/admin/transactions", { replace: true });
  };

  return (
    <div className="bg-gray-100 h-screen text-black">
      <AdminNav />
      <div class="my-5 flex items-center gap-1 font-bold cursor-pointer">
        <AiOutlineRollback
          className="text-blue-300"
          size={34}
          onClick={() => {
            navigate("/admin/transactions");
          }}
        />
        Back
      </div>
      <section>
        <h1 className="text-center text-cond tracking-wider font-semibold text-2xl">
          Transaction - <span className="capitalize">{adUser.status}</span>
        </h1>
        <div className="flex justify-center mt-5">
          <div className="bg-white p-5 md:w-1/4 text-black">
            <p className="text-center font-semibold flex justify-between">
              <span>Time:</span>{" "}
              <span className="bg-gray-200 text-gray-600 text-2xs py-1 px-5 rounded-full">
                {" "}
                {formatDate(adUser.createdAt)}
              </span>
            </p>{" "}
            <p className="flex flex-col font-bold uppercase py-5 border-b">
              <span>Transaction Id:</span>{" "}
              <span className="font-semibold text-sm text-gray-500">
                {adUser._id}
              </span>{" "}
            </p>
            <p className="flex flex-col font-bold uppercase py-5 border-b">
              {" "}
              <span>Amount:</span>{" "}
              <span className="font-semibold text-sm text-gray-500">
                {adUser.amount}
              </span>{" "}
            </p>
            <div className="mt-5 flex justify-between">
              <div>
                <button
                  onClick={onApprove}
                  className="btn btn-secondary bg-green-500 border-none hover:bg-green-600"
                >
                  Approve
                </button>
              </div>
              <div>
                <button
                  onClick={onDecline}
                  className="btn btn-danger bg-red-500 text-white border-none hover:bg-red-600"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Request;
