<template>
  <section class="wrap-outer">
    <div class="wrap-inner">
      <div class="home-content">
        <div v-if="showInfoCard">
          <InfoCard></InfoCard>
        </div>
        <div class="blog-list">
          <BlogItem
            v-for="blog in blogList"
            :key="blog._id"
            :blog="blog"
            @delete="reload"
          ></BlogItem>
          <AdminTools
            v-if="blogList.length === 0"
            module="blog"
            :show="['add']"
            @update="reload"
          ></AdminTools>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import InfoCard from "@/components/InfoCard";
import BlogItem from "@/views/blog/BlogItem";
import { getList } from "@/api/blog";
import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    InfoCard,
    BlogItem,
    AdminTools: () => import("@/views/admin/AdminTools")
  },
  computed: {
    ...mapGetters(["device"]),
    showInfoCard() {
      return this.device === "desktop";
    }
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
  padding: 20px 0;
}

.blog-list {
  margin-left: 20px;
  flex-grow: 1;
}

@media (max-width: 1260px) {
  .blog-list {
    margin: 0 20px;
  }
}
@media (max-width: 992px) {
  .home-content {
    display: flex;
    padding: 0;
  }
  .blog-list {
    margin: 0;
  }
}
</style>
