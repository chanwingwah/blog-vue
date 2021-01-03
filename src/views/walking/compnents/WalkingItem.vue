<template>
  <div class=" walking-item">
    <div class="walking-item-left">
      <TimeBeauty :time="walking.createdAt"></TimeBeauty>
    </div>
    <div class="walking-item-right">
      <div class="walking-info">
        {{ walking.contents }}
      </div>
      <!-- <div class="walking-footer">
        <div>
          点赞   信息 
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TimeBeauty from "@/views/walking/compnents/TimeBeauty";
export default {
  name: "home",
  components: {
    TimeBeauty
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
  padding-top: 10px;
}
</style>
