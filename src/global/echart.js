
import global from "@/global/variable.js";
export default {
    line
}


function line(datainfos) {
    var opt = new Array;
    for (const datainfo of datainfos) {
        if (!datainfo.ID) {
            opt.push({})
            continue;
        }
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
        var ymax = 0;
        switch (datainfo.AgreementID) {
            case 22:
                ymax = 5;
                break;
            case 2:
                ymax = 8;
                break;
            default:
                break;
        }
        opt.push({
            title: {
                text: global.agreementinfo[datainfo.AgreementID].Name,
                // text: datainfo.Name,
            },
            // animation: false,
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
                },
                max: ymax,
            },
            series: series
        })
    }
    return opt;
}