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
import dayjs from "dayjs";
export default {
  name: "TimeBeauty",
  props: {
    time: {
      type: [String, Object]
    }
  },
  computed: {
    year() {
      return dayjs(this.time).format("YYYY");
    },
    month() {
      return dayjs(this.time).format("M");
    },
    day() {
      return dayjs(this.time).format("DD");
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
  padding: 10px 0 5px;
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
    margin-bottom: -5px;
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
@media (max-width: 992px) {
  .time-circle {
    height: 4em;
    width: 4em;
    border: 2px solid #828d95;
    font-size: 15px;
    .month {
      font-size: 16px;
    }

    .day {
      font-size: 25px;
    }
  }
}
</style>
