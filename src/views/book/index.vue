<template>
  <section class="wrap-outer book-outer">
    <div class="wrap-inner">
      <div class="mybook-info">
        <h2 class="title">
          我的书单
          <small> ({{ booklist.length }}) </small>
        </h2>
        <p class="summary">
          目前看过的一些书，或是未读完的。
          <br />
          打算以后读完一本书后要在博客中写一篇博文、读后感。
        </p>
      </div>
      <template v-if="loading">
        <MySkeleton class="MySkeleton" active></MySkeleton>
      </template>
      <template v-else>
        <div class="book-content">
          <div
            class="book-content-item"
            v-for="(book, index) in booklist"
            :key="index"
          >
            <BookItem :book="book" @reload="reload"></BookItem>
          </div>
          <AdminTools
            v-if="booklist.length === 0"
            module="book"
            :show="['add']"
            @update="reload"
          ></AdminTools>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { getList } from "@/api/book";
import BookItem from "@/views/book/BookItem";
export default {
  name: "book",
  components: {
    BookItem,
    AdminTools: () => import("@/views/admin/AdminTools")
  },
  created() {
    this.reload();
  },
  data() {
    return {
      booklist: [],
      loading: false
    };
  },
  methods: {
    reload() {
      this.loading = true;
      getList()
        .then(res => {
          this.booklist = res.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    }
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
@media (max-width: 1260px) {
  .mybook-info {
    padding: 30px 20px;
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
@media (max-width: 992px) {
  .book-content-item {
    width: 100%;
    margin: 20px;
  }
}
</style>
