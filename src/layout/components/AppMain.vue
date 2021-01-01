<template>
  <section class="wrap-outer">
    <div class="wrap-inner">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
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
