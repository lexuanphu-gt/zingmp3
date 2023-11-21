import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as apis from "../apis";
import Icons from "../ultis/Icons";
import * as actions from "../store/actions/Index";
import { useDispatch } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { LoadingSong } from "../components/Index";

var intervalId;
const {
  AiOutlineHeart,
  AiFillHeart,
  BsThreeDots,
  PiShuffleLight,
  BsPlayCircle,
  MdSkipPrevious,
  MdSkipNext,
  PiRepeatLight,
  PiRepeatOnceLight,
  BsPauseCircle,
  BsVolumeMute,
  BsVolumeDown,
  BsVolumeUp,
  BsMusicNoteList,
} = Icons;

const Player = ({set}) => {
  const audioEl = useRef(new Audio());
  const thumbRef = useRef();
  const truckRef = useRef();
  const dispatch = useDispatch();

  const { curSongId, isPlaying, atAlbum, songs } = useSelector(
    (state) => state.music
  );

  const [curSec, setCurSec] = useState(0);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [repeatMode, setRepeatMode] = useState(0);
  const [IsShuffle, setIsShuffle] = useState(false);
  const [isLoadedSource, setIsLoadedSource] = useState(false);
  const [Volume, setVolume] = useState(50);

  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoadedSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setIsLoadedSource(true);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }

      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
        console.log(res2.data.data["128"]);
      } else {
        setAudio(new Audio());
        dispatch(actions.play(false));
        audio.pause();
        toast.warn(res2.data.msg);
        setCurSec(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    audio.currentTime = 0;
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        console.log(audio.currentTime);
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSec(audio.currentTime);
      }, 200);
    }
  }, [audio]);

  // useEffect(() => {
  //   if (isPlaying) {
  //     intervalId = setInterval(() => {
  //       let percent =
  //         Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
  //       thumbRef.current.style.cssText = `right: ${100 - percent}%`;
  //       setCurSec(audio.currentTime);
  //     }, 200);
  //   } else {
  //   intervalId && clearInterval(intervalId);           // sai do check isPlaying va sai do if else

  //   }
  // }, [isPlaying]);

  useEffect(() => {
    const handleEnded = () => {
      if (IsShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : hanldeNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, IsShuffle, repeatMode]);

  useEffect(() => {
    audio.volume = Volume / 100;
  }, [Volume]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };
  const handleClickProgressBar = (e) => {
    const trackRect = truckRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurSec(audio.currentTime);
    dispatch(actions.play(true));
    audio.play();
  };

  const hanldeNextSong = () => {
    if (songs) {
      let curSongIndex;
      songs.forEach((item, index) => {
        if (item?.encodeId === curSongId) {
          curSongIndex = index;
        }
      });
      dispatch(actions.setCurSongId(songs[curSongIndex + 1]?.encodeId));
      dispatch(actions.play(true));
    }
  };

  const hanldePreSong = () => {
    if (songs) {
      let curSongIndex;
      songs.forEach((item, index) => {
        if (item?.encodeId === curSongId) {
          curSongIndex = index;
        }
      });
      dispatch(actions.setCurSongId(songs[curSongIndex - 1]?.encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleRepeatOne = () => {
    dispatch(actions.setCurSongId(curSongId));
    dispatch(actions.play(true));
    audio.play();
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * songs.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex]?.encodeId));
    dispatch(actions.play(true));
  };


  return (
    <div className="bg-main-400 px-5 h-full flex py-2 w-full">
      <div className="w-[30%] flex-auto flex items-center gap-3">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        ></img>
        <div className="flex flex-col ">
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-2">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] gap-4 flex-auto flex flex-col items-center justify-center">
        <div className="flex gap-8 justify-center items-center">
          <span
            onClick={() => setIsShuffle(!IsShuffle)}
            title="Bật phát ngẫu nhiên"
            className={`cursor-pointer ${
              !IsShuffle ? "text-black" : "text-purple-600"
            }`}
          >
            <PiShuffleLight size={24} />
          </span>
          <span
            onClick={hanldePreSong}
            className={`${songs ? "cursor-pointer" : "text-gray-500"}`}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="hover:text-main-500 cursor-pointer"
            onClick={handleTogglePlayMusic}
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseCircle size={40} />
            ) : (
              <BsPlayCircle size={40} />
            )}
          </span>
          <span
            onClick={hanldeNextSong}
            className={`${songs ? "cursor-pointer" : "text-gray-500"}`}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            title="Bật phát lại tất cả"
            className={`cursor-pointe ${repeatMode && "text-purple-600"}`}
            onClick={() => setRepeatMode((prev) => (prev == 2 ? 0 : prev + 1))}
          >
            {repeatMode === 1 ? (
              <PiRepeatOnceLight size={24} />
            ) : (
              <PiRepeatLight size={24} />
            )}
          </span>
        </div>
        <div className="w-full flex justify-center items-center gap-3 text-xs">
          <span>{moment.utc(curSec * 1000).format("mm:ss")}</span>
          <div
            onClick={handleClickProgressBar}
            ref={truckRef}
            className="w-3/4  h-[3px] hover:h-[8px] cursor-pointer rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]"
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 bottom-0  rounded-r-full rounded-l-full bg-[#0e8080]"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="w-[30%] flex-auto flex items-center justify-end gap-4">
        <div className="flex gap-2 items-center">
          <span onClick={() => setVolume(prev => +prev === 0 ? 50 : 0)}>
            {+Volume >= 50 ? (
              <BsVolumeUp size={24} />
            ) : +Volume === 0 ? (
              <BsVolumeMute size={24} />
            ) : (
              <BsVolumeDown size={24} />
            )}
          </span>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={Volume}
            onChange={(e)=>setVolume(e.target.value)}
          ></input>
        </div>
        <span
          onClick={()=> set(prev => !prev)}
          className="p-2 rounded-sm cursor-pointer  hover:bg-gray-200"
        ><BsMusicNoteList /></span>
      </div>
    </div>
  );
};

export default Player;
