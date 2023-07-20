<template>
  <div id="login">
    <h1>April Bill</h1>
    <div class="login-container">
      <div
        style="
          padding: 10px 20px;
          background: rgb(249, 251, 254);
          border-bottom: solid silver 1px;
        "
      >
        邮箱密码登录
      </div>
      <div style="padding: 20px">
        <p>
          <input
            placeholder="输入邮箱"
            style="
              width: 200px;
              height: 28px;
              padding-left: 10px;
              border: solid silver 1px;
              border-radius: 4px;
            "
            type="email"
            v-model="email"
          />
        </p>
        <p>
          <input
            placeholder="输入密码"
            style="
              width: 200px;
              height: 28px;
              padding-left: 10px;
              border: solid silver 1px;
              border-radius: 4px;
            "
            type="password"
            v-model="password"
          />
        </p>
        <p>
          <input
            style="
              width: 200px;
              height: 34px;
              color: white;
              background: rgb(0, 153, 255);
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
            type="submit"
            value="登录"
            @click="login"
          />
        </p>
      </div>
    </div>
    <p style="color: red">{{ message }}</p>
  </div>
</template>

<script>

export default {
  props: ["errorMsg"],
  data() {
    return {
      email: "",
      password: "",
      message: this.errorMsg
    }
  },
  methods: {
    login() {
      this.$emit("login", {
        email: this.email,
        password: this.password
      });
    }
  },
  watch: {
    errorMsg(newMsg) {
      this.message = newMsg;
    }
  }
}
</script>

<style>
#login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}
.login-container {
  margin: 20px auto;
  width: 300px;
  border: solid silver 1px;
  border-radius: 2px;
}
</style>