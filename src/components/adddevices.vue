<template>
  <div id="adddevices" v-show="isShow">
    <div id="adddevices_bg"></div>
    <div id="adddevices_body">
      <div class="adddevices_body_top">
        <div class="adddevices_body_top_a">
          <strong>添加设备</strong>
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
        >控制设备</div>
        <div
          v-on:click="selectIndexValue(1)"
          :id="selelctIndex == 1 ? 'adddevices_body_title_a_click':''"
          class="adddevices_body_title_a"
        >安防设备</div>
        <div
          v-on:click="selectIndexValue(2)"
          :id="selelctIndex == 2 ? 'adddevices_body_title_a_click':''"
          class="adddevices_body_title_a"
        >检测设备</div>
      </div>
      <div class="adddevices_body_devices">
        <div class="adddevices_body_devices_a">
          <div
            class="adddevices_body_devices_select"
            v-for="(v, i) in agreements"
            :key="i"
            :id="agreementsIndex == v.ID ? 'adddevices_body_devices_select_index':''"
            v-on:click="selectAgreementsIndex(v.ID)"
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
          <div class="adddevices_body_devices_b">
            <strong>下一步</strong>
          </div>
          <div class="adddevices_body_devices_b" v-on:click="close">
            <strong>取消</strong>
          </div>
        </div>
      </div>
    </div>
    <div class></div>
  </div>
</template>

<script>
import req from "../global/request.vue";
export default {
  data: function() {
    return {
      selelctIndex: 0,
      agreements: [],
      agreementsIndex: 1
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectIndexValue: async function(index = 0) {
      this.selelctIndex = index;
      var retData = await req.get("/room/agreements?type=" + index);
      if (retData.Code != 200) {
        return;
      }
      if (retData.Data.length != 0) {
        this.agreementsIndex = retData.Data[0].ID;
      }
      this.agreements = retData.Data;
    },
    close: async function(mothod = false) {
      this.$emit("close", false);
    },
    selectAgreementsIndex: function(id) {
      this.agreementsIndex = id;
    }
  },
  watch: {
    isShow: function(newValue) {
      if (newValue) {
        this.selectIndexValue(this.selelctIndex);
      }
    }
  }
};
</script>

<style scoped>
@import url("./css/adddevices.css");
</style>
