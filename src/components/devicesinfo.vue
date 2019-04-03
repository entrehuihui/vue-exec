<template>
  <div id="devicesinfo" v-show="isShow">
    <div id="devicesinfobefor">
      <div id="devicesinfobefort">
        <div id="devicesinfobefortop" v-on:click="close(false)">X</div>
      </div>
      <div class="devicesinfoleft">
        <div id="devicesinfotitle">
          <strong>设备详情</strong>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">DevEUI</div>
          <div class="devicesinfodatab">{{infos.DevEUI}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">设备名称</div>
          <div class="devicesinfodatab">{{infos.DevName}}</div>
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
          <div v-show="infos.Status" class="devicesinfodatab">启用</div>
          <div v-show="!infos.Status" class="devicesinfodatab">禁用</div>
        </div>
        <div class="devicesinfodata">
          <div
            v-show="!changeStatus"
            class="devicesinfodataade"
            id="devicesinfodataade"
            v-on:click="del"
          >删除</div>
          <div v-show="!changeStatus" v-on:click="change(true)" class="devicesinfodataade">修改</div>
          <div v-show="changeStatus" v-on:click="change(false)" class="devicesinfodatature">取消</div>
          <div v-show="changeStatus" v-on:click="change(false)" class="devicesinfodatature">确定</div>
          <div
            v-show="infos.Status && !changeStatus"
            v-on:click="statusChange(false)"
            class="devicesinfodataade"
          >禁用</div>
          <div
            v-show="!infos.Status && !changeStatus"
            v-on:click="statusChange(true)"
            class="devicesinfodataade"
          >启用</div>
        </div>
      </div>
      <div v-show="info2.ID" class="devicesinfoleft">
        <div id="devicesinfotitle">
          <strong>关联设备详情</strong>
        </div>
        <div class="devicesinfolinkRelease" v-on:click="linkRelease">解除关联</div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">DevEUI</div>
          <div class="devicesinfodatab">{{info2.DevEUI}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">设备名称</div>
          <div class="devicesinfodatab">{{info2.DevName}}</div>
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
          <div v-show="info2.Status" class="devicesinfodatab">启用</div>
          <div v-show="!info2.Status" class="devicesinfodatab">禁用</div>
        </div>
        <div class="devicesinfodata">
          <div
            v-show="!changeStatus2"
            class="devicesinfodataade"
            id="devicesinfodataade"
            v-on:click="del"
          >删除</div>
          <div
            v-show="!changeStatus2"
            v-on:click="change(false, true)"
            class="devicesinfodataade"
          >修改</div>
          <div
            v-show="changeStatus2"
            v-on:click="change(false, false)"
            class="devicesinfodatature"
          >取消</div>
          <div
            v-show="changeStatus2"
            v-on:click="change(false, false)"
            class="devicesinfodatature"
          >确定</div>
          <div
            v-show="info2.Status && !changeStatus2"
            v-on:click="statusChange(false)"
            class="devicesinfodataade"
          >禁用</div>
          <div
            v-show="!info2.Status && !changeStatus2"
            v-on:click="statusChange(true)"
            class="devicesinfodataade"
          >启用</div>
        </div>
      </div>
      <div v-show="!info2.ID && !showAddLink" class="devicesinfoleft" v-on:click="getLinksData">
        <div class="devicesinfoleftlink">
          <strong>{{linkspoint}}</strong>
        </div>
      </div>
      <div v-show="showAddLink" class="devicesinfoleft">
        <div class="linkData">
          <div class="linkDataa1">
            <div class="linkDataname">设备名</div>
            <div class="linkDataeui">EUI</div>
          </div>
          <div
            class="linkDataa"
            v-for="(v, i) in linkData"
            :key="i"
            v-on:click="selectLink(false, v)"
            :id="v.ID == linkID.ID ? 'linkDataaID': ''"
            v-show="info.ID != v.ID"
          >
            <div class="linkDataname">{{v.DevName}}</div>
            <div class="linkDataeui">{{v.DevEUI}}</div>
          </div>
        </div>
        <div class="linkDatatrue">
          <div class="linkDatatruea" v-on:click="selectLink(false)">取消</div>
          <div class="linkDatatruea" v-on:click="selectLink(true)">确定</div>
        </div>
      </div>
      <div class="devicesinforight">
        <div class="devicesinforighta" v-for="(v, i) in line" :key="i">
          <linedata :options="v" :keys="i"></linedata>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts'
import req from "../global/request.vue";
import mychart from "../global/echart.js";
import linedata from "../components/echart/linedata.vue";
// import { fail } from "assert";
export default {
  data: function() {
    return {
      agreementName: "",
      changeStatus: false,
      changeStatus2: false,
      changeData: false,
      linkspoint: "点击关联设备",
      showAddLink: false,
      linkData: [],
      linkID: {},
      info2: {},
      infos: {},
      datashow: {},
      line: []
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
      } else {
        alert("删除成功!");
      }
      this.changeData = true;
      this.close(false);
    },
    change: async function(mothed = false, mothed2 = false) {
      this.changeStatus = mothed;
      this.changeStatus2 = mothed2;
    },
    statusChange: async function(mothed = true) {
      var retData = await req.put("/room/devices", {
        agreementID: this.info.AgreementID,
        details: this.info.Details,
        devName: this.info.DevName,
        id: this.info.ID,
        roomID: this.info.RoomID,
        status: mothed
      });
      if (retData.Code != 200) {
        alert("失败!");
        return;
      }
      this.infos.Status = mothed;
      this.changeData = true;
    },
    close: function(mothod = false, status = false) {
      this.$emit("close", false, this.changeData);
    },
    getLinksData: async function() {
      var retData = await req.get(
        "/room/devices/GetDevicesLinkstrue?roomID=" + this.info.RoomID
      );
      if (retData.Code != 200) {
        this.linkspoint = "获取出错!";
        return;
      }
      if (retData.Data.length < 2) {
        this.linkspoint = "没有其他设备!";
        return;
      }
      this.showAddLink = true;
      this.linkData = retData.Data;
    },
    selectLink: async function(mothed = false, v = null) {
      if (v) {
        this.linkID = v;
        return;
      }
      if (!mothed) {
        this.showAddLink = false;
      }
      var retData = await req.post("/room/devices/deviceslinks", {
        id: this.info.ID,
        uid: this.linkID.ID
      });
      this.showAddLink = false;
      if (retData.Code != 200) {
        alert("关联失败!");
        return;
      }
      this.info2 = this.linkID;
      alert("关联成功!");
    },
    getInfo2: async function() {
      var retData = await req.get(
        "/room/devices/GetDevicesLinkinfo?ID=" + this.info.ID
      );
      if (retData.Code != 200) {
        return;
      }
      this.info2 = retData.Data;
    },
    linkRelease: async function() {
      var retData = await req.del("/room/devices/deviceslinks", {
        id: this.info2.ID
      });
      if (retData.Code != 200) {
        alert("解除失败!");
        return;
      }
      this.info2 = {};
      alert("解除成功!");
    },
    decideDatashow: decideDatashow
  },
  components: {
    linedata
  },
  watch: {
    isShow: function(newValue) {
      this.agreementName = this.global.agreementinfo[
        this.info.AgreementID
      ].Name;
      if (newValue) {
        this.decideDatashow(this.info, this.info2);
        this.getInfo2();
        this.changeStatus = false;
        this.infos = this.info;
        this.changeData = false;
        this.linkspoint = "点击关联设备";
        this.showAddLink = false;
        this.datashow = {};
      }
    }
  }
};

async function decideDatashow(v) {
  var data = await getData(v.ID);
  if (data) {
    this.line = mychart.line(data);
  }
}

async function getData(id) {
  var retData = await req.get("/room/devicesData?deviceID=" + id);
  if (retData.Code != 200) {
    return null;
  }
  return retData.Data;
}
</script>

<style scoped>
@import url("./css/devicesinfo.css");
</style>
