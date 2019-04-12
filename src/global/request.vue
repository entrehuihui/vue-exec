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
const localhost = "http://120.78.76.139:8999"; //调试地址/
// const localhost = "http://localhost:8999"; //调试地址
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
    var retData = await this.post("/downLinks", {
      data: data,
      devEUI: devEUI,
      type: types
    });
    return retData;
  },
  getMode: getMode
};
function getMode(AgreementID, modes) {
  switch (AgreementID) {
    case 2:
      switch (modes) {
        case 3:
          return "离床";
        case 4:
          return "准备离床";
        case 8:
          return "在床";
      }
      break;
    case 7: //电动窗帘机
      if (modes) {
        return "窗帘打开";
      } else {
        return "窗帘关闭";
      }
      break;
    case 8: //智能移动插座
      if (modes) {
        return "开关开";
      } else {
        return "开关关";
      }
      break;
    case 9: //86三键智能开关
      switch (modes) {
        case 0:
          return "全关";
        case 1:
          return "第一路开";
        case 2:
          return "第二路开";
        case 3:
          return "第一路和第二路开";
        case 4:
          return "第三路开";
        case 5:
          return "第一路和第三路开";
        case 6:
          return "第二路和第三路开";
        case 7:
          return "三路都开";
      }
      break;
    case 11: //红外转发器
      switch (modes) {
        case 1:
          return "学码成功";
        case 2:
          return "学码出错";
        case 3:
          return "给定地址超范围";
        case 4:
          return "正在学码";
        case 5:
          return "学码等待超时";
        case 6:
          return "控制成功";
        case 7:
          return "无控制红外码(未学码)";
      }
      break;
    case 12: //阀门控制器
      if (modes) {
        return "阀门开";
      } else {
        return "阀门关";
      }
      break;
    case 15: //墙壁遥控面板遥控器
      var status = [];
      var one = Math.floor(modes / 100);
      switch (one) {
        case 1:
          status.push("开");
          break;
        case 2:
          status.push("开");
          break;
        case 3:
          status.push("开");
          break;
      }
      var two = Math.floor((modes % 100) / 10);
      switch (two) {
        case 1:
          status.push("开");
          break;
        case 2:
          status.push("开");
          break;
        case 3:
          status.push("开");
          break;
      }
      var tree = Math.floor(modes % 10);
      switch (tree) {
        case 1:
          status.push("开");
          break;
        case 2:
          status.push("开");
          break;
        case 3:
          status.push("开");
          break;
      }
      return status.join("/");
      break;
    case 18: //人体感应器
      if (modes) {
        return "有人靠近";
      } else {
        return "正常";
      }
      break;
    case 19: //门窗感应器
      if (modes) {
        return "开";
      } else {
        return "关";
      }
      break;
    case 21: //迷你遥控器（情景）
      if (modes) {
        return "按键" + modes;
      }
      break;
    case 22: //体征床垫
      switch (modes) {
        case 0:
          return "离床";
        case 1:
          return "右床缘";
        case 2:
          return "左床缘";
        case 3:
          return "坐床";
        case 4:
          return "躺床";
      }
      break;
    case 1: //温湿度计
    case 3: //跌倒偵測仪
    case 4: //烟雾侦测器
    case 5: //红外对射探测器
    case 6: //燃气探测器
    case 13: //PM2.5检测仪声光报警器
    case 14: //声光报警器
    case 16: //紧急按钮
    case 17: //水浸报警
    case 20: //一氧化碳探测器
    case 23: //体温探测器
      if (modes) {
        return global.alarmlist[modes - 1].Name;
      }
  }
  return "正常";
}
</script>