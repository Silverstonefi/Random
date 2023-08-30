import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import Transac from "./Transac";

const Transactions = () => {
  const [reload, setReload] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://rest.silverstonefi.com/all-users-transactions", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("usersssssssssss", res.transactions);
        setTransactions(res.transactions);
      })
      .catch((err) => console.log("errrrrrrr", err));
  }, [reload]);
  return (
    <div className="bg-grayv-100">
      <div>
        <AdminNav />
      </div>
      <div className="py-10">
        <div class="text-2xl font-semibold pb-5 text-center default_cursor_cs">
          Pending Transactions on the Site
        </div>
        {/* <ToastContainer /> */}
        {/* <input
          type="text"
          placeholder="search here..."
          class="mx-auto block py-2 rounded px-2 my-2"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        /> */}
        <div className="px-3 grid grid-cols-1 lg:grid-cols-2  lg:gap-5 gap-6">
          {transactions
            .filter((transaction) => {
              if (search === "") {
                return transaction;
              } else if (
                transaction.status
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                transaction.firstName
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ) {
                return transaction;
              }
            })
            .map((transaction, i) => {
              return <Transac key={i} transaction={transaction} />;
            })}
        </div>
      </div>
      {/* <section className="h-screen py-20 px-20">
        <div className="text-center">ALL TRANSACTIONS</div>
        <div>
          <div className="flex justify-between px-5 py-3 my-10 bg-white mx-20 rounded-md text-black">
            <div>
              <h1 className="text-lg">
                2000 <span className="text-2xs">USD</span>
              </h1>
              <p className="uppercase text-xm">direct funds transfer</p>
            </div>
            <div className="">
              <h1 className="bg-green-500 py-1 px-5 rounded-md text-center text-white">
                Approved
              </h1>
              <p className="text-xs text-center pt-1">
                Date <span>06 Jul, 2023.</span>
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Transactions;
