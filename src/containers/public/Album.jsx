import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { Lists, AudioLoading } from "../../components/Index";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import Icons from "../../ultis/Icons";

const { BsFillPlayFill } = Icons;

const Album = () => {
  const { isPlaying } = useSelector((state) => state.music);
  const { title, pid } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [audio, setAudio] = useState(new Audio());

  const [playlistData, setPlaylistData] = useState({});

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const res = await apis.apiGetDetailPlaylist(pid);
      if (res?.data.err === 0) {
        setPlaylistData(res.data.data);
        dispatch(actions.setPlayList(res?.data?.data?.song?.items));
      }
    };
    fetchDetailPlaylist();
  }, [pid]);

  useEffect(() => {
    if (location?.state?.playAlbum) {
      const randomSong =
        Math.round(Math.random() * playlistData?.song?.items?.length) - 1;
      dispatch(
        actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId)
      );
      dispatch(actions.play(true));
    }
  }, [pid, playlistData]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  return (
    <div className="flex gap-8 w-full h-full px-[59px] pt-8">
      <div className="flex-none w-1/4 flex flex-col items-center gap-2">
        <div onClick={handleTogglePlayMusic} className="w-full relative overflow-hidden cursor-pointer">
          <img
            src={playlistData?.thumbnailM}
            alt="thumbnail"
            className={`w-full object-contain shadow-md ${
              isPlaying
                ? "rounded-full animate-rotate-center"
                : "rounded-md animate-rotate-center-pause"
            }`}
          ></img>
          <div
            className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 text-white flex justify-center items-center ${
              isPlaying && "rounded-full"
            }`}
          >
            <span className="p-3 border border-white rounded-full">
              {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={24} />}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-[20px] text-center font-bold text-gray-800">
            {playlistData?.title}
          </h3>
          <span className="flex gap-2 item-center text-gray-500 text-xs">
            <span>Cập nhật:</span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span className="flex gap-2 text-center item-center text-gray-500 text-xs">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-2 item-center text-gray-500 text-xs">
            {playlistData?.like >= 1000
              ? `${Math.round(playlistData?.like / 1000)}k người yêu thích`
              : `${playlistData?.like} người yêu thích`}
          </span>
        </div>
      </div>

      <div className="flex-auto ">
        <span className="text-sm">
          <span className="text-gray-600">Lời tựa </span>
          <span>{playlistData?.sortDescription}</span>
        </span>
        <div className="w-full">
          <Lists totalDuration={playlistData?.song?.totalDuration} />
        </div>
      </div>
    </div>
  );
};

export default Album;
