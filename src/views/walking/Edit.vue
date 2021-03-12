<template>
  <div>
    <a-modal
      title="Title"
      :visible="visible"
      width="900px"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-textarea :rows="15" v-model="jsontext" />
    </a-modal>
  </div>
</template>
<script>
import { update, add } from "@/api/walking";
export default {
  props: ["visible", "mode", "target"],
  data() {
    return {
      jsontext: "",
      defaultForm: {
        contents: "测试数据：刚刚开通了博客，快来我的博客踩一踩吧",
        images: [
          "http://qmd6awdkv.hn-bkt.clouddn.com/book/HTML5与CSS3实例教程（第2版）.jpg",
          "http://qmd6awdkv.hn-bkt.clouddn.com/book/JavaScript高级程序设计（第4版）.jpg",
          "http://qmd6awdkv.hn-bkt.clouddn.com/book/响应式Web设计：HTML5和CSS3实战（第2版）.jpg",
          "http://qmd6awdkv.hn-bkt.clouddn.com/book/学习响应式设计.jpg"
        ]
      },
      //   visible: false,
      confirmLoading: false
    };
  },
  mounted() {
    if (this.target) {
      this.defaultForm = {
        contents: this.target.contents,
        images: this.target.images
      };
    }
    this.jsontext = JSON.stringify(this.defaultForm, null, 2);
  },
  methods: {
    handleOk() {
      this.confirmLoading = true;
      let form;
      try {
        form = JSON.parse(this.jsontext);
      } catch (e) {
        this.$message.error(e.toString());
        return;
      }
      if (this.mode === "edit") {
        //   编辑
        update(this.target._id, form)
          .then(() => {
            this.$message.success("编辑成功");
            this.$emit("update");
            this.$emit("update:visible", false);
          })
          .finally(() => {
            this.confirmLoading = false;
          });
      } else {
        //   新增
        add(form)
          .then(() => {
            this.$message.success("新增成功");
            this.$emit("update");
            this.$emit("update:visible", false);
          })
          .finally(() => {
            this.confirmLoading = false;
          });
      }
    },
    handleCancel() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
