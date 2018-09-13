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
<<<<<<< HEAD
      <el-button type="text" style="font-size: 38px" @click="logout">您已注册成功，现在点击此处返回登录界面</el-button>
=======
      <el-button type="text" style="font-size: 38px" @click="logout">您已注册成功，点击此处或等待三秒返回登录界面</el-button>
>>>>>>> 3eaf8cea70248fb73cf2334e229410ebbafcbe1d
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
<<<<<<< HEAD
=======
    created() {
      setTimeout(()=>{
        this.logout();
      },3000)
    },
>>>>>>> 3eaf8cea70248fb73cf2334e229410ebbafcbe1d
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      }
    }
  }
</script>
