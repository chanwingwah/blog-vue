<template>
  <div class="tags">
    <i class="item-icon iconfont icon-label"></i>
    <span class="blog-label" v-for="(tag, index) in tagNames" :key="index">
      {{ tag }}
    </span>
  </div>
</template>

<script>
export default {
  name: "tags",
  components: {},
  props: ["tagNames"]
};
</script>
<style lang="scss" scoped>
.tags {
  //   display: flex;
  line-height: 1.6em;
  color: #999999;
  font-size: 13px;
}

.item-icon {
  margin-right: 8px;
}

.blog-label {
  // color: #666666;
  border: 1px solid #cccccc;
  padding: 2px 5px;
  margin: 0 5px;
  border-radius: 4px;
}
</style>
