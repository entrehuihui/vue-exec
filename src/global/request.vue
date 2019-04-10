<template>
  <div id="request"></div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { error } from "util";
import global from "@/global/variable.js";

Vue.prototype.$axios = axios;
// const localhost = "http://120.78.76.139:8999"; //调试地址
const localhost = "http://localhost:8999"; //调试地址
// const localhost = ""; //正式

export default {
  post: async function(url, postData) {
    var retData;
    await Vue.prototype.$axios
      .post(localhost + url + "?maxiiot=" + global.userinfo.cookie, postData)
      .then(response => {
        retData = response.data;
      })
      .catch(error => {
        if (error.response == undefined) {
          retData = {
            Code: 500,
            Msg: "net::ERR_CONNECTION_REFUSED"
          };
        } else {
          retData = error.response.data;
        }
      });
    return retData;
  },
  get: async function(url) {
    var retData;
    await Vue.prototype.$axios
      .get(localhost + url + "&maxiiot=" + global.userinfo.cookie)
      .then(response => {
        retData = response.data;
      })
      .catch(error => {
        if (error.response == undefined) {
          retData = {
            Code: 500,
            Msg: "net::ERR_CONNECTION_REFUSED"
          };
        } else {
          retData = error.response.data;
        }
      });
    return retData;
  },
  put: async function(url, putData) {
    var retData;
    await Vue.prototype.$axios
      .put(localhost + url + "?maxiiot=" + global.userinfo.cookie, putData)
      .then(response => {
        retData = response.data;
      })
      .catch(error => {
        if (error.response == undefined) {
          retData = {
            Code: 500,
            Msg: "net::ERR_CONNECTION_REFUSED"
          };
        } else {
          retData = error.response.data;
        }
      });
    return retData;
  },
  del: async function(url, delData) {
    console.log(delData);
    var retData;
    await Vue.prototype.$axios
      .delete(localhost + url + "?maxiiot=" + global.userinfo.cookie, {
        data: delData
      })
      .then(response => {
        retData = response.data;
      })
      .catch(error => {
        if (error.response == undefined) {
          retData = {
            Code: 500,
            Msg: "net::ERR_CONNECTION_REFUSED"
          };
        } else {
          retData = error.response.data;
        }
      });
    return retData;
  },
  down: async function(devEUI, types, data = []) {
    var retData = await this.post("/downLinks?a=1", {
      data: data,
      devEUI: devEUI,
      type: types
    });
    return retData;
  }
};
</script>