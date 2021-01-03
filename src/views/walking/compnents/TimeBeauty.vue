<template>
  <div class="time-beauty">
    <div class="time-circle">
      <div class="month">{{ month }}月</div>
      <div class="day">{{ day }}</div>
    </div>
    <div class="year">
      {{ year }}
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "TimeBeauty",
  props: {
    time: {
      type: [String, Object]
    }
  },
  propsData: {
    time: new Date()
  },
  computed: {
    year() {
      return moment(this.time).format("YYYY");
    },
    month() {
      return moment(this.time).format("M");
    },
    day() {
      return moment(this.time).format("DD");
    }
  }
};
</script>
<style lang="scss" scoped>
.time-beauty {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 74px;
  width: 74px;
  border-radius: 50%;
  border: 3px solid #828d95;
  color: #828d95;
  .month {
    font-size: 16px;
  }

  .day {
    font-size: 30px;
  }
}

.year {
  font-size: 20px;
  color: #cccccc;
  margin-top: 10px;
}
</style>
