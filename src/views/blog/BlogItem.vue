<template>
  <div class="shadow-1 blog-item">
    <h2 class="blog-title">
      <router-link class="blog-title-link" :to="`/article/${blog._id}`">
        {{ blog.title }}
      </router-link>
    </h2>
    <div class="blog-info">
      <div class="item-span">
        <i class="item-icon iconfont icon-time"></i>
        <span class="item-text">{{ blog.releaseTime | formatTime }}</span>
      </div>
      <div class="item-span">
        <i class="item-icon iconfont icon-update"></i>
        <span>{{ blog.updatedAt | formatTime }}</span>
      </div>
      <div class="item-span">
        <i class="item-icon iconfont icon-finder"></i>
        <span class="item-text">{{ blog.category }}</span>
      </div>
    </div>
    <div class="blog-summary">
      {{ blog.summary }}
      <router-link class="read-more" :to="`/article/${blog._id}`">
        阅读全文
      </router-link>
    </div>
    <div class="blog-bottom">
      <div class="item-span blog-bottom-left">
        <Tags :tagNames="blog.tagNames"></Tags>
      </div>
      <div class="blog-bottom-right">
        <div class="item-span">
          <i class="item-icon iconfont icon-view"></i>
          <span class="item-text">({{ blog.viewCount }})</span>
        </div>
        <div class="item-span">
          <i class="item-icon iconfont icon-comment"></i>
          <span class="item-text">({{ blog.commentCount }})</span>
        </div>
        <div class="item-span" style="margin-right:0">
          <i class="item-icon iconfont icon-like"></i>
          <span class="item-text">({{ blog.likeCount }})</span>
        </div>
      </div>
    </div>
    <AdminTools
      module="blog"
      :id="blog._id"
      @delete="$emit('delete')"
    ></AdminTools>
  </div>
</template>

<script>
import Tags from "@/views/blog/Tags";
export default {
  name: "BlogItem",
  components: {
    Tags,
    AdminTools: () => import("@/views/admin/AdminTools")
  },
  props: ["blog"]
};
</script>
<style lang="scss" scoped>
.blog-item {
  background-color: #ffffff;
  padding: 20px 30px;
  margin-bottom: 20px;

  // 标题
  //   .blog-title-link {
  //     display: block;
  //   }
  .blog-title {
    font-size: 24;
    font-weight: normal;
    margin: 0;
    line-height: 2.5em;
  }

  .blog-info {
    display: flex;
    line-height: 1.6em;
    color: #999999;
    font-size: 13px;
  }

  .item-span {
    margin-right: 12px;
  }

  .item-icon {
    margin-right: 8px;
  }

  .blog-summary {
    line-height: 1.6em;
    margin: 15px 0 25px;

    .read-more {
      margin: 0 10px;
      text-decoration: underline;
      font-size: 13px;
      &:hover {
        color: #999999;
      }
    }
  }

  .blog-bottom {
    display: flex;
    line-height: 1.6em;
    color: #999999;
    font-size: 13px;
    .blog-bottom-left {
      flex-grow: 1;
      display: flex;
    }

    .blog-bottom-right {
      flex-shrink: 0;
      display: flex;
    }
  }
}
</style>
