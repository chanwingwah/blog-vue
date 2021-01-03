<template>
  <div class="app-wrapper">
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    AppMain
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
</style>
