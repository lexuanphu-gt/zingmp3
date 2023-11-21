import React, { memo } from "react";
import List from "./List";
import Icons from "../ultis/Icons";
import moment from "moment";
import { useSelector } from "react-redux";

const { GoDotFill } = Icons;

const Lists = ({ totalDuration }) => {
  const { songs } = useSelector((state) => state.music);
  return (
    <div className="w-full flex flex-col text-xs text-gray-600">
      <div className="w-full flex justify-between items-center p-[10px] font-semibold ">
        <span>BÀI HÁT</span>
        <span>ALBUM</span>
        <span>THỜI GIAN</span>
      </div>
      <div className="flex flex-col w-full">
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
      <span className="flex items-center gap-2 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
        <span>{`${songs?.length} bài hát`}</span>
        <GoDotFill size={10} />
        <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
      </span>
    </div>
  );
};

export default memo(Lists);
