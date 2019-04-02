<template>
  <div id="devicesinfo" v-show="isShow">
    <div id="devicesinfoaffter"></div>
    <div id="devicesinfobefor">
      <div id="devicesinfobefort">
        <div id="devicesinfobefortop">X</div>
      </div>
      <div class="devicesinfoleft">
        <div id="devicesinfotitle">
          <strong>设备详情</strong>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">DevEUI</div>
          <div class="devicesinfodatab">{{info.DevEUI}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">设备名称</div>
          <div class="devicesinfodatab">{{info.DevName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">设备类型</div>
          <div class="devicesinfodatab">{{agreementName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">所属布局</div>
          <div class="devicesinfodatab">{{roomNUmName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">所属房间</div>
          <div class="devicesinfodatab">{{roomName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">设备状态</div>
          <div v-show="info.Status" class="devicesinfodatab">启用</div>
          <div v-show="!info.Status" class="devicesinfodatab">禁用</div>
        </div>
        <div class="devicesinfodata">
          <div
            v-show="!changeStatus"
            class="devicesinfodataade"
            id="devicesinfodataade"
            v-on:click="del"
          >删除</div>
          <div v-show="!changeStatus" v-on:click="change(true)" class="devicesinfodataade">修改</div>
          <div
            v-show="changeStatus"
            v-on:click="change(false)"
            class="devicesinfodataade"
            id="devicesinfodatature"
          >确定</div>
          <div
            v-show="info.Status && !changeStatus"
            v-on:click="statusChange(false)"
            class="devicesinfodataade"
          >禁用</div>
          <div
            v-show="!info.Status && !changeStatus"
            v-on:click="statusChange(true)"
            class="devicesinfodataade"
          >启用</div>
        </div>
      </div>
      <div class="devicesinforight"></div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      agreementName: "",
      changeStatus: false
    };
  },
  props: {
    isShow: {
      default: false
    },
    info: {
      default: {}
    },
    roomNUmName: {
      default: ""
    },
    roomName: {
      default: ""
    }
  },
  methods: {
    del: async function() {
      var retData = await req.del("/room/devices", {
        id: this.info.ID
      });
      if (retData.Code != 200) {
        alert("删除失败!");
        return;
      }
      alert("删除成功!");
    },
    change: async function(mothed = false) {
      this.changeStatus = mothed;
    },
    statusChange: async function(mothed = true) {}
  },
  watch: {
    isShow: function(newValue) {
      this.agreementName = this.global.agreementinfo[
        this.info.AgreementID
      ].Name;
      if (newValue) {
        this.changeStatus = false;
      }
    }
  }
};
</script>

<style scoped>
@import url("./css/devicesinfo.css");
</style>
