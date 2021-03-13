<template>
  <button class="menu-button" @click="$emit('click')">
    <i class="iconfont icon-menu"></i>
  </button>
</template>

<script>
export default {
  props: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.menu-button {
  border: none;
  width: 50px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #fff;
  color: #666;
  outline: none;
  .iconfont {
    font-size: 23px;
  }

  &:active {
    color: #333;
    border-color: aliceblue;
    background: wheat;
  }
}
</style>
