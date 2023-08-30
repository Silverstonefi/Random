import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails, setToken } from "../../Redux/action";
import { useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import {
  BsPhoneFill,
  BsFillCalendar2DateFill,
  BsFillHouseCheckFill,
} from "react-icons/bs";
import { IoPersonCircle } from "react-icons/io5";
import { Select } from "antd";
import { GrMail } from "react-icons/gr";
import { MdOutlineTextFields, MdOutlinePassword } from "react-icons/md";
import Logo from "../../components/Assets/logo";

const Register = ({ label, ...rest }) => {
  // const handle = (value) => {
  //   console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  // };

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [dial, setDial] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");
  const [currency, setCurrency] = useState("");
  const [gender, setGender] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [terms, setTerms] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    phone: "",
    dial: "",
    account: "",
    password: "",
    confirmPassword: "",
    error: "",
    exists: "",
  });
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    dialError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [`${name}Error`]: "" }));
  };

  const register = (e) => {
    e.preventDefault();

    if (!terms) {
      return;
    }
    setMsg({});
    console.log({
      firstName,
      lastName,
      address,
      email,
      phone,
      password,
      confirmPassword,
    });

    setErrors({
      firstNameError: "",
      lastNameError: "",
      dialError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
    });

    let isValid = true;

    if (!firstName) {
      setErrors((prevFormData) => ({
        ...prevFormData,
        firstNameError: "First Name is required.",
      }));
      isValid = false;
    }

    if (!lastName) {
      setErrors((prevFormData) => ({
        ...prevFormData,
        lastNameError: "Last Name is required.",
      }));
      isValid = false;
    }

    if (!dial) {
      setErrors((prevFormData) => ({
        ...prevFormData,
        dialError: "Dial code is required.",
      }));
      isValid = false;
    }

    if (!email) {
      setErrors((prevFormData) => ({
        ...prevFormData,
        emailError: "Email Address is required.",
      }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevFormData) => ({
        ...prevFormData,
        emailError: "Invalid email address.",
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevFormData) => ({
        ...prevFormData,
        passwordError: "Password is required.",
      }));
      isValid = false;
    } else if (password.length < 6) {
      setErrors((prevFormData) => ({
        ...prevFormData,
        passwordError: "Password must be at least 6 characters long.",
      }));
      isValid = false;
    }

    if (!confirmPassword) {
      setErrors((prevFormData) => ({
        ...prevFormData,
        confirmPasswordError: "Confirm Password is required.",
      }));
      isValid = false;
    } else if (password !== confirmPassword) {
      setErrors((prevFormData) => ({
        ...prevFormData,
        confirmPasswordError: "Passwords do not match.",
      }));
      isValid = false;
    }
    // console.log("rrrrr", confirmPassword);

    if (!terms) {
      isValid = false;
      // You may display a message or highlight the checkbox here
    }

    if (isValid) {
      // Your registration logic here...
      fetch("https://rest.silverstonefi.com/sign-up", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          dial,
          account,
          address,
          date,
          currency,
          accountNumber,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log("res", res);
          const { token } = res;
          const { user } = res;
          dispatch(setToken(token));

          if (res.msg) {
            setMsg(res.msg);
            console.log("msg", msg);
          }

          if (token != undefined) {
            dispatch(setUserDetails(user));
            navigate("/user/dashboard", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-gray-100 ">
      {/* <div className="relative bg-gradient-to-br h-[130vh] from-cyan-400 via-sky-500 to-blue-900 transition ease in">
        <div className="bg-black/60 h-full py-10 w-full"></div>
        <div className="absolute top-0 text-center py-10 w-full">
          <div className="flex justify-center mt-5">
            <Link to="/">
              <Logo />
            </Link>
          </div>{" "}
          <div>
            <form className="mt-5 justify-center md:px-0 px-5" action="">
              <div className="md:flex md:justify-center md:gap-3">
                <div className="flex justify-center md:block">
                  <div className="flex relative md:mb-0 mb-5 md:w-auto w-[75%] bg-white border border-gray-300 px-3  rounded-md">
                    <IoPersonCircle
                      className="text-blue-800 mt-2.5"
                      size={20}
                    />
                    <input
                      {...rest}
                      name="firstName"
                      value={firstName}
                      className="outline-none text-black md:px-2 pr-0 pl-2 py-2 w-48"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label
                      className={`absolute bg-white rounded-t-md px-2 left-10 transition-all duration-300 ${
                        isFocused || inputValue
                          ? "text-sm -top-2 text-gray-500"
                          : "text-sm top-2 text-gray-400"
                      }`}
                    >
                      First Name*
                    </label>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex relative md:w-auto w-[75%] bg-white border border-gray-300 px-3 rounded-md">
                    <IoPersonCircle
                      className="text-blue-800 mt-2.5"
                      size={20}
                    />
                    <input
                      {...rest}
                      name="lastName"
                      value={lastName}
                      className="outline-none text-black md:px-2 pr-0 pl-2 py-2 w-48"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label
                      className={`absolute bg-white rounded-t-md px-2 left-10 transition-all duration-300 ${
                        isFocused || inputValue
                          ? "text-sm -top-2 text-gray-500"
                          : "text-sm top-2.5 text-gray-400"
                      }`}
                    >
                      Last Name*
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-center my-5">
                <div className="flex md:w-[30.6rem] w-[75%] bg-white relative border border-gray-300 px-3  rounded-md">
                  <GrMail className="text-blue-800 mt-2.5" size={20} />
                  <input
                    {...rest}
                    name="email"
                    value={email}
                    type="email"
                    className="outline-none px-4 w-full md:px-2 pr-0 pl-2 py-2 text-black"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    className={`absolute bg-white rounded-t-md px-2 left-10 transition-all duration-300 ${
                      isFocused || inputValue
                        ? "text-sm -top-2 text-gray-500"
                        : "text-sm top-2.5 text-gray-400"
                    }`}
                  >
                    Email Address*
                  </label>
                </div>
              </div>

              <div className="flex justify-center my-5">
                <div className="flex md:w-[30.6rem] w-[75%] bg-white relative border border-gray-300 px-3  rounded-md">
                  <BsPhoneFill className="text-blue-800 mt-2.5" size={20} />
                  <input
                    {...rest}
                    name="phone"
                    value={phone}
                    className="outline-none px-4 w-full md:px-2 pr-0 pl-2 py-2 text-black"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label
                    className={`absolute bg-white rounded-t-md px-2 left-10 transition-all duration-300 ${
                      isFocused || inputValue
                        ? "text-sm -top-2 text-gray-500"
                        : "text-sm top-2.5 text-gray-400"
                    }`}
                  >
                    Phone Number*
                  </label>
                </div>
              </div>

              <div className="flex justify-center my-5">
                <div className="flex md:w-[30.6rem] w-[75%] bg-white relative border border-gray-300 px-3  rounded-md">
                  <BsFillCalendar2DateFill
                    className="text-blue-800 mt-2.5"
                    size={20}
                  />
                  <input
                    {...rest}
                    name="date"
                    type="date"
                    value={date}
                    className="outline-none px-4 w-full bg-white md:px-2 pr-0 pl-2 py-2 text-gray-500"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center my-5">
                <div className="flex md:w-[30.6rem] w-[75%] bg-white relative border border-gray-300 px-3  rounded-md">
                  <BsFillHouseCheckFill
                    className="text-blue-800 mt-2.5"
                    size={20}
                  />
                  <input
                    {...rest}
                    name="address"
                    value={address}
                    className="outline-none px-4 w-full md:px-2 pr-0 pl-2 py-2 text-black"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label
                    className={`absolute bg-white rounded-t-md px-2 left-10 transition-all duration-300 ${
                      isFocused || inputValue
                        ? "text-sm -top-2 text-gray-500"
                        : "text-sm top-2.5 text-gray-400"
                    }`}
                  >
                    Residential Address*
                  </label>
                </div>
              </div>

              <div className="py-2 text-lg text-white">
                <h1>ACCOUNT DETAILS:</h1>
              </div>
              <div className="mb-4 md:w-auto ">
                <Select
                  name="account"
                  labelInValue
                  defaultValue={{
                    value: "Please Select account type",
                    label: "Please Select account type",
                  }}
                  style={{
                    width: 250,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Please Select account type",
                      label: "Please Select account type",
                    },
                    {
                      value: "1",
                      label: "Savings Account",
                    },
                    {
                      value: "2",
                      label: "Fixed Deposit Account",
                    },
                    {
                      value: "3",
                      label: "Checking Account",
                    },
                    {
                      value: "4",
                      label: "Premium Account",
                    },
                  ]}
                />
              </div>

              <div className="flex justify-center">
                <div className="flex bg-white md:w-[30.6rem] w-[75%] relative border border-gray-300 px-3  rounded-md">
                  <MdOutlineTextFields
                    className="text-blue-800 mt-2.5"
                    size={20}
                  />
                  <input
                    {...rest}
                    name="description"
                    className="outline-none px-4 w-full md:px-2 pr-0 pl-2 py-2 text-black"
                    placeholder="Describe account purpose"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <label
                    className={`absolute bg-white rounded-t-md pl-2 pr-28 left-10 transition-all duration-300 ${
                      isFocused || inputValue
                        ? "text-sm -top-2 pr-2 text-gray-500"
                        : "text-sm top-2.5 text-gray-400"
                    }`}
                  >
                    Description*
                  </label>
                </div>
              </div>

              <div className="flex justify-center my-5">
                <div className="flex md:w-[30.6rem] w-[75%] bg-white relative border border-gray-300 px-3  rounded-md">
                  <MdOutlinePassword
                    className="text-blue-800 mt-2.5"
                    size={20}
                  />
                  <input
                    {...rest}
                    name="password"
                    type="password"
                    value={password}
                    className="outline-none px-4 w-full md:px-2 pr-0 pl-2 py-2 text-black"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    className={`absolute bg-white rounded-t-md px-2 left-10 transition-all duration-300 ${
                      isFocused || inputValue
                        ? "text-sm -top-2 text-gray-500"
                        : "text-sm top-2.5 text-gray-400"
                    }`}
                  >
                    Password*
                  </label>
                </div>
              </div>
              <div className="flex justify-center py-1">
                <div className="w-[30rem] text-left">
                  <p className="text-red-500 text-sm">Forgot Password?</p>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={register}
                  className="text-center bg-blue-800 text-white uppercase py-2 px-24 rounded-md"
                >
                  Register
                </button>
              </div>
              <div>
                Already have an account?{" "}
                <Link to="/public/login">
                  <button className="text-blue-500 focus:text-red-500 text-sm">
                    LOGIN
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <div className="flex justify-center lg:py-14 py-10 lg:px-0 px-5 bg-white lg:mx-32">
        <div className="w-full">
          <div className="flex lg:gap-[30rem] justify-center w-full">
            <div>
              <Logo />
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-center lg:mx-[14.25rem]">
              <h1 className="capitalize py-5 text-sm text-blue-400 font-fira font-semibold">
                Register Account
              </h1>
              <p className="text-xs text-blue-400">
                Choose the best account for you and enjoy Online banking, Mobile
                banking, a debit card with total security protection - and much
                more. Apply today in minutes and get a bank account that works
                for you.
              </p>
            </div>
            <form className="lg:mx-[14.25rem] my-5" action="">
              <div className="grid grid-cols-2 gap-10 text-blue-400">
                <div className="flex flex-col ">
                  <label className="text-sm">First Name*</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    required
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    type="text"
                  />
                  {errors.firstNameError && (
                    <p className="text-red-500 text-xs">
                      {errors.firstNameError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">Last Name*</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    required
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    type="text"
                  />
                  {errors.lastNameError && (
                    <p className="text-red-500 text-xs">
                      {errors.lastNameError}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 pt-5 text-blue-400">
                <div className="flex flex-col ">
                  <label className="text-sm">Email Address*</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    type="email"
                  />
                  {errors.emailError && (
                    <p className="text-red-500 text-xs">{errors.emailError}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">State*</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    placeholder="State"
                    type="text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 pt-5 text-blue-400">
                <div className="flex flex-col ">
                  <label className="text-sm">Date of Birth*</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                  />
                  {errors.dateError && (
                    <p className="text-red-500 text-xs">{errors.dateError}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">Gender</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    placeholder="eg. Male or female"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    type="text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 py-5 text-blue-400">
                <div className="flex flex-col ">
                  <label className="text-sm">Marital Status</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">Dial Code*</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    placeholder="Dial Code"
                    name="dial"
                    value={dial}
                    onChange={(e) => setDial(e.target.value)}
                    type="text"
                  />
                  {errors.dialError && (
                    <p className="text-red-500 text-xs">{errors.dialError}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 pb-5 text-blue-400">
                <div className="flex flex-col ">
                  <label className="text-sm">Phone*</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">Professional Status</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    placeholder="e.g Employed, Unemployed.."
                    type="text"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-blue-400">Address*</label>
                <input
                  className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  type="text"
                />
                {errors.addressError && (
                  <p className="text-red-500 text-xs">{errors.addressError}</p>
                )}
              </div>

              <div className="flex flex-col pt-5">
                <label className="text-sm text-blue-400">Account</label>
                <select
                  className="outline-none border border-blue-400 py-1 px-5 text-sm rounded-md text-black"
                  name="account"
                  id="please choose an account"
                >
                  <option value="savings">Savings Account</option>
                  <option value="fixed">Fixed Account</option>
                  <option value="premium">Premium Account</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-10 py-5 text-blue-400">
                <div className="flex flex-col ">
                  <label className="text-sm">Nationality*</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">Currency</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    placeholder="State"
                    type="text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 pb-5 text-blue-400">
                <div className="flex flex-col ">
                  <label className="text-sm">Password*</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                  {errors.passwordError && (
                    <p className="text-red-500 text-xs">
                      {errors.passwordError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">Confirm Password*</label>
                  <input
                    className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                    placeholder="password confirmation"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPasswordError && (
                    <p className="text-red-500 text-xs">
                      {errors.confirmPasswordError}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={register}
                className="w-full text-center py-1 rounded-md bg-blue-500 text-white"
              >
                Create account
              </button>

              <div className="text-center text-blue-400 text-sm pt-1">
                <p>
                  Already have an account?{" "}
                  <span className="text-red-500">
                    <Link to="/public/login"> login</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
