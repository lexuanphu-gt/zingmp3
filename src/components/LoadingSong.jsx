import React, { memo } from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingSong = () => {
  return (
    <div className=" border-black border-[3px] p-[6px] rounded-full">
      <RotatingLines
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        width="24"
        visible={true}
      />
    </div>
  );
};

export default memo(LoadingSong);
