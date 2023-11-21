import React, { memo } from "react";
import Icons from "../ultis/Icons";
import moment from "moment";
import * as actions from "../store/actions/Index";
import { useDispatch } from "react-redux";

const { PiMusicNotesSimpleThin } = Icons;

const List = (songData, isHideAlbum) => {
  
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.songData?.encodeId));
        dispatch(actions.play(true));
        //dispatch(actions.playAlbum(true));
      }}
      className="flex justify-between items-center p-[10px] cursor-pointer border-t border-[rgba(0,0,0,0.05)] hover:bg-main-200 w-full"
    >
      <div className=" flex items-center gap-3 ">
        {!isHideAlbum && (
          <span>
            <PiMusicNotesSimpleThin />
          </span>
        )}
        <img
          src={songData?.songData?.thumbnail}
          alt="thumbnailM"
          className="h-10 w-10 object-cover rounded-md"
        ></img>
        <span className="flex flex-col w-full">
          <span className="text-sm font-semibold text-opacity-20">
            {songData?.songData?.title.length > 30
              ? `${songData?.songData?.title?.slice(0, 30)}...`
              : songData?.songData?.title}
          </span>
          <span className="text-[12px] text-gray-600">{songData?.songData?.artistsNames}</span>
        </span>
      </div>
      {!isHideAlbum && (
        <div className="flex justify-center items-center ">
          {songData?.songData?.title}
        </div>
      )}

      <div className="w-[40px] flex justify-end text-[12px] text-gray-500 ">
        {moment.utc(songData?.songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
