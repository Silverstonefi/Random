import React from "react";
import Nav from "../../components/Assets/homeNav";
import { BsFire } from "react-icons/bs";
import { Link } from "react-router-dom";
import index from "../../components/Bank site Img/services-1.jpg";
import index2 from "../../components/Bank site Img/services-2.jpg";
import index3 from "../../components/Bank site Img/services-3.jpg";
import Footer from "../../components/Assets/Footer";


const Services = () => {
  return (
    <>
      <Nav />
      <section className="lg:h-[47vh] pb-5 lg:pb-0 relative w-full bg-blue-600 lg:px-20 px-5">
        <div className="w-[100%] font-cond">
          <div className="">
            <div className="pt-20">
              <h1 className="lg:text-6xl text-4xl text-white tracking-wider">Services</h1>{" "}
              <div className="flex gap-2 pt-28 tracking-wider text-sm">
                <p>Home</p>
                <BsFire className="mt-1" />
                <p>Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white lg:p-20 py-20 px-5">
        <div className="text-center lg:px-56">
          <h1 className="text-4xl tracking-wider font-cond text-black">
            A Wide Range of Banking & Financial Services
          </h1>
          <p className="pt-10 pb-5 font-cond lg:px-10">
            We empower individuals, families and small businesses in underserved
            areas with the financial support, knowledge, products and services
            that contribute to financial self-sufficiency and drive sustainable
            economic growth.
          </p>
          <div className="flex justify-center">
            <Link to="/">
              <button className="flex text-xl gap-2 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 text-white px-10 rounded-full py-2 mr-5 transition-transform hover:scale-110 hover:shadow-lg shadow-md shadow-gray-500">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="lg:py-20 py-10 lg:px-20 px-5 bg-gray-100">
        <div className="w-[100%] font-cond tracking-wide text-black">
          <div className="lg:flex justify-center">
            <div className="lg:w-[50%]">
              <img className="lg:w-contain lg:mx-5 rounded-lg" src={index} alt="" />
            </div>
            <div className="lg:w-[50%] lg:px-10 mt-5">
              <h1 className="text-3xl ">Personal Solutions</h1>
              <p className="mb-5 mt-9">
                We are committed to helping you achieve your personal financial
                goals. When you bank with us, you get access to our full suite
                of services and the support of our expert financial advisors.
              </p>
              <p>
                We provides an unparalleled variety of account options that
                clients can select to enjoy a tailored trading experience that
                perfectly suits their needs
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:py-20 py-10 lg:px-20 px-5 bg-gray-100">
        <div className="w-[100%] font-cond tracking-wide text-black">
          <div className="lg:flex flex-row-reverse justify-center">
            <div className="lg:w-[50%]">
              <img className="w-contain lg:mx-5 rounded-lg" src={index2} alt="" />
            </div>
            <div className="lg:w-[50%] lg:px-10 mt-5">
              <h1 className="text-3xl ">Corporate and Institutional Banking</h1>
              <p className="mt-4 mb-3">
                We draw on a deep knowledge of our clients' businesses and our
                own in-depth industry research to develop sustainable strategies
                for corporate and institutional
              </p>
              <p>
                We have convenient, low cost, online money transfer that is made
                avaliable through our vast network in over 50 countries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:py-20 py-10 lg:px-20 px-5 bg-gray-100">
        <div className="w-[100%] font-cond tracking-wide text-black">
          <div className="lg:flex justify-center">
            <div className="lg:w-[50%]">
              <img className="w-contain lg:mx-5 rounded-lg" src={index3} alt="" />
            </div>
            <div className="lg:w-[50%] lg:px-10 mt-5">
              <h1 className="text-3xl ">Commercial Solutions</h1>
              <p className="mb-5 mt-9">
                Corporations come to us because we remain steadfast in helping
                them meet their business objectives. Our range of commercial
                banking services will ensure your company's financial assets are
                in good hands.
              </p>
              <p>
                We draw on a deep knowledge of our clients' businesses and our
                own in-depth industry research to develop sustainable strategies
                for corporate and institutional
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-700 py-10">
        <div className="flex justify-center gap-5 lg:gap-10">
          <h1 className="lg:text-2xl text-white mt-6">
            CHOOSE YOUR <span className="font-bold">BANK</span> NOW!
          </h1>
          <Link className="flex mt-4 lg:mt-5" to="/public/register">
            <button className="flex font-semibold lg:text-xl gap-2 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 text-white lg:px-10 px-5 lg:rounded-full rounded-md py-2 mr-5 transition-transform hover:scale-110 hover:shadow-lg">
              Register!
            </button>
          </Link>
        </div>
      </section>
      <div className="py-5 bg-white"></div>

      <Footer/>
    </>
  );
};

export default Services;
