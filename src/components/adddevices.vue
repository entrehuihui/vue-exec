<template>
  <div id="adddevices" v-show="isShow">
    <div id="adddevices_bg"></div>
    <div id="adddevices_body">
      <div class="adddevices_body_top">
        <div class="adddevices_body_top_a">
          <strong>{{global.language.adddevice}}</strong>
        </div>
        <div>
          <strong
            class="adddevices_body_top_a"
            id="adddevices_body_top_a_close"
            v-on:click="close"
          >X</strong>
        </div>
      </div>
      <div class="adddevices_body_title">
        <div
          v-on:click="selectIndexValue(0)"
          :id="selelctIndex == 0 ? 'adddevices_body_title_a_click':''"
          class="adddevices_body_title_a"
        >{{global.language.condevice}}</div>
        <div
          v-on:click="selectIndexValue(1)"
          :id="selelctIndex == 1 ? 'adddevices_body_title_a_click':''"
          class="adddevices_body_title_a"
        >{{global.language.security}}</div>
        <div
          v-on:click="selectIndexValue(2)"
          :id="selelctIndex == 2 ? 'adddevices_body_title_a_click':''"
          class="adddevices_body_title_a"
        >{{global.language.detectdevice}}</div>
      </div>
      <div class="adddevices_body_devices">
        <div class="adddevices_body_devices_a">
          <div
            class="adddevices_body_devices_select"
            v-for="(v, i) in agreements"
            :key="i"
            :id="agreementsIndex == v.ID ? 'adddevices_body_devices_select_index':''"
            v-on:click="selectAgreementsIndex(v.ID, v.Name)"
          >
            <div class="adddevices_body_devices_select_i">
              <img
                class="adddevices_body_devices_select_img"
                :src="'/static/img/addimg/'+v.ID+'.png'"
                alt
              >
            </div>
            <div class="adddevices_body_devices_select_title">{{v.Name}}</div>
          </div>
        </div>
        <div>
          <div class="adddevices_body_devices_b" v-on:click="showAddNext">
            <strong>{{global.language.next}}</strong>
          </div>
          <div class="adddevices_body_devices_b" v-on:click="close">
            <strong>{{global.language.cancel}}</strong>
          </div>
        </div>
      </div>
      <div class="adddevices_next" v-show="addNextShow">
        <div class="adddevices_info">
          <div class="adddevices_inforight">
            <div class="adddevices_inforight_a">
              <div>
                <div class="adddevices_inforight_atext">search</div>
                <input
                  class="adddevices_inforight_ainput"
                  v-model="searchValue"
                  type="text"
                  v-on:blur="getDevicesInfo"
                  v-on:keyup.enter="getDevicesInfo"
                >
                <div class="adddevices_inforight_asure" v-on:click="getDevicesInfo">
                  <strong>{{global.language.true}}</strong>
                </div>
              </div>
            </div>
            <div class="adddevices_inforight_bn">
              <div class="adddevices_inforight_bnn">{{global.language.name}}</div>
              <div class="adddevices_inforight_bnn" id="adddevices_inforight_bnneui">EUI</div>
            </div>
            <div class="adddevices_inforight_b">
              <div
                class="adddevices_infodev"
                v-for="(v, i) in devicesInfoData"
                :key="i"
                v-on:click="deviceSelectIndex(v)"
                :id="devicesEUI==v.devEUI ? 'adddevices_inforight_index':''"
              >
                <div class="adddevices_infodevname">{{v.name}}</div>
                <div class="adddevices_infodeveui">{{v.devEUI}}</div>
              </div>
            </div>
          </div>
          <div class="adddevices_infoleft">
            <div class="adddevices_infoleftimg">
              <img :src="'/static/img/addimg/'+agreementsIndex+'.png'" alt>
              <div>{{agreementsName}}</div>
            </div>
            <div class="adddevices_infoleftdata">
              <div class="adddevices_infoleftdata_a">
                <div class="adddevices_infoleftdata_aa">{{global.language.name}} :</div>
                <input
                  type="text"
                  v-model="createName"
                  v-on:blur="checkCreateName"
                  ref="createName"
                  placeholder="The device name is 4-20 characters long."
                >
              </div>
              <div class="adddevices_infoleftdata_a">
                <div class="adddevices_infoleftdata_aa">{{global.language.selectdevice}} :</div>
                <input type="text" v-model="devicesName" readonly="readonly">
              </div>
              <div class="adddevices_infoleftdata_a">
                <div class="adddevices_infoleftdata_aa">{{global.language.room}} :</div>
                <select ref="selectroom">
                  <option v-for="(v, i) in roomData" :key="i" :value="v.id">{{v.Name}}</option>
                </select>
              </div>
              <div class="adddevices_infoleftdata_a">
                <div class="adddevices_infoleftdata_aa">{{global.language.status}} :</div>
                <select v-model="createStatus">
                  <option :value="true">{{global.language.able}}</option>
                  <option :value="false">{{global.language.disable}}</option>
                </select>
              </div>
              <div class="adddevices_infoleftdata_a">
                <div class="adddevices_infoleftdata_aa">{{global.language.details}} :</div>
                <input type="text" v-model="createDetails">
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="adddevices_body_devices_b" v-on:click="createDevices">
            <strong>{{global.language.true}}</strong>
          </div>
          <div class="adddevices_body_devices_b" v-on:click="showAddNext(false)">
            <strong>{{global.language.return}}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import req from "../global/request.vue";
export default {
  data: function() {
    return {
      selelctIndex: 0,
      agreements: [],
      agreementsIndex: 1,
      agreementsName: "",
      addNextShow: false,
      devicesInfoData: [],
      searchValue: "",
      devicesEUI: "",
      devicesName: "",
      createName: "",
      createDetails: "",
      createStatus: true
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    roomData: {
      default: []
    },
    roomDataIndex: {
      default: 0
    }
  },
  methods: {
    selectIndexValue: async function(index = 0) {
      this.selelctIndex = index;
      var retData = await req.get("/room/agreements?type=" + index);
      if (retData.Code != 200) {
        return;
      }
      //语言选择
      this.agreements = retData.Data;
      if (this.global.languageselect == 1) {
        for (const key in this.agreements) {
          this.agreements[key].Name = this.agreements[key].Name1;
        }
      }
      if (this.agreements.length != 0) {
        this.agreementsIndex = this.agreements[0].ID;
        this.agreementsName = this.agreements[0].Name;
      }
    },
    close: async function(mothod = false, status = false) {
      this.$emit("close", false, status);
    },
    selectAgreementsIndex: function(id, name) {
      this.agreementsIndex = id;
      this.agreementsName = name;
    },
    showAddNext: function(mothod = true) {
      this.addNextShow = mothod;
    },
    getDevicesInfo: async function() {
      var retData = await req.get(
        "/room/devices/loraServerDevices?search=" + this.searchValue
      );
      if (retData.Code != 200) {
        return;
      }
      this.devicesInfoData = retData.Data;
    },
    deviceSelectIndex: function(v) {
      this.devicesEUI = v.devEUI;
      this.devicesName = v.name;
      this.createName = v.name;
      this.checkCreateName();
    },
    checkCreateName: function() {
      if (this.createName == "" || this.createName.length < 4) {
        this.$refs.createName.style.border = "1px solid rgb(255, 0, 0)";
        return this.global.language.addfail1;
      }
      this.$refs.createName.style.border = "1px solid rgb(15, 15, 15)";
      return false;
    },
    createDevices: async function() {
      var check = this.checkCreateName();
      if (check) {
        alert(check);
        return;
      }
      if (this.devicesEUI.length != 16) {
        alert(this.global.language.addfail2);
        return;
      }
      if (
        this.roomData.length <= this.roomDataIndex ||
        this.roomData[this.roomDataIndex].id <= 0
      ) {
        alert(this.global.language.addfail3);
        return;
      }
      if (this.createDetails.length > 255) {
        alert(this.global.language.addfail4);
        return;
      }
      if (this.agreementsIndex <= 0) {
        alert(this.global.language.addfail5);
        return;
      }
      var retData = await req.post("/room/devices", {
        DevEUI: this.devicesEUI,
        agreementID: this.agreementsIndex,
        details: this.createDetails,
        devName: this.createName,
        roomID: this.roomData[this.roomDataIndex].id,
        status: this.createStatus
      });
      console.log(retData);

      if (retData.Code != 200) {
        alert(this.global.language.failure);
        return;
      }
      this.close(false, true);
      alert(this.global.language.success);
    }
  },
  watch: {
    isShow: function(newValue) {
      if (newValue) {
        this.searchValue = "";
        this.selectIndexValue(this.selelctIndex);
      } else {
        this.addNextShow = false;
      }
    },
    addNextShow: function(newValue) {
      if (newValue) {
        this.getDevicesInfo();
        this.$refs.selectroom.selectedIndex = this.roomDataIndex;
        this.devicesEUI = "";
        this.devicesName = "";
        this.createName = "";
        this.createStatus = true;
      }
    }
  }
};
</script>

<style scoped>
@import url("./css/adddevices.css");
</style>
