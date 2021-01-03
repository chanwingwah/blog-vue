<template>
  <header class="nav wrap-outer">
    <div class="nav-inner wrap-inner">
      <div class="logo">
        <router-link class="logo-link" to="/">
          <img class="head" src="@/assets/images/logo.png" alt="chanwingwah" />
        </router-link>
      </div>
      <div class="menus">
        <div style="height:100%;position:relative">
          <div v-show="hasActive" id="marker" ref="marker"></div>
          <div class="cover"></div>
          <MenuItem
            @indicator="indicator"
            @indicator-hover="indicatorHover"
            :active="activePath === menu.to"
            v-for="(menu, index) in memus"
            :key="index"
            :title="menu.title"
            :icon="menu.icon"
            :to="menu.to"
          />
        </div>
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
    },
    hasActive() {
      return this.memus.some(menu => this.activePath === menu.to);
    }
  },
  data: () => {
    return {
      memus: [
        {
          title: "首页",
          to: "/home",
          icon: "iconfont icon-home"
        },
        {
          title: "行博",
          to: "/walking",
          icon: "iconfont icon-dongtai"
        },
        {
          title: "我的书单",
          to: "/book",
          icon: "iconfont icon-book"
        },
        {
          title: "关于",
          to: "/about",
          icon: "iconfont icon-me"
        }
      ],
      activeEl: null
    };
  },
  methods: {
    indicator(e) {
      if (!e) e = this.activeEl;
      if (e) {
        this.activeEl = e;
        this.$refs.marker.style.left = e.offsetLeft + "px";
        this.$refs.marker.style.width = e.offsetWidth + "px";
      } else {
        this.$refs.marker.style.width = 0 + "px";
      }
    },
    indicatorHover(e) {
      this.$refs.marker.style.left = e.offsetLeft + "px";
      this.$refs.marker.style.width = e.offsetWidth + "px";
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  position: relative;
  height: 85px;
  z-index: 100;
  background-color: #ffffff;
  box-shadow: 0 7px 10px -6px rgba(0, 0, 0, 0.2);
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  height: 85px;

  .logo {
    color: #333333;
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    .logo-link {
      display: flex;
      align-items: center;
      .head {
        height: 50px;
        // width: 50px;
        margin-right: 10px;
      }
    }
  }
  .menus {
    flex-grow: 1;
    display: flex;
    align-items: center;
    // justify-content: flex-end;
    justify-content: center;
  }

  #marker {
    position: absolute;
    bottom: 0px;
    height: 4px;
    // width: 100px;
    background: #cccccc;
    transition: 0.3s;
    border-radius: 4px;
  }
  .cover {
    position: absolute;
    bottom: 0px;
    // background: #x;
    height: 4px;
    height: 4px;
    width: 100%;
  }

  .search {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
}
</style>
