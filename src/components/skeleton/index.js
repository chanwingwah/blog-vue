import MySkeleton from "./skeleton";
MySkeleton.install = Vue => {
  Vue.component(MySkeleton.name, MySkeleton);
};
export default MySkeleton;
