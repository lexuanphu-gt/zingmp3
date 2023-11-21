import axios from "../Axios";

export const apiGetSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/song",
        method: "GET",
        params: { id: sid },
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });

export const apiGetDetailSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/infosong",
        method: "GET",
        params: { id: sid },
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiGetDetailPlaylist = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/detailplaylist",
        method: "GET",
        params: { id: pid },
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const apiSearch = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/search",
        method: "GET",
        params: { keyword },
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
