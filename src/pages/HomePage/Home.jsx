import React, { useState, useEffect } from "react";
import "./home.css";
import { Carousel } from "antd";
import { Progress } from "antd";
import { Rate } from "antd";
import Bar from "./Progress";
import index from "../../components/Bank site Img/index-1-2.jpg";
import blurb from "../../components/Bank site Img/blurb.png";
import circle from "../../components/Bank site Img/circle.png";
import Nav from "../../components/Assets/homeNav";
import hero from "../../components/Bank site Img/1.png";
import { Link, useNavigate } from "react-router-dom";
import { FaWallet, FaReceipt } from "react-icons/fa";
import { MdLocationPin, MdSettingsSuggest } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import {
  BsFillCreditCardFill,
  BsGlobe,
  BsJournalBookmarkFill,
  BsCheckLg,
} from "react-icons/bs";
import { Button, Modal } from "antd";
import { RiLuggageDepositFill, RiPhoneLockLine } from "react-icons/ri";
import Footer from "../../components/Assets/Footer";

const images = [
  {
    src: "./main-banner.jpg",
    text: "Welcome",
    content:
      "Easiest Way to Manage Money. From your everyday spending to investments!",
  },
  // {
  //   src: "./main-banner.jpg",
  //   text: "Digitalize Your Finance",
  //   content: "Where You Know Your Banker and Your Banker Knows You",
  // },
  // {
  //   src: "./main-banner.jpg",
  //   text: "Banking Website",
  //   content: "The Fastest Way to Send Money Worldwide",
  // },
];

const tests = [
  {
    src: "./index-1-3.jpg",
    content:
      "'I choose Standard Trust because I know they share my values of putting community first. Not onlydo they make banking easy, I see them out volunteering and investing in our community.'",
    name: "Marie Hanson",
    title: "Charity Organization Manager",
  },
  {
    src: "./index-1-4.jpg",
    content:
      "When I needed financial assistance to expand my shop, I went directly to Standard Trust. Securing financing helped us renovate and expand my jewelry shop and attract more clients.",
    name: "Moris Norman",
    title: "Jewelry Shop Owner",
  },
  {
    src: "./index-1-5.jpg",
    content:
      "There are many variations of shipping agencies... Fly Courier Logistic Services is the best I have ever worked with.",
    name: "Johanna Smith",
    title: "Smith's Bakery Shop Owner",
  },
];

const Home = () => {
  let navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    navigate("/public/login", {
      replace: true,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const targetPercent = 75;

  const [dotPosition, setDotPosition] = useState("right");
  const [Position, setPosition] = useState("bottom");

  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  return (
    <div>
      <Nav />
      <div className="hidden lg:block">
        
          {images.map((image, index) => (
            <section key={index} className="hidden lg:flex w-full">
              <div>
                <img
                  className="lg:w-contain lg:relative "
                  src={image.src}
                  alt="ttt"
                />
              </div>

              <div className="absolute w-[100%] flex">
                <div className="lg:block hidden w-[50%] z-10 pl-10 text-center pt-44">
                  <h1 className="text-4xl text-blue-700 font-semibold pb-1">
                    {image.text}{" "}
                  </h1>
                  <p className="italic text-white">{image.content}</p>

                  <div className="hidden lg:block pt-10 font-fira">
                    <Link to="/">
                      <button className="bg-blue-800 z-10 text-white px-5 rounded-md py-2 mr-5 shadow-white/20 shadow-lg">
                        Get started
                      </button>
                    </Link>
                    <Link to="/">
                      <button className="bg-white text-black px-5 rounded-md py-2 font-medium shadow-blue-300 shadow-lg">
                        Learn more
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block pr-10 pl-10 z-[1] relative w-[50%]">
                  <img className="w-[75%] pt-16 ml-16 " src={hero} alt="hero" />
                  <div className="w-[85%] flex justify-center">
                    <img
                      className="w-[50%] mt-16 absolute top-0 -z-[1] animate-spin-slow"
                      src={circle}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}
      
      </div>

      <section
        id="nav_and_hero"
        className="md:hidden flex md:h-[90vh] h-[55vh] bg-slate-800 relative md:px-24 px-5 md:justify-center overflow-x-hidden overflow-y-hidden bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url(/main-banner.jpg)",
          backgroundPosition: "center center",
        }}
      >
        <div className="lg:mx-56 md:pt-0 mx-5">
          <div class="md:text-4xl text-2xl font-mono justify-center lg:mx-5 text-center lg:pt-5 lg:mt-32">
            <h1 className="text-white md:pt-0 pt-10 ">
              Easiest Way to Manage Money.
            </h1>
            <span className="text-white">
              From your everyday spending to investments!{" "}
            </span>
          </div>
          <div className="text-center text-lg md:text-base md:mt-10">
            <p className="py-3 md:py-0">
              Trusted by 53M Wallets - with Over $620 Billion in Transactions -
              Since 2013
            </p>
          </div>
          <div className="flex justify-center md:mt-10 font-fira">
            <Link to="/public/register">
              <button className="bg-blue-800 z-10 text-white px-5 rounded-md py-2 mr-5 shadow-white/20 shadow-lg">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="lg:absolute lg:-bottom-40 lg:z-[1000] static">
        <div className="lg:flex">
          <div className="lg:w-1/4 bg-blue-500 px-5 py-5 text-gray-100">
            <div>
              <FaWallet className="" size={40} />
            </div>
            <div>
              <h6 className="py-1">
                More than <span class="font-bold">23 754</span> Issued Cards
              </h6>
              <p className="text-white/50">
                Our bank is an acknowledged leader in credit card distribution.
                We issue more than 5000 cards every year.
              </p>
            </div>
          </div>

          <div className="lg:w-1/4 bg-blue-600 px-5 py-5 text-gray-100">
            <div>
              <BsFillCreditCardFill className="" size={40} />
            </div>
            <div>
              <h6 className="py-1">
                Up to <span class="font-bold">30% </span>Cashback
              </h6>
              <p className="text-white/50">
                We offer an amazing amount of cashback for payments made with
                one of our credit cards - Blue, Green, or Orange.
              </p>
            </div>
          </div>

          <Modal
            open={isModalOpen}
            title="Order Card"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              // <Button key="back" onClick={handleCancel}>
              //   Return
              // </Button>,
              <div className="flex justify-center">
                <Button
                  className="bg-blue-500 text-white flex justify-center px-10 rounded-none mt-5"
                  key="submit"
                  // loading={loading}
                  // onClose={handleCancel}
                  onClick={handleOk}
                >
                  Go to Login
                </Button>
                ,
              </div>,
            ]}
          >
            <div className="flex justify-center">
              <div className="text-center pt-5 w-1/2">
                <p className="text-xl font-semibold">You need to login to order a card</p>
                <button className="">
                </button>
              </div>
            </div>
          </Modal>

          <div className="lg:w-1/4 bg-blue-700 px-5 py-5 text-gray-100">
            <div>
              <RiLuggageDepositFill className="" size={40} />
            </div>
            <div>
              <h6 className="py-1">
                Up to <span class="font-bold">25%</span> Deposits
              </h6>
              <p className="text-white/50">
                Our bank is an acknowledged leader in credit card distribution.
                We issue more than 5000 cards every year.
              </p>
            </div>
          </div>

          <div className="lg:w-1/4 bg-blue-800 px-5 py-5 text-gray-100">
            <div>
              <p className="text-white/50">The Best Choice 2018</p>
            </div>
            <div>
              <h6 className="py-2 text-xl">
                Reliable and Secure Credit Cards and Deposits for You
              </h6>
              <div className="flex justify-center pt-2">
                <button
                  onClick={showModal}
                  className="flex text-xl gap-2 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 text-white px-10 rounded-full py-2 mr-5 transition-transform hover:scale-110 hover:shadow-lg"
                >
                  <BsFillCreditCardFill className="mt-1" /> Order a Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white lg:mt-14 py-20 lg:px-20 px-5">
        <div className="text-center text-black/80">
          <h1 className="lg:text-4xl text-2xl">The Best Banking Choice</h1>
          <p className="lg:px-44 py-5 text-sm">
            Since our foundation, we have been #1 banking institution for lots
            of individual and corporate customers, both in the USA and
            internationally. We provide our clients with a number of benefits.
          </p>
        </div>

        <div className="lg:px-16 lg:pt-10 font-cond tracking-wider">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 text-center">
            <div className="">
              <div className="flex justify-center">
                <div className="relative w-fit">
                  <img src={blurb} alt="" className="" />
                  <div className="absolute -top-8 left-0 right-0 bottom-0 flex items-center justify-center">
                    <MdLocationPin
                      size={60}
                      className="text-[#1e90ff] z-10 text-4xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-black font-semibold py-1">
                  Various Locations
                </h3>
                <p className="text-sm">
                  We have offices in many countries including the USA and the
                  UK.
                </p>
              </div>
            </div>

            <div className="">
              <div className="flex justify-center">
                <div className="relative w-fit">
                  <img src={blurb} alt="" className="" />
                  <div className="absolute -top-8 left-0 right-0 bottom-0 flex items-center justify-center">
                    <RiPhoneLockLine
                      size={60}
                      className="text-[#1e90ff] z-10 text-4xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-black font-semibold py-1">
                  Mobile Banking Apps
                </h3>
                <p className="text-sm">
                  Get instant access to your account on any device using our
                  banking apps.
                </p>
              </div>
            </div>

            <div className="">
              <div className="flex justify-center">
                <div className="relative w-fit">
                  <img src={blurb} alt="" className="" />
                  <div className="absolute -top-5 left-0 right-0 bottom-0 flex items-center justify-center">
                    <IoIosPeople size={60} className="text-[#1e90ff] z-10" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-black font-semibold py-1">
                  Family & Friends Programs
                </h3>
                <p className="text-sm">
                  Our Bank has special programs with benefits for family
                  members.
                </p>
              </div>
            </div>

            <div className="">
              <div className="flex justify-center">
                <div className="relative w-fit">
                  <img src={blurb} alt="" className="" />
                  <div className="absolute -top-8 left-0 right-0 bottom-0 flex items-center justify-center">
                    <TfiHeadphoneAlt
                      size={60}
                      className="text-[#1e90ff] z-10 text-4xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-black font-semibold py-1">24/7 Support</h3>
                <p className="text-sm">
                  Our Support team is always ready to help you solve any banking
                  issues.
                </p>
              </div>
            </div>

            <div className="">
              <div className="flex justify-center">
                <div className="relative w-fit">
                  <img src={blurb} alt="" className="" />
                  <div className="absolute -top-8 left-0 right-0 bottom-0 flex items-center justify-center">
                    <FaReceipt
                      size={60}
                      className="text-[#1e90ff] z-10 text-4xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-black font-semibold py-1">
                  Personal Profile
                </h3>
                <p className="text-sm">
                  Register your free personal profile online to begin using our
                  services.
                </p>
              </div>
            </div>

            <div className="">
              <div className="flex justify-center">
                <div className="relative w-fit">
                  <img src={blurb} alt="" className="" />
                  <div className="absolute -top-8 left-0 right-0 bottom-0 flex items-center justify-center">
                    <MdSettingsSuggest
                      size={60}
                      className="text-[#1e90ff] z-10 text-4xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-black py-1 font-semibold">Settings</h3>
                <p className="text-sm">
                  Registered clients can edit the banking account settings in 2
                  clicks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 font-fira">
        <div className="text-center text-black/80">
          <h1 className="lg:text-4xl text-2xl">A Few Words About Our Bank</h1>
          <p className="lg:px-56 text-sm lg:py-5">
            Banking Site was founded in 2014 to introduce the new level of
            financial services worldwide. We are still dedicated to the success
            of our clients, both individual and corporate.
          </p>
        </div>

        <div className="w-[100%] lg:px-20 px-5">
          <div className="lg:flex justify-center">
            <div className="lg:w-[50%]">
              <img
                className="lg:w-contain lg:mx-5 w-full rounded-lg"
                src={index}
                alt=""
              />
            </div>
            <div className="lg:w-[50%] lg:px-10 lg:pt-0 pt-5">
              <p className="text-sm">
                At Standard Trust, we are guided by a common purpose to help
                make financial lives better by connecting clients and
                communities to the resource they need to be successful. We are
                driving growth – helping to create jobs, develop communities,
                foster economic mobility and address society’s biggest
                challenges – while managing risk and providing a return to our
                clients and our shareholders.
              </p>
              <div className="text-sm mt-5 text-black">
                <span>Financial Consulting</span>
                <Bar targetPercent={targetPercent} />
                <div className="mt-5">
                  <span className="mt-10">Online Reporting</span>
                  <Progress percent={50} />
                </div>
                <Link
                  className="flex lg:justify-end justify-center mt-5"
                  to="/public/about"
                >
                  <button className="flex font-mono text-xl gap-2 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 text-white px-10 rounded-full py-2 mr-5 transition-transform hover:scale-110 hover:shadow-lg">
                    More Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-10 border-t border-gray-200">
        <div className="text-center text-black">
          <h1 className="text-4xl font-semibold font-fira">Testimonials</h1>
        </div>

        <div className="flex-1">
          <div className="">
            <Carousel
              autoplay
              className="py-14"
              effect="fade"
              dotPosition={Position}
            >
              {tests.map((test, index) => (
                <div className="flex" key={index}>
                  <div className="lg:flex lg:justify-center lg:gap-20 lg:mx-32">
                    <div className="bg-white font-cabin lg:w-[60%] w-full lg:py-5 py-5 lg:pt-9 lg:px-7 mx-5">
                      <div className="flex justify-between">
                        <Rate allowHalf disabled defaultValue={4.5} />
                        <p className="text-sm italic">2 days ago</p>
                      </div>
                      <p className="text-sm font-cabin text-gray-500 py-3 px-5 italic">
                        {test.content}
                      </p>
                      <div className="flex gap-10">
                        <div className="w-20">
                          <img
                            className="rounded-full"
                            src={test.src}
                            alt="ttt"
                          />
                        </div>

                        <div>
                          <p className="lg:pt-5 pt-3 text-xl text-[#24416b] font-semibold">
                            {test.name}
                          </p>
                          <p>{test.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white px-20">
        <div className="text-center">
          <h1 className="text-3xl text-black font-cond">
            HOW TO ORDER A NEW CARD
          </h1>
        </div>

        <div className="lg:flex gap-16 mt-10">
          <div className="">
            <div className="flex justify-center">
              <div className="bg-blue-500 rounded-full w-fit p-7">
                <BsGlobe className="text-white" size={60} />
              </div>
            </div>
            <div className="text-center font-cond">
              <h3 className="text-xl py-5 text-black">Online Registration</h3>
              <p className="text-sm">
                Everything starts with free online registration. Only basic data
                is needed - name, surname, age etc.
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex justify-center">
              <div className="bg-blue-500 rounded-full w-fit p-7">
                <BsJournalBookmarkFill className="text-white" size={60} />
              </div>
            </div>
            <div className="text-center font-cond">
              <h3 className="text-xl py-5 text-black">Filling Out a Form</h3>
              <p className="text-sm">
                After the basic registration, you will need to fill out a form
                to help us determine your financial goals.
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex justify-center">
              <div className="bg-blue-500 rounded-full w-fit p-7">
                <BsCheckLg className="text-white" size={60} />
              </div>
            </div>
            <div className="text-center font-cond">
              <h3 className="text-xl py-5 text-black">Signing an Agreement</h3>
              <p className="text-sm">
                This stage concludes the procedure of opening an account at
                Standard Trust to start using your card.
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex justify-center">
              <div className="bg-blue-500 rounded-full w-fit p-7">
                <BsFillCreditCardFill className="text-white" size={60} />
              </div>
            </div>
            <div className="text-center font-cond">
              <h3 className="text-xl py-5 text-black">Using Your Card</h3>
              <p className="text-sm">
                You can use your card to purchase the products you need or to
                open a secure deposit with lots of benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-700 py-10 lg:px-0 px-3">
        <div className="lg:flex flex-col justify-center lg:gap-10">
          <h1 className="lg:text-2xl text-white mt-6 text-center">
            CHOOSE YOUR <span className="font-bold">BANK CARD</span> NOW!
          </h1>
          <Link className="flex justify-center mt-5" to="/public/login">
            <button className="flex font-mono lg:text-xl text-sm gap-2 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 text-white lg:px-10 px-5 lg:rounded-full rounded-md py-2 mr-5 transition-transform hover:scale-110 hover:shadow-lg">
              Order Card
            </button>
          </Link>
        </div>
      </section>

      <section className="font-cond py-20 bg-white px-5 lg:px-20">
        <div>
          <h1 className="text-black text-4xl text-center tracking-wider">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="lg:flex w-full justify-center mt-10">
          <div className="lg:border-x border-l lg:w-[75%] px-2 lg:px-10 border-gray-500">
            <div className="">
              <h1 className="text-xl text-black tracking-wider">
                What is the currency amount for the Blue Card?
              </h1>
              <p className="text-sm py-5">
                The minimum amount that can be loaded on the card is $100 or
                equivalent amount in other currency. The maximum amount would be
                as per Standard Trust guidelines applicable from time to time.
                You can learn more about it by contacting our consultants using
                the form on our website or by calling us directly.
              </p>
            </div>
            <div>
              <h1 className="text-xl text-black tracking-wider">
                What steps do I take if my card gets lost?
              </h1>
              <p className="text-sm py-5">
                If you lose your card please immediately contact our customer
                support center so that we could issue a new one as fast as
                possible.
              </p>
            </div>
          </div>
          <div className="lg:border-none border-l border-gray-500 lg:w-[75%] px-2 mt-5 lg:mt-0 lg:px-10">
            <div>
              <h1 className="text-xl text-black tracking-wider">
                Do I have to maintain any minimum balance?
              </h1>
              <p className="text-sm py-5">
                It depends on the card you choose. For example, if you pick an
                Orange Card, you get a special waiver on the minimum balance
                requirement.
              </p>
            </div>
            <div>
              <h1 className="text-xl text-black tracking-wider">
                What security features does the mobile banking have?
              </h1>
              <p className="text-sm py-5">
                Mobile browser-based banking is very similar to PC based
                internet banking. The respective mobile handset browser replaces
                a PC browser to access the banking services. Some of the
                important security measures in place are 128 bit SSL from
                VeriSign, https:// based access etc.
              </p>
            </div>
          </div>
          <div className="lg:border-x border-l lg:w-[75%] lg:px-10 px-2 mt-5 lg:mt-0 border-gray-500">
            <div>
              <h1 className="text-xl text-black tracking-wider">
                What kind of browser do I need for online banking?
              </h1>
              <p className="text-sm py-5">
                Our Banking System supports all browsers. Some of the most
                popular ones are Chrome, Opera, Firefox, and Safari. If you are
                using Internet Explorer make sure the version of your browser is
                9.0 or higher.
              </p>
            </div>
            <div>
              <h1 className="text-xl text-black tracking-wider">
                Can I make online payments to foreign recipients?
              </h1>
              <p className="text-sm py-5">
                Yes, you can! Our bank does not limit any payments to a certain
                country so whether you are using our online banking system or an
                app for your device, you can safely transfer any amount of money
                or purchase services and products.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
