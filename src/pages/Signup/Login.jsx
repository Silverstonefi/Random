import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  BsPhoneFill,
  BsFillCalendar2DateFill,
  BsFillHouseCheckFill,
} from "react-icons/bs";
import { IoPersonCircle } from "react-icons/io5";
import { Select } from "antd";
import { GrMail } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlinePassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails, setToken } from "../../Redux/action";
import { useDispatch } from "react-redux";
import Logo from "../../components/Assets/logo";

const Login = ({ label, ...rest }) => {
  const handle = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };
  const notify = (word) => {
    toast(word);
    setReload((reload) => !reload);
  };
  const [reload, setReload] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userc, setUserc] = useState(null);
  const [msg, setMsg] = useState({
    email: "",
    password: "",
    error: "",
    exists: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const loggin = (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // console.log(`em ${email}   ${password}`);

    if (!email) {
      setEmailError("Email address is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (isValid) {
      // Your login logic here...setMsg({});
      fetch("https://rest.silverstonefi.com/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log('res', res);
          if (res.msg) {
            setError("incorrect login credentials");
            notify("Incorrect login credentials");
            setPasswordError("incorrect password");
            setTimeout(() => {
              setError("");
            }, 2000);
            return;
          }

          if (res.error) {
            setError("incorrect login credentials");
            notify("Incorrect login credentials");
            setTimeout(() => {
              setError("");
            }, 2000);
            return;
          }

          const { token } = res;
          const { user } = res;

          if (token !== undefined) {
            if (user.role === "admin") {
              navigate("/admin/users", { replace: true });
              return;
            }
            dispatch(setToken(token));
            dispatch(setUserDetails(user));
            notify("Success");
            navigate("/user/dashboard", {
              replace: true,
              state: { login: true },
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex justify-center lg:py-32  pt-28 bg-white lg:mx-32 h-screen">
        <div className="w-full">
          <div className="lg:flex lg:gap-[30rem] justify-center w-full">
            <div>
              <Logo />
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-center lg:mx-[17.25rem] mx-5">
              <h1 className="capitalize py-5 text-sm text-blue-400 font-fira font-semibold">
                Log into your Account
              </h1>
              <p className="text-xs text-blue-400">
                Choose the best account for you and enjoy Online banking, Mobile
                banking, a debit card with total security protection - and much
                more. Apply today in minutes and get a bank account that works
                for you.
              </p>
            </div>
            <form className="lg:mx-[17.25rem] mx-5 my-5" action="">
              <ToastContainer />

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
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
              </div>
              <div className="flex flex-col py-5">
                <label className="text-sm">Password*</label>
                <input
                  className="outline-none border border-blue-500 rounded-md px-5 text-black py-1 text-sm focus:"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
              </div>

              <button
                onClick={loggin}
                className="w-full text-center py-1 rounded-md bg-blue-500 text-white"
              >
                Login account
              </button>

              <div className="text-center text-blue-400 text-sm pt-1">
                <p>
                  Don't have an account?{" "}
                  <span className="text-red-500">
                    <Link to="/public/register"> register</Link>
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

export default Login;
