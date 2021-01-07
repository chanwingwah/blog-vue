const getters = {
  readedArticles: state => state.tourist.readedArticles,
  likedArticles: state => state.tourist.likedArticles,
  likedWalkings: state => state.tourist.likedWalkings,
  mode: state => state.user.mode,
  login: state => state.user.login
};
export default getters;
