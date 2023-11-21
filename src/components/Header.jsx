import React from "react";
import Icons from "../ultis/Icons";
import Search from "./Search";

const { BsArrowLeft, BsArrowRight } = Icons;

const Header = () => {
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex gap-6 w-full items-center">
        <div className="flex gap-6 text-gray-400">
          <span>
            <BsArrowLeft size={24} />
          </span>
          <span>
            <BsArrowRight size={24} />
          </span>
        </div>
        <div className="w-2/3">
          <Search />
        </div>
      </div>
      <div>login</div>
    </div>
  );
};

export default Header;
