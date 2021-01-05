<template>
  <div class=" walking-item">
    <div class="walking-item-left">
      <TimeBeauty :time="walking.createdAt"></TimeBeauty>
    </div>
    <div class="walking-item-right">
      <div class="walking-info">
        {{ walking.contents }}
      </div>
      <div class="walking-footer">
        <Like :walking="walking"></Like>
        <div class="likeCount">({{ walking.likeCount }})</div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeBeauty from "@/views/walking/compnents/TimeBeauty";
import Like from "@/views/walking/compnents/Like";
export default {
  name: "home",
  components: {
    TimeBeauty,
    Like
  },
  props: ["walking"]
};
</script>
<style lang="scss" scoped>
.walking-item {
  display: flex;
  background-color: #ffffff;
  padding: 20px 30px;
}

.walking-item-left {
  margin-right: 20px;
  flex-shrink: 0;
}
.walking-item-right {
  flex-grow: 1;
  line-height: 1.6em;
  color: #666666;
  font-size: 15px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // padding-top: 10px;
}

.walking-footer {
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: center;
  .likeCount {
    font-size: 12px;
    color: #cccccc;
    line-height: 1.6em;
  }
}
</style>
