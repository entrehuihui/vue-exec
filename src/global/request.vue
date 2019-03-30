<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { error } from "util";

Vue.prototype.$axios = axios;
const localhost = "http://120.78.76.139:8899";

export default {
  post: async function(url, postData) {
    var retData;
    await Vue.prototype.$axios
      .post(localhost + url, postData)
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
      .get(localhost + url)
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
  put:async function(url, putData){
    var retData;
    await Vue.prototype.$axios.put(localhost + url, putData).then(response => {
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
  del:async function(url, delData){
    console.log(delData);
    var retData;
    await Vue.prototype.$axios.delete(localhost + url, {data:delData}).then(response => {
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
  }
};
</script>