import global from '@/global/variable.js'
export default {
    line
}


function line(datainfos) {
    var opt = new Array;
    for (const datainfo of datainfos) {
        var series = new Array();
        for (const key in datainfo.Time) {
            datainfo.Time[key] = new Date(
                datainfo.Time[key] * 1000
            ).toLocaleString();
        }
        for (const key in datainfo.DataType) {
            series.push({
                name: datainfo.DataType[key],
                type: "line",
                data: datainfo.Data[key]
            });
        }
        opt.push({
            title: {
                // text: global.agreementinfo[datainfo.AgreementID].Name + "-" + datainfo.Name,
                text: datainfo.Name,
            },
            animation: false,
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: datainfo.DataType
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
                data: datainfo.Time
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value}"
                }
            },
            series: series
        })
    }
    return opt;
}