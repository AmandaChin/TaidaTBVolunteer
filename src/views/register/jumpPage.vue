<template>
  <center>
  <div>
    <h1>恭喜您</h1>
  </div>
    <div>
      <el-row>
        <el-col>
          <img :src="errGif" width="800" height="700" alt="Girl has dropped her ice cream.">
        </el-col>
      </el-row>
    </div>
    <div>
      <el-button type="text" style="font-size: 38px" @click="logout">您已注册成功，点击此处或等待三秒返回登录界面</el-button>
    </div>
  </center>
</template>
<script>
  export default {
    data() {
      return {
        errGif: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646'
      }
    },
    created() {
      setTimeout(()=>{
        this.logout();
      },3000)
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      }
    }
  }
</script>
