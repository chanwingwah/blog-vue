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
import { update, add } from "@/api/index";
export default {
  props: ["visible", "target"],
  data() {
    return {
      jsontext: "",
      defaultForm: {
        aboutme: "关于我String", // 关于我
        experience: [
          {
            time: "2021年1月",
            title: "入读广东工业大学",
            detail: "大学城校区 计算机学院"
          }
        ]
      },
      //   visible: false,
      confirmLoading: false
    };
  },
  mounted() {
    if (this.target._id) {
      this.defaultForm = {
        aboutme: this.target.aboutme,
        experience: this.target.experience
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
      if (this.target._id) {
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
