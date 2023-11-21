import icons from "./Icons";

const { MdOutlineLibraryMusic, MdOutlineFeed,TbChartArcs ,HiOutlineChartPie } = icons;
export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icon: <MdOutlineLibraryMusic size={24}/>,
  },
  {
    path: "",
    text: "Khám phá",
    end: true,
    icon: <TbChartArcs size={24}/>,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icon: <HiOutlineChartPie size={24}/>,
  },
  {
    path: "follow",
    text: "Theo dõi",
    icon: <MdOutlineFeed size={24}/>,
  },
  
];
