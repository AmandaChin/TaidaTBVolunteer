<template>
<div class="homepage-container">
    <!--<el-form>
        <el-form-item label="搜索">
            <el-col :span="9">
          <el-input style="width: 100%;" v-model="searchContent" placeholder="搜索与您时间匹配的服务需求"></el-input>
          </el-col>
          </el-form-item>
    </el-form>-->
  <slide-show :slides="slides" :inv="slideSpeed"></slide-show>
 <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
</div>

</template>

<script>
import slideShow from '../../components/SlideShow/slideShow'
import PanelGroup from  './PanelGroup'
export default {
  components:{
      slideShow,
      PanelGroup
  },
  data(){
      return {
          slides:[
                { 
                src:require("./image/1.jpg"),
                title:'欢迎志愿者的加入'
                //href:'http://www.baidu.com'
                },
                {
                src:require("./image/2.jpg"),
                title:'像小天使般的志愿者'
                //href:'index'
                },
                {
                src:require("./image/3.jpg"),
                title:'志愿服务从今天开始'
                //href:'./index'
                },
                {
                src:require("./image/4.jpg"),
                title:'志愿服务从小做起'
                //href:'../form/index'
                }
          ]
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.homepage-container{
    padding: 32px;
    background-color:	#ffffff;
}
</style>

