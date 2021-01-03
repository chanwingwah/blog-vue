<template>
  <div style="width:1000px;margin: 20px auto">
    <div class="walking-bg">
      <a
        class="pic-source"
        href="https://www.pexels.com/zh-cn/photo/997567/"
        title="图片来源"
        target="_blank"
      >
        <i class="iconfont icon-launch"></i>
      </a>
      <div class="walking-info">
        <div class="title">
          行博
        </div>
      </div>
    </div>
    <div style="padding:20px;background:#fff">
      <WalkingItem></WalkingItem>
      <div class="divider"></div>
      <WalkingItem></WalkingItem>
    </div>
  </div>
</template>

<script>
import WalkingItem from "@/views/walking/compnents/WalkingItem";
export default { name: "walkinng", components: { WalkingItem } };
</script>
<style lang="scss" scoped>
.walking-bg {
  background: url(../../assets/images/walkingbg.jpg) no-repeat;
  height: 380px;
  background-attachment: fixed;
  background-attachment: fixed;
  background-size: cover;
  background-position: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .pic-source {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
    color: #666666;
  }

  &:hover .pic-source {
    display: inline-block;
  }
}
.walking-info {
  .title {
    font-size: 50px;
  }
}
</style>
