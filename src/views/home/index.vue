<template>
  <section class="wrap-outer">
    <div class="wrap-inner">
      <div style="padding:20px 0" class="home-content">
        <div>
          <InfoCard></InfoCard>
        </div>
        <div style="margin-left:20px;flex-grow:1">
          <BlogItem></BlogItem>
          <BlogItem></BlogItem>
          <BlogItem></BlogItem>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { InfoCard } from "@/components";
import BlogItem from "@/views/blog/BlogItem";
export default {
  name: "home",
  components: {
    InfoCard,
    BlogItem
  }
};
</script>
<style lang="scss" scoped>
.home-content {
  display: flex;
}
</style>
