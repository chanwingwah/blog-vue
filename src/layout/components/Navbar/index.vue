<template>
  <header class="nav wrap-outer">
    <div class="logo">
      <router-link class="sidebar-logo-link" to="/">
        华华的博客
      </router-link>
    </div>
    <div class="nav-inner wrap-inner">
      <div class="menus">
        <MenuItem
          :active="activePath === menu.to"
          v-for="(menu, index) in memus"
          :key="index"
          :title="menu.title"
          :to="menu.to"
        />
      </div>
    </div>
  </header>
</template>
<script>
import MenuItem from "@/layout/components/Navbar/MenuItem";

export default {
  components: {
    MenuItem
  },
  props: {},
  computed: {
    activePath() {
      const { path } = this.$route;
      return path;
    }
  },
  data: () => {
    return {
      memus: [
        {
          title: "首页",
          to: "/home"
        },
        {
          title: "行博",
          to: "/walking"
        },
        {
          title: "我的书单",
          to: "/book"
        },
        {
          title: "关于",
          to: "/about"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.nav {
  position: relative;
  color: #999;
  height: 85px;
  background-color: #24292c;
  & .logo {
    position: absolute;
    left: 20px;
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  height: 85px;
  & .menus {
    flex-grow: 1;
    display: flex;
    align-items: center;
    // justify-content: flex-end;
    justify-content: center;
  }
}
</style>
