<template>
  <div
    class="dialog-mask"
    :style="{
      display: isShow ? 'flex' : 'none'
    }"
  >
    <transition name="dialog">
      <div class="dialog" v-if="isShow">
        <div class="dialog-title">信息填写</div>
        <form action="">
          <div class="form-item">
            <label class="form-key" htmlFor="name">
              起个响当当的名字吧！
            </label>
            <p class="form-value">
              <input type="text" id="name" autoComplete="off" v-model="name" />
            </p>
          </div>
          <div class="form-item">
            <label class="form-key" htmlFor="mail">
              整个静鸡鸡的邮箱吧！
            </label>
            <p class="form-value">
              <input type="text" id="mail" autoComplete="off" v-model="mail" />
            </p>
          </div>
          <div class="form-tip">
            TIP:当有新博文发表时，将会以邮件形式通知您。所填信息不会被公开
          </div>
          <div>
            <button
              class="form-btn form-submit"
              type="button"
              @click="onSubmit(true)"
              v-if="openType === 'subscribe'"
            >
              订 &nbsp; 阅
            </button>
            <button
              class="form-btn form-submit"
              type="button"
              @click="onSubmit(false)"
              v-else
            >
              确 &nbsp; 定
            </button>
            <button
              class="form-btn form-close"
              type="button"
              @click="handleClose"
            >
              关 &nbsp; 闭
            </button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { subscribe } from "@/api";
export default {
  name: "SubscribeDialog",
  components: {},
  props: {
    openType: {
      type: String,
      default: "subscribe"
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: "",
      mail: ""
    };
  },
  computed: {},
  watch: {
    isShow(nv) {
      this.name = "";
      this.mail = "";
      if (nv) {
        setTimeout(() => {
          document.getElementById("name").focus();
        }, 600);
      }
    }
  },
  mounted() {},
  methods: {
    handleClose() {
      this.$emit("update:isShow", false);
    },
    // 提交订阅
    onSubmit() {
      const { name, mail } = this;
      if (
        name.trim() === "" ||
        name.length > 30 ||
        ["543784988", "leelei", "李雷", "李大雷"].includes(name)
      ) {
        this.$message.warning("用户名为空或者长度大于30字符");
        document.getElementById("name").focus();
        return;
      } else if (
        !/^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/.test(mail)
      ) {
        document.getElementById("mail").focus();
        this.$message.warning("邮箱格式不对");
        return;
      }
      // 发送订阅
      subscribe({
        email: mail,
        nickname: name
      }).then(() => {
        this.$message.success("订阅成功！");
        this.handleClose();
      });

      // this.insertGuest(name, mail, isSubscribed);
    },
    // 插入新用户
    async insertGuest(name, mail, isSubscribed) {
      try {
        const res = await this.$api.insertGuest({ name, mail, isSubscribed });
        if (res.data) {
          if (isSubscribed) {
            // 如果是订阅状态，那就加个订阅状态，否则只加用户注册状态
            localStorage.info =
              localStorage.info === undefined
                ? `#${res.data.id}_sub;#${res.data.id}_user;`
                : localStorage.info +
                  `#${res.data.id}_sub;#${res.data.id}_user;`;
          } else {
            localStorage.info =
              localStorage.info === undefined
                ? `#${res.data.id}_user;`
                : localStorage.info + `#${res.data.id}_user;`;
          }
        } else {
          this.$message.error("订阅失败");
        }
        this.$message.success("订阅成功！");
        this.handleClose();
      } catch (err) {
        this.$message.error(err.msg ? err.msg : err);
        this.handleClose();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.dialog-mask {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: rgba($color: #000000, $alpha: 0.15);
}
.dialog {
  // position: fixed;
  padding: 20px 30px;
  left: calc(50% - 230px);
  top: 20%;
  width: 400px;
  max-width: 90%;
  background-color: rgba($color: #000000, $alpha: 0.85);
  box-shadow: 0 0 10px 0 #252525;
  z-index: 50;
  color: #fff;
  &-title {
    font-size: 18px;
    margin-bottom: 40px;
  }
  input {
    font-size: 13px;
    width: 100%;
    border: 0;
    color: #fff;
    border-bottom: 1px solid #666;
    background-color: transparent;
  }

  &-enter,
  &-enter-active {
    animation: zoomDialog linear 0.5s;
  }
  &-leave,
  &-leave-active {
    animation: zoomDialog linear 0.5s alternate-reverse;
  }
}
.form {
  &-item {
    color: #999;
    transition: color ease 0.5s;
    &:focus-within {
      color: #fff;
    }
    margin-bottom: 20px;
  }
  &-key {
    display: inline-block;
    margin-bottom: 10px;
  }
  &-value {
    position: relative;
    overflow: hidden;
    &:focus-within::after {
      transform: translateX(0);
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      transform: translateX(-100%) scaleY(0.5);
      background-color: #fff;
      transition: all ease 0.8s;
    }
  }
  &-tip {
    font-size: 12px;
    color: #999;
  }
  &-btn {
    width: 70px;
    height: 34px;
    margin-top: 30px;
    cursor: pointer;
    transition: all ease 0.5s;
  }
  &-close {
    border: 1px solid #666;
    color: #999;
    background-color: transparent;
    &:hover {
      color: #c9c9c9;
      border: 1px solid #999;
    }
  }
  &-submit {
    position: relative;
    z-index: 1;
    margin-right: 15px;
    color: rgb(33, 157, 240);
    border: 1px solid rgb(33, 157, 240);
    background-color: transparent;
    overflow: hidden;
    &:hover {
      color: #fff;
      &::after {
        opacity: 1;
        transform: rotate(22.5deg) scale(1, 30);
      }
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      opacity: 0;
      width: 160%;
      height: 3px;
      left: -25%;
      top: 50%;
      transform: rotate(22.5deg);
      background-color: rgb(33, 157, 240);
      transition: all ease 0.5s;
      z-index: -1;
    }
  }
  @keyframes zoomDialog {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    75% {
      opacity: 0.9;
      transform: scale(1.1);
    }
    90% {
      opacity: 1;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
