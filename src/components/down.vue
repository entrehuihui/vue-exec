<template>
  <div id="down">
    <div v-for="(v, i) in info.instructionInfos" :key="i">
      <!-- 开关 -->
      <div v-if="v.Type == 1" class="downselect">
        <div class="downselecttitle">
          <strong>{{global.language.switch}}</strong>
        </div>
        <div class="downswitch" v-on:click="down(1)">{{global.language.open}}</div>
        <div class="downswitch" v-on:click="down(2)">{{global.language.close}}</div>
      </div>
      <!-- 更新设备时间 -->
      <div v-if="v.Type == 3" class="downselect">
        <div class="downselecttitle">
          <strong>{{global.language.updatetime}}</strong>
        </div>
        <div
          class="downupdatetime"
          v-on:click="down(3,[new Date().getTime()])"
        >{{global.language.update}}</div>
      </div>
      <!-- 临时解除警报 -->
      <div v-if="v.Type == 4" class="downselect">
        <div class="downselecttitle">
          <strong>{{global.language.alarm}}</strong>
        </div>
        <div class="downupdatetime" v-on:click="down(4,[])">{{global.language.cancel}}</div>
      </div>
      <!-- 温湿度最大最小值 -->
      <div v-if="v.Type == 5" class="downselect">
        <div class="downselecttitle">
          <strong>{{global.language.temphuim}}</strong>
        </div>
        <div class="downtemp">
          <div class="downtempa">{{global.language.temp}}</div>
          <div class="downtempb">
            <div class="downtempba">max:</div>
            <input class="downtempba" type="number" ref="downtempmax">
            <div class="downtempba">min:</div>
            <input class="downtempba" type="number" ref="downtempmin">
          </div>
        </div>
        <div class="downtemp">
          <div class="downtempa">>{{global.language.humi}}</div>
          <div class="downtempb">
            <div class="downtempba">max:</div>
            <input class="downtempba" type="number" ref="downhuimmax">
            <div class="downtempba">min:</div>
            <input class="downtempba" type="number" ref="downhuimmin">
          </div>
        </div>
        <div class="downtempc" v-on:click="checktemp()">{{global.language.true}}</div>
      </div>
      <!-- 上传间隔 -->
      <div v-if="v.Type == 6" class="downselect">
        <div class="downselecttitle">
          <strong>{{global.language.uptime}}</strong>
        </div>
        <div class="downinterval">
          <div class="downintervala">{{global.language.time}}:</div>
          <div class="downintervala">
            <input type="number" placeholder="Unit:second" ref="downintervala">
          </div>
        </div>
        <div
          class="downtempc"
          v-on:click="checkintervala()"
          id="downintervalat"
        >{{global.language.true}}</div>
      </div>
      <!-- 采样频率 -->
      <div v-if="v.Type == 7" class="downselect">
        <div class="downselecttitle">
          <strong>{{global.language.samtime}}</strong>
        </div>
        <div class="downinterval">
          <div class="downintervala">{{global.language.time}}:</div>
          <div class="downintervala">
            <select ref="downfrequency" value="15">
              <option value="15">15s</option>
              <option value="30">30s</option>
              <option value="60">60s</option>
            </select>
          </div>
        </div>
        <div
          class="downtempc"
          v-on:click="checkfrequency()"
          id="downfrequencyt"
        >{{global.language.true}}</div>
      </div>
      <!-- 心跳间隔 -->
      <div v-if="v.Type == 8" class="downselect">
        <div class="downselecttitle">
          <strong>{{global.language.heardtime}}</strong>
        </div>
        <div class="downinterval">
          <div class="downintervala">{{global.language.time}}:</div>
          <div class="downintervala">
            <input type="number" placeholder="Unit:minute" ref="downheart">
          </div>
        </div>
        <div class="downtempc" v-on:click="downheart()" id="downheart">{{global.language.true}}</div>
      </div>
      <!-- 停止-->
      <div v-if="v.Type == 11" class="downselect">
        <div class="downselecttitle">
          <strong>{{global.language.devicestop}}</strong>
        </div>
        <div class="downupdatetime" v-on:click="down(11,[])">{{global.language.stop}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import req from "../global/request.vue";
export default {
  props: {
    info: {
      default: {}
    }
  },
  methods: {
    down: function(types = 0, data = []) {
      req.down(this.info.DevEUI, types, data).then(retData => {
        if (retData.Code != 200) {
          alert(this.global.language.failure);
        } else {
          alert(this.global.language.success);
        }
      });
    },
    downheart: function() {
      if (
        this.$refs.downheart[0].value == "" ||
        this.$refs.downheart[0].value < 1 ||
        this.$refs.downheart[0].value > 240
      ) {
        this.$refs.downheart.style = "border: 1px solid rgb(255, 0, 0)";
        return;
      }
      this.$refs.downheart.style = "border: 1px solid rgb(10, 10, 10)";
      this.down(8, [parseInt(this.$refs.downheart[0].value)]);
    },
    checkfrequency: function() {
      this.down(7, [parseInt(this.$refs.downfrequency[0].value)]);
    },
    checkintervala: function() {
      console.log(this.$refs.downintervala[0].value);

      if (
        this.$refs.downintervala[0].value == "" ||
        this.$refs.downintervala[0].value < 1 ||
        this.$refs.downintervala[0].value > 240
      ) {
        this.$refs.downintervala.style = "border: 1px solid rgb(255, 0, 0)";
        return;
      }
      this.$refs.downintervala.style = "border: 1px solid rgb(10, 10, 10)";
      this.down(6, [parseInt(this.$refs.downintervala[0].value)]);
    },
    checktemp: function() {
      if (
        this.$refs.downtempmax[0].value == "" ||
        this.$refs.downtempmax[0].value < 0 ||
        this.$refs.downtempmax[0].value > 120
      ) {
        this.$refs.downtempmax.style = "color: rgb(255, 0, 0)";
        return;
      }
      this.$refs.downtempmax.style = " color: black";
      if (
        this.$refs.downtempmin[0].value == "" ||
        this.$refs.downtempmin[0].value < -20 ||
        this.$refs.downtempmin[0].value > 100
      ) {
        this.$refs.downtempmin.style = "color: rgb(255, 0, 0)";
        return;
      }
      this.$refs.downtempmin.style = " color: black";
      if (this.$refs.downtempmin[0].value >= this.$refs.downtempmax[0].value) {
        this.$refs.downtempmin.style = "color: rgb(255, 0, 0)";
        this.$refs.downtempmax.style = "color: rgb(255, 0, 0)";
        return;
      }
      if (
        this.$refs.downhuimmax[0].value == "" ||
        this.$refs.downhuimmax[0].value < 40 ||
        this.$refs.downhuimmax[0].value > 100
      ) {
        this.$refs.downhuimmax.style = "color: rgb(255, 0, 0)";
        return;
      }
      this.$refs.downhuimmax.style = " color: black";
      if (
        this.$refs.downhuimmin[0].value == "" ||
        this.$refs.downhuimmin[0].value < 0 ||
        this.$refs.downhuimmin[0].value > 60
      ) {
        this.$refs.downhuimmin.style = "color: rgb(255, 0, 0)";
        return;
      }
      this.$refs.downhuimmin.style = " color: black";
      if (this.$refs.downhuimmin[0].value >= this.$refs.downhuimmax[0].value) {
        this.$refs.downhuimmin.style = "color: rgb(255, 0, 0)";
        this.$refs.downhuimmax.style = "color: rgb(255, 0, 0)";
        return;
      }
      this.down(5, [
        parseInt(this.$refs.downhuimmax[0].value),
        parseInt(this.$refs.downtempmax[0].value),
        parseInt(this.$refs.downhuimmin[0].value),
        parseInt(this.$refs.downtempmin[0].value)
      ]);
    },
    mounted() {}
  }
};
</script>

<style scoped>
@import url("./css/down.css");
</style>
