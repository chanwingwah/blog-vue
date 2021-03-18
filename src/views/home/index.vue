<template>
  <section class="wrap-outer">
    <div class="wrap-inner">
      <div class="home-content">
        <div v-if="showInfoCard">
          <InfoCard></InfoCard>
        </div>
        <div class="blog-list" v-if="loading">
          <MySkeleton
            v-for="i in 3"
            :key="i"
            class="MySkeleton"
            active
          ></MySkeleton>
        </div>
        <div class="blog-list" v-else>
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
      blogList: [],
      loading: false
    };
  },
  created() {
    this.reload();
  },
  methods: {
    reload() {
      this.loading = true;
      getList()
        .then(res => {
          this.blogList = res.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.home-content {
  display: flex;
  padding: 20px 0 0;
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
    padding: 16px 0 0;
  }
  .blog-list {
    margin: 0;
  }
}
</style>
