<template>
  <section class="wrap-outer about">
    <div class="wrap-inner about-inner">
      <div style="padding:20px 0" class="about-content">
        <div class="right">
          <InfoCard></InfoCard>
        </div>
        <div class="info shadow-1">
          <h2 class="info-title">
            关于我
          </h2>
          <div class="info-decription">
            陈永华，1995年，家乡清远，本科，毕业于广东工业大学。
            <br />
            为人热心，乐于助人。
          </div>
          <div class="contact">
            <h3 class="info-title2">
              通讯信息
            </h3>
            <div class="contact-details">
              <div class="contact-item">
                <span class="label">邮箱:</span>
                <a class="value" href="mailto:917029221@qq.com" target="_blank">
                  917029221@qq.com
                  <i class="iconfont icon-launch"></i>
                </a>
              </div>
              <div class="contact-item">
                <span class="label">所在地:</span>
                <span class="value">广东广州</span>
              </div>
              <div class="contact-item">
                <span class="label">github:</span>
                <a
                  class="value"
                  href="https://github.com/chanwingwah"
                  target="_blank"
                >
                  https://github.com/chanwingwah
                  <i class="iconfont icon-launch"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="work">
            <h3 class="info-title2">
              前端历程
            </h3>
            <div class="work-details">
              <WorkExperience></WorkExperience>
              <divider></divider>
            </div>
            <div class="work-details">
              <WorkExperience></WorkExperience>
              <divider></divider>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { InfoCard } from "@/components";
// import VueMarkdown from "vue-markdown";
// import VueMarkdown from 'vue-markdown'
// import VueMarkdown from 'vue-markdown-v2'

import WorkExperience from "@/views/about/WorkExperience";
export default {
  name: "about",
  components: {
    InfoCard,
    WorkExperience
    // VueMarkdownp
  }
};
</script>
<style lang="scss" scoped>
.about {
  height: 100%;
}
.about-inner {
  height: 100%;
}
.about-content {
  display: flex;
  height: 100%;

  .right {
    flex-shrink: 0;
    margin-right: 20px;
  }
}

.info {
  background: #ffffff;
  min-height: 100%;
  flex-grow: 1;
  padding: 20px 40px;
}

.info-title {
  padding: 0;
  margin: 0;
  line-height: 2em;
  font-weight: normal;
  margin-bottom: 30px;
}

.info-decription {
  color: #666666;
  margin-bottom: 40px;
}

.info-title2 {
  font-weight: normal;
  display: block;
  border-left: 3px solid #cccccc;
  padding-left: 10px;
}

.contact {
  margin-bottom: 40px;
}

.contact-item {
  margin: 10px 0;
  font-size: 16px;
  color: #666666;
  .label {
    display: inline-block;
    width: 80px;
  }
}
</style>
