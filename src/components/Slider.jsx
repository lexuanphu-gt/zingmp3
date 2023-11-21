import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrSlider } from "../ultis/CreateArr";
import * as Actions from "../store/actions";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sliderElst = document.getElementsByClassName("slider-item");
    let min = 0;
    let max = 2;
    const intervalId = setInterval(() => {
      const Arr = ArrSlider(min, max, sliderElst.length - 1);

      for (let i = 0; i < sliderElst.length; i++) {
        sliderElst[i].classList.remove(
          "animate-slide-right",
          "order-last",
          "z-0",
          "animate-slide-left",
          "order-first",
          "z-10",
          "animate-slide-left2",
          "order-center",
          "z-10"
        );

        if (Arr.some((item) => item === i)) {
          sliderElst[i].style.cssText = "display:block";
        } else {
          sliderElst[i].style.cssText = "display:none";
        }
      }
      Arr.forEach((item) => {
        if (item === max) {
          sliderElst[item].classList.add(
            "animate-slide-right",
            "order-last",
            "z-0"
          );
        } else if (item === min) {
          sliderElst[item].classList.add(
            "animate-slide-left",
            "order-first",
            "z-10"
          );
        } else {
          sliderElst[item].classList.add(
            "animate-slide-left2",
            "order-center",
            "z-10"
          );
        }
      });
      min = min === sliderElst.length - 1 ? 0 : min + 1;

      if (max === sliderElst.length - 1) {
        max = 0;
      } else if (max >= 0) {
        max++;
      }
    }, 2500);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(Actions.setCurSongId(item?.encodeId));
      dispatch(Actions.play(true));
      dispatch(Actions.setPlayList(null));
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0]; //cat va lay phan tu dau tien
      navigate(albumPath);
    } else {
      dispatch(Actions.setPlayList(null));
    }
  };
  return (
    <div className="flex gap-8 w-full overflow-hidden px-[59px] pt-8 cursor-pointer">
      {banner?.map((item, index) => (
        <img
          src={item.banner}
          onClick={() => handleClickBanner(item)}
          className={`slider-item flex-1 object-contain w-[28%] rounded-lg ${
            index <= 2 ? "block" : "hidden"
          }`}
          key={item.encodeId}
        ></img>
      ))}
    </div>
  );
};

export default Slider;
