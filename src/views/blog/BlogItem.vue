<template>
  <div class="shadow-1 blog-item">
    <h2 class="blog-title">
      <router-link class="blog-title-link" title="关于我" to="/article">
        Web 缓存
      </router-link>
    </h2>
    <div class="blog-info">
      <div class="item-span">
        <i class="item-icon iconfont icon-time"></i>
        <span class="item-text">2019-09-15</span>
      </div>
      <div class="item-span">
        <i class="item-icon iconfont icon-update"></i>
        <span>2019-09-15</span>
      </div>
      <div class="item-span">
        <i class="item-icon iconfont icon-finder"></i>
        <span class="item-text">前端</span>
      </div>
    </div>
    <div class="blog-summary">
      在弱类型语言 JavaScript
      中，变量上能有多少优化窍门？你深入中，变量上能有多少优化窍门？本文从最基础的变量类型说起，带你深入中，变量上能有多少优化窍门？本文从最基础的变量类型说起，带你深入
      V8
      底层类型变换与优化机制。真正的老司机，一行代码可见一斑。以后你可以说，我写的代码，连变量声明都比你快…
      <router-link class="read-more" title="关于我" to="/about">
        阅读全文
      </router-link>
    </div>
    <div class="blog-bottom">
      <div class="item-span blog-bottom-left">
        <i class="item-icon iconfont icon-label"></i>
        <div>
          <span class="blog-label">标签1</span>
          <span class="blog-label">标签2</span>
        </div>
      </div>
      <div class="blog-bottom-right">
        <div class="item-span">
          <i class="item-icon iconfont icon-view"></i>
          <span class="item-text">(803)</span>
        </div>
        <div class="item-span">
          <i class="item-icon iconfont icon-comment"></i>
          <span class="item-text">(803)</span>
        </div>
        <div class="item-span" style="margin-right:0">
          <i class="item-icon iconfont icon-like"></i>
          <span class="item-text">(803)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogItem",
  components: {}
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

  .blog-label {
    // color: #666666;
    border: 1px solid #cccccc;
    padding: 2px 5px;
    margin: 0 5px;
    border-radius: 4px;
  }
}
</style>
