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
import { update, add } from "@/api/book";
export default {
  props: ["visible", "mode", "target"],
  data() {
    return {
      jsontext: "",
      defaultForm: {
        name: "JavaScript高级程序设计（第4版）.jpg",
        author: "[美]马特·弗里斯比（Matt Frisbie）",
        description:
          "本书是JavaScript经典图书的新版。第4版涵盖ECMAScript 2019，全面、深入地介绍了JavaScript开发者必须掌握的前端开发技术，涉及JavaScript的基础特性和高级特性。",
        photo: "book/JavaScript高级程序设计（第4版）.jpg"
      },
      //   visible: false,
      confirmLoading: false
    };
  },
  mounted() {
    if (this.target) {
      this.defaultForm = {
        name: this.target.name,
        author: this.target.author,
        description: this.target.description,
        photo: this.target.photo
      };
    }
    this.jsontext = JSON.stringify(this.defaultForm, null, 2);
  },
  methods: {
    handleOk(e) {
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
