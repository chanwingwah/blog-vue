<template>
  <section class="wrap-outer">
    <div class="wrap-inner">
      <div style="padding:20px 0" class="home-content">
        <div>
          <InfoCard></InfoCard>
        </div>
        <div style="margin-left:20px;flex-grow:1">
          <BlogItem
            v-for="blog in blogList"
            :key="blog._id"
            :blog="blog"
            @delete="reload"
          ></BlogItem>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { InfoCard } from "@/components";
import BlogItem from "@/views/blog/BlogItem";
import { getList } from "@/api/blog";
export default {
  name: "home",
  components: {
    InfoCard,
    BlogItem
  },
  data() {
    return {
      blogList: []
    };
  },
  created() {
    this.reload();
  },
  methods: {
    reload() {
      getList().then(res => {
        this.blogList = res.data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home-content {
  display: flex;
}
</style>
