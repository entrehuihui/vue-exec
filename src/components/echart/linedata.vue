<template>
  <div id="linedata">
    <div id="chartlinedata" style="width: 870px;height: 360px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data: function() {
    return {
      chart: ""
    };
  },
  props: {
    xdata: {
      default: []
    },
    ydata: {
      default: []
    }
  },
  methods: {
    init: function() {
      var xdata = this.xdata;
      var ydata = this.ydata;
      for (const key in ydata) {
        ydata[key] = {
          data: ydata[key],
          type: "line",
          smooth: true
        };
      }
      this.chart = echarts.init(document.getElementById("chartlinedata"));
      this.chart.setOption({
        xAxis: {
          type: "category",
          data: xdata
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: ydata
      });
    }
  },
  mounted() {},
  watch: {
    xdata: function() {
      this.init();
    }
  }
};
</script>

<style scoped>
</style>

