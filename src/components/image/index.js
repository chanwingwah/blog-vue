import image from "./index.vue";
const install = function(Vue) {
  Vue.component(image.name, image);
};
image.install = install;
export default image;
