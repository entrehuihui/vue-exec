<template>
  <div id="index">
    <div id="login">
      <img id="login_img" src="/static/img/sign_in.png">
      <div id="login_fork">
        <div id="login_position">
          <div class="login_stype">Login</div>
          <div id="login_warn">{{msg}}</div>
          <div class="login_stype">
            <input id="account" type="text" placeholder="Account" ref="account">
            <input id="password" type="password" placeholder="Password" ref="password">
          </div>
          <div id="login_remember" v-on:click="login_remember()">
            <div>
              <img src="static/img/password.jpg" ref="img">
            </div>
            <a>Remember Password</a>
          </div>
          <div>
            <button id="login_button" v-on:click="login()">登陆</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import req from "../global/request.vue";
import md5 from "js-md5";
export default {
  props: {
    msg: {
      default: ""
    }
  },
  methods: {
    //绑定事件的关键代码
    login: async function() {
      var account = this.$refs.account.value;
      var password = this.$refs.password.value;
      // console.log(md5("admin"));
      if (account == "") {
        this.$refs.account.placeholder = "Account cannot be empty";
        this.$refs.account.id = "accountNO";
        return;
      }
      if (password == "") {
        this.$refs.password.placeholder = "password can not be blank";
        this.$refs.password.id = "passwordNO";
        return;
      }
      this.$refs.account.id = "account";
      this.$refs.password.id = "password";
      var retData = await req.post("/login", {
        user: account,
        password: md5(password)
      });
      // console.log(retData);
      if (retData.Code == 200) {
        console.log(retData);
      } else {
        this.msg = retData.Msg;
      }
    },
    login_remember: function() {
      console.log(this.$refs.img.style.visibility);
      if (this.$refs.img.style.visibility == "visible") {
        this.$refs.img.style.visibility = "hidden";
      } else {
        this.$refs.img.style.visibility = "visible";
      }
    }
  }
};
</script>
<style scoped>
@import url("./css/index.css");
</style>
