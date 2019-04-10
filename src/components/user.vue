<template>
  <div id="user" v-show="isShow">
    <div class="user" v-on:click="Close"></div>
    <div class="userinfo">
      <div class="userinfotitle">
        <strong>用户资料</strong>
        <div class="userinfoclose" v-on:click="Close">X</div>
      </div>
      <div class="userinfosts">
        <div class="userinfostssa">
          <div class="userinfostssb" v-show="!updatestatus">用户名:</div>
          <div class="userinfostssb" v-show="updatestatus">旧密码:</div>
          <div class="userinfostssb">手机号码:</div>
          <div class="userinfostssb" v-show="!updatestatus">权限:</div>
          <div class="userinfostssb" v-show="updatestatus">密码:</div>
        </div>
        <div class="userinfostssa" v-show="updatestatus">
          <div class="userinfostssc">
            <input type="password" v-model="oldpassword">
          </div>
          <div class="userinfostssc">
            <input type="text" v-model="newmobile">
          </div>
          <div class="userinfostssc">
            <input type="password" v-model="newpassword">
          </div>
        </div>
        <div class="userinfostssa" v-show="!updatestatus">
          <div class="userinfostssc">{{global.userinfo.name}}</div>
          <div class="userinfostssc">{{global.userinfo.mobile}}</div>
          <div class="userinfostssc" v-show="global.userinfo.permission == 0">超级管理员</div>
          <div class="userinfostssc" v-show="global.userinfo.permission == 1">管理员</div>
          <div class="userinfostssc" v-show="global.userinfo.permission == 2">普通用户</div>
        </div>
        <div class="userupdate" v-show="!updatestatus" v-on:click="updateinfo(true)">修改</div>
        <div class="userupdate" v-show="updatestatus" v-on:click="updateinfos()">确定</div>
        <div
          class="userupdate"
          v-show="updatestatus"
          v-on:click="updateinfo(false)"
          id="userupdatecancel"
        >取消</div>
      </div>
      <div class="userinfostselect">
        <div class="userinfostselecta">账户状态:</div>
        <div class="userinfostselecta">
          <select v-model="selectstatus">
            <option value>所有</option>
            <option value="true">启用</option>
            <option value="false">禁用</option>
          </select>
        </div>
      </div>
      <div class="userinfost">
        <div class="userinfosta">
          <div class="userinfosnumber"></div>
          <div class="userinfosnumber">序号</div>
          <div class="userinfosdepict">账号</div>
          <div class="userinfosdepicta">权限</div>
          <div class="userinfostime">创建时间</div>
          <div class="userinfosrooma">手机号</div>
          <div class="userinfosroomb">备注</div>
          <div class="userinfosroomc">状态</div>
          <div class="userinfosroomc">操作</div>
        </div>
        <div v-for="(v, i) in userlist" :key="i" class="userinfosta">
          <div class="userinfosnumber">
            <div class="userinfoopt" v-on:click="selectopt(v.ID)">
              <div class="userinfoopta" v-show="opt[v.ID]"></div>
            </div>
          </div>
          <div class="userinfosnumber">{{pages*15+i+1}}</div>
          <div class="userinfosdepict">{{v.User}}</div>
          <div class="userinfosdepicta" v-show="v.Permission==0?true:false">管理员</div>
          <div class="userinfosdepicta" v-show="v.Permission==1?true:false">管理员</div>
          <div class="userinfosdepicta" v-show="v.Permission==2?true:false">普通用户</div>
          <div class="userinfostime">{{new Date(v.CreatedAt).toLocaleString()}}</div>
          <div class="userinfosrooma">{{v.Mobile}}</div>
          <div class="userinfosroomb">{{v.Details}}</div>
          <div class="userinfosroomccc" v-show="!v.Able">已禁用</div>
          <div class="userinfosroomccc" v-show="v.Able">已启用</div>
          <div class="userinfosroomcc" v-on:click="disablieuser(true, i)" v-show="!v.Able">启用</div>
          <div class="userinfosroomcc" v-on:click="disablieuser(false, i)" v-show="v.Able">禁用</div>
          <div class="userinfosroomcc" v-on:click="infoupdate(true, v)">修改</div>
          <div class="userinfosroomcc" v-on:click="deluser(v.ID)">删除</div>
        </div>
      </div>
      <div>
        <div class="roomlist_buttona">
          <div id="roomlist_buttonaa">
            <div class="userinfoopt" v-on:click="selectopt(0)">
              <div class="userinfoopta" v-show="opt[0]"></div>
            </div>
          </div>
          <div id="roomlist_buttonab" v-on:click="selecttreat(false)">删除</div>
          <div id="roomlist_buttonab" v-on:click="selecttreat(false)">禁用</div>
          <div id="roomlist_buttonac">全部禁用</div>
          <div id="roomlist_buttonab" v-on:click="selecttreat(true)">启用</div>
          <div id="roomlist_buttonac">全部启用</div>
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
    <div v-show="infoupdateShow">
      <div class="userinfoupdate"></div>
      <div class="userinfoupdatea">
        <div class="userinfoupdateatitle">
          <div>
            <strong>修改用户信息</strong>
          </div>
          <div class="userinfoupdateatitleclose" v-on:click="infoupdate(false)">X</div>
        </div>
        <div class="userinfoupdateaa">
          <div class="userinfoupdateaat">用户名:</div>
          <div class="userinfoupdateaat">权限:</div>
          <div class="userinfoupdateaat">密码:</div>
          <div class="userinfoupdateaat" id="userinfoupdateaat1">备注:</div>
        </div>
        <div class="userinfoupdateaa" id="userinfoupdateaacontent">
          <div class="userinfoupdateaacontentt">{{infoupdates.User}}</div>
          <div class="userinfoupdateaacontentt">
            <select
              ref="userpermisson"
              :value="infoupdates.Permission"
              v-show="!global.userinfo.permission"
            >
              <option value="1">管理员</option>
              <option value="2">普通用户</option>
            </select>
            <select
              ref="userpermisson"
              :value="infoupdates.Permission"
              v-show="global.userinfo.permission"
            >
              <option value="2">普通用户</option>
            </select>
          </div>
          <div class="userinfoupdateaacontentt">
            <input
              placeholder="不修改不填"
              ref="userpassword"
              id="userinfoupdateaacontentti1"
              type="password"
            >
          </div>
          <div class="userinfoupdateaacontentt" id="userinfoupdateaacontentt1">
            <textarea
              placeholder="不修改不填"
              ref="userdetails"
              id="userinfoupdateaacontentti2"
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </div>
        <div class="userinfoupdateab">
          <div class="userinfoupdateaba" v-on:click="infoupdate(false)">取消</div>
          <div class="userinfoupdateaba" v-on:click="infoupdatesput()">确定</div>
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
      oldpassword: "",
      newmobile: "",
      newpassword: "******",
      updatestatus: false,
      selectstatus: "",
      userlist: [],
      allPages: 1,
      nowPages: 1,
      pages: 0,
      pagesOffset: 0,
      opt: {},
      infoupdateShow: false,
      infoupdates: {},
      permission: "",
      passWord: "",
      details: ""
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
    updateinfo: function(methed = false) {
      this.updatestatus = methed;
      this.oldpassword = "";
      this.newmobile = this.global.userinfo.mobile;
      this.newpassword = "******";
    },
    updateinfos: async function() {
      if (
        this.newmobile == this.global.userinfo.mobile &&
        this.newpassword == "******"
      ) {
        this.updatestatus = false;
        return;
      }
      var retData = await req.put("/userown", {
        mobile:
          this.newmobile == this.global.userinfo.mobile ? "" : this.newmobile,
        newPassWord: this.newpassword == "******" ? "" : this.newpassword,
        oldPassWord: this.oldpassword
      });
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      this.updatestatus = false;
    },
    getuserlist: async function(status = "") {
      var retData = await req.get(
        "/user?limit=11" +
          "&offset=" +
          this.pages * 11 +
          "&status=" +
          this.selectstatus
      );
      if (retData.Code != 200) {
        return;
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
      this.userlist = retData.Data;
      this.allPages -= 1;
      //重置选择值
      this.opt = {};
      if (this.pages > this.allPages) {
        this.pages = this.pages - 1;
        this.getuserlist();
      }
    },
    changePages: function(pages) {
      if (pages < 0) {
        pages = 0;
      } else if (pages >= this.allPages) {
        pages = this.allPages;
      }
      this.pages = pages;
      this.getuserlist();
    },
    selectopt: function(num) {
      this.opt[num] = !this.opt[num];
      if (!num) {
        for (const v of this.userlist) {
          this.opt[v.ID] = this.opt[num];
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
    },
    disablieuser: async function(mothed = false, index) {
      var v = this.userlist[index];
      var retData = await req.put("/user", {
        able: mothed,
        id: v.ID
      });
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      this.userlist[index].Able = mothed;
      if (this.selectstatus != "") {
        this.getuserlist();
      }
    },
    deluser: async function(id) {
      var retData = await req.del("/user", { id: id });
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      this.getuserlist();
    },
    infoupdate: function(mothed = false, info = {}) {
      this.updatestatus = false;
      this.infoupdateShow = mothed;
      this.infoupdates = info;
    },
    infoupdatesput: async function() {
      if (this.$refs.userpassword.value.length > 20) {
        this.$refs.userpassword.style = "border: 1px solid rgb(245, 5, 5)";
        return;
      }
      this.$refs.userpassword.style = "border: 1px solid rgb(0, 0, 0)";
      if (this.$refs.userdetails.value.length > 250) {
        this.$refs.userdetails.style = "border: 1px solid rgb(245, 5, 5)";
        return;
      }
      this.$refs.userdetails.style = "border: 1px solid rgb(0, 0, 0)";
      var retData = await req.put("/user", {
        able: this.infoupdates.Able,
        details: this.$refs.userdetails.value,
        id: this.infoupdates.ID,
        mobile: "",
        passWord: this.$refs.userdetails.userpassword,
        permission: this.$refs.userdetails.userpermisson
      });
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      this.getuserlist();
      this.infoupdate();
    }
  },
  async mounted() {
    this.getuserlist();
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
        this.updatestatus = false;
      }
    }
  }
};
</script>

<style scoped>
@import url("./css/user.css");
</style>
