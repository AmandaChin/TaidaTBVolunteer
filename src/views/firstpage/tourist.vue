<template>
<div class="firstpage-container">
    <el-container>
    <el-header style="text-align: left; font-size: 25px">
      <span style="margin-left: 20%;">时 间 银 行 志 愿 服 务 系 统</span>
       <!--<el-button v-loading="loading" style="margin-left: 40%;" type="success" @click="submit()">登 录</el-button>-->
      <el-button v-loading="loading"  style="margin-left:200px" type="success" @click="regist()">立 即 注 册</el-button>
      <el-button v-loading="loading"  style="margin-left:200px" type="cancel" @click="logout()"> 立 即 登 陆 </el-button>
    </el-header>
    </el-container>

  <slide-show :slides="slides" :inv="slideSpeed"></slide-show>
  <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

</div>

</template>

<script>
import slideShow from '../../components/SlideShow/slideShow2'
import PanelGroup from './PanelGroup'
export default {
  components: {
    slideShow,
    PanelGroup
  },
  data() {
    return {
      slides: [
        {
          src: require('./image/1.jpg'),
          title: '欢迎志愿者的加入'
          // href:'http://www.baidu.com'
        },
        {
          src: require('./image/2.png'),
          title: '搜索功能: 搜索老人发布的服务需求'
          // href:'index'
        },
        {
          src: require('./image/3.png'),
          title: '勋章功能: 查看个人转移和获得的勋章信息'
          // href:'./index'
        },
        {
          src: require('./image/4.png'),
          title: '发布需求: 老人发布自己的服务需求'
          // href:'../form/index'
        }
      ]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    regist: function() {
      this.$router.push({ name: 'register' })
    }
  }}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.homepage-container{
    padding: 32px;
    background-color:	#ffffff;
    height: 80px;
}

.el-header {
    background-color: #000000;
    color: rgb(55, 150, 32);
    line-height: 60px;
  }
</style>

