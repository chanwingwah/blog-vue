<template>
  <div class="my-skeleton-row"></div>
</template>
<script>
export default {
  name: "MySkeletonRow"
};
</script>
<style lang="scss" scoped>
.my-skeleton-row + .my-skeleton-row {
  margin-top: 16px;
}
.my-skeleton-row {
  height: 16px;
  background: #f2f2f2;
  width: 100%;
}

.my-skeleton-active .my-skeleton-row {
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}
@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
