import React from "react";

const Footer = () => {
  return (
    <div>
      <div
        className="bg-white lg:py-10 py-5 text-center "
        style={{
          backgroundImage: "url(/map.png)",
        }}
      >
        <h1 className="border-t border-blue-300 pt-10 lg:mx-44">
          Copyright © 2023 All rights reserved. Privacy Policy 
        </h1>
        <p className="text-sm text-blue-400">support@silverstonefi.com</p>
      </div>
    </div>
  );
};

export default Footer;
