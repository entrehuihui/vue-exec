<template>
  <div id="addroomnum" v-show="isShow">
    <div id="addroomnum_transparent" v-on:click="transparentclose()"></div>
    <div id="addroomnum_entity">
        <div id="addroom_input_name">添加户型</div>
        <div id="addroom_input_top_a">
          <div class="addroom_info_c">
            <div class="addroom_info_b">户型名称：</div>
            <div class="addroom_info_b">户型楼层：</div>
            <div class="addroom_info_b">户型门牌：</div>
            <div class="addroom_info_b">户型详情：</div>
            <div class="addroom_info_b">户型状态：</div>
          </div>
          <div  class="addroom_info_c">
            <input class="addroom_info_d" type="text" name="" id="">
            <input class="addroom_info_d" type="number" name="" id="">
            <input class="addroom_info_d" type="number" name="" id="">
            <input class="addroom_info_d" type="text" name="" id="">
            <select class="addroom_info_d">
              <option value=true>启用</option>
              <option value=false>禁用</option>
            </select>
          </div>
      </div>
      <div class="addroom_bbuttton">
        <button>确定</button>
        <button>取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    transparentclose: function() {
      this.$emit("transparentclose");
    }
  }
};
</script>

<style scoped>
@import url("./css/addroomnum.css");
</style>
