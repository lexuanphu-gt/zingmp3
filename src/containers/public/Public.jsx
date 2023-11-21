import React, { useState } from "react";
import {
  SidebarLeft,
  SidebarRight,
  Player,
  Header,
} from "../../components/Index";
import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";

const Public = () => {
  const [isShowSidebarRight, setIsShowSidebarRight] = useState(true);
  return (
    <div className="w-full flex flex-col bg-main-300 h-screen">
      <div className="flex w-full h-full flex-auto ">
        <div className="w-[240px] h-full flex-none">
          <SidebarLeft />
        </div>

        <div className="flex-auto flex flex-col">
          <div className="h-[70px] px-[59px] flex flex-none items-center">
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars autoHide style={{ width: "100%", heigth: "100%" }}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>

        {isShowSidebarRight && (
          <div className="border w-[329px] hidden 1600:flex flex-none animate-slide-left">
            <SidebarRight />
          </div>
        )}
      </div>
      <div className="flex flex-none h-[90px]">
        <Player set={setIsShowSidebarRight} />
      </div>
    </div>
  );
};

export default Public;
