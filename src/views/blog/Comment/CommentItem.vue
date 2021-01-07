<template>
  <div class="commen-item">
    <div class="left comment-item-avator">
      {{ avator }}
    </div>
    <div class="right">
      <div class="comment-top">
        <div v-if="comment.website" class="nikename">
          <a :href="comment.website" class="nikename-website" target="_blanK">
            {{ comment.nickname }}
            <i class="iconfont icon-launch"></i>
          </a>
        </div>
        <div v-else class="nikename">
          {{ comment.nickname }}
        </div>
        <div class="floor">
          <span class="quoteButton" @click="$emit('quote', comment)">引用</span>
          <span>#{{ index }}</span>
        </div>
      </div>
      <div class="time">
        {{ comment.createdAt | formatTime("YYYY-MM-DD hh:mm:ss") }}
      </div>
      <div class="quote" v-if="comment.quote">
        <div>
          引用 <b>{{ comment.quote.nickname }}</b>
        </div>
        <div class="quote-content">
          {{ comment.quote.comment }}
        </div>
      </div>
      <div class="content">
        {{ comment.comment }}
      </div>
      <AdminTools
        module="comment"
        :show="['del']"
        :id="comment._id"
        :target="comment"
        @delete="$emit('delete')"
      ></AdminTools>
    </div>
  </div>
</template>

<script>
export default {
  name: "commen-item",
  props: ["comment", "index"],
  computed: {
    avator() {
      return ""; //this.comment.nickname.slice(0, 1);
    }
  },
  data() {
    return {};
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.commen-item {
  display: flex;
  line-height: 1.6em;
  margin-bottom: 10px;
  padding: 15px 0 20px;
  border-bottom: 1px dashed #c9c9c9;
  .right {
    flex-grow: 1;
  }
  .left {
    flex-shrink: 0;
  }
  &:hover .quoteButton {
    display: inline;
  }
}

.floor {
  color: #c9c9c9;
  font-size: 14px;
}

.comment-item-avator {
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  line-height: 40px;
  margin-right: 15px;
  border-radius: 100%;
  transition: all 0.5s ease;
  border: 1px solid #e5e5e5;
  color: #666666;
}
.comment-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  //   margin-bottom: 10px;
}
.nikename {
  font-size: 16px;
  color: #666666;
}
.nikename-website {
  text-decoration: underline;
  .iconfont {
    font-size: 13px;
  }
}
.time {
  font-size: 15px;
  color: #999999;
  line-height: 1.2em;
  margin-bottom: 10px;
}

.content {
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 15px;
  color: #333333;
}

.quoteButton {
  display: none;
  cursor: pointer;
  margin-right: 10px;
}
.quote {
  width: 600px;
  margin-bottom: 10px;
  font-size: 13px;
  border-left: 4px solid #badee652;
  background: #f0f0f0;
  padding: 10px;
  .quote-content {
    max-height: 100px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-all;
    color: #333333;
  }
}
</style>
