<template>
  <div class="like-box">
    <div
      class="like"
      :class="{ active: liked }"
      @click="toggleLike(article._id)"
    >
      <i class="iconfont icon-like-cover"></i>
    </div>
    <div class="likeCount">{{ article.likeCount }}人点赞</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "like",
  components: {},
  props: ["article"],
  computed: {
    ...mapGetters(["likedArticles"]),
    liked() {
      return this.likedArticles.includes(this.article._id);
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    toggleLike(articleId) {
      if (this.loading === true) {
        return;
      }
      if (articleId) {
        if (!this.likedArticles.includes(articleId)) {
          this.loading = true;
          store
            .dispatch("tourist/addArticleLike", articleId)
            .then(res => {
              this.article.likeCount = res.data.data.likeCount;
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.loading = true;
          store
            .dispatch("tourist/cancelArticleLike", articleId)
            .then(res => {
              this.article.likeCount = res.data.data.likeCount;
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.like-box {
  padding: 30px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.like {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0ff;
  border-radius: 50%;
  color: #cccccc;
  cursor: pointer;
  .iconfont {
    font-size: 30px;
  }
  &.active {
    background: pink;
    color: #f0f0ff;
  }
}
.likeCount {
  line-height: 3em;
  text-align: center;
}
</style>
