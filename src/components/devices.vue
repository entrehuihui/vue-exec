<template>
  <div id="devices">
    <div class="devices_model">
      <div id="devices_title">{{info.DevName}}</div>
      <div v-on:click="closeDevice" v-show="info.Switchs && info.Mode" class="devices_switch">
        <div ref="deviceopen" id="devices_switch_a"></div>
      </div>
      <div v-on:click="openDevice" v-show="info.Switchs && !info.Mode" class="devices_switchb">
        <div ref="deviceclose" id="devices_switch_b"></div>
      </div>
      <div id="devices_img" v-on:click="clickhere(true, false)">
        <img :src="info.Img" alt>
      </div>
      <div id="devices_status">
        <div v-show="info.Breathe ? false:true" id="devices_heart0">离线</div>
        <div v-show="info.Breathe ? true: false" id="devices_heart1">在线</div>
        <div v-show="roomStatus && info.Status" id="devices_type">{{info.Modedetails}}</div>
        <div v-show="!roomStatus || !info.Status" id="devices_diable">禁用</div>
      </div>
    </div>
    <devicesinfo
      :isShow="devicesinfoShow"
      :info="info"
      :roomNUmName="roomNUmName"
      :roomName="roomName"
      v-on:close="clickhere"
      v-on:retlinkid="retlinkid"
    ></devicesinfo>
  </div>
</template>

<script>
import req from "../global/request.vue";
import devicesinfo from "../components/devicesinfo.vue";
export default {
  props: {
    info: {
      default: {
        ID: "",
        DevEUI: "",
        CreatedAt: "",
        UpdatedAt: "",
        DevName: "",
        Details: "",
        RoomID: "",
        AgreementID: "",
        Mode: "",
        Breathe: "",
        Style: "",
        Switchs: "",
        Status: "",
        Img: ""
      }
    },
    roomNUmName: {
      default: ""
    },
    roomName: {
      default: ""
    },
    roomStatus: {
      default: false
    },
    Breathe: {
      default: false
    }
  },
  data: function() {
    return {
      devicesinfoShow: false,
      timer: null
    };
  },
  methods: {
    close: async function(status = false) {
      if (status) {
        this.$emit("close", status);
      }
    },
    closeDevice: async function() {
      var retData = await req.down(this.info.DevEUI, 2);
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      this.$refs.deviceclose.style.left = "0px";
      this.$refs.deviceopen.style.left = "10px";
    },
    openDevice: async function() {
      var retData = await req.down(this.info.DevEUI, 1);
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      this.$refs.deviceopen.style.left = "20px";
      this.$refs.deviceclose.style.left = "10px";
    },
    clickhere: async function(mothed = false, status = false) {
      this.devicesinfoShow = mothed;
      this.close(status);
    },
    retlinkid: function(linkid, models) {
      //把关联设备ID返回给父组件
      this.$emit("retlinkid", linkid, models);
    },
    //定时器
    setTimer() {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          this.info.Breathe = false;
        }, 1000 * this.info.BreatheNum + 30000); //
      }
    }
  },
  components: {
    devicesinfo
  },
  watch: {
    Breathe: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.setTimer();
    }
  },
  created: function() {
    this.setTimer();
  }
};
</script>

<style scoped>
@import url("./css/devices.css");
</style>
