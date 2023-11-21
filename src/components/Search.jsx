import React, { useState } from "react";
import Icons from "../ultis/Icons";
import * as actions from "../store/actions/Index";
import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams } from "react-router-dom";
import path from "../ultis/Path";

const { GoSearch } = Icons;

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({ q: keyword }).toString(),
      });
    }
  };

  return (
    <div className="w-full flex items-center ">
      <span className="flex items-center justify-center bg-[#DDE4E4] px-2 h-10 rounded-l-[20px]">
        <GoSearch size={24} />
      </span>
      <input
        type="text"
        className="outline-none bg-[#DDE4E4] w-full  py-2 rounded-r-[20px] h-10 "
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      ></input>
    </div>
  );
};

export default Search;
