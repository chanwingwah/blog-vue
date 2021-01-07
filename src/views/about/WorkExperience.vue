<template>
  <div class="work-experience">
    <div class="work-experience-left">
      {{ experience.time }}
    </div>
    <div class="work-experience-right">
      <div class="title">
        {{ experience.title }}
      </div>
      <div class="detail">
        {{ experience.detail }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkExperience",
  props: {
    experience: {
      type: Object
      // default() {
      //   return {
      //     time: "2021年1月",
      //     title: "入读广东工业大学",
      //     detail: "大学城校区 计算机学院"
      //   };
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
.work-experience {
  display: flex;
  background-color: #ffffff;
  padding: 20px 30px;
  line-height: 1.6em;
}

.work-experience-left {
  margin-right: 40px;
  flex-shrink: 0;
  color: #666666;
  font-size: 16x;
}
.work-experience-right {
  flex-grow: 1;
  color: #666666;
  font-size: 15px;
  .title {
    font-size: 18px;
    line-height: 1.8em;
  }
  .detail {
    font-size: 14px;
    color: #999999;
  }
}
</style>
