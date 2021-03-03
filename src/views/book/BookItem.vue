<template>
  <div class="book-item">
    <divider></divider>
    <img class="picture" :src="book.photo" alt="" />
    <h3 class="title">
      {{ book.name }}
    </h3>
    <div class="author">{{ book.author }}</div>
    <div class="recommend">推荐指数: {{ book.recommendation }}</div>
    <div class="description">
      {{ book.description }}
    </div>
    <AdminTools
      module="book"
      :id="book._id"
      :target="book"
      @delete="$emit('reload')"
      @update="$emit('reload')"
    ></AdminTools>
    <divider></divider>
  </div>
</template>

<script>
export default {
  name: "BookItem",
  components: {
    AdminTools: () => import("@/views/admin/AdminTools")
  },
  props: {
    book: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  }
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
  .description {
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
