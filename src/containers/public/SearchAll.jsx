import React, { memo } from "react";
import { useSelector } from "react-redux";
import { handleNumber } from "../../ultis/CreateArr";
import { SearchPlaylist } from "../../components/Index";
import { SongItem, List } from "../../components/Index";
import Icons from "../../ultis/Icons";

const { AiOutlineUserAdd } = Icons;

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  console.log(searchData);
  //console.log(searchData?.songs[1]);
  return (
    <div className="px-[60px] w-full flex flex-col">
      <div className="flex flex-col">
        <h3 className="text-[20px] font-bold mb-5">Nổi Bật</h3>
        <div className="flex  gap-8 cursor-pointer">
          {searchData?.top && (
            <div className="flex flex-1 gap-4 rounded-md p-[10px] bg-main-200">
              <img
                src={searchData?.top?.thumbnail}
                className={`w-[84px] h-[84px] object-cover ${
                  searchData?.top?.objectType === "artist" && "rounded-full"
                }`}
              ></img>
              <div className="flex flex-col pt-3 ">
                <span className="text-[12px] text-gray-400">
                  {searchData?.top?.objectType === "artist"
                    ? "Nghệ sĩ"
                    : "Bài hát"}
                </span>
                <span className="text-[14px] font-semibold mt-1">
                  {searchData?.top?.name || searchData?.top?.title}
                </span>
                {searchData?.top?.objectType === "artist" ? (
                  <span className="text-[12px] text-gray-400">
                    {handleNumber(searchData?.artists[0]?.totalFollow) +
                      " quan tâm"}
                  </span>
                ) : (
                  <span className="text-[12px] text-gray-400">
                    {searchData?.top?.artistsNames}
                  </span>
                )}
              </div>
            </div>
          )}

          {searchData?.top?.objectType === "artist"
            ? searchData?.songs
                ?.filter((item, index) => index < 2)
                ?.map((item) => (
                  <div
                    key={item.encodeId}
                    className="flex-1 bg-main-200 flex rounded-md"
                  >
                    <SongItem
                      thumbnail={item?.thumbnail}
                      title={item?.title}
                      artists={item?.artistsNames}
                      encodeId={item?.encodeId}
                    />
                  </div>
                ))
            : searchData?.songs
                ?.filter((item, index) => index < 2)
                ?.map((item) => (
                  <div
                    key={item.encodeId}
                    className="flex-1 bg-main-200 flex rounded-md"
                  >
                    <SongItem
                      thumbnail={item?.thumbnail}
                      title={item?.title}
                      artists={item?.artistsNames}
                      encodeId={item?.encodeId}
                    />
                  </div>
                ))}
        </div>
      </div>
      {searchData?.top?.objectType === "artist" && (
        <div className="mt-[48px] flex flex-col w-full">
          <div className="flex justify-between items-center">
            {searchData?.top && (
              <div className="flex items-center gap-3 rounded-md p-[10px]">
                <img
                  src={searchData?.top?.thumbnail}
                  className={`w-[54px] h-[54px] object-cover rounded-md`}
                ></img>
                <div className="flex flex-col ">
                  <h3 className="text-gray-500">PLAYLIST NỔI BẬT</h3>
                  <span className="text-[19px] font-semibold mt-1">
                    {searchData?.top?.name || searchData?.top?.title}
                  </span>
                </div>
              </div>
            )}

            <span className="text-[12px]">TẤT CẢ</span>
          </div>
          <div className="flex justify-between items-start gap-[28px] mt-5 w-full">
            {searchData &&
              searchData?.playlists?.length &&
              searchData?.playlists
                ?.filter((item, index) => index < 4)
                ?.map((item) => (
                  <SearchPlaylist key={item.encodeId} item={item} />
                ))}
          </div>
        </div>
      )}

      <div className="flex flex-col w-full">
        <h3 className="font-semibold text-[20px] mt-[48px]">Bài Hát</h3>
        <div className="flex flex-wrap justify-between mt-5">
          {searchData?.songs
            ?.filter((item, index) => index < 6)
            ?.map((item) => (
              <div key={item.encodeId} className="flex-aoto w-[47%]">
                <List songData={item} isHideAlbum />
              </div>
            ))}
        </div>
      </div>
      <div className="mt-[48px] flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[20px]">Playlist/ALbum</h3>

          <span className="text-[12px]">TẤT CẢ</span>
        </div>
        <div className="flex justify-between items-start gap-[28px] mt-5 w-full">
          {searchData &&
            searchData?.playlists?.length &&
            searchData?.playlists
              ?.filter((item, index) => index <= 4)
              ?.map((item) => (
                <SearchPlaylist key={item.encodeId} item={item} />
              ))}
        </div>
      </div>
      <div className="mb-5">
        <h3 className="font-semibold text-[20px] mt-[48px]">Nghệ Sĩ/OA</h3>
        <div className=" flex gap-6 mt-6">
          {searchData &&
            searchData?.artists?.length &&
            searchData?.artists
              ?.filter((item, index) => index < 5)
              ?.map((item) => (
                <div className="flex flex-col items-center justify-center gap-4">
                  <img
                    src={item?.thumbnail}
                    className="w-[200px] h-[200px] object-cover rounded-full"
                  ></img>
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-[16px] font-semibold">
                      {item?.name}
                    </span>
                    <span className="text-[12px] text-center text-gray-600">
                      {handleNumber(item?.totalFollow) + " quan tâm"}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1 border rounded-l-full rounded-r-full px-5 py-1 mt-3  text-white bg-main-500"
                    >
                      <span><AiOutlineUserAdd/></span>
                      <span className="text-[15px]">QUAN TÂM</span>

                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default memo(SearchAll);
