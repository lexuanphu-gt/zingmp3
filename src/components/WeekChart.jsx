import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WeekChart = () => {
  const { weekChart } = useSelector((state) => state.app);

  return (
    <div className="px-[43px] w-full mt-12 flex items-center">
      {weekChart?.items?.map((item) => (
        <Link to={item?.link?.split('.')[0]} key={item?.link} className="flex-1 px-4">
          <img src={item.cover} className="w-full object-cover rounded-md"></img>
        </Link>
      ))}
    </div>
  );
};

export default memo(WeekChart);
