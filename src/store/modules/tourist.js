// 存储游客信息，预览记录
import { addBlogLike, cancelBlogLike, addViewCount } from "@/api/blog";
import { addWalkingLike, cancelWalkingLike } from "@/api/walking";
// console.log(blogApi);
const state = {
  readedArticles: localStorage.getItem("readedArticles")
    ? JSON.parse(localStorage.getItem("readedArticles"))
    : [],
  likedArticles: localStorage.getItem("likedArticles")
    ? JSON.parse(localStorage.getItem("likedArticles"))
    : [],
  likedWalkings: localStorage.getItem("likedWalkings")
    ? JSON.parse(localStorage.getItem("likedWalkings"))
    : []
};

const mutations = {
  ADD_LIKEDARTICLES: (state, id) => {
    if (state.likedArticles.includes(id)) {
      return;
    }
    state.likedArticles.push(id);
    localStorage.setItem("likedArticles", JSON.stringify(state.likedArticles));
  },
  CANCEL_LIKEDARTICLES: (state, id) => {
    let index = state.likedArticles.indexOf(id);
    if (index !== -1) {
      state.likedArticles.splice(index, 1);
      localStorage.setItem(
        "likedArticles",
        JSON.stringify(state.likedArticles)
      );
    }
  },
  ADD_likedWalkings: (state, id) => {
    if (state.likedWalkings.includes(id)) {
      return;
    }
    state.likedWalkings.push(id);
    localStorage.setItem("likedWalkings", JSON.stringify(state.likedWalkings));
  },
  CANCEL_likedWalkings: (state, id) => {
    let index = state.likedWalkings.indexOf(id);
    if (index !== -1) {
      state.likedWalkings.splice(index, 1);
      localStorage.setItem(
        "likedWalkings",
        JSON.stringify(state.likedWalkings)
      );
    }
  },
  ADD_READEDARTICLE: (state, id) => {
    if (state.readedArticles.includes(id)) {
      return;
    }
    state.readedArticles.push(id);
    localStorage.setItem(
      "readedArticles",
      JSON.stringify(state.readedArticles)
    );
  }
};

const actions = {
  async addArticleLike({ commit }, id) {
    var res = await addBlogLike({ id: id });
    commit("ADD_LIKEDARTICLES", id);
    return res;
  },
  async cancelArticleLike({ commit }, id) {
    var res = await cancelBlogLike({ id: id });
    commit("CANCEL_LIKEDARTICLES", id);
    return res;
  },
  async addArticleView({ commit }, id) {
    var res = await addViewCount({ id: id });
    commit("ADD_READEDARTICLE", id);
    return res;
  },
  async addLikedWalkings({ commit }, id) {
    var res = await addWalkingLike({ id: id });
    commit("ADD_likedWalkings", id);
    return res;
  },
  async cancelLikedWalkings({ commit }, id) {
    var res = await cancelWalkingLike({ id: id });
    commit("CANCEL_likedWalkings", id);
    return res;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
