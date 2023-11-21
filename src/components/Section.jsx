import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {SectionItem} from "./Index";

const Section = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-[48px] px-[59px] flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h3 className="text-[20px] font-bold">{data.title}</h3>
        <span className="text-[12px]">TÂT CẢ</span>
      </div>
      <div className="flex justify-between items-start gap-[28px] ">
        {data &&
          data?.items?.length &&
          data?.items
            ?.filter((item, index) => index <= 4)
            ?.map((item) => (
              <SectionItem
                key={item.encodeId}
                item={item}
                data={data}
              />
            ))}
      </div>
    </div>
  );
};

export default memo(Section);
