<template>
  <div>
    <button
      v-wave
      ref="button"
      class="rkmd-btn btn-brown ripple-effect"
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
  user-select: none;
  border-radius: 4px;
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
  user-select: none;
  z-index: 1;
}
</style>
