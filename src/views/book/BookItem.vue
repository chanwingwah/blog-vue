<template>
  <div class="book-item">
    <div class="divider"></div>
    <img
      class="picture"
      src="http://www.yangzicong.com/book/1471327171896.jpeg"
      alt=""
    />
    <h3 class="title">
      JavaScript高级程序设计（第3版）
    </h3>
    <div class="author">Nicholas C. Zakas</div>
    <div class="recommend">推荐指数: xxx</div>
    <div class="decription">
      描述
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  name: "BookItem",
  components: {}
};
</script>
<style lang="scss" scoped>
.book-item {
  //   width: 350px;
  background-color: #ffffff;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.8em;
  font-size: 14px;
  .picture {
    height: 200px;
    margin: 0 auto;
    padding-top: 20px;
  }
  .title {
    display: inline-block;
    width: 100%;
    font-size: 15px;
    padding: 0;
    margin: 10px 0 0;
  }
  .author {
    width: 100%;
    color: #999999;
    font-size: 13px;
  }
  .recommend {
    width: 100%;
    color: #999999;
  }
  .decription {
    line-height: 1.6em;
    width: 100%;
    padding-bottom: 20px;
  }

  .divider {
    opacity: 0;
    width: 0;
    transition: 0.25 s linear;
  }

  &:hover .divider {
    opacity: 1;
    width: 100%;
  }
}
</style>
