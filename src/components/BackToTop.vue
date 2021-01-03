<template>
  <transition name="to-top">
    <div class="to-top" @click="backToTop" v-show="isShow">
      <div class="to-top-angel"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "BackToTop",
  components: {},
  props: {},
  data() {
    return {
      isShow: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    window.addEventListener("scroll", this.throttle(this.scrollCallback, 100));
  },
  beforeDestroy() {
    window.removeEventListener(
      "scroll",
      this.throttle(this.scrollCallback, 100)
    );
  },
  methods: {
    throttle(fn, delay) {
      let preTime = Date.now();
      return function() {
        const context = this;
        const args = arguments;
        const doTime = Date.now();
        if (doTime - preTime >= delay) {
          fn.apply(context, args);
          preTime = Date.now();
        }
      };
    },
    scrollCallback() {
      const scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (scrollTop > 500) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    // 跳转动画
    scrollToAnchor(anchorName) {
      if (anchorName) {
        const anchorElement = document.getElementById(anchorName);
        if (anchorElement) {
          anchorElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    // 回到顶部
    backToTop() {
      this.scrollToAnchor("app");
    }
  }
};
</script>

<style scoped lang="scss">
.to-top {
  position: fixed;
  right: 40px;
  bottom: 50px;
  border-radius: 4px;
  padding: 10px 0; //增加热区

  // height: 40px;
  // background-color: rgba($color: #000000, $alpha: 0.7);
  transition: all ease 0.5s;
  z-index: 20;
  .to-top-angel {
    cursor: pointer;
    height: 0;
    width: 0;
    border-top: 0px;
    border-right: 22px solid transparent;
    border-left: 22px solid transparent;
    border-bottom: 33px solid rgba($color: #000000, $alpha: 0.7);
  }

  &:hover {
    transform: translateY(-10px);
  }
  &-enter-active,
  &-leave-active {
    transition: all ease 0.5s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
