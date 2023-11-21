import React from "react";
import { sidebarMenu } from "../ultis/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import path from "../ultis/Path";

const notActiveStyle =
  "py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex gap-3 items-center";
const activeStyle =
  "py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-3 items-center";

const SidebarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-main-200">
      <div
        onClick={() => navigate(path.HOME)}
        className="cursor-pointer w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center"
      >
        <img
          src="data:image/webp;base64,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"
          alt="logo"
          className="w-[120px] h-[40px] object-cover bg-[#CED9D9]"
        ></img>
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item.icon}
            <span>{item.text}</span>
          </NavLink>
        ))}
        ;
      </div>
    </div>
  );
};

export default SidebarLeft;
