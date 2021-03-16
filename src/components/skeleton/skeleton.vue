<template>
  <div class="my-skeleton" :class="{ 'my-skeleton-active': active }">
    <div class="skeleton-title" v-if="title">
      <MySkeletonRow style="width: 38%;"></MySkeletonRow>
    </div>
    <div class="skeleton-paragraph" v-if="paragraph">
      <MySkeletonRow v-for="row in rows" :key="row"></MySkeletonRow>
    </div>
  </div>
</template>
<script>
import MySkeletonRow from "./skeleton-row";
export default {
  name: "MySkeleton",
  components: { MySkeletonRow },
  props: {
    rows: { default: 3, type: Number },
    title: {
      type: Boolean,
      default: true
    },
    paragraph: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.my-skeleton {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
}

.skeleton-title {
  margin-bottom: 20px;
}
.skeleton-paragraph {
  ::v-deep .my-skeleton-row:last-child {
    width: 61%;
  }
  ::v-deep .my-skeleton-row:first-child {
    width: 100%;
  }
}
</style>
