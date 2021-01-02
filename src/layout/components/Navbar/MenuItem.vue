<template>
  <div class="menu">
    <router-link class="menu-link" :to="to" :class="{ active: active }">
      <i :class="icon" class="menu-icon"></i>
      {{ title }}
    </router-link>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    active: {
      type: Boolean
    },
    to: {
      type: String
    },
    title: {
      type: String
    },
    icon: {
      type: String
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.menu {
  height: 100%;
  margin: 0 10px;
  color: #999999;
  font-size: 18px;
}
.menu-link {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #666666;
  }

  &.active {
    color: #333333;
  }

  .menu-icon {
    margin: 5px;
  }
}
</style>
