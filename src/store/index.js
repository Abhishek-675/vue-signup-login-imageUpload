/* eslint-disable */
import { createStore } from "vuex";

import axios from "axios";
let Base_URL;
if (process.env.NODE_ENV === "production") {
  Base_URL = "https://www.alegralabs.com:5401";
} else {
  Base_URL = "http://localhost:3000";
}

let Image_URL;
if (process.env.NODE_ENV === "production") {
  Image_URL = "https://www.alegralabs.com:5401";
} else {
  Image_URL = "http://localhost:5000";
}

export default createStore({
  state: {
    user: "",
    isLoggedIn: false,
    userList: "",
    headerTitle: "",
    ImageList: "",
    uploadProgress: null,
    uploadError: null,
    uploadSuccess: false,
  },
  actions: {
    async signup({ commit }, payload) {
      try {
        const data = await axios.post(Base_URL + "/signup", payload);
        return data;
      } catch (error) {
        return error.response;
      }
    },
    async login({ commit }, payload) {
      try {
        const data = await axios.post(Base_URL + "/login", payload);
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("userName", data.data.name);
        localStorage.setItem("isLoggedIn_Local", true);
        commit("SET_USER", data.data);
        commit("SET_LOGIN", true);

        return data;
      } catch (error) {
        return error.response;
      }
    },
    async users(
      { commit } //  {payload}
    ) {
      try {
        const data = await axios.get(Base_URL + "/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        commit("SET_USERS", data.data.user);
        return data;
      } catch (error) {
        return error.response;
      }
    },
    async newToken({ commit }, payload) {
      try {
        const data = await axios.post(Base_URL + "/token", payload);
        return data;
      } catch (error) {
        return error.response;
      }
    },
    async deleteToken({ commit }, payload) {
      try {
        const data = await axios.post(Base_URL + "/logout", payload);
        return data;
      } catch (error) {
        return error.response;
      }
    },
    async UploadFileService({ commit }, payload) {
      try {
        commit("resetUploadState");
        // const formData = new FormData();

        // for (let i = 0; i < files.length; i++) {
        //   formData.append("files[]", files[i]);
        // }

        const config = {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            commit("setUploadProgress", progress);
          },
        };

        const data = await axios.post(Image_URL + "/upload", payload, config);
        commit('setUploadSuccess', true)
        return data;
      } catch (error) {
        commit('setUploadError', error.message)
        return error.response;
      }
    },
    async GetImages({ commit }, payload) {
      try {
        const data = await axios.get(Image_URL + "/images");
        // console.log(data.data.images)
        commit("GET_IMAGES", data.data.images);
        return data;
      } catch (error) {
        return error.response;
      }
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOGIN(state, value) {
      state.isLoggedIn = value;
    },
    SET_USERS(state, users) {
      state.userList = users;
    },
    LoggedInMsg(state, value) {
      state.headerTitle = value;
    },
    GET_IMAGES(state, value) {
      const finalArray = value.map(function (obj) {
        return Image_URL.concat("/", obj.filename);
      });
      state.ImageList = finalArray;
    },
    setUploadProgress(state, progress) {
      state.uploadProgress = progress;
    },
    setUploadError(state, error) {
      state.uploadError = error;
    },
    setUploadSuccess(state, success) {
      state.uploadSuccess = success;
    },
    resetUploadState(state) {
      state.ImageList = [];
      state.uploadProgress = null;
      state.uploadError = null;
      state.uploadSuccess = false;
    },
  },
  getters: {},
});
