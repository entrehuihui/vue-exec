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
              <option v-for="v in roomData">{{v.Name}}</option>
            </select>
            <div id="mains_roomadd">
              <div
                class="mains_add_room"
                id="mians_add_room_a"
                v-on:click="mains_addRoomNum(true)"
              >户型列表</div>
              <!-- <div
                class="mains_add_room"
                id="mians_add_room_b"
                v-on:click="mians_addRoom(true)"
              >添加房间</div>-->
            </div>
          </div>
          <div id="mains_set">
            <div class="mains_set_right" id="mains_alarm"></div>
            <div class="mains_set_right" id="mains_user"></div>
            <div class="mains_set_right" id="mains_qiuit"></div>
          </div>
        </div>
        <div id="mains_room">
          <div
            v-for="(v, index) in roomLayout"
            :class="active == index ? 'addclss':'original'"
            v-on:click="mains_getRoomDevices(index)"
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
        :name="v.DevName"
        :heart="v.Breathe"
        :statusType="v.Mode"
        :img="v.Img"
      ></milieu-devices>
    </div>
    <milieu-roomnumlist
      :isShow="addroomnumShow"
      v-on:returnMains="mains_addRoomNum"
      :roodID="roomData.length ?roomData[roomDataIndex].id : 0"
    ></milieu-roomnumlist>
    <milieu-adddevices :isShow="adddevicesShow" v-on:close="mains_adddevicesclose"></milieu-adddevices>
  </div>
</template>

<script>
import req from "../global/request.vue";
import milieu from "../components/milieu.vue";
import devices from "../components/devices.vue";
import roomnumlist from "../components/roomnumlist.vue";
import adddevices from "../components/adddevices.vue";
export default {
  data: function() {
    return {
      roomData: [],
      roomDataIndex: 0, //选择的布局index
      roomLayout: [],
      active: -1, //选中的房间
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
      devicesType: 99
    };
  },
  methods: {
    mains_select: select,
    mians_getRoomLatyout: getRoomLatyout,
    mains_getRoomDevices: getRoomDevices,
    mains_addRoomNum: addRoomNumf,
    mains_showAdddevices: showAdddevices,
    mains_adddevicesclose: adddevicesclose
  },
  watch: {},
  mounted() {
    this.mains_select();
  },
  components: {
    "milieu-info": milieu,
    "milieu-devices": devices,
    "milieu-roomnumlist": roomnumlist,
    "milieu-adddevices": adddevices
  }
};

async function adddevicesclose(mothod = false) {
  this.adddevicesShow = mothod;
}

async function showAdddevices(mothod = false) {
  this.adddevicesShow = mothod;
}

async function addRoomNumf(mothod = false, status = false) {
  this.addroomnumShow = mothod;
  if (status) {
    this.$refs.mains_select.selectedIndex = 0;
    this.mains_select();
  }
}

async function select() {
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
  }
}

// getRoomLatyout
async function getRoomLatyout() {
  if (this.roomDataIndex == -1) {
    this.roomDataIndex = 0;
  }
  var retData = await req.get(
    "/room?RoomNum=" + this.roomData[this.roomDataIndex].id
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

  var id = this.roomLayout[index].id;
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

