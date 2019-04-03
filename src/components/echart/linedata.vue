<template>
  <div id="linedata">
    <div :id="'chartlinedata'+keys" style="width: 860px;height: 300px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    options: {
      default: {}
    },
    keys: {
      default: ""
    }
  },
  methods: {
    init: function() {
      this.$refs.linedata;
      var chart = echarts.init(
        document.getElementById("chartlinedata" + this.keys)
      );
      chart.setOption(this.options);
    }
  },
  mounted() {
    this.init();
  },
  watch: {}
};
</script>

<style scoped>
#linedata {
  position: relative;
  float: left;
}
</style>

