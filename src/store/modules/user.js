const state = {
  mode: localStorage.getItem("mode") ? localStorage.getItem("mode") : "normal", // normal || manage
  login: localStorage.getItem("login") ? localStorage.getItem("login") : "" // normal || manage
};
const mutations = {
  TOGGLE_mode: (state, mode) => {
    state.mode = mode;
    localStorage.setItem("mode", mode);
  },
  TOGGLE_login: (state, username) => {
    state.login = username;
    localStorage.setItem("login", username);
  }
};

const actions = {
  toggleMode({ commit }, mode) {
    commit("TOGGLE_mode", mode);
  },
  login({ commit }, username) {
    commit("TOGGLE_login", username);
  },
  logout({ commit }) {
    commit("TOGGLE_login", "");
    commit("TOGGLE_mode", "normal");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
