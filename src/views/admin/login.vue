<template>
  <!-- <section class="wrap-outer login-outer"> -->
  <!-- <div class="wrap-inner login"> -->
  <a-card>
    <a-form v-if="!login" layout="inline" :form="form" @submit="handleSubmit">
      <a-form-item
        :validate-status="userNameError() ? 'error' : ''"
        :help="userNameError() || ''"
      >
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            }
          ]"
          placeholder="username"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item
        :validate-status="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
      >
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            }
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          :loading="loading"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>
    <a-space v-else>
      <a-button type="primary" @click="logout"> Log out {{ login }} </a-button>
      <a-button type="primary" @click="logout">
        重新登录
      </a-button>
    </a-space>
  </a-card>
  <!-- </div>
  </section> -->
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { login, logout } from "@/api/index";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  computed: {
    ...mapGetters(["login", "mode"])
  },
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
      loading: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("username") && getFieldError("username");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // 登录
          this.loading = true;
          login(values)
            .then(res => {
              this.$message.success("登录成功");
              store.dispatch("user/login", res.data.data.username);
              this.$router.push({ path: "/home" });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    logout() {
      logout().then(() => {
        this.$message.success("登出成功");
        store.dispatch("user/logout");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-outer {
  height: 100%;
  padding: 100px 0;
}
</style>
