<template>
  <div id="roomlist" v-show="isShow">
    <!-- 左侧栏 -->
    <div id="roomlist_left" v-on:click="returnMains()">
      <div id="roomlist_logo">
        <img src="/static/img/logo.png" alt>
      </div>
    </div>
    <!-- 顶部栏 -->
    <div id="roomlist_top">
      <div id="roomlist_title">
        <h1>{{global.language.details}}</h1>
      </div>
      <div id="roomlist_top_return" v-on:click="returnMains()">
        <img src="/static/img/return.jpg" alt>
      </div>
      <div id="roomlist_select">
        <div>
          <div class="roomnlist_select_a">{{global.language.floor}}:</div>
          <div>
            <input type="number" v-model="inputFloor">
          </div>
        </div>
        <div>
          <div class="roomnlist_select_a">{{global.language.number}}:</div>
          <div>
            <input type="number" v-model="inputNum">
          </div>
        </div>
        <div>
          <button v-on:click="changePages(0)">{{global.language.true}}</button>
          <button v-on:click="clearnCondition()">{{global.language.cancel}}</button>
        </div>
        <div
          class="roomnlist_select_b"
          v-on:click="showAddroom(true)"
          v-show="global.userinfo.permission<2"
        >{{global.language.add}}</div>
      </div>
    </div>
    <!-- 数据栏 -->
    <div id="roomlist_data">
      <div class="roomlist_data_info_title">
        <div class="roomlist_data_a">{{global.language.number}}</div>
        <div class="roomlist_data_b">{{global.language.name}}</div>
        <div class="roomlist_data_c">{{global.language.apartment}}</div>
        <div class="roomlist_data_e">{{global.language.details}}</div>
        <div class="roomlist_data_f">{{global.language.status}}</div>
        <div class="roomlist_data_g">{{global.language.manipulate}}</div>
      </div>
      <div class="roomlist_data_info" v-for="(v,k) in dataInfo" :key="k+1">
        <div class="roomlist_data_a">{{k+1}}</div>
        <div class="roomlist_data_b">{{v.Name}}</div>
        <div class="roomlist_data_c">{{roomNumName}}</div>
        <div class="roomlist_data_e">{{v.Details}}</div>
        <div class="roomlist_data_f">
          <div
            :class="v.status ? 'roomlist_data_g_a_true' : 'roomlist_data_g_a_false'"
          >{{global.language.able}}</div>
          <div
            :class="v.status ? 'roomlist_data_g_a_false' : 'roomlist_data_g_a_true'"
          >{{global.language.disable}}</div>
        </div>
        <div class="roomlist_data_g">
          <!-- <div class="roomlist_data_g_a">详情</div> -->
          <div class="roomlist_data_g_a" v-on:click="rommStatus(v)">
            <div
              :class="v.status ? 'roomlist_data_g_a_false' : 'roomlist_data_g_a_true'"
            >{{global.language.able}}</div>
            <div
              :class="v.status ? 'roomlist_data_g_a_true' : 'roomlist_data_g_a_false'"
            >{{global.language.disable}}</div>
          </div>
          <div class="roomlist_data_g_a" v-on:click="roomDel(v.id)">{{global.language.delete}}</div>
        </div>
      </div>
    </div>
    <!-- 页码栏 -->
    <div class="roomlist_button">
      <div :style="'left: '+(1420 - nowPages * 42)+'px'">
        <div class="roomlist_button_a" v-on:click="changePages(0)"><<</div>
        <div class="roomlist_button_a" v-on:click="changePages(pages -1)"><</div>
        <div
          class="roomlist_button_a"
          v-for="(v,k) in nowPages"
          :key="v"
          v-on:click="changePages(k+pagesOffset)"
          :id="pages==k +pagesOffset? 'roomlist_button_a_show':''"
        >{{v+pagesOffset}}</div>
        <div class="roomlist_button_a" v-on:click="changePages(pages +1)">></div>
        <div class="roomlist_button_a" v-on:click="changePages(allPages)">>></div>
      </div>
    </div>
    <addroom-buttun
      :roomNumName="roomNumName"
      :roomNum="roomNum"
      :isShow="addroomShow"
      v-on:transparentclose="showAddroom"
    ></addroom-buttun>
  </div>
</template>

<script>
import req from "../global/request.vue";
import addroom from "../components/addroom.vue";

export default {
  data: function() {
    return {
      dataInfo: [],
      addroomShow: false,
      allPages: 1,
      nowPages: 1,
      pages: 0,
      pagesOffset: 0,
      changeStatus: 0,
      inputNum: "", //检索房间号
      inputFloor: "" // 检索楼层
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    roomNum: {
      default: 0
    },
    roomNumName: {
      default: ""
    }
  },
  methods: {
    returnMains: function() {
      this.$emit("returnMains", false, this.changeStatus);
    },
    rommStatus: async function(v) {
      v.status = !v.status;
      var retData = await req.put("/room", v);
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      alert("更改成功");
      this.changeStatus = this.roomNum;
      this.getRomlist();
    },
    roomDel: async function(id) {
      var retData = await req.del("/room", {
        id: id
      });
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      alert("删除成功");
      this.changeStatus = this.roomNum;
      this.getRomlist();
    },
    getRomlist: async function() {
      var retData = await req.get(
        "/room?offset=" +
          this.pages * 10 +
          "&limit=10&Floor=" +
          this.inputFloor +
          "&RoomNum=" +
          this.roomNum
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
      } else if (this.pages > this.allPages - 5) {
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
      this.addroomShow = mothod;
      if (result) {
        this.changeStatus = this.roomNum;
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
    "addroom-buttun": addroom
  }
};
</script>

<style scoped>
@import url("./css/roomlist.css");
</style>
