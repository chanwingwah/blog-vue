<template>
  <div>
    <button
      ref="button"
      class="rkmd-btn btn-brown ripple-effect"
      @mousedown="onmousedown"
      @click="handleClick"
    >
      <span
        v-if="show"
        class="ripple"
        :class="rippleCss"
        :style="rippleStyle"
        ref="ripple"
      ></span>
      订阅
      <i class="iconfont icon-subscribe"></i>
    </button>
    <SubscribeDialog :isShow.sync="isShow"></SubscribeDialog>
  </div>
</template>

<script>
import SubscribeDialog from "@/components/SubscribeDialog";
export default {
  name: "SubscribeBtn",
  components: {
    SubscribeDialog
  },
  data() {
    return {
      show: true,
      size: 0,
      rippleX: 0,
      rippleY: 0,
      animated: true,
      timer: null,
      isShow: false
    };
  },
  computed: {
    rippleCss() {
      return {
        animated: this.animated
      };
    },
    rippleStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        top: `${this.rippleY}px`,
        left: `${this.rippleX}px`
      };
    }
  },
  methods: {
    handleClick() {
      this.isShow = true;
    },
    onmousedown(e) {
      clearTimeout(this.timer);
      this.animated = false;
      this.show = false;
      let self = this.$refs.button;
      let eWidth = self.offsetWidth;
      let eHeight = self.offsetHeight;
      this.size = Math.max(eWidth, eHeight);
      this.rippleX =
        parseInt(e.pageX - self.getBoundingClientRect().left) - this.size / 2;
      this.rippleY =
        parseInt(e.pageY - self.getBoundingClientRect().top) - this.size / 2;
      this.$nextTick(() => {
        this.show = true;
        this.animated = true;
      });
      this.timer = setTimeout(() => {
        this.show = false;
        this.animated = false;
      }, 800);
    }
  }
};
</script>

<style lang="scss" scoped>
.rkmd-btn {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  padding: 0 2.6em;
  color: #424242;
  font-size: 15px;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;
  outline: none;
  border: none;
  //   width: 100%;
  text-align: left;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 4px;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.225);
}
.rkmd-btn:hover {
  text-decoration: none;
  box-shadow: 0 4px 10px 0px rgba(0, 0, 0, 0.225);
}

.rkmd-btn i {
  width: auto;
  height: auto;
  //   margin-right: 10px;
  font-size: 1em;
  line-height: inherit;
  //   float: right;
  margin: 0;
  margin-left: 5px;
  vertical-align: middle;
}

.rkmd-btn.btn-brown {
  //   color: #936757;
  color: #fff;
  //   border: 1px solid #936757;
  background-color: #795548;
}
.rkmd-btn.btn-brown:hover {
  color: #fff;
  //   border: 1px solid #936757;
  background-color: #936757;
}

.ripple-effect {
  display: inline-block;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 1;
}
.ripple-effect .ripple {
  display: block;
  position: absolute;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.5);
  -webkit-transform: scale(0);
  transform: scale(0);
  pointer-events: none;
}

.ripple-effect .animated {
  -webkit-animation: ripple 0.6s linear;
  animation: ripple 0.6s linear;
}
@-webkit-keyframes ripple {
  100% {
    opacity: 0;
    -webkit-transform: scale(2.5);
    transform: scale(2.5);
  }
}
@keyframes ripple {
  100% {
    opacity: 0;
    -webkit-transform: scale(2.5);
    transform: scale(2.5);
  }
}
</style>
