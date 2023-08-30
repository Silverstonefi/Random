import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { setAdUser } from "../../Redux/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TransactionOutlined } from "@ant-design/icons";

const Transac = ({ transaction }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();


  const Request = () => {
    dispatch(setAdUser(transaction));
    navigate("/admin/requests", {
      replace: true,
      state: {transactionId: transaction._id}
    });
  };

  // Define a function to get the appropriate status color based on the transaction status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-gray-500"; // Gray for pending status
      case "approved":
        return "bg-green-500"; // Green for approved status
      case "declined":
        return "bg-red-500"; // Red for declined status
      default:
        return "bg-gray-500"; // Default to gray if status doesn't match any cases
    }
  };

  // Get the appropriate status color class name
  const statusColorClassName = getStatusColor(transaction.status);
  return (
    <div class="border rounded-md text-black shadow-xl border-white  flex-1 flex justify-between lg:items-center lg:flex-row flex-col gap-3">
      <div className="flex w-full justify-between px-5 py-3 bg-gray-300 rounded-md text-black">
        <div>
          <h1 className="text-lg">
            {transaction.amount} <span className="text-2xs">USD</span>
          </h1>
          <p className="uppercase text-xm">{transaction.type}</p>
        </div>
        <div className="mt-2 cursor-pointer" onClick={Request}>
          <h1 className="py-2 px-5 rounded-md text-center capitalize text-white bg-gray-500">
            View More
          </h1>
          {/* <p className="text-xs text-center pt-1">
            Date <span>{transaction.timestamp}</span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Transac;
