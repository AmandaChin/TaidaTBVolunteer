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
      label="订单属性">
      <template scope="scope">
        <span v-if="scope.row.mutualtype ==0" style="color: darkgray" type="text">我响应的</span>
        <span v-if="scope.row.mutualtype ==1" style="color: darkgray" type="text">我发布的</span>
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
        <el-button v-if="scope.row.Status==2" style="font-weight: bold; color:dodgerblue" type="text" @click="checknum(scope.row.ServiceID)">查看审核情况</el-button>
        <span v-if="scope.row.Status==3" style="font-weight: bold; color:darkgray" type="text"></span>
        <span v-if="scope.row.Status==4" style="font-weight: bold; color:darkgray" type="text">暂时不能申请</span>
      </template>
    </el-table-column>

    <el-table-column
      label="查看更多详情">
      <template scope="scope">
        <el-button v-if="scope.row.mutualtype ==0" style="font-weight: bold; color:dodgerblue" type="text" @click="check1(scope.row)">查看我响应的服务</el-button>
        <el-button v-if="scope.row.mutualtype ==1" style="font-weight: bold; color:dodgerblue" type="text" @click="check2(scope.row)">查看我发布的服务</el-button>
      </template>
    </el-table-column>

  </el-table>
  <!--查看更多详情时弹出的表格-->
  <el-dialog title="我响应的服务详情" :visible.sync="dialogFormVisible1">
    <el-form :rules="rules" ref="dataForm" :model="volunteer" label-position="left" width="50%" style='width: 400px; margin-left:50px;'>
      <el-form-item label="志愿者用户名" prop="UserName">
        <span>{{volunteer.UserName}}</span>
      </el-form-item>

      <el-form-item label="志愿者性别" prop="Gender">
        <span>{{ volunteer.Gender }}</span>
      </el-form-item>

      <el-form-item label="志愿者姓名" prop="Name">
        <span>{{ volunteer.Name }}</span>
      </el-form-item>

      <el-form-item label="志愿者身份证号" prop="IDnumber">
        <span>{{ volunteer.IDNumber }}</span>
      </el-form-item>

      <el-form-item label="邮箱地址" prop="Email">
        <span>{{ volunteer.Email }}</span>
      </el-form-item>

      <el-form-item label="联系方式" prop="Phone">
        <span>{{ volunteer.Phone }}</span>
      </el-form-item>
    </el-form>
    <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" width="50%" style='width: 400px; margin-left:50px;'>
      <el-form-item label="服务日期" prop="DemandStartTime">
        <span>{{temp.DemandStartTime|formatDatex}}</span>
      </el-form-item>

      <el-form-item label="服务对象" prop="Name">
        <span>{{ temp.Name }}</span>
      </el-form-item>

      <el-form-item label="服务内容" prop="Content">
        <span>{{temp.Content}}</span>
      </el-form-item>

      <el-form-item v-if="temp.mutualtype ==0" label="老人需求详情" prop="Remark">
        <span v-html="temp.Remark"></span>
      </el-form-item>

      <el-form-item v-if="temp.mutualtype ==1" label="志愿者提供服务详情" prop="Remark">
        <span v-html="temp.Remark"></span>
      </el-form-item>

      <el-form-item label="服务时长" prop="Duration">
        <span>{{ temp.Duration }}</span>
      </el-form-item>

      <el-form-item label="联系方式" prop="Phone">
        <span>{{ temp.Phone }}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible1= false">关闭</el-button>
    </div>
  </el-dialog>

  <el-dialog title="我发布的服务详情" :visible.sync="dialogFormVisible2">
    <el-form :rules="rules" ref="dataForm" :model="volunteer" label-position="left" width="50%" style='width: 400px; margin-left:50px;'>
      <el-form-item label="志愿者用户名" prop="UserName">
        <span>{{volunteer.UserName}}</span>
      </el-form-item>

      <el-form-item label="志愿者性别" prop="Gender">
        <span>{{ volunteer.Gender }}</span>
      </el-form-item>

      <el-form-item label="志愿者姓名" prop="Name">
        <span>{{ volunteer.Name }}</span>
      </el-form-item>

      <el-form-item label="志愿者身份证号" prop="IDnumber">
        <span>{{ volunteer.IDNumber }}</span>
      </el-form-item>

      <el-form-item label="邮箱地址" prop="Email">
        <span>{{ volunteer.Email }}</span>
      </el-form-item>

      <el-form-item label="联系方式" prop="Phone">
        <span>{{ volunteer.Phone }}</span>
      </el-form-item>
    </el-form>
    <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" width="50%" style='width: 400px; margin-left:50px;'>
      <el-form-item label="服务日期" prop="DemandStartTime">
        <span>{{temp.DemandStartTime|formatDatex}}</span>
      </el-form-item>

      <el-form-item label="服务对象" prop="Name">
        <span>{{ temp.Name }}</span>
      </el-form-item>

      <el-form-item label="服务内容" prop="Content">
        <span>{{temp.Content}}</span>
      </el-form-item>

      <el-form-item v-if="temp.mutualtype ==0" label="老人需求详情" prop="Remark">
        <span v-html="temp.Remark"></span>
      </el-form-item>

      <el-form-item v-if="temp.mutualtype ==1" label="志愿者提供服务详情" prop="Remark">
        <span v-html="temp.Remark"></span>
      </el-form-item>

      <el-form-item label="服务时长" prop="Duration">
        <span>{{ temp.Duration }}</span>
      </el-form-item>

      <el-form-item label="联系方式" prop="Phone">
        <span>{{ temp.Phone }}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible2= false">关闭</el-button>
    </div>
  </el-dialog>

  <el-dialog
        title="审核详情"
        :visible.sync="dialogVisible"
        width="30%"
        @close = 'closeDialog'>
        <el-form :model="temp">
          <el-form-item label="共需审核人数：">
            <span> 4 </span>
          </el-form-item>
          <el-form-item label="当前已审核人数：">
            <span>{{ checkpersonnum }}</span>
          </el-form-item>
          <el-form-item label="当前未审核人数：">
            <span>{{ 4-checkpersonnum }}</span>
          </el-form-item>
          <el-form-item label="当前获得勋章数量：">
            <span>{{ checkmedalnum }}</span>
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
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        inputData: 'https://github.com/PanJiaChen/vue-element-admin',
        dialogVisible: false,
        checkpersonnum:0,
        checkmedalnum:0,
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
        totalDataNumber: 0,
        temp: {
          ServiceID: undefined,
          UserID: undefined,
          Remark: undefined,
          Province: undefined,
          City: undefined,
          District: undefined,
          Phone: undefined,
          Name: undefined,
          Duration: undefined,
          DemandStartTime: undefined,
          Content: undefined
        },
        volunteer: {
          UserName: '',
          Gender: '',
          Name: '',
          IDNumber: '',
          Email: '',
          Phone: ''
        },
        serviceId: 0
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
      check1(row) {
        this.temp = Object.assign({}, row) // copy obj
        var params = new URLSearchParams()
        params.append('ServiceID', this.temp.ServiceID)
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getUserByService', params).then(
          (res) => {
            this.volunteer = res.data.list
            this.dialogFormVisible1 = true
          }
        ).catch((err) => {
          console.log(err)
        })
      },
      check2(row) {
        this.temp = Object.assign({}, row) // copy obj
        var params = new URLSearchParams()
        params.append('ServiceID', this.temp.ServiceID)
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getUserByService', params).then(
          (res) => {
            this.volunteer = res.data.list
            this.dialogFormVisible2 = true
          }
        ).catch((err) => {
          console.log(err)
        })
      },
      func: function(serviceId, content, startTime, endTime, duration) {
        console.log(endTime)
        var nowtime = new Date().getTime()
        var nowEndTime = Date.parse(endTime) - 8 * 60 * 60 * 1000
        if (nowtime > nowEndTime) {
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
        } else {
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

      checknum(serviceId) {
        console.log(serviceId)
        this.dialogVisible = true
        const that = this
        // 传值serviceID和UserId给后台，后台调用函数查询链上合约中数据
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
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getCheckMedal', params).then(
          (res2) =>{
            that.checkmedalnum = res2.data.num
            console.log(that.checkmedalnum)
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

