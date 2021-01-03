<template>
  <section class="app-mian">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive> -->
      <router-view :key="key" />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  data: () => {
    return {};
  },
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>
<style lang="scss" scoped>
.app-mian {
  width: 100%;
  flex-grow: 1;
}
</style>
