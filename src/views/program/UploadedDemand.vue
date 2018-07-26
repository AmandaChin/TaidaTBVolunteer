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
        <span style="color: darkgray">{{scope.row.CreateTime|formatDates}}</span>
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
      label="更多操作">
      <template scope="scope">
        <el-button v-if="scope.row.Status == 0" style="font-weight: bold; color:dodgerblue" type="text" @click="handleShowDialog(scope.row.ServiceID)">删除需求</el-button>
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
<!--点击删除需求之后的表单-->
     <el-dialog title="删除需求" :visible.sync="dialogFormVisible2" width="25%">
          <el-form :model="temp" label-position="left"  style="margin-left:50px">
          </el-form>
          <span style="fontSize:15px" type="text" align ="center">确定删除此条未被响应的需求吗？</span>
          <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="DeleteDemand(serviceId)">删除</el-button>
          <el-button @click="dialogFormVisible2 = false">取消</el-button>
 
          </div>
        </el-dialog>
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
  import { formatDates } from '@/methods/dateLater.js'
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
      },
      formatDates(time) {
        var date = new Date(time)
        return formatDates(date, 'yyyy-MM-dd hh:mm:ss')
      }

    },
    data() {
      return {
        inputData: 'https://github.com/PanJiaChen/vue-element-admin',
        dialogFormVisible: false,
        dialogFormVisible2: false,
        demands: [],
        volunteer: {
          UserName: '',
          Gender: '',
          Name: '',
          IDNumber: '',
          Email: '',
          Phone: ''
        },
        serviceId:0,
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
          if(res.data.list.rows)
              {
                this.demands=res.data.list.rows;
                this.totalDataNumber = res.data.list.count;
              }else{
                 this.demands=res.data.list;
                 this.totalDataNumber = res.data.list.length;
              }
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
      DeleteDemand(serviceId){
       let that = this;
       this.dialogFormVisible2 = false;

       var params = new URLSearchParams()
       params.append('serviceId',serviceId)
       console.log("serviceId!!!!!"+serviceId)
       axios.post('http://' + port.info.host + ':' + port.info.port + '/api/deleteDemand', params).then(
            function(res){
              console.log(res)
              console.log("进来啦！")
                if(res.data.num === 1){
                  console.log("进来啦2号！")
               // console.log("testnumsuccess!!"+res.data.num)
                that.$notify({
                    title: '成功',
                    message: '已删除需求',
                    type: 'success',
                    duration: 2000
                })
                setTimeout(() => {
                      var params = new URLSearchParams()
                      params.append('UserID', global.global_userID)
                      that.listLoading = true
                      axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getDemandByUserID', params).then(
                        (res) => {
                          if(res.data.list.rows)
                              {
                                that.demands=res.data.list.rows;
                                that.totalDataNumber = res.data.list.count;
                              }else{
                                that.demands=res.data.list;
                                that.totalDataNumber = res.data.list.length;
                              }
                          console.log(res)
                          that.listLoading = false
                        }
                      ).catch((err) => {
                        console.log(err)
                      })

                }, 1000)
                 
              }else{
               // console.log("testnumfail!!"+res.data.num)
                that.$notify({
                    title: '失败',
                    message: '删除失败,请重新删除',
                    type: 'error',
                    duration: 2000
                })
              }
            
       })


        
      },
      handleShowDialog(row){
      console.log("这里是传值："+ row)
      this.serviceId = row
      this.dialogFormVisible2 = true
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

