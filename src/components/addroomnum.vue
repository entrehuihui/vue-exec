<template>
  <div id="addroomnum" v-show="isShow">
    <div id="addroomnum_transparent"></div>
    <div id="addroomnum_entity">
      <div id="addroom_close" v-on:click="transparentclose()">
        <img src="/static/img/error.png" alt>
      </div>
      <div id="addroom_input_name">添加户型</div>
      <div id="addroom_input_top_a">
        <div class="addroom_info_c">
          <div class="addroom_info_b">户型名称：</div>
          <div class="addroom_info_b">户型楼层：</div>
          <div class="addroom_info_b">户型门牌：</div>
          <div class="addroom_info_b">户型详情：</div>
          <div class="addroom_info_b">户型状态：</div>
        </div>
        <div class="addroom_info_c">
          <input
            @blur="checkName"
            :class="name? 'addroom_info_d' :'addroom_info_d_false'"
            v-model="inputName"
            type="text"
          >
          <input
            @blur="checkFloor"
            :class="floor ?'addroom_info_d':'addroom_info_d_false'"
            v-model="inputFloor"
            type="number"
          >
          <input
            @blur="checkNum"
            :class="num ?'addroom_info_d':'addroom_info_d_false'"
            v-model="inputNum"
            type="number"
          >
          <input
            @blur="checkDetails"
            :class="details ?'addroom_info_d':'addroom_info_d_false'"
            v-model="inputDetails"
            type="text"
          >
          <select class="addroom_info_d" v-model="inputStatus">
            <option id="addroom_info_d_true" value="true">启用</option>
            <option id="addroom_info_d_flase" value="false">禁用</option>
          </select>
        </div>
      </div>
      <div class="addroom_bbuttton">
        <button id="addroom_info_d_true" v-on:click="transparentTrue()">确定</button>
        <button id="addroom_info_d_false" v-on:click="transparentclose()">取消</button>
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
      inputFloor: null,
      inputNum: null,
      inputDetails: null,
      inputStatus: true,
      name: true,
      floor: true,
      num: true,
      details: true
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    transparentclose: function() {
      this.inputName = "";
      this.inputFloor = null;
      this.inputNum = null;
      this.inputDetails = null;
      this.inputStatus = true;
      this.$emit("transparentclose");
    },
    transparentTrue: postData,
    checkName: function() {
      // @blur="passwordOver()"
      if (!this.inputName) {
        this.name = false;
        return;
      }
      this.name = true;
    },
    checkFloor: function() {
      if (!this.inputFloor || this.inputFloor <= 0) {
        this.floor = false;
        return;
      }
      this.floor = true;
    },
    checkNum: function() {
      if (!this.inputNum || this.inputNum <= 0) {
        this.num = false;
        return;
      }
      this.num = true;
    },
    checkDetails: function() {
      if (this.inputDetails && this.inputDetails.length > 250) {
        this.details = false;
        return;
      }
      this.details = true;
    }
  }
};

async function postData() {
  if (!this.inputName) {
    this.name = false;
    return;
  }
  // this.name = true;

  if (!this.inputFloor || this.inputFloor <= 0) {
    this.floor = false;
    return;
  }
  // this.floor = true;

  if (!this.inputNum || this.inputNum <= 0) {
    this.num = false;
    return;
  }
  // this.num = true;

  if (this.inputDetails && this.inputDetails.length > 250) {
    this.details = false;
    return;
  }
  // this.details = true;

  var retData = await req.post("/roomnum", {
    details: this.inputDetails,
    floor: parseInt(this.inputFloor),
    name: this.inputName,
    roomNum: parseInt(this.inputNum),
    status: true
  });
  if (retData.Code != 200) {
    alert(retData.Msg);
    return;
  }
  this.transparentclose(false);
}
</script>

<style scoped>
@import url("./css/addroomnum.css");
</style>
