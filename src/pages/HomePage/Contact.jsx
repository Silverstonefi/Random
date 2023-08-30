import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      <div className="bg-gray-50 flex flex-col justify-center text-center lg:px-32 px-5 h-full">
        <div className="text-2xl italic font-bold text-blue-600 font-fira mt-10">
          logo
        </div>
        <div className="py-10">
          <h3 className="text-blue-500 font-fira font-semibold">
            Send Us A Message
          </h3>
          <p className="lg:mx-64 text-blue-500">
            Having issues? and need assistance?, Send us a message, and we will
            get in touch with you
          </p>
          <div className="mt-10">
            <form action="">
              <div className="text-black">
                <input
                  className="lg:w-[37.5rem] outline-none border border-blue-500 px-5 py-2 rounded-md focus:bg-blue-100"
                  type="text"
                  placeholder="Enter Full Name"
                />
              </div>
              <div>
                <input
                  className="lg:w-[37.5rem] outline-none border border-blue-500 px-5 py-2 rounded-md mt-5 focus:bg-blue-100"
                  type="text"
                  placeholder="Enter Email Address"
                />
              </div>

              <div className="flex flex-col text-black justify-center pt-5">
                <label className="text-sm font-fira text-blue-600 font-semibold pb-1 text-left mx-5 lg:mx-64">
                  Your Message
                </label>
                <div className="flex justify-center">
                  <textarea
                    className="lg:w-[37.5rem] outline-none border border-blue-500 focus:bg-blue-100"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-center">
                <Link to="/">
                  <button className="bg-blue-500 w-full mx-10 lg:mx-0 lg:w-[37.5rem] rounded-md mt-5 py-1 font-fira font-semibold text-white">
                    Send Message
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
