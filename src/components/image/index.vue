<template>
  <div class="el-image">
    <slot v-if="loading" name="placeholder">
      <div class="el-image__placeholder"></div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="el-image__error">
        出错了
      </div>
    </slot>
    <img
      v-show="!loading && !error"
      class="el-image__inner"
      v-bind="$attrs"
      v-on="$listeners"
      :src="src"
      :style="imageStyle"
      :class="{
        'el-image__inner--center': alignCenter
      }"
    />
  </div>
</template>
<script>
// 参考element
const isSupportObjectFit = () =>
  document.documentElement.style.objectFit !== undefined;

const ObjectFit = {
  NONE: "none",
  CONTAIN: "contain",
  COVER: "cover",
  FILL: "fill",
  SCALE_DOWN: "scale-down"
};

export default {
  name: "MyImage",
  inheritAttrs: false,
  props: {
    src: String,
    fit: String
  },
  data() {
    return {
      loading: true,
      error: false,
      imageWidth: 0,
      imageHeight: 0
    };
  },
  computed: {
    imageStyle() {
      const { fit } = this;
      if (fit) {
        return isSupportObjectFit()
          ? { "object-fit": fit }
          : this.getImageStyle(fit);
      }
      return {};
    },
    alignCenter() {
      return !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
    }
  },
  mounted() {
    this.loadImage();
  },
  watch: {
    src() {
      this.loadImage();
    }
  },
  methods: {
    loadImage() {
      this.loading = true;
      this.error = false;
      const img = new Image();
      img.onload = e => this.handleLoad(e, img);
      img.onerror = this.handleError.bind(this);
      // img.onerror = (e) => this.handleError(e);
      // bind html attrs
      // so it can behave consistently
      Object.keys(this.$attrs).forEach(key => {
        const value = this.$attrs[key];
        img.setAttribute(key, value);
      });
      img.src = this.src;
    },
    handleLoad(e, img) {
      this.imageWidth = img.width;
      this.imageHeight = img.height;
      this.loading = false;
      this.error = false;
    },
    handleError(e) {
      this.loading = false;
      this.error = true;
      this.$emit("error", e);
    },
    /**
     * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
     */
    getImageStyle(fit) {
      const { imageWidth, imageHeight } = this;
      const {
        clientWidth: containerWidth,
        clientHeight: containerHeight
      } = this.$el;
      if (!imageWidth || !imageHeight || !containerWidth || !containerHeight)
        return {};
      const imageAspectRatio = imageWidth / imageHeight;
      const containerAspectRatio = containerWidth / containerHeight;
      if (fit === ObjectFit.SCALE_DOWN) {
        const isSmaller =
          imageWidth < containerWidth && imageHeight < containerHeight;
        fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
      }
      switch (fit) {
        case ObjectFit.NONE:
          return { width: "auto", height: "auto" };
        case ObjectFit.CONTAIN:
          return imageAspectRatio < containerAspectRatio
            ? { width: "auto" }
            : { height: "auto" };
        case ObjectFit.COVER:
          return imageAspectRatio < containerAspectRatio
            ? { height: "auto" }
            : { width: "auto" };
        default:
          return {};
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-image__error,
.el-image__inner,
.el-image__placeholder {
  width: 100%;
  height: 100%;
}
.el-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
}
.el-image__inner {
  vertical-align: top;
}

.el-image__inner--center {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
}

.el-image__error,
.el-image__placeholder {
  background: #f5f7fa;
}

.el-image__error {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #c0c4cc;
  vertical-align: middle;
}
</style>
