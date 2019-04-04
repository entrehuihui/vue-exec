<template>
  <div id="mywebsocket"></div>
</template>
<script>
export default {
  data() {
    return {
      websock: null,
      oldwebsocket: null,
      url: ""
    };
  },
  props: {
    roomid: {
      default: 0
    }
  },
  methods: {
    initWebpack() {
      // 正式地址
      //   var wsuri =
      // this.url + this.global.userinfo.cookie + "&roomID=" + this.roomid;
      //初始化websocket 调试用
      var wsuri =
        "ws://120.78.76.139:8999/ws?maxiiot_user=" +
        this.global.userinfo.cookie +
        "&roomID=" +
        this.roomid;
      this.oldwebsocket = this.websock;
      this.websock = new WebSocket(wsuri); //这里面的this都指向vue
      this.websock.onopen = this.websocketopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
      this.websock.onerror = this.websocketerror;
      if (this.oldwebsocket) {
        this.oldwebsocket.close();
      }
    },
    websocketopen() {
      //打开
      console.log("WebSocket连接成功");
    },
    websocketonmessage(e) {
      //数据接收
      console.log(e.data);
      //   this.productinfos = JSON.parse(e.data);
    },
    websocketclose() {
      //关闭
      console.log("WebSocket关闭");
    },
    websocketerror() {
      //失败
      alert("WebSocket连接失败, 请重新登陆");
      this.$router.push("/");
    }
  },
  mounted() {
    var a = window.location.href;
    a = a.replace(/https{0,1}/, "ws");
    a = a.split("#")[0] + "ws?maxiiot_user=";
    this.url = a;
  },
  watch: {
    roomid: function(newValue) {
      if (newValue == 0) {
        return;
      }
      this.initWebpack();
    }
  }
};
</script>