import React, { memo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../ultis/Icons";

const { BsFillPlayFill, AiFillHeart, BsThreeDots, AiOutlineHeart } = Icons;

const SearchPlaylist = (item) => {
  const [hover, setHover] = useState(false);
  const imageRef = useRef();
  const navigate = useNavigate();

  const hanldeHover = () => {
    setHover(true);
    imageRef.current.classList?.remove("animate-scale-down-image");
    imageRef.current.classList?.add("animate-scale-up-image");
  };
  const hanldeLeave = () => {
    setHover(false);
    imageRef.current.classList?.remove("animate-scale-up-image");
    imageRef.current.classList?.add("animate-scale-down-image");
  };
  return (
    <div
      className="flex flex-col gap-2 flex-auto w-1/5 text-sm cursor-pointer"
      onClick={() =>
        navigate(item?.item?.link?.split(".")[0], {
          state: { playAlbum: false },
        })
      }
    >
      <div
        onMouseEnter={hanldeHover}
        onMouseLeave={hanldeLeave}
        className="w-full relative overflow-hidden rounded-lg"
      >
        {hover && (
          <div className="absolute top-0 left-0 right-0 bottom-0 z-40 bg-overlay-30 rounded-lg text-white flex  items-center justify-center gap-3">
            <span>
              <AiOutlineHeart size={25} />
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(item?.item?.link?.split(".")[0], {
                  state: { playAlbum: true },
                });
              }}
              className="p-1 border border-white rounded-full"
            >
              <BsFillPlayFill size={35} />
            </span>
            <span>
              <BsThreeDots size={25} />
            </span>
          </div>
        )}

        <img
          ref={imageRef}
          src={item?.item?.thumbnailM}
          alt="thumbnail"
          className="w-full h-auto object-cover rounded-lg shadow-md"
        ></img>
      </div>
      <span className="text-[14px] font-normal text-gray-600 ">
        <div className="flex flex-col gap-1">
          <span className="text-[14px] font-bold hover:text-main-500">{`${
            item?.item?.title?.length > 26
              ? `${item?.item?.title?.slice(0, 25)}...`
              : item?.item?.title
          }`}</span>
          <span>
            <span className="hover:text-main-500 hover:border-b hover:border-main-500">{item?.item?.artists[0]?.name}, </span>
            <span className="hover:text-main-500 hover:border-b hover:border-main-500">{item?.item?.artists[1]?.name}, </span>
            <span className="hover:text-main-500 hover:border-b hover:border-main-500">{item?.item?.artists[2]?.name}</span>
            <span>...</span>
          </span>
        </div>
      </span>
    </div>
  );
};

export default memo(SearchPlaylist);
