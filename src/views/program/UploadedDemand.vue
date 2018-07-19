<template>
<div class="app-container calendar-list-container">
  <el-table
    :data="demands.slice((pageNo-1)*pageSize,pageNo*pageSize)"
    style="width: 100%;margin-left: 20px"
    v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
    :row-class-name="tableRowClassName">
    <el-table-column
      label="发布时间">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.CreateTime|formatDatex}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="服务内容">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.Content}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="起始时间"
      prop="applyingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.DemandStartTime|formatDatex}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="终止时间"
      prop="applyingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.DemandEndTime|formatDatex}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="当前状态">
      <template scope="scope">
        <span v-if="scope.row.Status ==0" style="color: darkgray" type="text">未被响应</span>
        <span v-if="scope.row.Status !=0" style="color: darkgray" type="text">已被响应</span>
      </template>
    </el-table-column>
    <el-table-column
      label="响应者信息">
      <template scope="scope">
        <span v-if="scope.row.Status == 0" style="color: darkgray" type="text">暂无响应</span>
        <el-button v-if="scope.row.Status!=0" style="font-weight: bold; color:dodgerblue" type="text" @click="volunteerInfo(scope.row.ServiceID)">响应者信息</el-button>
        <el-dialog title="服务详情" :visible.sync="dialogFormVisible">
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
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">关闭</el-button>
          </div>
        </el-dialog>
      </template>
    </el-table-column>
 
  </el-table>
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
        dialogFormVisible: false,
        demands: [],
        volunteer: {
          UserName: '',
          Gender: '',
          Name: '',
          IDNumber: '',
          Email: '',
          Phone: ''
        },
        pageNo:1,
        pageSize:10,
        totalDataNumber:0
      }
    },
    created() {
      var id = JSON.parse(localStorage.getItem('volunteerid'))
      global.global_userID = id
      console.log('全局：'+global.global_userID)
    },
    mounted: function(UserId) {
      var params = new URLSearchParams()
      params.append('UserID', global.global_userID)
       this.listLoading = true
      axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getDemandByUserID', params).then(
        (res) => {
          this.demands = res.data.list
          this.totalDataNumber = res.data.list.length;
          console.log(res)
           this.listLoading = false
        }
      ).catch((err) => {
        console.log(err)
      })
    },
    methods: {
      volunteerInfo(ServiceId) {
        var params = new URLSearchParams()
        params.append('ServiceID', ServiceId)
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getUserByService', params).then(
          (res) => {
            this.volunteer = res.data.list
            this.dialogFormVisible = true
          }
        ).catch((err) => {
          console.log(err)
        })
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        var pageSize = this.pageSize
        this.getAndDraw(parseInt(pageNo),parseInt(pageSize))
      },
      tableRowClassName({ row, rowIndex }) {
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
      showAlert() {
        this.$alert('这是一段内容', '交易记录', {
          confirmButtonText: '确定'
        })
      }
    }
  }
</script>

