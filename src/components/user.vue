<template>
  <div id="user" v-show="isShow">
    <div class="user" v-on:click="Close"></div>
    <div class="userinfo">
      <div class="userinfotitle">
        <strong>{{global.language.userdetails}}</strong>
        <div class="userinfoclose" v-on:click="Close">X</div>
      </div>
      <div class="userinfosts">
        <div class="userinfostssa">
          <div class="userinfostssb" v-show="!updatestatus">{{global.language.name}}:</div>
          <div class="userinfostssb" v-show="updatestatus">{{global.language.oldpassword}}:</div>
          <div class="userinfostssb">{{global.language.mobile}}:</div>
          <div class="userinfostssb" v-show="!updatestatus">{{global.language.permission}}:</div>
          <div class="userinfostssb" v-show="updatestatus">{{global.language.newpassword}}:</div>
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
          <div
            class="userinfostssc"
            v-show="global.userinfo.permission == 0"
          >{{global.language.super}}</div>
          <div
            class="userinfostssc"
            v-show="global.userinfo.permission == 1"
          >{{global.language.admin}}</div>
          <div
            class="userinfostssc"
            v-show="global.userinfo.permission == 2"
          >{{global.language.man}}</div>
        </div>
        <div
          class="userupdate"
          v-show="!updatestatus"
          v-on:click="updateinfo(true)"
        >{{global.language.update}}</div>
        <div
          class="userupdate"
          v-show="updatestatus"
          v-on:click="updateinfos()"
        >{{global.language.true}}</div>
        <div
          class="userupdate"
          v-show="updatestatus"
          v-on:click="updateinfo(false)"
          id="userupdatecancel"
        >{{global.language.cancel}}</div>
      </div>
      <div class="userinfostselect" v-show="global.userinfo.permission<2">
        <div class="userinfostselecta">{{global.language.status}}:</div>
        <div class="userinfostselecta">
          <select v-model="selectstatus">
            <option value>{{global.language.all}}</option>
            <option value="true">{{global.language.able}}</option>
            <option value="false">{{global.language.disable}}</option>
          </select>
        </div>
        <div
          class="userinfostselecta"
          id="userinfoadd"
          v-on:click="addclose(true)"
        >{{global.language.adduser}}</div>
      </div>
      <div class="userinfost" v-show="global.userinfo.permission<2">
        <div class="userinfosta">
          <div class="userinfosnumber"></div>
          <div class="userinfosnumber">{{global.language.number}}</div>
          <div class="userinfosdepict">{{global.language.name}}</div>
          <div class="userinfosdepicta">{{global.language.permission}}</div>
          <div class="userinfostime">{{global.language.time}}</div>
          <div class="userinfosrooma">{{global.language.mobile}}</div>
          <div class="userinfosroomb">{{global.language.details}}</div>
          <div class="userinfosroomc">{{global.language.status}}</div>
          <div class="userinfosroomc">{{global.language.manipulate}}</div>
        </div>
        <div v-for="(v, i) in userlist" :key="i" class="userinfosta">
          <div class="userinfosnumber">
            <div class="userinfoopt" v-on:click="selectopt(v.ID)">
              <div class="userinfoopta" v-show="opt[v.ID]"></div>
            </div>
          </div>
          <div class="userinfosnumber">{{pages*11+i+1}}</div>
          <div class="userinfosdepict">{{v.User}}</div>
          <div
            class="userinfosdepicta"
            v-show="v.Permission==0?true:false"
          >{{global.language.super}}</div>
          <div
            class="userinfosdepicta"
            v-show="v.Permission==1?true:false"
          >{{global.language.admin}}</div>
          <div class="userinfosdepicta" v-show="v.Permission==2?true:false">{{global.language.man}}</div>
          <div class="userinfostime">{{new Date(v.CreatedAt).toLocaleString()}}</div>
          <div class="userinfosrooma">{{v.Mobile}}</div>
          <div class="userinfosroomb">{{v.Details}}</div>
          <div class="userinfosroomccc" v-show="!v.Able">{{global.language.disable}}</div>
          <div class="userinfosroomccc" v-show="v.Able">{{global.language.able}}</div>
          <div
            class="userinfosroomcc"
            v-on:click="disablieuser(true, i)"
            v-show="!v.Able"
          >{{global.language.able}}</div>
          <div
            class="userinfosroomcc"
            v-on:click="disablieuser(false, i)"
            v-show="v.Able"
          >{{global.language.disable}}</div>
          <div class="userinfosroomcc" v-on:click="infoupdate(true, v)">{{global.language.update}}</div>
          <div class="userinfosroomcc" v-on:click="deluser([v.ID])">{{global.language.delete}}</div>
        </div>
      </div>
      <div v-show="global.userinfo.permission<2">
        <div class="roomlist_buttona">
          <div id="roomlist_buttonaa">
            <div class="userinfoopt" v-on:click="selectopt(0)">
              <div class="userinfoopta" v-show="opt[0]"></div>
            </div>
          </div>
          <div id="roomlist_buttonab" v-on:click="selecttreat('del')">{{global.language.delete}}</div>
          <div id="roomlist_buttonab" v-on:click="selecttreat(false)">{{global.language.disable}}</div>
          <!-- <div id="roomlist_buttonac">全部禁用</div> -->
          <div id="roomlist_buttonab" v-on:click="selecttreat(true)">{{global.language.able}}</div>
          <!-- <div id="roomlist_buttonac">全部启用</div> -->
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
            <strong>{{global.language.update}}</strong>
          </div>
          <div class="userinfoupdateatitleclose" v-on:click="infoupdate(false)">X</div>
        </div>
        <div class="userinfoupdateaa">
          <div class="userinfoupdateaat">{{global.language.name}}:</div>
          <div class="userinfoupdateaat">{{global.language.permission}}:</div>
          <div class="userinfoupdateaat">{{global.language.newpassword}}:</div>
          <div class="userinfoupdateaat" id="userinfoupdateaat1">{{global.language.details}}:</div>
        </div>
        <div class="userinfoupdateaa" id="userinfoupdateaacontent">
          <div class="userinfoupdateaacontentt">{{infoupdates.User}}</div>
          <div class="userinfoupdateaacontentt">
            <select ref="userpermisson" :value="infoupdates.Permission">
              <option v-show="!global.userinfo.permission" value="1">{{global.language.admin}}</option>
              <option value="2">{{global.language.man}}</option>
            </select>
          </div>
          <div class="userinfoupdateaacontentt">
            <input
              placeholder
              ref="userpassword"
              class="userinfoupdateaacontentti1"
              type="password"
            >
          </div>
          <div class="userinfoupdateaacontentt" id="userinfoupdateaacontentt1">
            <textarea
              placeholder
              ref="userdetails"
              id="userinfoupdateaacontentti2"
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </div>
        <div class="userinfoupdateab">
          <div class="userinfoupdateaba" v-on:click="infoupdate(false)">{{global.language.cancel}}</div>
          <div class="userinfoupdateaba" v-on:click="infoupdatesput()">{{global.language.true}}</div>
        </div>
      </div>
    </div>
    <div v-show="addShow">
      <div class="userinfoupdate"></div>
      <div class="userinfoupdatea">
        <div class="userinfoupdateatitle" id="userinfoupdateatitleadd">
          <div>
            <strong>{{global.language.adduser}}</strong>
          </div>
          <div class="userinfoupdateatitleclose" v-on:click="addclose(false)">X</div>
        </div>
        <div class="userinfoupdateaa">
          <div class="userinfoupdateaat">{{global.language.name}}:</div>
          <div class="userinfoupdateaat">{{global.language.permission}}:</div>
          <div class="userinfoupdateaat">{{global.language.newpassword}}:</div>
          <div class="userinfoupdateaat">{{global.language.mobile}}:</div>
          <div class="userinfoupdateaat">{{global.language.status}}:</div>
          <div class="userinfoupdateaat" id="userinfoupdateaat1">{{global.language.details}}:</div>
        </div>
        <div class="userinfoupdateaa" id="userinfoupdateaacontent">
          <div class="userinfoupdateaacontentt">
            <input placeholder="name" ref="addname" class="userinfoupdateaacontentti1" type="text">
          </div>
          <div class="userinfoupdateaacontentt">
            <select ref="addpermisson" :value="2">
              <option v-show="!global.userinfo.permission" value="1">{{global.language.admin}}</option>
              <option value="2">{{global.language.man}}</option>
            </select>
          </div>
          <div class="userinfoupdateaacontentt">
            <input
              placeholder="password"
              ref="addpassword"
              class="userinfoupdateaacontentti1"
              type="password"
            >
          </div>
          <div class="userinfoupdateaacontentt">
            <input
              v-on:keyup="checkmobile()"
              placeholder="mobile"
              ref="addmobile"
              class="userinfoupdateaacontentti1"
              type="number"
            >
          </div>
          <div class="userinfoupdateaacontentt">
            <select ref="addable" :value="false">
              <option value="false">{{global.language.disable}}</option>
              <option value="true">{{global.language.able}}</option>
            </select>
          </div>
          <div class="userinfoupdateaacontentt" id="userinfoupdateaacontentt11">
            <textarea
              placeholder
              ref="adddetails"
              id="userinfoupdateaacontentti2"
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </div>
        <div class="userinfoupdateab" id="userinfoupdateabadd">
          <div class="userinfoupdateaba" v-on:click="addclose(false)">{{global.language.cancel}}</div>
          <div class="userinfoupdateaba" v-on:click="adduser()">{{global.language.true}}</div>
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
      details: "",
      addShow: false
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
      // 更改信息成功 跳转登陆界面
      req.del("/login");
      this.global.userinfo = {};
      this.$router.push("/");
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
      this.allPages = Math.ceil(retData.All / 11);
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
      if (this.allPages < 0) {
        this.allPages = 0;
      }
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
    selecttreat: function(mothed = "") {
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
      if (mothed == "del") {
        // 删除
        this.deluser(ids);
      } else {
        alert(11);
        // 禁用启用
        this.disablieusers(ids, mothed);
      }
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
        passWord: this.$refs.userpassword.value,
        permission: parseInt(this.$refs.userpermisson.value)
      });
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      this.getuserlist();
      this.infoupdate();
    },
    disablieusers: async function(ids = [], mothed = false) {
      var retData = await req.put("/users", { id: ids, able: mothed });
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      this.getuserlist();
    },
    addclose: function(mothed = false) {
      this.addShow = mothed;
    },
    adduser: async function() {
      if (!this.checkadd() && this.checkmobile()) {
        return;
      }
      var retData = await req.post("/user", {
        able: this.$refs.addable.value == "true" ? true : false,
        details: this.$refs.adddetails.value,
        mobile: this.$refs.addmobile.value,
        passWord: this.$refs.addpassword.value,
        permission: parseInt(this.$refs.addpermisson.value),
        user: this.$refs.addname.value
      });
      if (retData.Code != 200) {
        alert(retData.Msg);
        return;
      }
      this.getuserlist();
      this.addShow = false;
      alert("suceess!");
    },
    checkmobile: function() {
      if (this.$refs.addmobile.value.length > 11) {
        this.$refs.addmobile.value = this.$refs.addmobile.value.slice(0, 11);
      }
      if (!/^1[34578]\d{9}$/.test(this.$refs.addmobile.value)) {
        this.$refs.addmobile.style = "border: 1px solid rgb(245, 5, 5)";
        return false;
      }
      this.$refs.addmobile.style = "border: 1px solid rgb(0, 0, 0)";
      return true;
    },
    checkadd: function() {
      if (
        this.$refs.addname.value.length < 4 ||
        this.$refs.addname.value.length > 20
      ) {
        this.$refs.addname.style = "border: 1px solid rgb(245, 5, 5)";
        return false;
      }
      this.$refs.addname.style = "border: 1px solid rgb(0, 0, 0)";
      if (
        this.$refs.addpassword.value.length < 4 ||
        this.$refs.addpassword.value.length > 30
      ) {
        this.$refs.addpassword.style = "border: 1px solid rgb(245, 5, 5)";
        return false;
      }
      this.$refs.addpassword.style = "border: 1px solid rgb(0, 0, 0)";
      if (this.$refs.addmobile.value.length != 11) {
        this.$refs.addmobile.style = "border: 1px solid rgb(245, 5, 5)";
        return false;
      }
      this.$refs.addmobile.style = "border: 1px solid rgb(0, 0, 0)";
      if (this.$refs.adddetails.value.length > 250) {
        this.$refs.adddetails.style = "border: 1px solid rgb(245, 5, 5)";
        return false;
      }
      this.$refs.adddetails.style = "border: 1px solid rgb(0, 0, 0)";
      return true;
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
