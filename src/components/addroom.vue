<template>
  <div id="addroom" v-show="isShow">
    <div id="addroominfo_transparent"></div>
    <div id="addroominfo_entity">
      <div id="addroominfo_close" v-on:click="transparentclose()">
        <img src="/static/img/error.png" alt>
      </div>
      <div id="addroominfo_input_name">添加房间</div>
      <div id="addroominfo_input_top_a">
        <div class="addroominfo_info_c">
          <div class="addroominfo_info_b">房间名称：</div>
          <div class="addroominfo_info_b">房间所属布局：</div>
          <div class="addroominfo_info_b">房间详情：</div>
          <div class="addroominfo_info_b">房间状态：</div>
        </div>
        <div class="addroominfo_info_c">
          <input
            @blur="checkName"
            :class="name? 'addroominfo_info_d' :'addroominfo_info_d_false'"
            v-model="inputName"
            type="text"
          >
          <!-- <select
            @blur="checkNum"
            :class="num ?'addroominfo_info_d':'addroominfo_info_d_false'"
            v-model="inputNum"
          >
            <option v-for="v in roomInfoData" :key="v.id" :value="v.id">{{v.Name}}</option>
          </select>-->
          <input type="text" class="addroominfo_info_d" readonly="readonly" :value="roomNumName">
          <input
            @blur="checkDetails"
            :class="details ?'addroominfo_info_d':'addroominfo_info_d_false'"
            v-model="inputDetails"
            type="text"
          >
          <select class="addroominfo_info_d" v-model="inputStatus">
            <option id="addroominfo_info_d_true" value="true">启用</option>
            <option id="addroominfo_info_d_flase" value="false">禁用</option>
          </select>
        </div>
      </div>
      <div class="addroominfo_bbuttton">
        <button id="addroominfo_info_d_true" v-on:click="transparentTrue()">确定</button>
        <button id="addroominfo_info_d_false" v-on:click="transparentclose()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import req from "../global/request.vue";
export default {
  data: function() {
    return {
      inputName: null,
      inputNum: null,
      inputDetails: null,
      inputStatus: true,
      name: true,
      num: true,
      details: true,
      roomInfoData: []
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    roomNumName: {
      default: ""
    },
    roomNum: {
      default: ""
    }
  },
  methods: {
    transparentclose: function(mothod) {
      this.inputName = null;
      this.inputNum = null;
      this.inputDetails = null;
      this.inputStatus = true;
      this.name = true;
      this.num = true;
      this.details = true;
      this.$emit("transparentclose", false, mothod);
    },
    transparentTrue: postData,
    checkName: function() {
      if (!this.inputName) {
        this.name = false;
        return;
      }
      this.name = true;
    },
    checkNum: async function() {
      if (this.roomInfoData == null || this.roomInfoData.length == 0) {
        var retData = await req.get("/roomnum");
        if (retData.Code != 200) {
          return;
        }
        this.roomInfoData = retData.Data;
      }
    },
    checkDetails: function() {
      if (this.inputDetails && this.inputDetails.length > 250) {
        this.details = false;
        return;
      }
      this.details = true;
    }
  },
  watch: {
    isShow: async function(oldValue, newValue) {
      if (!newValue) {
        var retData = await req.get("/roomnum");
        if (retData.Code != 200) {
          return;
        }
        this.roomInfoData = retData.Data;
      }
    }
  }
};

async function postData() {
  if (!this.inputName) {
    this.name = false;
    return;
  }

  // if (!this.inputNum || this.inputNum <= 0) {
  //   this.num = false;
  //   return;
  // }

  if (this.inputDetails && this.inputDetails.length > 250) {
    this.details = false;
    return;
  }

  var retData = await req.post("/room", {
    details: this.inputDetails,
    name: this.inputName,
    roomNumID: parseInt(this.roomNum),
    status: true
  });
  if (retData.Code != 200) {
    return;
  }
  this.transparentclose(true);
}
</script>

<style scoped>
@import url("./css/addroom.css");
</style>
