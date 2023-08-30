import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const History = ({transaction}) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
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
  return (
    <div>
      <div className="flex justify-between px-5 py-3 my-10 bg-white rounded-md text-black">
        <div>
          <h1 className="text-lg">
            {transaction.amount} <span className="text-2xs">USD</span>
          </h1>
          <p className="uppercase text-xm">{transaction.action} </p>
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
      <li key={transaction._id}>
        {transaction.action} - {transaction.amount} {transaction.status}
      </li>
    </div>
  );
};

export default History;
