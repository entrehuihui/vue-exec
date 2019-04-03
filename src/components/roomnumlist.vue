<template>
  <div id="roomnumlist" v-show="isShow">
    <!-- 左侧栏 -->
    <div id="roomnumlist_left" v-on:click="returnMains()">
      <div id="roomnumlist_logo">
        <img src="/static/img/logo.png" alt>
      </div>
    </div>
    <!-- 顶部栏 -->
    <div id="roomnumlist_top">
      <div id="roomnumlist_title">
        <h1>布局列表</h1>
      </div>
      <div id="roomnumlist_top_return" v-on:click="returnMains()">
        <img src="/static/img/return.jpg" alt>
      </div>
      <div id="roomnumlist_select">
        <div>
          <div class="roomnumnlist_select_a">楼层:</div>
          <div>
            <input type="number" v-model="inputFloor">
          </div>
        </div>
        <div>
          <div class="roomnumnlist_select_a">布局编号:</div>
          <div>
            <input type="number" v-model="inputNum">
          </div>
        </div>
        <div>
          <button v-on:click="changePages(0)">确定</button>
          <button v-on:click="clearnCondition()">清除</button>
        </div>
        <div class="roomnumnlist_select_b" v-on:click="showAddroom(true)">添加</div>
      </div>
    </div>
    <!-- 数据栏 -->
    <div id="roomnumlist_data">
      <div class="roomnumlist_data_info_title">
        <div class="roomnumlist_data_a">编号</div>
        <div class="roomnumlist_data_b">名称</div>
        <div class="roomnumlist_data_c">楼层</div>
        <div class="roomnumlist_data_d">房屋编号</div>
        <div class="roomnumlist_data_e">备注</div>
        <div class="roomnumlist_data_f">状态</div>
        <div class="roomnumlist_data_g">操作</div>
      </div>
      <div class="roomnumlist_data_info" v-for="(v,k) in dataInfo" :key="k+1">
        <div class="roomnumlist_data_a">{{k+1}}</div>
        <div class="roomnumlist_data_b">{{v.Name}}</div>
        <div class="roomnumlist_data_c">{{v.Floor}}</div>
        <div class="roomnumlist_data_d">{{v.RoomNum}}</div>
        <div class="roomnumlist_data_e">{{v.Details}}</div>
        <div class="roomnumlist_data_f">
          <div :class="v.status ? 'roomnumlist_data_g_a_true' : 'roomnumlist_data_g_a_false'">已启用</div>
          <div :class="v.status ? 'roomnumlist_data_g_a_false' : 'roomnumlist_data_g_a_true'">已禁用</div>
        </div>
        <div class="roomnumlist_data_g">
          <div class="roomnumlist_data_g_a" v-on:click="showRoomlist(true, v.id, v.Name)">详情</div>
          <div class="roomnumlist_data_g_a" v-on:click="rommStatus(v)">
            <div :class="v.status ? 'roomnumlist_data_g_a_false' : 'roomnumlist_data_g_a_true'">启用</div>
            <div :class="v.status ? 'roomnumlist_data_g_a_true' : 'roomnumlist_data_g_a_false'">禁用</div>
          </div>
          <div class="roomnumlist_data_g_a" v-on:click="roomDel(v.id)">删除</div>
        </div>
      </div>
    </div>
    <!-- 页码栏 -->
    <div class="roomnumlist_button">
      <div :style="'left: '+(1420 - nowPages * 42)+'px'">
        <div class="roomnumlist_button_a" v-on:click="changePages(0)"><<</div>
        <div class="roomnumlist_button_a" v-on:click="changePages(pages -1)"><</div>
        <div
          class="roomnumlist_button_a"
          v-for="(v,k) in nowPages"
          :key="v"
          v-on:click="changePages(k)"
          :id="pages==k ? 'roomnumlist_button_a_show':''"
        >{{v}}</div>
        <div class="roomnumlist_button_a" v-on:click="changePages(pages +1)">></div>
        <div class="roomnumlist_button_a" v-on:click="changePages(allPages)">>></div>
      </div>
    </div>
    <addroomnum-buttun :isShow="addroomnumShow" v-on:transparentclose="showAddroom"></addroomnum-buttun>
    <room-list
      :roomNumName="selectRoomNumName"
      :roomNum="selectRoomNum"
      :isShow="roomlistShow"
      v-on:returnMains="showRoomlist"
    ></room-list>
  </div>
</template>

<script>
import req from "../global/request.vue";
import addroomnum from "../components/addroomnum.vue";
import roomlist from "../components/roomlist.vue";

export default {
  data: function() {
    return {
      dataInfo: [],
      addroomnumShow: false,
      roomlistShow: false,
      allPages: 1,
      nowPages: 1,
      pages: 0,
      status: false,
      inputNum: "",
      inputFloor: "",
      selectRoomNum: 0,
      selectRoomNumName: ""
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    roodID: {
      default: 0
    }
  },
  methods: {
    returnMains: function() {
      this.$emit("returnMains", false, this.status);
    },
    rommStatus: async function(v) {
      if (v.id == this.roodID) {
        this.status = true;
      }
      v.status = !v.status;
      var retData = await req.put("/roomnum", v);
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      alert("成功");
      this.getRomlist();
    },
    roomDel: async function(id) {
      if (id == this.roodID) {
        this.status = true;
      }
      var retData = await req.del("/roomnum", {
        id: id
      });
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      alert("删除成功");
      this.getRomlist();
    },
    getRomlist: async function() {
      var retData = await req.get(
        "/roomnum?offset=" +
          this.pages * 10 +
          "&limit=10&Floor=" +
          this.inputFloor +
          "&RoomNum=" +
          this.inputNum
      );
      if (retData.Code != 200) {
        return;
      }
      this.allPages = Math.ceil(retData.All / 10);
      if (this.allPages > 11) {
        this.nowPages = 11;
      } else {
        this.nowPages = this.allPages;
      }
      this.dataInfo = retData.Data;
      this.allPages -= 1;
    },
    showAddroom: function(mothod, result = false) {
      this.addroomnumShow = mothod;
      if (result) {
        this.getRomlist();
      }
    },
    changePages: function(pages) {
      if (pages < 0) {
        pages = 0;
      } else if (pages > this.allPages) {
        pages = this.allPages;
      }
      this.pages = pages;
      this.getRomlist();
    },
    clearnCondition: function() {
      // 清楚检索条件
      this.inputNum = "";
      this.inputFloor = "";
      this.changePages(0);
    },
    showRoomlist: function(mothod = false, id = 0, name = "") {
      if (!mothod) {
        if (id == this.roodID) {
          this.status = true;
        }
      }
      this.selectRoomNumName = name;
      this.selectRoomNum = id;
      this.roomlistShow = mothod;
    }
  },
  watch: {
    isShow: async function(newValue, oldValue) {
      if (newValue) {
        this.getRomlist();
      }
    },
    dataInfo: function(newValue, oldValue) {
      if (newValue.length == 0 && this.pages != 0) {
        this.pages -= 1;
        this.changePages(this.pages);
      }
    }
  },
  components: {
    "addroomnum-buttun": addroomnum,
    "room-list": roomlist
  }
};
</script>

<style scoped>
@import url("./css/roomnumlist.css");
</style>
