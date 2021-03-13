<template>
  <form class="do-comment">
    <h3 class="title">添加评论</h3>
    <div class="form-item">
      <textarea
        ref="comment"
        maxlength="200"
        id="commentTextarea"
        class="comment-textarea"
        v-model="formData.comment"
        rows="4"
      ></textarea>
      <div class="quote" v-if="quote">
        <div>
          引用 <b>{{ quote.nickname }}</b> 的评论：
        </div>
        <div class="quote-content">
          {{ quote.comment }}
        </div>
        <div>
          <div class="cancelQuote" @click="$emit('cancelQuote')">
            取消引用
          </div>
        </div>
      </div>
      <!-- <div>{{ quote }}</div> -->
    </div>
    <div class="form-item">
      <label class="comment-label">您的昵称*：</label>
      <input
        type="text"
        maxlength="50"
        ref="nickname"
        v-model="formData.nickname"
        class="comment-input"
        placeholder="必填"
      />
    </div>
    <div class="form-item">
      <label class="comment-label">Email*：</label>
      <input
        type="text"
        ref="email"
        maxlength="50"
        v-model="formData.email"
        class="comment-input"
        placeholder="必填"
      />
    </div>
    <div class="form-item">
      <label class="comment-label">个人网址：</label>
      <input
        maxlength="100"
        type="text"
        ref="website"
        v-model="formData.website"
        class="comment-input"
        placeholder="以 https:// 或 http:// 开头"
      />
    </div>
    <div class="form-item">
      <label class="comment-label">
        <input type="checkbox" v-model="keepInfo" value="keepInfo" />
        记住个人信息（浏览器）
      </label>
    </div>
    <p class="errorMessage">
      {{ this.errorMessage }}
    </p>
    <div class="form-item">
      <div class="submit" @click="addComment">发表</div>
    </div>
  </form>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "do-comment",
  props: ["article", "quote"],
  components: {},
  data() {
    return {
      keepInfo: "keepInfo",
      formData: {},
      errorMessage: ""
    };
  },
  watch: {
    keepInfo() {
      if (!this.keepInfo) {
        localStorage.removeItem("touristInfo");
      } else {
        localStorage.setItem(
          "touristInfo",
          JSON.stringify({
            nickname: this.formData.nickname,
            email: this.formData.email,
            website: this.formData.website
          })
        );
      }
    },
    formData: {
      deep: true,
      handler() {
        if (!this.keepInfo) {
          return;
        } else {
          localStorage.setItem(
            "touristInfo",
            JSON.stringify({
              nickname: this.formData.nickname,
              email: this.formData.email,
              website: this.formData.website
            })
          );
        }
      }
    }
  },
  created() {
    let touristInfo = localStorage.getItem("touristInfo");
    if (touristInfo) {
      this.formData = JSON.parse(touristInfo);
      this.keepInfo = "keepInfo";
    }
  },
  methods: {
    addComment() {
      debugger;
      // 判断是否存储个人信息
      if (this.keepInfo) {
        localStorage.setItem(
          "touristInfo",
          JSON.stringify({
            nickname: this.formData.nickname,
            email: this.formData.email,
            website: this.formData.website
          })
        );
      } else {
        localStorage.removeItem("touristInfo");
      }
      if (!this.checkForm()) {
        return;
      }

      let quote = this.quote ? this.quote : undefined;
      let quoteId = quote ? quote._id : undefined;
      //   const loading = this.$message.loading("评论发表中", 0);
      addComment(
        Object.assign(
          {
            articleId: this.article._id,
            articleTitle: this.article.title,
            quoteId,
            quote,
            status: 1
          },
          this.formData
        )
      ).then(() => {
        this.$emit("update");
        this.formData.comment = null;
        this.$message.success("评论发表成功");
        // loading();
      });
    },
    checkForm() {
      this.errorMessage = "";
      var formData = JSON.parse(JSON.stringify(this.formData));
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === "string") {
          formData[key] = formData[key].trim();
        }
      });
      if (!formData.comment) {
        this.errorMessage = "请输入评论内容";
        this.$refs.comment.focus();
        return false;
      }
      if (!formData.nickname) {
        this.errorMessage = "请输入您的昵称";
        this.$refs.nickname.focus();
        return false;
      }
      if (!formData.email) {
        this.errorMessage = "请输入您的Email";
        this.$refs.email.focus();
        return false;
      }

      let re = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
      if (!re.test(this.formData.email)) {
        this.errorMessage = "邮箱验证失败，请输入正确的邮箱";
        this.$refs.email.focus();
        return false;
      }
      if (!this.formData.website) {
        return true;
      }
      // eslint-disable-next-line no-useless-escape
      let re2 = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;

      if (!re2.test(this.formData.website)) {
        this.errorMessage = "个人网站验证失败，请输入正确的网址";
        this.$refs.website.focus();
        return false;
      }
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.do-comment {
  margin: 0 10px 20px;
  color: #666;
  font-size: 15px;
  .title {
    color: #666;
  }
}
.comment-textarea {
  width: 600px;
  max-width: 100%;
  font-size: 15px;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  color: #666;
  resize: vertical;
  min-height: 60px;
}
.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  line-height: 1.6em;
}
.comment-label {
  margin: 8px 0;
  width: 200px;
}
.comment-input {
  font-size: 15px;
  max-width: 100%;
  color: #666;
  height: 35px;
  line-height: 35px;
  width: 400px;
  padding: 0 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
}

.submit {
  height: 35px;
  width: 150px;
  background: #666;
  color: #ffffff;
  outline: none;
  border: 0;
  border-radius: 4px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
}

.quote {
  width: 600px;
  font-size: 13px;
  border-left: 4px solid #badee652;
  background: #f0f0f0;
  padding: 10px;
  .quote-content {
    max-height: 100px;
    overflow: auto;
    white-space: pre-wrap;
    color: #333333;
  }
}
.cancelQuote {
  padding: 0px 8px;
  display: inline-block;
  border: 1px solid #cccccc;
  margin-top: 10px;
  outline: none;
  border-radius: 4px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  &:hover {
    color: #333333;
  }
}

.errorMessage {
  color: red;
}
</style>
