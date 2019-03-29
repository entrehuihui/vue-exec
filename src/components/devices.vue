<template>
  <div id="devices">
    <div class="devices_model">
      <div id="devices_title">{{name}}</div>
      <div id="devices_img">
        <img :src="img" alt>
      </div>
      <div id="devices_status">
        <div v-show="heart ? false:true" id="devices_heart0">离线</div>
        <div v-show="heart ? true: false" id="devices_heart1">在线</div>
        <div id="devices_type">{{statusType}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      default: ""
    },
    heart: {
      default: 0
    },
    statusType: {
      default: ""
    },
    img: {
      default: ""
    }
  }
};
</script>

<style scoped>
@import url("./css/devices.css");
</style>
