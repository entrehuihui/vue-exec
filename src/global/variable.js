{/* <script>
export default {
    data:function () {
        return{
            // 警告图片
            alarm:9900,
            // 弹窗图层
            pop:8800,
            othen:7700,
        }
    }
}
</script> */}


const alarm = 9900;
const pop = 8800;
const othen = 7700;
var agreementinfo = {};
var roominfo = {};
var userinfo = {
    cookie: "",
    ID: 0,
    permission: 2,
    name: ""
}
var localhost = "http://120.78.76.139:8999"

export default {
    alarm,
    pop,
    othen,
    roominfo,
    agreementinfo,
    userinfo,
    localhost
}