import ActionTypes from "./ActionTypes";
import * as apis from "../../apis";

export const setCurSongId = (sid) => ({
  type: ActionTypes.SET_CUR_SONG_ID,
  sid: sid,
});
export const play = (flag) => ({
  type: ActionTypes.PLAY,
  flag: flag,
});
export const playAlbum = (flag) => ({
  type: ActionTypes.SET_ALBUM,
  flag: flag,
});
export const setPlayList = (songs) => ({
  type: ActionTypes.PLAYLIST,
  songs,
});

export const search = (keyword) => async (dispatch) => {
  try {
    const response = await apis.apiSearch(keyword);
    if (response.data.err === 0) {
      dispatch({
        type: ActionTypes.SEARCH,
        data: response.data.data,
      });
    } else {
      dispatch({
        type: ActionTypes.SEARCH,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.SEARCH,
      data: null,
    });
  }
};
