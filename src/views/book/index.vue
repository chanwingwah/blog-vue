<template>
  <section class="wrap-outer book-outer">
    <div class="wrap-inner">
      <div class="mybook-info">
        <h2 class="title">
          我的书单
          <small>
            (5)
          </small>
        </h2>
        <p class="summary">
          目前看过的一些书，或是未读完的。
          <br />
          打算以后读完一本书后要在博客中写一篇博文、读后感。
        </p>
      </div>
      <div class="book-content">
        <div class="book-content-item">
          <BookItem></BookItem>
        </div>
        <div class="book-content-item">
          <BookItem></BookItem>
        </div>
        <div class="book-content-item">
          <BookItem></BookItem>
        </div>
        <div class="book-content-item">
          <BookItem></BookItem>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BookItem from "@/views/book/BookItem";
export default {
  name: "book",
  components: {
    BookItem
  }
};
</script>
<style lang="scss" scoped>
.book-outer {
  background-color: #ffffff;
  min-height: 100%;
}

.mybook-info {
  padding: 30px 0;
  line-height: 1.6em;
  h2.title {
    padding: 0;
    margin: 0;
    font-weight: normal;
    small {
      color: #cccccc;
    }
  }
  .summary {
    color: #999999;
    font-size: 14px;
  }
}
.book-content {
  display: flex;
  flex-wrap: wrap;
}
.book-content-item {
  width: 350px;
  margin: 20px;
}
</style>
