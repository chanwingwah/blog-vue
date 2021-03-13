import { getCounts } from "@/api/index";

const state = {
  device: "desktop",
  sideBar: false,
  blogNum: 0,
  walkingNum: 0,
  subscribeNum: 0
};

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  TOGGLE_SIDEBAR: (state, sideBar) => {
    state.sideBar = sideBar;
  },
  SetCount: (state, counts) => {
    state.blogNum = counts.blogNum;
    state.walkingNum = counts.walkingNum;
    state.subscribeNum = counts.subscribeNum;
  }
};

const actions = {
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  getCounts({ commit }) {
    getCounts().then(res => {
      commit("SetCount", res.data.data);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
