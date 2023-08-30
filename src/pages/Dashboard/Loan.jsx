import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { IoArrowBackCircle } from "react-icons/io5";
import { BiCheckCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const Loan = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [income, setIncome] = useState("");
  const [occupation, setOccupation] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.auth.user_details);

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!name) {
      newErrors.nameError = "Please select a bank";
      formIsValid = false;
    } else if (name !== user.firstName + user.lastName) {
      newErrors.nameError = "Name does not match with user details";
      formIsValid = false;
    }

    if (!type) {
      newErrors.typeError = "Type of Loan is required";
      formIsValid = false;
    }

    if (!address) {
      newErrors.addressError = "Applicant address is required";
      formIsValid = false;
    }

    if (!id) {
      newErrors.idError = "An ID is required";
      formIsValid = false;
    }

    if (!phone) {
      newErrors.phoneError = "Phone Number is required";
      formIsValid = false;
    }

    if (!email) {
      newErrors.emailError = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.emailError = "Please enter a valid email address";
      formIsValid = false;
    }
    if (!income) {
      newErrors.incomeError = "Select an annual income range";
      formIsValid = false;
    }

    if (!occupation) {
      newErrors.amountError = "Occupation is required";
      formIsValid = false;
    }

    if (!description) {
      newErrors.descriptionError = "Description is required";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setOpen(true); // Set modal handle to true if all conditions are met
    } else {
      setOpen(false);
      console.log("first", errors);
      // Set modal handle to false if any condition is not met
    }
  };
  return (
    <>
      <div className="bg-gray-100 h-scgreen py-10 text-black">
        <div>
          <Link to="/user/dashboard" className="flex">
            <IoArrowBackCircle className="text-gray-400 mtt-1" size={25} />{" "}
            <p>Return to Dashboard</p>{" "}
          </Link>
        </div>
        <div className="text-center">
          <h1 className="lg:text-3xl text-xl uppercase tracking-widest">
            Loan Application
          </h1>
          <p className="lg:text-lg capitalize pt-5">
            Easiest Place to apply for your loan
          </p>
          <span className="text-sm text-primary">
            Loans are only offered to existing and eligible customers
          </span>
        </div>
        <div className="flex justify-center my-5 shadhow-sm">
          <div className="bg-white rounded-lg shadow shadow-gray-300 w-fit p-5">
            <Modal
              title="Loan Application"
              open={open}
              onCancel={handleCancel}
              footer={[
                <div className="flex justify-center">
                  <Button
                    className="bg-blhe-500 border border-blue-500 rounded-md texthwhite hover:text-white flex justify-center px-10 mt-5"
                    key="submit"
                    onClick={handleCancel}
                  >
                    OK
                  </Button>
                  ,
                </div>,
              ]}
            >
              <div className="text-green-500 flex justify-center">
                <BiCheckCircle size={120} />
              </div>
              <div className="text-center">
                <h1 className="text-3xl text-black font-semibold ">
                  Successful!
                </h1>
                <p className="text-gray-500 text-lg tracking-widest py-3">
                  Your request has been sucessfully submitted.
                </p>
              </div>
            </Modal>
            <h1 className="py-2">
              Please fill out all inputs and submit this form
            </h1>
            <form className="md:grid md:grid-cols-2 gap-5" action="">
              <div className="flex flex-col">
                <label htmlFor="">Full Name:</label>

                <input
                  className="outline-none px-3 py-1 text-sm focus:border focus:border-orange-500 bg-slate-200 focus:bg-white lg:w-72 border border-blue-500 rounded-md"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.nameError && (
                  <p className="text-red-500 text-xs">{errors.nameError}</p>
                )}
              </div>
              <div className="flex flex-col ">
                <label htmlFor="">Type of Loan:</label>
                <select
                  className="capitalize text-sm py-1 px-3 outline-none border border-blue-500 rounded-md bg-gray-100 focus:bg-white focus:border-orange-500"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Student loan</option>
                  <option value="">car loan</option>
                  <option value="">small business loan</option>
                  <option value="">large business loan</option>
                  <option value="">Insurance loan</option>
                </select>
                {errors.typeError && (
                  <p className="text-red-500 text-xs">{errors.typeError}</p>
                )}
              </div>
              <div className="flex flex-col ">
                <label htmlFor="">Residential address:</label>
                <input
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="outline-none px-3 py-1 text-sm focus:border focus:border-orange-500 bg-slate-200 focus:bg-white lg:w-72 border border-blue-500 rounded-md"
                  type="text"
                />
                {errors.addressError && (
                  <p className="text-red-500 text-xs">{errors.addressError}</p>
                )}
              </div>
              <div className="flex flex-col ">
                <label htmlFor="">Reference ID:</label>
                <input
                  name="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="outline-none px-3 py-1 text-sm focus:border focus:border-orange-500 bg-slate-200 focus:bg-white lg:w-72 border border-blue-500 rounded-md"
                  type="text"
                />
                {errors.idError && (
                  <p className="text-red-500 text-xs">{errors.idError}</p>
                )}
              </div>
              <div className="flex flex-col ">
                <label htmlFor="">Phone Number:</label>
                <input
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="outline-none px-3 py-1 text-sm focus:border focus:border-orange-500 bg-slate-200 focus:bg-white lg:w-72 border border-blue-500 rounded-md"
                  type="text"
                />
                {errors.phoneError && (
                  <p className="text-red-500 text-xs">{errors.phoneError}</p>
                )}
              </div>
              <div className="flex flex-col ">
                <label htmlFor="">Annual Income Rate:</label>
                <select
                  className="capitalize text-sm py-1 px-3 outline-none border border-blue-500 rounded-md bg-gray-100 focus:bg-white focus:border-orange-500"
                  name="income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                >
                  <option value="">$0 - $1,000</option>
                  <option value="">$1,000 - $9,000</option>
                  <option value="">$9,000 - $49,000</option>
                  <option value="">$50,000 - $99,000</option>
                  <option value="">$100,000 - Above</option>
                </select>
                {errors.incomeError && (
                  <p className="text-red-500 text-xs">{errors.incomeError}</p>
                )}
              </div>
              <div className="flex flex-col ">
                <label htmlFor="">Email:</label>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none px-3 py-1 text-sm focus:border focus:border-orange-500 bg-slate-200 focus:bg-white lg:w-72 border border-blue-500 rounded-md"
                  type="email"
                />
                {errors.emailError && (
                  <p className="text-red-500 text-xs">{errors.emailError}</p>
                )}
              </div>
              <div className="flex flex-col ">
                <label htmlFor="">Occupation:</label>
                <input
                  name="occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="outline-none px-3 py-1 text-sm focus:border focus:border-orange-500 bg-slate-200 focus:bg-white lg:w-72 border border-blue-500 rounded-md"
                  type="text"
                />
                {errors.occupationError && (
                  <p className="text-red-500 text-xs">
                    {errors.occupationError}
                  </p>
                )}
              </div>
              <div className="flex flex-col ">
                <label htmlFor="">Short Note of Loan Reason:</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="outline-none px-3 py-1 text-sm focus:border focus:border-orange-500 bg-slate-200 focus:bg-white lg:w-72 border border-blue-500 rounded-md"
                  type="text"
                />
                {errors.descriptionError && (
                  <p className="text-red-500 text-xs">
                    {errors.descriptionError}
                  </p>
                )}
              </div>
            </form>{" "}
            <div className="flex justify-end text-white">
              <button
                onClick={onSubmit}
                className="mt-5 py-1 text-sm rounded-md bg-blue-500 px-20"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loan;
