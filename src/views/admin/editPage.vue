<template>
  <div class="wrap-outer editpage">
    <div class="wrap-inner">
      <!-- <h1>新增文章</h1> -->
      <a-form-model :model="form" layout="inline" size="small">
        <div class="form-left">
          <a-row>
            <a-col :span="18">
              <a-form-model-item label="文章标题">
                <a-input v-model="form.title" />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item label="文章类别">
                <a-input v-model="form.category" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-model-item label="文章简介">
                <a-input v-model="form.summary" />
                <!-- <a-input v-model="form.summary" type="textarea" /> -->
              </a-form-model-item>
            </a-col>
          </a-row>
        </div>
        <div class="form-right">
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="文章标签">
                <a-input v-model="form.tagNames" placeholder="逗号隔开" />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item label="发布时间">
                <a-date-picker
                  v-model="form.releaseTime"
                  show-time
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%;"
                />
              </a-form-model-item>
            </a-col>

            <a-col :span="6">
              <a-form-model-item label="发布状态">
                <a-radio-group v-model="form.status">
                  <a-radio :value="0">
                    草稿
                  </a-radio>
                  <a-radio :value="1">
                    发布
                  </a-radio>
                </a-radio-group>
                <a-button
                  type="primary"
                  @click="onSubmit"
                  :loading="saving"
                  :disabled="disableSave"
                >
                  保存
                </a-button>
              </a-form-model-item>
            </a-col>
          </a-row>
          <!-- <a-row>
            <a-col :span="24">
              <a-form-model-item>
       
              </a-form-model-item>
            </a-col>
          </a-row> -->
        </div>
      </a-form-model>
    </div>
    <div class="editpage-bottom">
      <div class="bottom-left">
        <!-- 富文本输入区域 -->
        <textarea
          @keydown="textareaTab"
          class="mackdown-area"
          placeholder="请在此编辑文章"
          v-model="form.markdown"
        ></textarea>
      </div>
      <div class="bottom-right">
        <!-- 富文本预览区域 -->
        <div class="html-area">
          <div
            class="markdown-body"
            ref="highlightHTML"
            v-html="reviewHTML"
            v-highlight
          >
            预览区域
          </div>
          <div style="display:none">
            <Markdown :source="review" @rendered="rendered"></Markdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {  DatePicker } from "ant-design-vue";

import { Markdown } from "@/components";
import { debounce } from "@/utils/index";
import { save, getDetail, update } from "@/api/blog";
import Hljs from "highlight.js";
import "highlight.js/scss/monokai-sublime.scss";

export default {
  components: {
    Markdown,
    DatePicker
  },
  directives: {
    highlight: function(el) {
      let blocks = el.querySelectorAll("pre code");
      blocks.forEach(block => {
        Hljs.highlightBlock(block);
      });
    }
  },
  data() {
    return {
      id: null,
      review: "",
      reviewHTML: "",
      saving: false,
      disableSave: false,
      form: {
        title: "",
        markdown: "",
        HTML: "",
        tagNames: "",
        category: "",
        summary: "",
        releaseTime: undefined,
        status: 1
      }
    };
  },
  watch: {
    "form.markdown": {
      handler: function() {
        this.debounceRender();
      },
      immediate: true
    }
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      getDetail({ id: this.id })
        .then(res => {
          console.log(Object.keys(this.form));
          var article = res.data.data;
          article.tagNames = article.tagNames.join(",");
          Object.keys(this.form).forEach(key => {
            this.$set(this.form, key, article[key]);
          });
        })
        .catch(() => {
          this.disableSave = true;
        });
    }
  },
  mounted() {
    this.debounceRender = debounce(() => {
      this.render();
    }, 1000);
  },
  methods: {
    debounceRender() {
      this.render();
    },
    onSubmit() {
      // 获取HTML
      var check = [
        "title",
        "tagNames",
        "category",
        "summary",
        "markdown",
        "releaseTime"
      ];
      if (
        check.some(key => {
          if (!this.form[key]) {
            return true;
          }
        })
      ) {
        this.$message.error("请完善表单");
        return;
      }

      let highlightHTML = this.$refs.highlightHTML.outerHTML;
      const formData = Object.assign({}, this.form, {
        HTML: highlightHTML,
        tagNames: this.form.tagNames.replace(/，/g, ",").split(",")
      });
      if (this.id) {
        this.update(formData);
        return;
      }
      this.save(formData);
    },
    save(formData) {
      this.saving = true;
      save(formData)
        .then(() => {
          this.$message.success("新增成功");
        })
        .finally(() => {
          this.saving = false;
        });
    },
    update(formData) {
      this.saving = true;
      update(this.id, formData)
        .then(() => {
          this.$message.success("更新成功");
        })
        .finally(() => {
          this.saving = false;
        });
    },
    textareaTab(e) {
      if (e.keyCode === 9) {
        if (!this.form.markdown) this.form.markdown = "";
        this.form.markdown += "\t";
        // 阻止默认切换元素的行为
        if (e && e.preventDefault) {
          e.preventDefault();
        } else {
          window.event.returnValue = false;
        }
      }
    },
    rendered(html) {
      this.reviewHTML = html;
    },
    render() {
      this.review = this.form.markdown.replace(/↵/gm, "\r");
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/markdown.scss";
</style>
<style lang="scss" scoped>
.wrap-outer {
  min-height: 100%;
  background: #ffffff;
}

.editpage {
  .wrap-inner {
    width: calc(100% - 80px);
    padding: 20px;
  }
  ::v-deep .ant-form-item {
    width: 100%;
    margin-bottom: 10px;
  }
  ::v-deep .ant-form-item-label {
    width: 80px;
  }
  ::v-deep .ant-form-item-control-wrapper {
    width: calc(100% - 80px);
  }
}
.editpage-bottom {
  // min-height: 500px;
  width: calc(100% - 80px);
  margin: 0 auto;
  display: flex;
  .bottom-right {
    width: 50%;
    // background: chocolate;
  }
  .bottom-left {
    width: 50%;
    // background: coral;
  }

  .mackdown-area {
    width: 100%;
    height: 500px;
    padding: 16px;
    border: 0;
    border-right: 4px solid rgb(250, 139, 139);
    box-sizing: border-box;
    font-size: 18px;
    background-color: #f8f8f8;
  }
  .html-area {
    padding: 20px;
    width: 100%;
    height: 500px;
    overflow: auto;
  }
}
</style>
