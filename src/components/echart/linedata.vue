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
    datainfo: {
      default: []
    }
  },
  methods: {
    init: function() {
      for (const key in this.datainfo.Time) {
        this.datainfo.Time[key] = new Date(
          this.datainfo.Time[key] * 1000
        ).toLocaleString();
      }
      var series = new Array();
      for (const key in this.datainfo.DataType) {
        series.push({
          name: this.datainfo.DataType[key],
          type: "line",
          data: this.datainfo.Data[key]
        });
      }

      this.chart = echarts.init(document.getElementById("chartlinedata"));
      this.chart.setOption({
        title: {
          text: "未来一周气温变化",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.datainfo.DataType
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          splitNumber: 3,
          data: this.datainfo.Time
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          }
        },
        series: series
      });
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    datainfo: function() {
      this.init();
    }
  }
};

function createValue(times, data) {
  var retData = new Array();
  for (const key in times) {
    retData.push({
      value: [new Date(times[key] * 1000).toLocaleString(), data[key]]
    });
  }
  return retData;
}
</script>

<style scoped>
</style>

