const getters = {
  readedArticles: state => state.tourist.readedArticles,
  likedArticles: state => state.tourist.likedArticles,
  likedWalkings: state => state.tourist.likedWalkings,
  mode: state => state.user.mode,
  login: state => state.user.login,
  device: state => state.app.device,
  sideBar: state => state.app.sideBar
};
export default getters;
