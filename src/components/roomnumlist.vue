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
        <h1>{{global.language.apartmentlist}}</h1>
      </div>
      <div id="roomnumlist_top_return" v-on:click="returnMains()">
        <img src="/static/img/return.jpg" alt>
      </div>
      <div id="roomnumlist_select">
        <div>
          <div class="roomnumnlist_select_a">{{global.language.floor}}:</div>
          <div>
            <input type="number" v-model="inputFloor">
          </div>
        </div>
        <div>
          <div class="roomnumnlist_select_a">{{global.language.number}}:</div>
          <div>
            <input type="number" v-model="inputNum">
          </div>
        </div>
        <div>
          <button v-on:click="changePages(0)">{{global.language.true}}</button>
          <button v-on:click="clearnCondition()">{{global.language.cancel}}</button>
        </div>
        <div
          class="roomnumnlist_select_b"
          v-on:click="showAddroom(true)"
          v-show="global.userinfo.permission<2"
        >{{global.language.add}}</div>
      </div>
    </div>
    <!-- 数据栏 -->
    <div id="roomnumlist_data">
      <div class="roomnumlist_data_info_title">
        <div class="roomnumlist_data_a">{{global.language.number}}</div>
        <div class="roomnumlist_data_b">{{global.language.name}}</div>
        <div class="roomnumlist_data_c">{{global.language.floor}}</div>
        <div class="roomnumlist_data_d">{{global.language.number}}</div>
        <div class="roomnumlist_data_e">{{global.language.details}}</div>
        <div class="roomnumlist_data_f">{{global.language.status}}</div>
        <div class="roomnumlist_data_g">{{global.language.manipulate}}</div>
      </div>
      <div class="roomnumlist_data_info" v-for="(v,k) in dataInfo" :key="k+1">
        <div class="roomnumlist_data_a">{{k+1}}</div>
        <div class="roomnumlist_data_b">{{v.Name}}</div>
        <div class="roomnumlist_data_c">{{v.Floor}}</div>
        <div class="roomnumlist_data_d">{{v.RoomNum}}</div>
        <div class="roomnumlist_data_e">{{v.Details}}</div>
        <div class="roomnumlist_data_f">
          <div
            :class="v.status ? 'roomnumlist_data_g_a_true' : 'roomnumlist_data_g_a_false'"
          >{{global.language.able}}</div>
          <div
            :class="v.status ? 'roomnumlist_data_g_a_false' : 'roomnumlist_data_g_a_true'"
          >{{global.language.disable}}</div>
        </div>
        <div class="roomnumlist_data_g">
          <div class="roomnumlist_data_g_a" v-on:click="roomDel(v.id)">{{global.language.delete}}</div>
          <div class="roomnumlist_data_g_a" v-on:click="rommStatus(v)">
            <div
              :class="v.status ? 'roomnumlist_data_g_a_false' : 'roomnumlist_data_g_a_true'"
            >{{global.language.able}}</div>
            <div
              :class="v.status ? 'roomnumlist_data_g_a_true' : 'roomnumlist_data_g_a_false'"
            >{{global.language.disable}}</div>
          </div>
          <div
            class="roomnumlist_data_g_a"
            v-on:click="showRoomlist(true, v.id, v.Name)"
          >{{global.language.details}}</div>
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
          v-on:click="changePages(k+pagesOffset)"
          :id="pages==k+pagesOffset ? 'roomnumlist_button_a_show':''"
        >{{v+pagesOffset}}</div>
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
      pagesOffset: 0,
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
      alert(global.language.success);
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
      alert(global.language.success);
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

      //   页面点击效果图
      if (this.allPages < 12) {
        this.pagesOffset = 0;
      } else if (this.pages > this.allPages - 6) {
        this.pagesOffset = this.allPages - 11;
      } else if (this.pages > 5) {
        this.pagesOffset = this.pages - 5;
      } else {
        this.pagesOffset = 0;
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
