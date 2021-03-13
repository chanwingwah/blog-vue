<template>
  <header class="nav wrap-outer">
    <div class="nav-inner wrap-inner">
      <MenuButton class="nav-menubutton" @click="toggleSideBar"></MenuButton>
      <div class="logo">
        <router-link
          class="logo-link"
          to="/"
          @click.native="toggleSideBar(false)"
        >
          <img class="head" src="@/assets/images/logo.png" alt="chanwingwah" />
        </router-link>
      </div>
      <div class="menus" :class="sideBarClass" @click="toggleSideBar(false)">
        <div class="menuList" @click.prevent.stop="() => {}">
          <div v-show="showMarker" id="marker" ref="marker"></div>
          <div v-show="showMarker" class="cover"></div>
          <MenuItem
            @click.native="toggleSideBar(false)"
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
import MenuButton from "@/layout/components/Navbar/MenuButton";
import { mapGetters } from "vuex";
export default {
  components: {
    MenuItem,
    MenuButton
  },
  props: {},
  computed: {
    ...mapGetters(["device", "sideBar"]),
    activePath() {
      const { path } = this.$route;
      return path;
    },
    hasActive() {
      return this.memus.some(menu => this.activePath === menu.to);
    },
    showMarker() {
      return this.hasActive && this.device !== "mobile";
    },
    sideBarClass() {
      if (this.sideBar) {
        return "sidbar";
      } else {
        return "sidebar hide";
      }
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
    },
    toggleSideBar(status) {
      if (status === undefined) {
        status = !this.sideBar;
      }
      this.$store.commit("app/TOGGLE_SIDEBAR", status);
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
  height: 100%;

  .menus {
    flex-grow: 1;
    display: flex;
    align-items: center;
    // justify-content: flex-end;
    justify-content: center;
  }
  .menuList {
    height: 100%;
    position: relative;
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

.nav-menubutton {
  display: none;
}

@media (max-width: 992px) {
  .nav-menubutton {
    display: block;
    margin-left: 15px;
  }
  .nav {
    height: 55px;
    position: fixed;
    top: 0;
    border-bottom: 1px solid #eee;
  }
  .nav-inner {
    justify-content: flex-start;
  }
  .logo {
    width: auto;
    height: 100%;
    // margin-left: 10px;
    flex-shrink: 0;
    .logo-link {
      .head {
        height: 35px;
      }
    }
  }
  .nav-inner .menus {
    position: fixed;
    height: calc(100vh - 55px);
    z-index: 100;
    top: 55px;
    transition: 0.3s;
    left: 0px;
    width: 100%;
    justify-content: flex-start;
  }
  .menuList {
    width: 250px;
    padding: 20px 0;
    box-shadow: 0 7px 10px -6px rgba(0, 0, 0, 0.2);
    background: #ffffff;
    display: flex;
    border-right: 1px solid #eee;
    flex-direction: column;
  }
  .menu {
    height: 50px;
  }
  .sidebar {
    left: 0;
  }

  .sidebar.hide {
    left: -250px;

    width: 250px;
  }
}
</style>
