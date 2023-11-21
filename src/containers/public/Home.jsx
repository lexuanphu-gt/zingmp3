import React, { useEffect } from "react";
import { Header, Slider, Section, NewRelease, ChartSection, WeekChart } from "../../components/Index";
import { useSelector } from "react-redux";

const Home = () => {
  const {
    chill,
    motChutYeuDoi,
    remixLaDanceLuon,
    tamTrangTanCham,
    ngheSiThinhHanh,
    top100,
    albumHot,
  } = useSelector((state) => state.app);
  return (
    <div className=" h-full">
      <div className="w-full h-full">
        <Slider />
        <NewRelease />
        <Section data={chill} />
        <Section data={motChutYeuDoi} />
        <Section data={remixLaDanceLuon} />
        <Section data={tamTrangTanCham} />
        <Section data={ngheSiThinhHanh} />
        <ChartSection />
        <WeekChart />
        <Section data={top100} />
        <Section data={albumHot} />
      </div>
    </div>
  );
};

export default Home;
