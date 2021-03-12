<template>
  <div
    class="menu"
    @mouseenter="$emit('indicator-hover', $el)"
    @mouseout="$emit('indicator', null)"
  >
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
  mounted() {},
  watch: {
    active: {
      handler() {
        if (this.active === true) {
          this.$nextTick(() => {
            this.$emit("indicator", this.$el);
          });
        }
      },
      immediate: true
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.menu {
  height: 100%;
  color: #999999;
  font-size: 18px;
  display: inline-block;
}
.menu-link {
  height: 100%;
  padding: 0 30px;
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
