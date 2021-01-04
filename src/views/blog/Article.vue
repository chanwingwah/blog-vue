<template>
  <section class="wrap-outer">
    <div class="wrap-inner">
      <div style="padding:20px 0" class="article-content">
        <template v-if="article">
          <transition name="article-menu">
            <article-menu
              class="article-menu shadow-1  article-left"
              :menuKey="menuKey"
            ></article-menu>
          </transition>
          <div class="article-box">
            <div class="article-text">
              <h1 class="title">
                {{ article.title }}
              </h1>
              <div class="blog-info">
                <div class="item-span">
                  <i class="item-icon iconfont icon-time"></i>
                  <span class="item-text">
                    {{ article.createdAt | formatTime }}
                  </span>
                </div>
                <div class="item-span">
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

              <Markdown
                :source="article.markdown.replace(/↵/gm, '\r')"
                @rendered="rendered"
              ></Markdown>
              <div>
                <br />
                <br />
                <divider></divider>
                <br />
                <Tags :tagNames="article.tagNames"></Tags>
              </div>
            </div>
            <!-- <div class="operate">
              <div class="operate-item like">
                点赞
              </div>
              <div class="operate-item share">
                分享
              </div>
            </div> -->
          </div>
        </template>
      </div>
    </div>
    <BackToTop></BackToTop>
  </section>
</template>

<script>
import Tags from "@/views/blog/Tags";
import BackToTop from "@/components/BackToTop";
import { Markdown } from "@/components";
import ArticleMenu from "@/views/blog/ArticleMenu";
import ToTop from "@/mixin/ToTop";

import { getDetail } from "@/api/blog";

export default {
  name: "Article",
  components: {
    Markdown,
    ArticleMenu,
    BackToTop,
    Tags
  },
  mixins: [ToTop],
  data() {
    return {
      article: null,
      menuKey: 1,
      contents: ""
    };
  },
  beforeDestroy() {
    this.setMetaDescription("陈永华的博客");
    // 更新标签标题
    document.title = "陈永华的博客";
  },
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
    var id = this.$route.params.id;
    getDetail({ id }).then(res => {
      this.article = res.data.data;
      this.setMetaDescription(this.article.summary);
      document.title = this.article.title;
    });
  }
};
</script>
<style lang="scss" scoped>
.article-content {
  // display: flex;
  // float: left;
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
</style>
