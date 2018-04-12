<template>
  <div class="checkPageContainer">
      <el-row :gutter="50">
          <el-col :span="8">
            <el-card shadow="always" class="applyInfo" :model="applyInfo">
                <div slot="header" class="clearfix">
                    <span>服务记录</span>
                </div>
                <div style="padding: 5px;">
                <span>{{"服务记录ID: "+applyInfo.serviceID}}</span>
               </div>
               <div style="padding: 5px;">
                <span>{{"服务用户: "+applyInfo.oldMan}}</span>
               </div>
               <div style="padding: 5px;">
                <span>{{"志愿者: "+applyInfo.volunteer}}</span>
               </div>
                <div style="padding: 5px;">
                <span>服务日期: </span>
                <span>{{applyInfo.startTime|formatDate}}</span>
                </div>
               <div style="padding: 5px;">
                <span>服务时段: </span>
                <span>{{applyInfo.startTime|getTime}}</span>
                <span> - </span>
                <span>{{applyInfo.endTime|getTime}}</span>
               </div>
               <div style="padding: 5px;">
                <span>服务时长: </span>
                <span>{{applyInfo.duration}}</span>
               </div>
               <div style="padding: 5px;">
                <span>服务内容: </span>
                <span>{{applyInfo.content}}</span>
               </div>
               <div style="padding: 5px;">
                <span>志愿者自述: </span>
                <span>{{applyInfo.remark}}</span>
               </div>

            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" class="checkInfo" :model="checkRate">
                <div slot="header" class="clearfix">
                    <span>审核意见</span>
                    </div>
                <div class="checkRow">
                   <div class="checkText"> <span>服务内容与描述相符</span></div>
                    <div class="rateBar">
                        <el-rate
                        v-model="checkRate.contentRate"
                        show-text>
                        </el-rate>
                    </div>
               </div>
               <div class="checkRow">
                <div class="checkText"><span>服务时间与描述相符</span></div>
                <div class="rateBar">
                        <el-rate
                        v-model="checkRate.contentRate"
                        show-text>
                        </el-rate>
                    </div>
               </div>
               <div class="checkRow">
                <div class="checkText"><span>服务态度评价</span></div>
                <div class="rateBar">
                        <el-rate
                        v-model="checkRate.contentRate"
                        show-text>
                        </el-rate>
                    </div>
               </div>
               <div class="checkRow">
                <div class="checkText"><span>来自老人的评价</span></div>
                <div class="rateBar">
                        <el-rate
                        v-model="checkRate.oldManRate"
                        show-text>
                        </el-rate>
                    </div>
               </div>
               
               <div class="checkFooter">
                   <el-button class="button" type="primary" round @click="submitCheck">提交</el-button>
               </div>
            </el-card>
          </el-col>
      </el-row>
  </div>
</template>
<script>
import { formatDate } from '@/methods/methods.js'
export default {
  data(){
      return {
          applyInfo:{
            serviceID: 1,
            oldMan:'老人',
            volunteer:'小红',
            startTime: '2018-03-24T08:00:00.000Z',
            endTime: '2018-03-24T10:00:00.000Z',
            duration: 2,
            content:'打扫卫生',
            remark: '帮助老人真的很开心'
          },
          checkRate:{
              contentRate:null,
              durationRate:null,
              attitudeRate:null,
              oldManRate:null
          }
      }
  },
  filters: {
    formatDate(time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      },

    getTime(time){
        var date = new Date(time)
        return formatDate(date, 'hh:mm:ss')
    }
  }
}
</script>
<style scoped>
.checkPageContainer{
    padding: 50px;
    background-color: #f0f2f5;
    height: 100% ;
    position: fixed ;
    width: 100%
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

.checkText{
    width:50%;
    float: left;
   padding-bottom: 25px;
   
}

.rateBar { 
  width:50%;
  float: right;
  padding-bottom: 25px;
  
}

.checkFooter{
    width: 100%;
    
}
.button{
    float:right;
    margin-top: 12px;
    margin-bottom: 20px;
}
</style>


