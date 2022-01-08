<template>
  <ul class="menu" v-if="menuList.length > 0">
    <li class="menu-title">目录</li>
    <li
      v-for="(item, index) in menuList"
      :class="
        `menu-item menu-item--lv${item.level} ${
          item.highlight ? 'menu-item--act' : ''
        }`
      "
      :key="index"
      @click="handleMenuClick(item.id)"
    >
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
import VueScrollTo from "vue-scrollto";
export default {
  name: "ArticleMenu",
  components: {},
  props: {
    menuKey: {
      type: Number
    }
  },
  data() {
    return {
      scrollCb: null,
      menuList: [],
      maxCount: 3,
      timer: null
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {},
  watch: {
    menuKey() {
      this.menuKey;
      this.createMenu();
      this.reload();
    }
  },
  mounted() {
    this.scrollCb = this.deboundce(this.menuHighlight, 50);
    window.addEventListener("scroll", this.scrollCb);
  },
  beforeDestroyed() {
    window.removeEventListener("scroll", this.scrollCb);
  },
  methods: {
    reload() {
      // 如果有图片的话，第一次获取dom节点的高度会不准确，那么，则需要重新load
      // 这里定时load3次，每次间隔1000ms
      let count = 1;
      this.timer = window.setInterval(() => {
        if (count > this.maxCount) {
          clearInterval(this.timer);
        } else {
          count++;
          this.menuList = [];
          this.createMenu();
        }
      }, 1000);
    },
    handleMenuClick(id) {
      const ele = document.getElementById(id);
      const self = this;
      const options = {
        container: "body",
        easing: "ease",
        offset: -50,
        onDone: function() {
          self.menuHighlight();
        },
        y: true
      };
      VueScrollTo.scrollTo(ele, 500, options);
    },
    // 防抖
    deboundce(fn, delay) {
      let timer = null;
      return function() {
        const context = this;
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn.apply(context, args);
        }, delay);
      };
    },
    // 生成目录
    createMenu() {
      this.traversalUsingNodeIterator(
        document.getElementsByClassName("markdown-body")[0]
      );
    },
    // 遍历dom树,记录offsetTop以及生成锚点dom 先序遍历
    traversalUsingNodeIterator(node) {
      var iterator = document.createNodeIterator(
        node,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode(node) {
            return node.nodeName.startsWith("H")
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT;
          }
        }
      );
      node = iterator.nextNode();
      while (node != null) {
        let menuItem;
        switch (node.tagName) {
          case "H1":
            menuItem = {
              level: 1,
              id: node.id,
              text: node.innerText.replace("#", ""),
              offsetH: node.offsetTop,
              highlight: false
            };
            break;
          case "H2":
            menuItem = {
              level: 2,
              id: node.id,
              text: node.innerText.replace("#", ""),
              offsetH: node.offsetTop,
              highlight: false
            };
            break;
          case "H3":
            menuItem = {
              level: 3,
              id: node.id,
              text: node.innerText.replace("#", ""),
              offsetH: node.offsetTop,
              highlight: false
            };
            break;
          case "H4":
            menuItem = {
              level: 4,
              id: node.id,
              text: node.innerText.replace("#", ""),
              offsetH: node.offsetTop,
              highlight: false
            };
            break;
          default:
            break;
        }
        if (menuItem) {
          this.menuList = this.menuList.concat([menuItem]);
        }
        node = iterator.nextNode();
      }
    },
    // 目录高亮跟踪
    menuHighlight() {
      const { menuList } = this;
      // 由于滚动条出发频率问题，sTop的值可能会小一点，导致后面的判断不准确
      let sTop = document.documentElement.scrollTop || document.body.srcollTop;
      sTop += 1;
      for (let i = 0; i < menuList.length; i++) {
        if (i === menuList.length - 1) {
          // 先判断是不是最后一个
          if (sTop >= menuList[i].offsetH) {
            menuList[i].highlight = true;
          } else {
            menuList[i].highlight = false;
          }
        } else {
          if (sTop >= menuList[i].offsetH && sTop < menuList[i + 1].offsetH) {
            menuList[i].highlight = true;
          } else {
            menuList[i].highlight = false;
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
ul,
ol {
  list-style: none;
  outline: none;
  padding: 0;
  margin: 0;
}
.menu {
  // position: fixed;
  // margin-top: 20px;
  // margin-left: 15px;
  // width: 240px;
  &-title {
    font-size: 20px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }
  &-item {
    margin: 3px 0;
    cursor: pointer;
    transition: all ease 0.3s;
    span {
      position: relative;
    }
    &:hover {
      span::after {
        content: "👀";
        right: -30px;
        font-size: 13px;
        position: absolute;
      }
      text-decoration: underline;
    }
    &--act {
      span::after {
        content: "👀";
        right: -30px;
        font-size: 13px;
        position: absolute;
      }
      text-decoration: underline;
      font-weight: bold;
    }
  }
  &-item--lv2 {
    padding-left: 1em;
  }
  &-item--lv3 {
    padding-left: 2em;
  }
  &-item--lv4 {
    padding-left: 3em;
  }
}
</style>
