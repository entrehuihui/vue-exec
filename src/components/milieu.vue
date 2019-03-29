<template>
  <div id="milieu">
    <div id="temp" class="milieu_info" ref="temp">
      <div>
        <img src="/static/img/1_0.png">
      </div>
      <div>
        <div class="milieu_data">
          <div class="milieu_name">温度</div>
          <div class="milieu_datainfo">{{temp}}</div>
        </div>
      </div>
    </div>
    <div id="elec" class="milieu_info" ref="elec">
      <div>
        <img src="/static/img/1_0.png">
      </div>
      <div>
        <div class="milieu_data">
          <div class="milieu_name">湿度</div>
          <div class="milieu_datainfo">{{elec}}</div>
        </div>
      </div>
    </div>
    <div id="PM25" class="milieu_info" ref="PM25">
      <div>
        <img src="/static/img/13_0.png">
      </div>
      <div>
        <div class="milieu_data">
          <div class="milieu_name">PM2.5</div>
          <div class="milieu_datainfo">{{PM25}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    temp: {
      default: 0
    },
    elec: {
      default: 0
    },
    PM25: {
      default: 0
    }
  },
  methods: {
    updateData: function(temp, elec, pm25) {}
  },
  mounted() {
    this.updateData(0, 0, 0);
  }
};
</script>

<style scoped>
@import url("./css/milieu.css");
</style>
