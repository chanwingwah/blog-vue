<template>
  <div class="like" :class="{ active: liked }" @click="toggleLike(walking._id)">
    <i class="iconfont icon-cai"></i>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "like",
  components: {},
  props: ["walking"],
  computed: {
    ...mapGetters(["likedWalkings"]),
    liked() {
      return this.likedWalkings.includes(this.walking._id);
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    toggleLike(id) {
      if (this.loading === true) {
        return;
      }
      if (id) {
        if (!this.likedWalkings.includes(id)) {
          this.loading = true;
          store
            .dispatch("tourist/addLikedWalkings", id)
            .then(res => {
              this.walking.likeCount = res.data.data.likeCount;
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.loading = true;
          store
            .dispatch("tourist/cancelLikedWalkings", id)
            .then(res => {
              this.walking.likeCount = res.data.data.likeCount;
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.like {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0ff;
  border-radius: 50%;
  color: #ffffff;
  cursor: pointer;
  .iconfont {
    font-size: 30px;
  }
  &.active {
    // background: #b2c9e2;
    background: pink;
    color: white;
  }
}
</style>
