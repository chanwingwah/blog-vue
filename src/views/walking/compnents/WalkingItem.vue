<template>
  <div class="walking-item">
    <div class="walking-item-left">
      <TimeBeauty :time="walking.createdAt"></TimeBeauty>
    </div>
    <div class="walking-item-right">
      <div v-if="walking.images.length">
        <viewer :images="walking.images" class="images-box">
          <div
            class="image-item"
            :class="imageClase"
            v-for="(image, index) in walking.images"
            :key="index"
          >
            <img
              :src="image"
              :alt="walking.contents + `(${index}/${walking.images.length})`"
            />
          </div>
        </viewer>
      </div>
      <div class="walking-info" v-html="walking.contents"></div>
      <div class="walking-footer">
        <Like :walking="walking"></Like>
        <div class="likeCount">({{ walking.likeCount }})</div>
      </div>
      <AdminTools
        module="walking"
        :id="walking._id"
        :target="walking"
        @delete="$emit('reload')"
        @update="$emit('reload')"
      ></AdminTools>
    </div>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import TimeBeauty from "@/views/walking/compnents/TimeBeauty";
import Vue from "vue";
Vue.use(Viewer);
import Like from "@/views/walking/compnents/Like";
export default {
  name: "home",
  components: {
    TimeBeauty,
    Like,
    AdminTools: () => import("@/views/admin/AdminTools")
  },
  props: ["walking"],
  data() {
    return {
      editing: false
    };
  },
  computed: {
    imageClase() {
      if (this.walking.images.length <= 1) {
        return "image1";
      }
      if (this.walking.images.length >= 2 && this.walking.images.length < 5) {
        return "image2";
      }
      if (this.walking.images.length >= 5) {
        return "image3";
      }
      return undefined;
    }
  }
};
</script>
<style lang="scss" scoped>
.walking-item {
  display: flex;
  background-color: #ffffff;
  padding: 20px 30px;
}

.walking-item-left {
  margin-right: 20px;
  flex-shrink: 0;
}
.walking-item-right {
  flex-grow: 1;
  line-height: 1.6em;
  color: #666666;
  font-size: 15px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // padding-top: 10px;
}

.walking-footer {
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: center;
  .likeCount {
    font-size: 12px;
    color: #cccccc;
    line-height: 1.6em;
  }
}

.images-box {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.image-item {
  border: 1px solid #f0f0f0;
  margin-right: 10px;
  margin-bottom: 10px;
}
.image-item img {
  max-width: 100%;
  max-height: 100%;
}

.image1 {
  width: 300px;
  max-width: 100%;
  max-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image2 {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image3 {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 992px) {
  .walking-item {
    display: flex;
    background-color: #ffffff;
    padding: 20px 0px;
    overflow: hidden;
    width: 100%;
  }

  .image1 {
    width: 100%;
    max-height: 300px;
  }

  .image2 {
    width: calc(40vw - 50px);
    height: calc(40vw - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image3 {
    width: calc(25vw - 30px);
    height: calc(25vw - 30px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
