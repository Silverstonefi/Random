import React from "react";
import card from "../../components/Bank site Img/card.png";
import Nav from "../../components/Assets/dashNav";
import Left from "./Left";
import { Link } from "react-router-dom";
import { BiBookmark } from "react-icons/bi";
import { LuScroll } from "react-icons/lu";
import {
  AiFillStar,
  AiOutlineCloseCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { Table } from "antd";
import { useState } from "react";

const Loans = () => {
  const columns = [
    {
      title: "Sn",
      dataIndex: "sn",
      sorter: {
        compare: (a, b) => a.sn - b.sn,
        multiple: 3,
      },
    },
    {
      title: "Amount",
      dataIndex: "amt",
      sorter: {
        compare: (a, b) => a.amt - b.amt,
        multiple: 3,
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: {
        compare: (a, b) => a.date - b.date,
        multiple: 2,
      },
    },
    {
      title: "Acount Number",
      dataIndex: "acct",
      sorter: {
        compare: (a, b) => a.acct - b.acct,
        multiple: 1,
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: {
        compare: (a, b) => a.status - b.status,
        multiple: 1,
      },
    },
  ];
  const data = [
    {
      key: "1",
    },
    {
      key: "2",
    },
    {
      key: "3",
    },
    {
      key: "4",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <div>
        <div>
          <Nav />
        </div>
        <div className="md:flex">
          <div className="w-1/5">
            <Left />
          </div>
          <section className="flex-1 bg-gray-100 w-full">
            <h1 className="md:text-2xl text-xl text-black font-bold py-5 md:pl-10 px-5">
              Loans
            </h1>
            <div className="flex gap-[0.5px] md:gap-0.5 md:py-5 md:pl-10 px-5">
              <div className="bg-orange-500 w-fit text-gray-100 rounded-l-md py-2 px-3">
                <p>Request Loan</p>
              </div>{" "}
              <span className="bg-orange-500 text-white rounded-r-md py-2 px-3">
                <AiFillStar className="mt-1" size={15} />
              </span>
            </div>
            <div className="md:mx-10 mx-5 my-5">
              <div className="md:flex gap-10 text-lg font-semibold">
                <div className="w-full bg-white shadow-sm shadow-gray-300 flex justify-between md:py-5 py-3 px-5 rounded-md">
                  <div className="text-black">
                    <h1 className="text-3xl">$ 0.00</h1>
                    <p className="font-normal text-gray-400 pt-2">
                      Outstanding
                    </p>
                  </div>
                  <LuScroll
                    className="border border-gray-200 rounded-full mt-1 p-3"
                    size={70}
                  />
                </div>
                <div className="w-full bg-white shadow-sm shadow-gray-300 flex justify-between md:py-5 py-3 md:my-0 my-5 px-5 rounded-md">
                  <div className="text-black">
                    <h1 className="text-3xl">$ 0.00</h1>
                    <p className="font-normal text-gray-400 pt-2">
                      Eligible Amount
                    </p>
                  </div>{" "}
                  <FiCheckCircle
                    className="text-green-500 border border-gray-300 rounded-full p-3"
                    size={65}
                  />
                </div>
                <div className="w-full bg-white shadow-sm shadow-gray-300 flex justify-between md:py-5 px-5 py-3 rounded-md">
                  <div className="text-black">
                    <h1 className="text-3xl">$ 0.00</h1>
                    <p className="font-normal text-gray-400 pt-2">
                      Pending
                    </p>
                  </div>{" "}
                  <AiOutlineCloseCircle
                    className="text-red-500 border border-gray-300 rounded-full p-3"
                    size={70}
                  />
                </div>
              </div>
            </div>

            <div className="bg-whihte md:m-10 pb-10 mx-5">
              <div className="py-5">
                <h1 className="text-black text-xl font-sans font-semibold">
                  Loan History
                </h1>
                <p className="flex gap-0.5 text-sm py-2">
                  <AiOutlineQuestionCircle className="mt-1" />
                  <span>
                    Loans are only offered to existing and eligible customers
                  </span>
                </p>
              </div>
              <div className="overflow-x-scroll overscroll-contain scroll-m-auto">
                <Table
                  columns={columns}
                  // dataSource={data}
                  onChange={onChange}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Loans;
