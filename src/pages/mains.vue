<template>
  <div id="mains">
    <div id="mains_left">
      <div id="mains_logo">
        <img src="/static/img/logo.png" alt>
      </div>
      <div
        class="mains_title"
        :id="devicesType == 99 ? 'mains_title_change':''"
        v-on:click="mains_getRoomDevices()"
      >
        <img src="/static/img/hvsetting.png" alt>
        <a>
          <strong>所有设备</strong>
        </a>
      </div>
      <div
        class="mains_title"
        :id="devicesType == 0 ? 'mains_title_change':''"
        v-on:click="mains_getRoomDevices(-1, 0)"
      >
        <img src="/static/img/hvdevice.png" alt>
        <a>
          <strong>控制设备</strong>
        </a>
      </div>
      <div
        class="mains_title"
        :id="devicesType == 1 ? 'mains_title_change':''"
        v-on:click="mains_getRoomDevices(-1, 1)"
      >
        <img src="/static/img/hvanfang.png" alt>
        <a>
          <strong>安防设备</strong>
        </a>
      </div>
      <div
        class="mains_title"
        :id="devicesType == 2 ? 'mains_title_change':''"
        v-on:click="mains_getRoomDevices(-1, 2)"
      >
        <img src="/static/img/hvjiance.png" alt>
        <a>
          <strong>监测设备</strong>
        </a>
      </div>
      <div class="mains_title" id="mains_title_adddevices" v-on:click="mains_showAdddevices(true)">
        <!-- <img src="/static/img/hvjiance.png" alt> -->
        <a>
          <strong>+添加设备</strong>
        </a>
      </div>
    </div>
    <div id="mains_topall">
      <div id="mains_top">
        <div id="mains_Setting">
          <div id="mains_roomNum">
            <div id="mains_roomName">户型名称</div>
            <select v-on:click="mains_select()" ref="mains_select">
              <option v-for="(v,i) in roomData" :key="i">{{v.Name}}</option>
            </select>
            <div id="mains_roomadd">
              <div
                class="mains_add_room"
                id="mians_add_room_a"
                v-on:click="mains_addRoomNum(true)"
              >户型列表</div>
            </div>
          </div>
          <div id="mains_set">
            <div class="mains_set_right" id="mains_alarm" v-on:click="messageClose(true)">
              <img src="/static/img/message_top.png" alt>
              <div id="mains_alarmnum" v-show="aralmNum">{{aralmNum}}</div>
            </div>
            <div class="mains_set_right" id="mains_user" v-on:click="userClose(true)">
              <img src="/static/img/topimg.png" alt x>
              <div>{{global.userinfo.name}}</div>
            </div>
            <div class="mains_set_right" id="mains_qiuit" v-on:click="signout">EXIT</div>
          </div>
        </div>
        <div id="mains_room">
          <div
            v-for="(v, index) in roomLayout"
            :class="active == index ? 'addclss':'original'"
            v-on:click="mains_getRoomDevices(index)"
            :key="index"
          >{{v.Name}}</div>
        </div>
      </div>
      <div id="mains_info">
        <milieu-info
          v-show="isShow"
          :temp="roomInfoData.temp"
          :elec="roomInfoData.humi"
          :PM25="roomInfoData.pm25"
        ></milieu-info>
      </div>
    </div>
    <div id="mains_devices">
      <milieu-devices
        v-for="v in roomDevicesInfo"
        :key="v.ID"
        :info="v"
        :roomNUmName="roomData[roomDataIndex].Name"
        :roomName="roomLayout[active].Name"
        v-on:close="mains_getRoomDevicesStatus"
        :roomStatus="roomLayout[active].status"
      ></milieu-devices>
    </div>
    <milieu-roomnumlist
      :isShow="addroomnumShow"
      v-on:returnMains="mains_addRoomNum"
      :roodID="roomData.length ?roomData[roomDataIndex].id : 0"
    ></milieu-roomnumlist>
    <milieu-adddevices
      :isShow="adddevicesShow"
      v-on:close="mains_showAdddevices"
      :roomData="roomLayout"
      :roomDataIndex="active"
    ></milieu-adddevices>
    <message :isShow="messageShow" v-on:close="messageClose" v-on:aralmnum="dealAralmNum"></message>
    <user :isShow="userShow" v-on:close="userClose"></user>
    <websocket :roomid="roomid" v-on:retdata="mysocketdata"></websocket>
    <!-- 报警弹窗 -->
    <div v-show="alarmdata.length">
      <div class="devicesalarm"></div>
      <div class="devicesalarminfo">
        <div class="devicesalarminfotitle">
          实时报警数据
          <div class="devicesalarminfoclose" v-on:click="mysocketdataClose">X</div>
        </div>
        <div class="devicesalarminfost">
          <div class="devicesalarminfosta">
            <div class="devicesalarminfosdepict">描述</div>
            <div class="devicesalarminfostime">时间</div>
            <div class="devicesalarminfosrooma">地点</div>
            <div class="devicesalarminfosroomb">设备</div>
            <div class="devicesalarminfosroomc">操作</div>
          </div>
          <div
            v-for="(v, i) in alarmdata"
            :key="i"
            class="devicesalarminfosta"
            style="color:rgb(250, 3, 3)"
          >
            <div class="devicesalarminfosdepict">{{v.alarm}}</div>
            <div class="devicesalarminfostime">{{v.time}}</div>
            <div class="devicesalarminfosrooma">{{v.roomNum}}-{{v.room}}</div>
            <div class="devicesalarminfosroomb">{{v.name}}</div>
            <div class="devicesalarminfosroomcc" v-on:click="mysocketdatapull(v.id)">处理</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import req from "../global/request.vue";
import milieu from "../components/milieu.vue";
import devices from "../components/devices.vue";
import roomnumlist from "../components/roomnumlist.vue";
import adddevices from "../components/adddevices.vue";
import websocket from "../pages/websocket.vue";
import message from "../components/message.vue";
import user from "../components/user.vue";
export default {
  data: function() {
    return {
      roomData: [],
      roomDataIndex: 0, //选择的布局index
      roomLayout: [], //房间
      active: -1, //选中的房间
      roomid: 0,
      roomInfoData: {
        temp: "",
        humi: "",
        pm25: ""
      },
      isShow: false,
      roomDevicesInfo: {},
      addroomnumShow: false,
      addroomShow: false,
      adddevicesShow: false,
      roomnumListShow: false,
      devicesType: 99,
      alarmdata: [],
      messageShow: false,
      userShow: false,
      aralmNum: 0
    };
  },
  methods: {
    mains_select: select,
    mians_getRoomLatyout: getRoomLatyout,
    mains_getRoomDevices: getRoomDevices,
    mains_getRoomDevicesStatus: function(mothed = false) {
      if (mothed) {
        this.mains_getRoomDevices();
      }
    },
    mains_addRoomNum: addRoomNumf,
    mains_showAdddevices: showAdddevices,
    initagreementsinfo: async function() {
      var retData = await req.get("/room/agreements?a=1");
      if (retData.Code != 200) {
        return;
      }
      for (const v of retData.Data) {
        this.global.agreementinfo[v.ID] = {
          Name: v.Name,
          Heartbeat: v.Heartbeat,
          Style: v.Style,
          Switchs: v.Switchs
        };
      }
    },
    mysocketdata: function(data) {
      data = JSON.parse(data);
      // 数据类型判断
      switch (data.types) {
        case 0: //心跳
          break;
        case 1: //数据
          for (const key in this.roomDevicesInfo) {
            if (this.roomDevicesInfo[key].ID == data.id) {
              this.roomDevicesInfo[key].Breathe = true;
            }
          }
          break;
        case 2: //报警
          var alarm = {};
          alarm.id = data.id;
          alarm.room = data.data[1];
          alarm.alarm = data.data[2];
          alarm.time = new Date(data.times * 1000).toLocaleString();
          alarm.name = data.name;
          var roomnumID = data.data[0];
          for (const key in this.roomData) {
            if (this.roomData[key].id == roomnumID) {
              alarm.roomNum = this.roomData[key].Name;
            }
          }
          this.alarmdata.unshift(alarm);
          this.dealAralmNum(1);
          break;
        case 3: //状态
          for (const key in this.roomDevicesInfo) {
            if (this.roomDevicesInfo[key].ID == data.id) {
              this.roomDevicesInfo[key].Mode = data.data;
            }
          }
          break;
      }
      for (const key in this.roomDevicesInfo) {
        if (this.roomDevicesInfo[key].ID == data.id) {
          this.roomDevicesInfo[key].Breathe = true;
        }
      }
    },
    mysocketdataClose: async function() {
      this.alarmdata = [];
    },
    mysocketdatapull: async function(id) {
      var retData = await req.put("/alarmdata", {
        ids: [id]
      });
      if (retData.Code != 200) {
        alert("处理失败");
        return;
      }
      for (const key in this.alarmdata) {
        if (this.alarmdata[key].id == id) {
          this.alarmdata.splice(key, 1);
          break;
        }
      }
      this.dealAralmNum(-1);
    },
    messageClose: function(mothed = false) {
      this.messageShow = mothed;
      if (!mothed) {
        this.getalarmnum();
      }
    },
    userClose: function(mothed = false) {
      this.userShow = mothed;
    },
    signout: function() {
      req.del("/login");
      this.global.userinfo = {};
      this.$router.push("/");
    },
    getalarmnum: async function() {
      var retData = await req.get("/alarmdata?limit=1&status=0");
      if (retData.Code != 200) {
        return;
      }
      this.aralmNum = retData.All;
    },
    dealAralmNum: function(num = 1) {
      this.aralmNum = this.aralmNum + num;
    }
  },
  watch: {},
  mounted() {
    if (!this.global.userinfo.cookie) {
      this.$router.push("/");
    }
    this.mains_select();
    this.initagreementsinfo();
    this.getalarmnum();
  },
  components: {
    "milieu-info": milieu,
    "milieu-devices": devices,
    "milieu-roomnumlist": roomnumlist,
    "milieu-adddevices": adddevices,
    websocket,
    message,
    user
  }
};
async function showAdddevices(mothod = false, status = false) {
  this.adddevicesShow = mothod;
  if (status) {
    this.mains_getRoomDevices(this.active, this.devicesType);
  }
}

async function addRoomNumf(mothod = false, status = false) {
  this.addroomnumShow = mothod;
  if (status) {
    this.$refs.mains_select.selectedIndex = 0;
    this.mains_select(true);
  }
}

async function select(status = false) {
  var retData = await req.get("/roomnum?status=true");
  if (retData.Code != 200) {
    return;
  }
  this.roomData = retData.Data;
  //判断获取的布局是否为空 或者选中的布局是否改变
  if (
    this.roomData.length != 0 &&
    this.roomDataIndex != this.$refs.mains_select.selectedIndex
  ) {
    this.roomDevicesInfo = {};
    this.roomDataIndex = this.$refs.mains_select.selectedIndex;
    this.mians_getRoomLatyout();
  } else if (status) {
    this.mians_getRoomLatyout();
  }
}

// getRoomLatyout
async function getRoomLatyout() {
  if (this.roomDataIndex == -1) {
    this.roomDataIndex = 0;
  }
  var retData = await req.get(
    "/room?status=true&RoomNum=" + this.roomData[this.roomDataIndex].id
  );
  if (retData.Code != 200) {
    return;
  }
  this.roomLayout = retData.Data;
  if (this.roomLayout.length != 0) {
    this.isShow = true;
  } else {
    this.isShow = false;
  }
  this.mains_getRoomDevices(0);
}

async function getRoomDevices(index = -1, types = 99) {
  this.devicesType = types;
  if (this.roomLayout.length == 0) {
    return;
  }
  if (index == -1) {
    index = this.active;
  } else {
    this.active = index;
  }
  var id = this.roomLayout[this.active].id;
  this.roomid = id;
  this.roomInfoData = {
    temp: "",
    humi: "",
    pm25: ""
  };
  var retData = await req.get("/roomdata?ID=" + id);
  if (retData.Code == 200) {
    // 获取房间温度
    this.roomInfoData = {
      temp: retData.Data.temp > 0 ? retData.Data.temp : "",
      humi: retData.Data.humi > 0 ? retData.Data.humi : "",
      pm25: retData.Data.pm25 > 0 ? retData.Data.pm25 : ""
    };
  }

  // 获取设备信息
  this.roomDevicesInfo = {};
  var url = "/room/devices?roomID=" + id;
  if (types != 99) {
    url += "&type=" + types;
  }
  var retData = await req.get(url);
  if (retData.Code != 200) {
    return;
  }
  this.roomDevicesInfo = getDevicesInfo(retData.Data);
}

function getDevicesInfo(data) {
  var retData = {};
  for (const v of data) {
    v.Img = "/static/img/" + v.AgreementID + "_0.png";
    switch (v.AgreementID) {
      case 1:
        break;

      default:
        break;
    }
    retData[v.ID] = v;
  }

  return retData;
}
</script>

<style scoped>
@import url("./css/mains.css");
</style>

