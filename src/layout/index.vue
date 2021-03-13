<template>
  <div class="app-wrapper">
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
    <LazyMan v-if="login"></LazyMan>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Navbar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
export default {
  name: "Layout",
  components: {
    Navbar,
    AppMain,
    LazyMan: () => import("@/layout/components/LazyMan")
  },
  computed: {
    ...mapGetters(["login"])
  },
  mixins: [ResizeMixin]
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
}
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

@media (max-width: 992px) {
  .main-container {
    padding-top: 55px;
  }
}
</style>
