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
            <input type="number">
          </div>
        </div>
        <div>
          <div class="roomnumnlist_select_a">布局编号:</div>
          <div>
            <input type="number">
          </div>
        </div>
        <div>
          <button>确定</button>
        </div>
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
          <div class="roomnumlist_data_g_a">详情</div>
          <div class="roomnumlist_data_g_a">
            <div :class="v.status ? 'roomnumlist_data_g_a_false' : 'roomnumlist_data_g_a_true'">启用</div>
            <div :class="v.status ? 'roomnumlist_data_g_a_true' : 'roomnumlist_data_g_a_false'">禁用</div>
          </div>
          <div class="roomnumlist_data_g_a">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import req from "../global/request.vue";

export default {
  data: function() {
    return {
      dataInfo: []
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    returnMains: function() {
      this.$emit("returnMains");
    }
  },
  watch: {
    isShow: async function(oldValue, newValue) {
      if (!newValue) {
        var retData = await req.get("/roomnum");
        if (retData.Code != 200) {
          return;
        }
        this.dataInfo = retData.Data;
      }
    }
  }
};
</script>

<style scoped>
@import url("./css/roomnumlist.css");
</style>
