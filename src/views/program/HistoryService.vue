<template>
<div class="app-container calendar-list-container">
  <el-table
    :data="service.slice((pageNo-1)*pageSize,pageNo*pageSize)"
    v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
    style="width: 100%;margin-left: 20px"

    :row-class-name="tableRowClassName">
    <el-table-column
      label="发布时间">
      <template scope="scope">
        <span style="color: darkgray">{{ scope.row.CreateTime|formatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="服务内容">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.Content}}</span>

      </template>
    </el-table-column>
    <el-table-column
      label="开始时间"
      prop="users">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.DemandStartTime|formatDatex}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="结束时间"
      prop="applyingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.DemandEndTime|formatDatex}}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="当前状态">
      <template scope="scope">
        <span v-if="scope.row.Status ==1" style="color: darkgray" type="text">未完成勋章申请</span>
        <span v-if="scope.row.Status ==2" style="color: darkgray" type="text">已完成勋章申请</span>
        <span v-if="scope.row.Status ==3" style="color: darkgray" type="text">交易已完成</span>
      </template>
    </el-table-column>

    <el-table-column
      label="更多操作">
      <template scope="scope">
        <el-button v-if="scope.row.Status==1" style="font-weight: bold; color:dodgerblue" type="text" @click="func(scope.row.ServiceID,scope.row.Content, scope.row.DemandStartTime,scope.row.DemandEndTime, scope.row.Duration)">申请勋章</el-button>
        <el-button v-if="scope.row.Status==2" style="font-weight: bold; color:dodgerblue" type="text" @click="checknum(scope.row.ServiceID)">查看已审核人数</el-button>
        <span v-if="scope.row.Status==3" style="font-weight: bold; color:darkgray" type="text"></span>
        <span v-if="scope.row.Status==4" style="font-weight: bold; color:darkgray" type="text">暂时不能申请</span>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
        title="审核详情"
        :visible.sync="dialogVisible"
        width="30%"
        @close = 'closeDialog'>
        <el-form :model="temp">
          <el-form-item label="当前已审核人数：">
            <span>{{ checkpersonnum }}</span>
          </el-form-item>
          </el-form>
    </el-dialog>
  <!--分页-->
    <div class="pagination-container" style = "margin-left:450px" >
      <el-pagination background @current-change="handleIndexChange"
                      :page-size="pageSize" :current-page.sync="pageNo" layout="total, prev, pager, next" :total="totalDataNumber">
      </el-pagination>
    </div>
  </div>
</template>

<style scoped>
  .el-table .warning-row {
    background: #f0f9eb;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  import clip from '@/utils/clipboard'
  import axios from 'axios'
  import { formatDate } from '@/methods/methods.js'
  import { formatDatex } from '@/methods/date.js'
  import port from '../../utils/manage'
  import global from '../../utils/global_userID'

  export default {
    filters: {
      formatDate(time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatDatex(time) {
        var date = new Date(time)
        return formatDatex(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    data() {
      return {
        inputData: 'https://github.com/PanJiaChen/vue-element-admin',
        dialogVisible: false,
        checkpersonnum:0,
        dialogTableVisible: false,
        UserName: undefined,
        Content: undefined,
        StartTime: undefined,
        EndTime: undefined,
        Duration: undefined,
        Remark: undefined,
        str_startTime: '',
        service: [],
        applyDisable: false,
        name: '',
        CreateTime: undefined,
        pageNo: 1,
        pageSize: 10,
        totalDataNumber: 0
      }
    },
    created() {
      var id = JSON.parse(localStorage.getItem('volunteerid'))
      global.global_userID = id
      console.log('全局：' + global.global_userID)
    },
    mounted: function(UserId) {
      var params = new URLSearchParams()
      params.append('UserID', global.global_userID)
      this.listLoading = true
      axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getServicedList', params).then(
        (res) => {
          if (res.data.list.rows) {
            console.log('有rows！！！')
            this.service = res.data.list.rows
            this.totalDataNumber = res.data.list.count
          } else {
            console.log('没有rows！！！')
            this.service = res.data.list
            this.totalDataNumber = res.data.list.length
          }
          console.log(res)
          this.listLoading = false
        }
      ).catch((err) => {
        console.log(err)
      })
    },
    methods: {
      /**
       * 现在可以直接申请勋章了 但是应该传递给申请勋章页面一些信息 在这一步
       * 读取当前service 对应的数据 自动填写到后边
       */

      func: function(serviceId, content, startTime, endTime, duration) {
        console.log(endTime)
        var nowtime=new Date().getTime()
        var nowEndTime = Date.parse(endTime) - 8*60*60*1000
        if(nowtime>nowEndTime){
          var params = new URLSearchParams()
          params.append('ServiceID', serviceId)
          axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getOldManName', params).then(
            (res) => {
              this.name = res.data.Name
              console.log(this.name)
              this.$router.push({ name: 'application', query: { name: this.name, serviceId: serviceId, content: content, startTime: startTime, endTime: endTime, duration: duration }})
            }
          ).catch((err) => {
            this.$message('申请失败，请重试或联系管理员！')
            console.log(err)
          })
        }else{
          this.$message('申请失败，未到需求结束时间！')
        }
        /*
        Bus.$emit('createTime', '')
        Bus.$emit('content', 'hda')
        *//*
        this.$router.push('/volunteers')
        var serviceId = 0
        serviceId = this.service.indexOf(index)
        this.getDetailtoApply(this.UserId, serviceId)
        /**
         * 此处获得这个ServiceId的目的是携带者这两个参数取填写并调用申请勋章的函数 然后把所有数据打包一起发给后台
         * 这个地方还需要一个能调用申请勋章界面的参数
         */
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        var pageSize = this.pageSize
        this.getAndDraw(parseInt(pageNo), parseInt(pageSize))
      },
      tableRowClassName(row, rowIndex) {
        if (rowIndex === 0) {
          return 'warning-row'
        } else if (rowIndex === 1) {
          return 'success-row'
        }
        return ''
      },
      getChainDetail(text, event) {
        clip(text, event)
      },

      checknum(serviceId){
        console.log(serviceId)
        this.dialogVisible = true
        let that = this
       //传值serviceID和UserId给后台，后台调用函数查询链上合约中数据
        var params = new URLSearchParams()
        params.append('ServiceID', serviceId)
        params.append('UserID', global.global_userID)
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getCheckNum', params).then(
          (res) => {
            that.checkpersonnum = res.data.num
            console.log(that.checkpersonnum)
          }
        ).catch((err) => {
          console.log(err)
        })

      },
      showAlert() {
        this.$alert('这是一段内容', '交易记录', {
          confirmButtonText: '确定'
        })
      }
    }
  }
</script>

