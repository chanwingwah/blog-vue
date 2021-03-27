<template>
  <section class="wrap-outer">
    <div class="wrap-inner">
      <div class="article-content">
        <template v-if="article">
          <transition name="article-menu">
            <article-menu
              v-show="device === 'desktop'"
              class="article-menu shadow-1  article-left"
              :menuKey="menuKey"
            ></article-menu>
          </transition>
          <div class="article-box">
            <div class="shadow-1 article-text ">
              <h1 class="title">
                {{ article.title }}
              </h1>
              <div class="blog-info">
                <div class="item-span">
                  <i class="item-icon iconfont icon-time"></i>
                  <span class="item-text">
                    {{ article.releaseTime | formatTime }}
                  </span>
                </div>
                <div class="item-span updatedAt">
                  <i class="item-icon iconfont icon-update"></i>
                  <span>{{ article.updatedAt | formatTime }}</span>
                </div>
                <div class="item-span">
                  <i class="item-icon iconfont icon-finder"></i>
                  <span class="item-text">{{ article.category }}</span>
                </div>
                <div class="item-span">
                  <i class="item-icon iconfont icon-view"></i>
                  <span class="item-text">({{ article.viewCount }})</span>
                </div>
              </div>
              <div v-if="article.HTML">
                <div v-html="article.HTML"></div>
              </div>
              <div>
                <br />
                <br />
                <!-- <divider></divider> -->
                <br />
                <Tags :tagNames="article.tagNames"></Tags>
                <Like :article="article"></Like>
              </div>
            </div>
            <div class="shadow-1 article-comment">
              <Comment :article="article"></Comment>
            </div>
          </div>
        </template>
        <MySkeleton :rows="5" v-else class="MySkeleton" active></MySkeleton>
      </div>
    </div>
    <BackToTop></BackToTop>
  </section>
</template>

<script>
import Tags from "@/views/blog/Tags";
import BackToTop from "@/components/BackToTop";
import ArticleMenu from "@/views/blog/ArticleMenu";
import Like from "@/views/blog/Like";
import Comment from "@/views/blog/Comment/index";

import { getDetail } from "@/api/blog";
import store from "@/store";
import { mapGetters } from "vuex";
import "highlight.js/scss/monokai-sublime.scss";

export default {
  name: "Article",
  components: {
    ArticleMenu,
    BackToTop,
    Tags,
    Like,
    Comment
  },
  computed: {
    ...mapGetters(["readedArticles", "device"])
  },
  data() {
    return {
      article: null,
      menuKey: 1,
      id: null
    };
  },
  beforeDestroy() {
    this.setMetaDescription("陈永华的博客");
    // 更新标签标题
    document.title = "陈永华的博客";
  },
  mounted() {},
  methods: {
    rendered() {
      setTimeout(() => {
        this.menuKey++;
      });
    },
    setMetaDescription(text) {
      document.getElementById("description-meta").setAttribute("content", text);
    }
  },
  created() {
    this.id = this.$route.params.id;
    getDetail({ id: this.id }).then(res => {
      this.article = res.data.data;
      this.setMetaDescription(this.article.summary);
      document.title = this.article.title;
      if (this.article.HTML) {
        this.$nextTick(() => {
          return this.menuKey++;
        });
      }

      // 增加阅读量
      if (!this.readedArticles.includes(this.id)) {
        store.dispatch("tourist/addArticleView", this.id).then(res => {
          this.article.viewCount = res.data.data.viewCount;
        });
      }
    });
  }
};
</script>
<style lang="scss">
@import "@/styles/markdown.scss";
</style>
<style lang="scss" scoped>
.article-content {
  padding: 20px 0;
  position: relative;
}
.article-left {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 40px;
  width: 315px;
  background: #ffffff;
  padding: 25px;
  height: auto;
  float: left;
}
.article-box {
  margin-left: 335px;
}

.article-text {
  padding: 20px;
  overflow: hidden;
  background: #ffffff;
}

.article {
  background-color: transparent;
  display: flex;
  align-items: flex-start;

  &-menu {
    animation: menuFadeIn 0.8s ease;
    &-enter-active,
    &-leave-active {
      transition: all ease 0.5s;
    }
    &-enter,
    &-leave-to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  @keyframes menuFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.article-text .title {
  font-size: 28px;
  color: #444;
  font-weight: normal;
  margin: 10px 0;
  margin-bottom: 15px;
}

.blog-info {
  display: flex;
  line-height: 1.6em;
  color: #999999;
  font-size: 13px;
  margin: 10px 0 55px;
}

.item-span {
  margin-right: 12px;
}

.item-icon {
  margin-right: 8px;
}

.article-comment {
  padding: 20px;
  margin-top: 40px;
  background: #ffffff;
}

@media (max-width: 1260px) {
  .article-content {
    padding: 20px 20px;
  }
  .article-box {
    margin-left: 0;
  }
}

@media (max-width: 992px) {
  .article-content {
    padding: 0;
  }
  .article-text {
    padding: 16px;
    .title {
      font-size: 24px;
      margin: 0;
    }
    .updatedAt {
      display: none;
    }
    .blog-info {
      margin: 10px 0 20px;
    }
  }

  .article-box {
    margin-left: 0;
  }
}
</style>
