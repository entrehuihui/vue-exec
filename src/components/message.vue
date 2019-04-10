<template>
  <div id="message" v-show="isShow">
    <div class="message" v-on:click="Close"></div>
    <div class="messageinfo">
      <div class="messageinfotitle">
        <strong>报警列表</strong>
        <div class="messageinfoclose" v-on:click="Close">X</div>
      </div>
      <div class="messageinfoselect">
        <div class="messageinfoselectstatus">
          <strong>消息状态:</strong>
          <select v-model="selectstatus" ref="selectstatus">
            <option value>无限制</option>
            <option value="1">已处理</option>
            <option value="0">未处理</option>
          </select>
        </div>
      </div>
      <div class="messageinfost">
        <div class="messageinfosta">
          <div class="messageinfosnumber"></div>
          <div class="messageinfosnumber">序号</div>
          <div class="messageinfosdepict">描述</div>
          <div class="messageinfostime">时间</div>
          <div class="messageinfosrooma">DevEUI</div>
          <div class="messageinfosroomb">设备</div>
          <div class="messageinfosroomc">状态</div>
          <div class="messageinfosroomc">操作</div>
        </div>
        <div
          v-for="(v, i) in alarmdata"
          :key="i"
          class="messageinfosta"
          :style="v.Status?'':'color:rgb(250, 3, 3)'"
        >
          <div class="messageinfosnumber">
            <div class="messageinfoopt" v-show="!v.Status" v-on:click="selectopt(v.ID)">
              <div class="messageinfoopta" v-show="opt[v.ID]"></div>
            </div>
          </div>
          <div class="messageinfosnumber">{{pages*15+i+1}}</div>
          <div class="messageinfosdepict">{{v.alarm}}</div>
          <div class="messageinfostime">{{new Date(v.AlarmTime*1000).toLocaleString()}}</div>
          <div class="messageinfosrooma">{{v.DevEUI}}</div>
          <div class="messageinfosroomb">{{v.DevName}}</div>
          <div class="messageinfosroomccc" v-show="!v.Status">未处理</div>
          <div class="messageinfosroomccc" v-show="v.Status">已处理</div>
          <div class="messageinfosroomcc" v-show="!v.Status" v-on:click="datapull([v.ID])">处理</div>
        </div>
      </div>
      <div>
        <div class="roomlist_buttona">
          <div id="roomlist_buttonaa">
            <div class="messageinfoopt" v-on:click="selectopt(0)">
              <div class="messageinfoopta" v-show="opt[0]"></div>
            </div>
          </div>
          <div id="roomlist_buttonab" v-on:click="selecttreat">处理</div>
          <div id="roomlist_buttonac">全部处理</div>
        </div>
        <div class="roomlist_button">
          <div :style="'left: '+(130 - nowPages * 42)+'px'">
            <div class="roomlist_button_a" v-on:click="changePages(0)"><<</div>
            <div class="roomlist_button_a" v-on:click="changePages(pages -1)"><</div>
            <div
              class="roomlist_button_a"
              v-for="(v,k) in nowPages"
              :key="v"
              v-on:click="changePages(k+pagesOffset)"
              :id="pages==k+pagesOffset ? 'roomlist_button_a_show':''"
            >{{v+pagesOffset}}</div>
            <div class="roomlist_button_a" v-on:click="changePages(pages +1)">></div>
            <div class="roomlist_button_a" v-on:click="changePages(allPages)">>></div>
          </div>
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
      alarmdata: [],
      alarmlist: [],
      selectstatus: "",
      allPages: 1,
      nowPages: 1,
      pages: 0,
      pagesOffset: 0,
      opt: {}
    };
  },
  props: {
    isShow: {
      default: true
    }
  },
  methods: {
    Close: async function() {
      this.$emit("close");
    },
    datapull: async function(id) {
      var retData = await req.put("/alarmdata", {
        ids: id
      });
      if (retData.Code != 200) {
        alert("处理失败");
        return;
      }
      for (const key in this.alarmdata) {
        if (this.alarmdata[key].Status == 1) {
          continue;
        }
        for (const v of id) {
          if (this.alarmdata[key].ID == v) {
            this.alarmdata[key].Status = 1;
          }
        }
      }
      this.$forceUpdate();
      this.$emit("aralmnum", -id.length);
      if (this.selectstatus == 0) {
        this.getalarmdata((status = 0));
      }
    },
    getalarmlist: async function() {
      var retData = await req.get("/alarmlist?a=1");
      if (retData.Code != 200) {
        return;
      }
      this.alarmlist = retData.Data;
    },
    getalarmdata: async function(status = "") {
      var retData = await req.get(
        "/alarmdata?limit=15" +
          "&offset=" +
          this.pages * 15 +
          "&status=" +
          this.selectstatus
      );
      if (retData.Code != 200) {
        return;
      }
      for (const key in retData.Data) {
        retData.Data[key].alarm = this.alarmlist[
          parseInt(retData.Data[key].AlarmStatus) - 1
        ].Name;
      }
      this.allPages = Math.ceil(retData.All / 15);
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

      this.alarmdata = retData.Data;
      this.allPages -= 1;
      //重置选择值
      this.opt = {};
      if (this.pages > this.allPages) {
        this.pages = this.pages - 1;
        this.getalarmdata();
      }
    },
    changePages: function(pages) {
      if (pages < 0) {
        pages = 0;
      } else if (pages > this.allPages) {
        pages = this.allPages;
      }
      this.pages = pages;
      this.getalarmdata();
    },
    selectopt: function(num) {
      this.opt[num] = !this.opt[num];
      if (num == 0) {
        for (const v of this.alarmdata) {
          if (!v.Status) {
            this.opt[v.ID] = this.opt[num];
          }
        }
      }
      this.$forceUpdate();
    },
    selecttreat: function() {
      var ids = new Array();
      for (const key in this.opt) {
        if (this.opt.hasOwnProperty(key) && this.opt[key] && key != 0) {
          ids.push(parseInt(key));
        }
      }
      this.opt = {};
      if (ids.length < 1) {
        return;
      }
      this.datapull(ids);
    }
  },
  async mounted() {
    await this.getalarmlist();
    this.getalarmdata();
  },
  watch: {
    selectstatus: function() {
      this.pages = 0;
      this.changePages(0);
    },
    isShow: function(newValue) {
      if (newValue) {
        this.selectstatus = "";
        this.changePages(0);
      }
    }
  }
};
</script>

<style scoped>
@import url("./css/message.css");
</style>
