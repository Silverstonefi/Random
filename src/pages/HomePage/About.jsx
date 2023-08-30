import React from "react";
import about from "../../components/Bank site Img/about-1.jpg";
import Nav from "../../components/Assets/homeNav";
import { BsFire } from "react-icons/bs";
import { Progress } from "antd";
import { Link } from "react-router-dom";
import Footer from "../../components/Assets/Footer";

const About = () => {
  return (
    <>
      <Nav />
      <section className="lg:h-[47vh] pb-5 relative w-full bg-blue-600 lg:px-20 px-5">
        <div className="w-[100%] font-cond">
          <div className="w-[50%]">
            <div className="pt-20 ">
              <h1 className="lg:text-6xl text-4xl text-white tracking-wider">About Us</h1>{" "}
              <div className="flex gap-2 pt-28 tracking-wider text-sm">
                <p>Home</p>
                <BsFire className="mt-1" />
                <p>About us</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute top-0 w-[50%] right-0">
            <div className="flex ml-36 pt-5">
              <img className="rounded-lg " src={about} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white font-cond py-20">
        <div className="lg:mx-20 px-5">
          {" "}
          <h1 className="text-4xl text-black">Overview</h1>
          <div className="">
            <div className="lg:px-5 lg:flex justify-between gap-10">
              <div className="lg:w-[50%]">
                <p className="mt-5">
                  Standard Trust was designed for those who demand banking
                  that's dramatically better than what they’ve experienced in
                  the past. Our innovative methods and products keep pace with
                  your life and your business. Our hyper-focused associates
                  respond with the resources you need.
                </p>
                <div className="py-5">
                  <h1 className="text-3xl text-black/80">Our Vision</h1>
                  <p>To be one of the top performing banks in the nation.</p>
                </div>
                <div>
                  <h1 className="text-3xl text-black/80">Our Mission</h1>
                  <p>
                    To deliver a better banking experience for every client. We
                    will design for our customers, respond to them and learn
                    from them. We will ignite our talented team to relentlessly
                    pursue the most innovative products and best services and
                    practices in all we do. We will utilize technology to
                    deliver timely and superior solutions for our customers. We
                    will be a bank our customers are proud of. We will be the
                    bank to get it right.
                  </p>
                </div>
              </div>

              <div className="lg:w-[50%] lg:ml-20 lg:mt-20 mt-5 text-black">
                <div>
                  <h3>Financial Consulting</h3>
                  <Progress percent={99} />
                </div>
                <div>
                  <h3>Online Reporting</h3>
                  <Progress percent={95} />
                </div>
                <div>
                  <h3>Online Banking</h3>
                  <Progress percent={99} />
                </div>
                <div>
                  <h3>24/7 Support</h3>
                  <Progress percent={100} />
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </section>

      <section className="lg:px-20 px-5 py-10 bg-white text-black font-cond lg:h-screen">
        <div className="lg:flex justify-center">
          <div className="lg:w-[60%] tracking-wider">
            <h1 className="lg:text-4xl text-3xl">Empowering Local Economies</h1>
            <p className="py-1">
              Silverstonefi, we empower individuals, families and small
              businesses in underserved areas with the financial support,
              knowledge, products and services that contribute to financial
              self-sufficiency and drive sustainable economic growth.
            </p>
            <span className="text-xl">We do this by:</span>
            <p className="pt-4">
              Providing loans and investments to local small businesses so they
              may contribute to economic revitalization Offering affordable
              housing lending options to help ensure the availability of safe,
              comfortable housing Joining forces with non-profits, community
              developers and others to promote neighborhood revitalization
              through loans, grants and direct investments Connecting our
              employees with community organizations to provide solutions and
              resources that meet the long-term needs of our communities
            </p>
            <div className="flex justify-between text-2xl">
              <div>
                <p>88710</p>
                <p>Clients</p>
              </div>
              <div>
                <p>1000</p>
                <p>Creditors</p>
              </div>
              <div>
                <p>12</p>
                <p>Awards</p>
              </div>
            </div>
          </div>
        </div>
        <div className="tracking-normal mt-2">
          <h1 className="text-2xl font-medium ">Want to Know More?</h1>
          <p className="py-2">
            Our Mission is To Provide the Best Customer Service to our Clients
            by maintaining a Superb Client Centric Culture. In this way we will
            achieve our Vision of maintaining our position as a Market Leader
            known for our Superior Customer Services
          </p>
          <Link className="flex mt-5" to="/public/register">
            <button className="flex font-semibold text-xl gap-2 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 text-white px-10 rounded-full py-2 mr-5 transition-transform hover:scale-110 hover:shadow-lg">
              Read More
            </button>
          </Link>
        </div>
      </section>

      <Footer/>
    </>
  );
};

export default About;
