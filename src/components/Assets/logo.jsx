import React from "react";
import { SiLit } from "react-icons/si";

const Logo = () => {
  return (
    <div>
      <div className="flex flex-row text-base ml-3 gap-1 lg:ml-0 itfalic font-bold text-blue-500 font-cond">
        <SiLit className="" size={30} />{" "}
        {/* <div className="leading-2">
          <p>Silver</p>
          <p>stone</p>
        </div> */}
        <span className="mt-2">Silverstone</span>
      </div>
    </div>
  );
};

export default Logo;
