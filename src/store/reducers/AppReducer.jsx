import ActionTypes from "../actions/ActionTypes";

const initialState = {
  banner: [],
  chill: {},
  motChutYeuDoi: {},
  remixLaDanceLuon: {},
  tamTrangTanCham: {},
  ngheSiThinhHanh: {},
  top100: {},
  albumHot: {},
  newRelease: {},
  chart: {},
  rank: [],
  weekChart: {},
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_HOME:
      return {
        ...state,
        banner: action.homeData?.find((item) => item.sectionId === "hSlider")?.items || null,
        chill: action.homeData?.find((item) => item.sectionId === "hEditorTheme") || {},
        motChutYeuDoi: action.homeData?.find((item) => item.sectionId === "hEditorTheme2") || {},
        remixLaDanceLuon: action.homeData?.find((item) => item.sectionId === "hEditorTheme3") || {},
        tamTrangTanCham: action.homeData?.find((item) => item.sectionId === "hEditorTheme4") || {},
        ngheSiThinhHanh: action.homeData?.find((item) => item.sectionId === "hArtistTheme") || {},
        top100: action.homeData?.find((item) => item.sectionId === "h100") || {},
        albumHot: action.homeData?.find((item) => item.sectionId === "hAlbum") || {},
        newRelease: action.homeData?.find((item) => item.sectionType === "new-release") || {},
        chart: action.homeData?.find((item) => item.sectionId === "hZC")?.chart || {},
        rank: action.homeData?.find((item) => item.sectionId === "hZC")?.items || [],
        weekChart: action.homeData?.find((item) => item.sectionType === "weekChart") || {},
      };
    default:
      return state;
  }
};
export default AppReducer;
