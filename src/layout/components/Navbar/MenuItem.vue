<template>
  <div class="menu">
    <router-link class="menu-link" :to="to" :class="{ active: active }">
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
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.menu {
  height: 100%;
  margin: 0 10px;
}
.menu-link {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #ffffff;
  }

  &.active {
    color: #ffffff;
  }
}
</style>
