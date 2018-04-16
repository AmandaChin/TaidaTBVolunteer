<template>
 <div>
     <h1>跳转页面</h1>
     <el-button type="text" @click="logout">注册成功，现在点击此处返回登录界面</el-button>
     </div> 
</template>
<script>
export default {
  methods:{
      logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>
