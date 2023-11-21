import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions//Index";

const SongItem = ({
  thumbnail,
  title,
  artists,
  releaseDate,
  encodeId,
  order,
  percent,
  style,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(encodeId));
        dispatch(actions.play(true));
        //dispatch(actions.playAlbum(true));
      }}
      className={`w-full flex-auto flex p-[10px] gap-[10px] cursor-pointer justify-between items-center rounded-md ${
        style || "text-black hover:bg-main-200"
      }`}
    >
      <div className="flex items-center gap-4">
        {order && (
          <span
            className={`${
              order === 1
                ? "text-shadow-no1"
                : order === 2
                ? "text-shadow-no2"
                : "text-shadow-no3"
            } text-[32px] text-[rgba(77,34,104,0.9)]`}
          >
            {order}
          </span>
        )}
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-[60px] h-[60px] object-cover rounded-md"
        ></img>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{`${
            title?.length > 20 ? `${title.slice(0, 20)}...` : title
          }`}</span>
          <span className={`text-xs opacity-70`}>
            {`${artists?.length > 20 ? `${artists.slice(0, 20)}...` : artists}`}
          </span>
          {releaseDate && (
            <span className="text-xs opacity-70">
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span className="font-bold">{`${percent}%`}</span>}
    </div>
  );
};

export default memo(SongItem);
