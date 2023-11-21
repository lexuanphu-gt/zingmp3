import ActionTypes from "../actions/ActionTypes";

const initialState = {
  curSongId: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
  searchData:{},
};

const MusicReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };
    case ActionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case ActionTypes.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };
    case ActionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };
    case ActionTypes.SEARCH:
      return {
        ...state,
        searchData: action.data || {},
      };
    default:
      return state;
  }
};
export default MusicReducer;
