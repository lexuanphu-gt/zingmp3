import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Home,
  Login,
  Public,
  Personal,
  Album,
  WeekRank,
  ZingChart,
  Search,
  SearchSong,
  SearchAll,
} from "./containers/public/Index";
import { Route, Routes } from "react-router-dom";
import path from "./ultis/Path";
import * as actions from "./store/actions/Index";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHome());
  });

  return (
    <>
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.STAR} element={<Home />} />
            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route path={path.WEEKCHART__TITLE__PID} element={<WeekRank />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.ALL} element={<SearchAll />} />
              <Route path={path.SONG} element={<SearchSong />} />
            </Route>
          </Route>
          <Route path={path.LOGIN} element={<Login />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
