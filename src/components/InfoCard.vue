<template>
  <div class="shadow-1 infoCard">
    <img src="@/assets/images/head.jpg" alt="我的头像" class="myhead" />
    <h2 class="nickname">
      <router-link class="logo-link" title="关于我" to="/about"
        >陈永华
      </router-link>
    </h2>
    <!-- <p class="loction"></p> -->
    <p class="intro">
      <i class="iconfont icon-zuobiao"></i> 广东-广州
      <br />
      2018年毕业于广东工业大学<br />一枚前端工程师
    </p>
    <a
      title="github"
      class="mygithub"
      href="https://github.com/chanwingwah"
      target="_blank"
    >
      <i class="iconfont icon-git"></i>
      chanwingwah
      <i class="iconfont icon-launch" style="font-size:12px"></i>
    </a>
    <Divider></Divider>
    <div class="count-info">
      <div class="count-info-item">
        <div class="infoItem-count">
          {{ blogNum }}
        </div>
        <div class="infoItem-text">
          博文
        </div>
      </div>
      <div class="count-info-item">
        <div class="infoItem-count" style="font-size:34px">
          {{ walkingNum }}
        </div>
        <div class="infoItem-text">
          行博
        </div>
      </div>
      <div class="count-info-item">
        <div class="infoItem-count">
          {{ subscribeNum }}
        </div>
        <div class="infoItem-text">
          订阅数
        </div>
      </div>
    </div>
    <divider></divider>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "infoCard",
  data() {
    return {};
  },
  computed: mapState({
    blogNum: state => state.app.blogNum,
    walkingNum: state => state.app.walkingNum,
    subscribeNum: state => state.app.subscribeNum
  }),
  created() {}
};
</script>
<style lang="scss" scoped>
.infoCard {
  background: #ffffff;
  width: 315px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 30px 30px;
  line-height: 1.6em;
}
.myhead {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.nickname {
  font-size: 17px;
}
.loction {
  font-size: 16px;
}
.intro {
  font-size: 14px;
  color: #cccccc;
  text-align: center;
}
.mygithub {
  font-size: 14px;
  color: #666666;
  margin-bottom: 25px;
  &:hover {
    color: #cccccc;
    cursor: pointer;
  }
}

.count-info {
  //   border-top: 1px solid #cccccc;
  //   border-bottom: 1px solid #cccccc;
  width: 100%;
  display: flex;
  padding: 10px 0;

  .count-info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    line-height: 1.6em;
  }

  .infoItem-count {
    font-size: 28px;
    height: 40px;
    line-height: 40px;
    // font-weight: bold;
  }

  .infoItem-text {
    font-size: 12px;
    text-align: center;
    color: #ccc;
  }
}
</style>
