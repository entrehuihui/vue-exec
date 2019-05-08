<template>
  <div id="devicesinfo" v-show="isShow">
    <div id="devicesinfobefor">
      <div id="devicesinfobefort">
        <div
          class="devicesinfobefortopa"
          id="devicesinfobefortopa1"
          ref="devicesinfobefortopa1"
          v-show="!selectindexShow"
          v-on:click="selectindex(false)"
        >
          <strong>{{global.language.data}}</strong>
        </div>
        <div
          class="devicesinfobefortopa"
          id="devicesinfobefortopa2"
          ref="devicesinfobefortopa2"
          v-on:click="selectindex(true)"
        >
          <strong>{{global.language.down}}</strong>
        </div>
        <div id="devicesinfobefortop" v-on:click="close(false)">X</div>
      </div>
      <div class="devicesinfoleft">
        <div id="devicesinfotitle">
          <strong>{{global.language.details}}</strong>
        </div>
        <div class="devicesinfodata" id="devicesinfodataEUI">
          <div class="devicesinfodataa">DevEUI</div>
          <div class="devicesinfodatab">{{infos.DevEUI}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">{{global.language.name}}</div>
          <div class="devicesinfodatab">{{infos.DevName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">{{global.language.types}}</div>
          <div class="devicesinfodatab">{{agreementName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">{{global.language.apartment}}</div>
          <div class="devicesinfodatab">{{roomNUmName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">{{global.language.room}}</div>
          <div class="devicesinfodatab">{{roomName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">{{global.language.status}}</div>
          <div v-show="infos.Status" class="devicesinfodatab">{{global.language.able}}</div>
          <div v-show="!infos.Status" class="devicesinfodatab">{{global.language.disable}}</div>
        </div>
        <div class="devicesinfodata">
          <div
            v-show="!changeStatus"
            class="devicesinfodataade"
            id="devicesinfodataade"
            v-on:click="del"
          >{{global.language.delete}}</div>
          <div
            v-show="!changeStatus"
            v-on:click="change(true)"
            class="devicesinfodataade"
          >{{global.language.update}}</div>
          <div
            v-show="changeStatus"
            v-on:click="change(false)"
            class="devicesinfodatature"
          >{{global.language.cancel}}</div>
          <div
            v-show="changeStatus"
            v-on:click="change(false)"
            class="devicesinfodatature"
          >{{global.language.true}}</div>
          <div
            v-show="infos.Status && !changeStatus"
            v-on:click="statusChange(false)"
            class="devicesinfodataade"
          >{{global.language.disable}}</div>
          <div
            v-show="!infos.Status && !changeStatus"
            v-on:click="statusChange(true)"
            class="devicesinfodataade"
          >{{global.language.able}}</div>
        </div>
      </div>
      <div v-show="info2.ID" class="devicesinfoleft">
        <div id="devicesinfotitle">
          <strong>{{global.language.linkdevices}}</strong>
        </div>
        <div
          class="devicesinfolinkRelease"
          v-on:click="linkRelease"
        >{{global.language.Disassociate}}</div>
        <div class="devicesinfodata" id="devicesinfodataEUI2">
          <div class="devicesinfodataa">DevEUI</div>
          <div class="devicesinfodatab">{{info2.DevEUI}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">{{global.language.name}}</div>
          <div class="devicesinfodatab">{{info2.DevName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">{{global.language.types}}</div>
          <div class="devicesinfodatab">{{agreementName2}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">{{global.language.apartment}}</div>
          <div class="devicesinfodatab">{{roomNUmName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">{{global.language.room}}</div>
          <div class="devicesinfodatab">{{roomName}}</div>
        </div>
        <div class="devicesinfodata">
          <div class="devicesinfodataa">{{global.language.status}}</div>
          <div v-show="info2.Status" class="devicesinfodatab">{{global.language.able}}</div>
          <div v-show="!info2.Status" class="devicesinfodatab">{{global.language.disable}}</div>
        </div>
        <div class="devicesinfodata">
          <div
            v-show="!changeStatus2"
            class="devicesinfodataade"
            id="devicesinfodataade"
            v-on:click="del"
          >{{global.language.delete}}</div>
          <div
            v-show="!changeStatus2"
            v-on:click="change(false, true)"
            class="devicesinfodataade"
          >{{global.language.update}}</div>
          <div
            v-show="changeStatus2"
            v-on:click="change(false, false)"
            class="devicesinfodatature"
          >{{global.language.cancel}}</div>
          <div
            v-show="changeStatus2"
            v-on:click="change(false, false)"
            class="devicesinfodatature"
          >{{global.language.true}}</div>
          <div
            v-show="info2.Status && !changeStatus2"
            v-on:click="statusChange(false)"
            class="devicesinfodataade"
          >{{global.language.disable}}</div>
          <div
            v-show="!info2.Status && !changeStatus2"
            v-on:click="statusChange(true)"
            class="devicesinfodataade"
          >{{global.language.able}}</div>
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
            <div class="linkDataname">{{global.language.name}}</div>
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
          <div class="linkDatatruea" v-on:click="selectLink(false)">{{global.language.cancel}}</div>
          <div class="linkDatatruea" v-on:click="selectLink(true)">{{global.language.true}}</div>
        </div>
      </div>
      <div class="devicesinforight">
        <div
          v-show="line.length && !selectindexValue"
          class="devicesinforighta"
          v-for="(v, i) in line"
          :key="i+info.ID"
        >
          <linedata :options="v" :keys="info.ID+'echart'+i"></linedata>
        </div>
        <div v-if="infos.AgreementID==22 && line.length==1" class="linedatapng">
          <img class="linedatapnga" src="/static/img/pic.jpg" alt>
        </div>
        <div v-show="selectindexValue" class="devicesinforighta">
          <down v-if="info.ID" :info="info" key="info.ID + '_'+info.ID">{{info.instructionInfos}}</down>
        </div>
        <div v-show="selectindexValue" class="devicesinforighta">
          <down
            v-if="info2.ID"
            :info="info2"
            key="info2.ID + '_'+info.ID"
          >{{info2.instructionInfos}}</down>
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
import down from "../components/down.vue";
// import { fail } from "assert";
export default {
  data: function() {
    return {
      agreementName: "",
      agreementName2: "",
      changeStatus: false,
      changeStatus2: false,
      changeData: false,
      linkspoint: this.global.language.clink,
      showAddLink: false,
      linkData: [],
      linkID: {},
      info2: {},
      infos: {},
      datashow: {},
      line: [],
      timer: null,
      selectindexValue: false,
      selectindexShow: false
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
        alert("fail!");
      } else {
        alert("success!");
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
        alert("fail!");
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
        this.linkspoint = this.global.language.failure;
        return;
      }
      if (retData.Data.length < 2) {
        this.linkspoint = "";
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
        return;
      }
      var retData = await req.post("/room/devices/deviceslinks", {
        id: this.info.ID,
        uid: this.linkID.ID
      });
      this.showAddLink = false;
      if (retData.Code != 200) {
        alert(this.global.language.failure);
        return;
      }
      this.info2 = this.linkID;
      //把关联设备ID返回给父组件
      this.$emit("retlinkid", [this.info2, this.info]);
      alert(this.global.language.success);
      this.decideDatashow();
    },
    getInfo2: async function() {
      var retData = await req.get(
        "/room/devices/GetDevicesLinkinfo?ID=" + this.info.ID
      );
      if (retData.Code != 200) {
        return;
      }
      this.info2 = retData.Data;
      if (this.info2.ID) {
        this.agreementName2 = this.global.agreementinfo[
          this.info2.AgreementID
        ].Name;
        //把关联设备ID返回给父组件
        this.$emit("retlinkid", [this.info2, this.info]);
      }
    },
    linkRelease: async function() {
      var retData = await req.del("/room/devices/deviceslinks", {
        id: this.info2.ID
      });
      if (retData.Code != 200) {
        alert(this.global.language.failure);
        return;
      }
      //把关联设备ID返回给父组件
      this.$emit("retlinkid", [this.info2, this.info], true);
      this.info2 = {};
      this.info.info2 = {};
      alert(this.global.language.success);
      this.decideDatashow();
    },
    setTimer() {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          this.decideDatashow();
        }, 60000);
      }
    },
    decideDatashow: decideDatashow,
    selectindex: function(mothed) {
      this.selectindexValue = mothed;
    }
  },
  components: {
    linedata,
    down
  },
  watch: {
    isShow: async function(newValue) {
      clearInterval(this.timer);
      this.timer = null;
      if (newValue) {
        this.setTimer();
        // this.agreementName = "";
        // this.agreementName2 = "";
        this.changeStatus = false;
        this.changeStatus2 = false;
        this.changeData = false;
        this.linkspoint = this.global.language.clink;
        this.showAddLink = false;
        this.linkData = [];
        this.linkID = {};
        this.info2 = {};
        this.infos = {};
        this.datashow = {};
        this.agreementName = this.global.agreementinfo[
          this.info.AgreementID
        ].Name;
        await this.getInfo2();
        this.decideDatashow();
        this.changeStatus = false;
        this.infos = this.info;
      }
    },
    selectindexValue: function(mothed) {
      clearInterval(this.timer);
      this.timer = null;
      if (mothed) {
        this.$refs.devicesinfobefortopa1.style =
          "background: rgb(241, 239, 239)";
        this.$refs.devicesinfobefortopa2.style =
          "background: rgb(247, 161, 161)";
        //拉取下行协议
        req
          .get("/instructionInfos?AgreementID=" + this.info.AgreementID)
          .then(retData => {
            if (retData.Code != 200) {
              return;
            }
            this.info.instructionInfos = retData.Data;
            if (this.info2.AgreementID == this.info.AgreementID) {
              this.info2.instructionInfos = retData.Data;
            }
            this.$forceUpdate();
          });
        if (this.info2.ID) {
          if (this.info2.AgreementID == this.info.AgreementID) {
            return;
          }
          req
            .get("/instructionInfos?AgreementID=" + this.info2.AgreementID)
            .then(retData => {
              if (retData.Code != 200) {
                return;
              }
              this.info2.instructionInfos = retData.Data;
              this.$forceUpdate();
            });
        }
      } else {
        this.$refs.devicesinfobefortopa2.style =
          "background: rgb(241, 239, 239)";
        this.$refs.devicesinfobefortopa1.style =
          "background: rgb(247, 161, 161)";
        this.setTimer();
      }
    }
  }
};

async function decideDatashow() {
  if (!this.isShow) {
    return;
  }
  this.line = new Array();
  var datalist = await getData(this.info.ID);
  if (
    (datalist.length == 1 && datalist[0].ID != 0) ||
    (datalist.length == 2 && (datalist[0].ID != 0 || datalist[1].ID != 0))
  ) {
    this.line = mychart.line(datalist);
    this.selectindexValue = false;
    this.selectindexShow = false;
  } else {
    this.selectindexShow = true;
    this.selectindexValue = true;
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
