<template>
  <div>
    <div class="adminTools" v-if="this.login">
      <a-space>
        <a-button
          v-if="show.includes('add')"
          type="primary"
          @click="add"
          size="small"
          ghost
          >新增</a-button
        >
        <a-button
          v-if="show.includes('edit')"
          type="primary"
          @click="edit"
          size="small"
          ghost
          >编辑</a-button
        >
        <a-popconfirm
          v-if="show.includes('del')"
          placement="bottom"
          ok-text="Yes"
          cancel-text="No"
          @confirm="del"
        >
          <template slot="title">
            <p>确定要删除吗 ？</p>
            <!-- <p>{{ text }}</p> -->
          </template>
          <a-button type="danger" :loading="deleting" size="small" ghost>
            删除
          </a-button>
        </a-popconfirm>
      </a-space>
    </div>
    <walkingEdit
      :visible.sync="walkingEditing"
      :target="target"
      :mode="mode"
      @update="$emit('update')"
    ></walkingEdit>
  </div>
</template>

<script>
//  管理员工具箱s
import walkingEdit from "@/views/walking/Edit";

import { mapGetters } from "vuex";
import { update as blogUpdate } from "@/api/blog";
import { delComment } from "@/api/comment";
import { update as updateWalking } from "@/api/walking";

export default {
  name: "adminTools",
  components: {
    walkingEdit
  },
  computed: {
    ...mapGetters(["login"])
  },
  props: {
    module: String,
    id: String,
    show: {
      default() {
        return ["add", "edit", "del"];
      }
    },
    target: Object
  }, // 模块，操作，id
  data() {
    return {
      deleting: false,
      walkingEditing: false,
      mode: ""
    };
  },
  methods: {
    del() {
      switch (this.module) {
        case "blog": {
          blogUpdate(this.id, { status: -1 }).then(() => {
            this.$message.success("删除成功");
            this.$emit("delete");
          });
          break;
        }
        case "comment": {
          delComment({ id: this.id, articleId: this.target.articleId }).then(
            () => {
              this.$message.success("删除成功");
              this.$emit("delete");
            }
          );
          break;
        }
        case "walking": {
          updateWalking(this.id, { status: -1 }).then(() => {
            this.$message.success("删除成功");
            this.$emit("delete");
          });
          break;
        }
        default: {
          this.$message.info("该功能未完善");
          break;
        }
      }
    },
    add() {
      this.mode = "add";
      switch (this.module) {
        case "blog": {
          this.blogEdit();
          break;
        }
        case "walking": {
          this.walkingEditing = true;
          break;
        }
        default: {
          this.$message.info("该功能未完善");
          break;
        }
      }
    },
    edit() {
      this.mode = "edit";
      switch (this.module) {
        case "blog": {
          this.blogEdit(this.id);
          break;
        }
        case "walking": {
          this.walkingEditing = true;
          break;
        }
        default: {
          this.$message.info("该功能未完善");
          break;
        }
      }
    },
    blogEdit(id) {
      const { href } = this.$router.resolve({
        path: `/editPage`,
        query: {
          id: id
        }
      });
      window.open(href, "_blank");
    }
  }
};
</script>
<style lang="scss" scoped>
.adminTools {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 5px;
  line-height: 1.6em;
  top: -50px;
  // background: #000000;
  // color: #ffffff;
  .operate {
    border: 1px solid #cccccc;
    margin-left: 10px;
    padding: 0 8px;
  }
}
</style>
