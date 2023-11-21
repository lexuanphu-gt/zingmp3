import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SongItem } from "./Index";

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [isActived, setIsActived] = useState(2);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    isActived
      ? setSongs(newRelease?.items?.others)
      : setSongs(newRelease?.items?.vPop);
    if (isActived === 2) setSongs(newRelease?.items?.all);
  }, [isActived, newRelease]);
  return (
    <div className="mt-[48px] px-[59px] flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h3 className="text-[20px] font-bold">{newRelease.title}</h3>
        <span className="text-[12px]">TÂT CẢ</span>
      </div>
      <div className=" flex items-center gap-5 text-[12px]">
        <button
          type="button"
          onClick={() => setIsActived(2)}
          className={`py-1 px-4 rounded-r-full rounded-l-full border border-gray-400 bg-transparent ${
            isActived === 2 && "bg-purple-500 text-white"
          }`}
        >
          TẤT CẢ
        </button>
        <button
          type="button"
          onClick={() => setIsActived(0)}
          className={`py-1 px-4 rounded-r-full rounded-l-full border border-gray-400 bg-transparent ${
            isActived === 0 && "bg-purple-500 text-white"
          }`}
        >
          VIỆT NAM
        </button>
        <button
          type="button"
          onClick={() => setIsActived(1)}
          className={`py-1 px-4 rounded-r-full rounded-l-full border border-gray-400 bg-transparent ${
            isActived === 1 && "bg-purple-500 text-white"
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        {songs
          ?.filter((item, index) => index < 12)
          ?.map((item) => (
            <div className="w-[45%] min-[1024px]:w-[30%]">
              <SongItem
                key={item.encodeId}
                thumbnail={item.thumbnail}
                title={item.title}
                artists={item.artistsNames}
                releaseDate={item.releaseDate}
                encodeId={item.encodeId}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(NewRelease);
