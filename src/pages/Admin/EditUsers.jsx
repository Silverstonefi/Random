import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { setUserDetails } from "../../Redux/action";
import { AiOutlineRollback } from "react-icons/ai";

const EditUsers = () => {
  let navigate = useNavigate();
  const adUser = useSelector((state) => state.auth.user);
  console.log("aduser", adUser);

  const [user, setUser] = useState({
    email: adUser.email,
    accbal: adUser.balance,
    depos: adUser.deposit,
    firstName: adUser.firstName,
    lastName: adUser.lastName,
    wdl: adUser.withdrawal,
    accountNumber: adUser.accountNumber,
    // profits: adUser.profits,
    phone: adUser.phone,
  });

  //get user token from redux
  //ad user details
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log("user", user);
  };

  const onEdit = async (event) => {
    const {
      email,
      accbal,
      depos,
      firstName,
      wdl,
      accountNumber,
      lastName,
      phone,
    } = user;

    const iseditUser = await fetch("https://rest.silverstonefi.com/users/:id", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        balance: accbal,
        deposit: depos,
        firstName,
        lastName,
        accountNumber,
        withdrawal: wdl,
        phone: phone,
      }),
    });

    let resp = await iseditUser.json();
    console.log("edit resp", resp);
    event.preventDefault();
    navigate("/admin/users", { replace: true });
  };

  const onDel = async () => {
    const { email } = user;
    const isNotThere = await fetch(
      "https://rest.silverstonefi.com/deleteuser",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    let resp = await isNotThere.json();
    navigate("/admin/users", { replace: true });
  };
  return (
    <div className="pb-10">
      <div class="my-5 flex items-center gap-1 font-bold cursor-pointer">
        <AiOutlineRollback
          className="text-blue-300"
          size={34}
          onClick={() => {
            navigate("/admin/users");
          }}
        />
        Back
      </div>
      <form className="px-5 border shadow-xl mb-4 text-black capitalize text-xl grid md:grid-cols-2 gap-x-10 py-3">
        <div class="mb-2 pt-0">
          <label className="text-xs">Email</label>
          <input
            name="deposit"
            disabled
            value={user.email}
            type="text"
            placeholder={`${user.email}`}
            className="px-3 py-3 placeholder-gray-900 relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
          />
        </div>
        <div class="mb-2 pt-0">
          <label className="text-lg font-semibold">First Name:</label>
          <input
            name="firstName"
            onChange={onChange}
            value={user.firstName}
            type="text"
            placeholder={`${user.firstName}`}
            className="px-3 py-3 placeholder-gray-900 relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline focus:bg-slate-200 w-full"
          />
        </div>
        <div class="mb-2 pt-0">
          <label className="text-lg font-semibold">Last Name:</label>
          <input
            name="lastName"
            onChange={onChange}
            value={user.lastName}
            type="text"
            placeholder={`${user.lastName}`}
            className="px-3 py-3 placeholder-gray-900 relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline focus:bg-slate-200 w-full"
          />
        </div>

        <div class="mb-2 pt-0">
          <label className="text-lg font-semibold">Account Number:</label>
          <input
            name="accountNumber"
            onChange={onChange}
            value={user.accountNumber}
            type="number"
            placeholder={`${user.accountNumber}`}
            className="px-3 py-3 placeholder-gray-900 relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full focus:bg-slate-200"
          />
        </div>

        <div class="mb-2 pt-0">
          <label className="text-lg font-semibold">Balance:</label>
          <input
            name="accbal"
            onChange={onChange}
            value={user.accbal}
            type="number"
            placeholder={`${user.accbal}`}
            className="px-3 py-3 placeholder-gray-900 relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full focus:bg-slate-200"
          />
        </div>

        <div class="mb-2 pt-0">
          <label className="text-lg font-semibold">Deposit:</label>
          <input
            name="depos"
            onChange={onChange}
            value={user.depos}
            type="number"
            placeholder={`${user.depos}`}
            className="px-3 py-3 placeholder-gray-900 relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full focus:bg-slate-200"
          />
        </div>

        <div class="mb-2 pt-0">
          <label className="text-lg font-semibold">Withdrawal:</label>
          <input
            name="wdl"
            onChange={onChange}
            value={user.wdl}
            type="number"
            placeholder={`${user.wdl}`}
            className="px-3 py-3 placeholder-gray-900 relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full focus:bg-slate-200"
          />
        </div>

        {/* <div class="mb-2 pt-0">
          <label className="text-lg font-semibold">Outstanding Payments:</label>
          <input
            name="profits"
            onChange={onChange}
            value={user.profits}
            type="number"
            placeholder={`${user.profits}`}
            className="px-3 py-3 placeholder-gray-900 relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full focus:bg-slate-200"
          />
        </div> */}

        <div class="mb-2 pt-0">
          <label className="text-lg font-semibold">Phone:</label>
          <input
            name="phone"
            onChange={onChange}
            value={user.phone}
            type="text/number"
            placeholder={`${user.phone}`}
            className="px-3 py-3 placeholder-gray-900 relative rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full focus:bg-slate-200"
          />
        </div>

        <div className="mt-8 text-gray-600 flex justify-between md:w-[25%] gap-2">
          <button
            onClick={onEdit}
            className="bg-green-500 text-white active:bg-green-800 font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Save
          </button>

          <button
            onClick={onDel}
            className="bg-red-500 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUsers;
