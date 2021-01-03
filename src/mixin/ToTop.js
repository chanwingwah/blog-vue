import VueScrollTo from "vue-scrollto";
export default {
  watch: {},
  created() {
    this.$_toTop("app");
  },
  mounted() {},
  methods: {
    $_toTop(id) {
      const ele = document.getElementById(id);
      const options = {
        container: "body",
        easing: "ease",
        y: true
      };
      VueScrollTo.scrollTo(ele, 100, options);
    }
  }
};
