import store from "@/store";

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default {
  watch: {
    // $route(route) {
    //   // doSomething
    // }
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    const device = this.$_isMobile();
    store.dispatch("app/toggleDevice", device);
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      let width = rect.width - 1;
      if (width < WIDTH) {
        return "mobile";
      }
      if (width > WIDTH && width < 1260) {
        return "pad";
      }
      return "desktop";
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const device = this.$_isMobile();
        store.dispatch("app/toggleDevice", device);
        // doSomothing 如切换为移动端
      }
    }
  }
};
