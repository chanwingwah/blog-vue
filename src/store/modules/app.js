const state = {
  device: "desktop"
};

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  }
};

const actions = {
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  setCurrentMenus({ commit }, { menus, root }) {
    commit("SET_CURRENTMENUS", { menus: [], root: "" });
    commit("SET_CURRENTMENUS", { menus, root });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
