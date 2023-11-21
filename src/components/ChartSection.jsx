import React, { memo, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import { useState } from "react";
import { SongItem } from "./Index";
import { Link } from "react-router-dom";
import path from "../ultis/Path";
import Icons from "../ultis/Icons";


const {BsFillPlayFill}=Icons;

const ChartSection = () => {
  const [data, setData] = useState(null);
  const { chart, rank } = useSelector((state) => state.app);
  const chartRef = useRef();
  const [selected, setSelected] = useState(null);
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.1", drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef.current || !chartRef) return;
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0) {
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
            }
            return;
          }
          const counter = [];
          for (let i = 0; i < 3; i++) {
            counter.push({
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item) => +item.hour % 2 === 1)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chart?.items)[i],
            });
          }
          const rs = counter.find((i) =>
            i.data.some(
              (n) => n === +tooltip.body[0]?.lines[0]?.replace(",", "")
            )
          );
          console.log(rs);
          setSelected(rs.encodeId);
          const newTooltipData = {
            opacity: 1,
            top: tooltip.caretY,
            left: tooltip.caretX,
          };
          if (
            tooltipState.top !== newTooltipData.top ||
            tooltipState.left !== newTooltipData.left
          ) {
            setTooltipState(newTooltipData);
          }
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 === 1)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 === 1)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: "white",
          pointHoverRadius: 4,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverBorderWidth: 4,
        });
      }
    }
    setData({ labels, datasets });
  }, [chart]);

  return (
    <div className="px-[59px] mt-12 max-h-[430px]">
      <div className="bg-[rgba(77,34,104,0.9)] w-full rounded-md">
        <div className="p-5 flex flex-col gap-5">
          <Link to={path.ZING_CHART} className="flex gap-3 items-center ">
            <h3 className="text-[28px] text-white font-bold hover:text-green-800">#zingchart</h3>
            <span className="rounded-full p-1 bg-white hover:bg-gray-300"><BsFillPlayFill size={15}/></span>
          </Link>
          <div className="flex gap-4 h-full">
            <div className="w-[30%] 1200:w-[40%] flex flex-col gap-4">
              {rank
                ?.filter((i, index) => index < 3)
                ?.map((item, index) => (
                  <SongItem
                    key={item.encodeId}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    artists={item.artistsNames}
                    encodeId={item.encodeId}
                    order={index + 1}
                    percent={Math.round(
                      (+item.score * 100) / +chart?.totalScore
                    )}
                    style="text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945EA7]"
                  />
                ))}
                <Link to={path.ZING_CHART} className="text-white hover:bg-[hsla(0,0%,100%,.07)] w-fit border border-white px-5 py-1 m-auto rounded-r-full rounded-l-full">Xem thêm</Link>
            </div>
            <div className="w-[70%] 1200:w-[60%] relative">
              {data && <Line data={data} ref={chartRef} options={options} />}
              <div
                className="tooltip"
                style={{
                  top: tooltipState.top,
                  left: tooltipState.left,
                  opacity: tooltipState.opacity,
                  position: "absolute",
                }}
              >
                <SongItem
                  thumbnail={
                    rank?.find((i) => i.encodeId === selected)?.thumbnail
                  }
                  title={rank?.find((i) => i.encodeId === selected)?.title}
                  artists={
                    rank?.find((i) => i.encodeId === selected)?.artistsNames
                  }
                  encodeId={
                    rank?.find((i) => i.encodeId === selected)?.encodeId
                  }
                  style="bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
