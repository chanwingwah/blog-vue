<template>
  <div class="comment">
    <h2 class="comment-title">
      评论<small>（{{ commentList.length }}）</small>
    </h2>
    <div class="comment-list">
      <CommentItem
        v-for="(comment, index) in commentList"
        :key="comment._id"
        :comment="comment"
        :index="commentList.length - index"
        @quote="getQuote"
      ></CommentItem>
    </div>
    <div id="doComment">
      <DoComment
        :article="article"
        @update="load"
        :quote="quote"
        @cancelQuote="cancelQuote"
      ></DoComment>
    </div>
  </div>
</template>

<script>
import VueScrollTo from "vue-scrollto";
import CommentItem from "@/views/blog/Comment/CommentItem";
import DoComment from "@/views/blog/Comment/DoComment";
import { getList } from "@/api/comment";
export default {
  name: "comment",
  components: {
    CommentItem,
    DoComment
  },
  props: ["article"],
  data() {
    return {
      commentList: [],
      quote: null
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      getList({ articleId: this.article._id }).then(res => {
        this.commentList = res.data.data;
      });
    },
    getQuote(quote) {
      this.quote = quote;
      const ele = document.getElementById("doComment");
      VueScrollTo.scrollTo(ele, 100);
      document.getElementById("commentTextarea").focus();
    },
    cancelQuote() {
      this.quote = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.comment {
  margin: 0 0 100px;
}
.comment-title {
  //   padding: 0;
  //   margin: 0;
  font-weight: normal;
  small {
    color: #cccccc;
  }
}
</style>
