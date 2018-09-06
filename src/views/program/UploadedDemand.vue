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

          <el-button  v-if="scope.row.Status ==0" type="primary" size="mini" @click="handleUpdate(scope.row.ServiceID)">编辑</el-button>
          <el-button  v-if="scope.row.Status!=0"  type="primary" size="mini" @click="volunteerInfo(scope.row.ServiceID)">查看响应者信息</el-button>
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleShow(scope.row)">查看
          </el-button>
          <el-button v-if="scope.row.Status ==0" size="mini" type="danger" @click="handleShowDialog(scope.row.ServiceID)">删除
          </el-button>

          <!--<el-button v-if="scope.row.Status == 0" style="font-weight: bold; color:dodgerblue" type="text" @click="handleShowDialog(scope.row.ServiceID)">删除需求</el-button>-->
          <!--<el-button v-if="scope.row.Status!=0" style="font-weight: bold; color:dodgerblue" type="text" @click="volunteerInfo(scope.row.ServiceID)">响应者信息</el-button>-->
          <el-dialog title="服务详情" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="dataForm" :model="volunteer" label-position="left" width="50%" style='width: 400px; margin-left:50px;'>
              <el-form-item label="志愿者用户名" prop="UserName">
                <span>{{volunteer.UserName}}</span>
              </el-form-item>

              <el-form-item label="志愿者性别" prop="Gender">
                <span>{{ volunteer.Gender }}</span>
              </el-form-item>
              cd
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
    <!--显示需求详情-->
    <el-dialog title="服务详情" :visible.sync="dialogFormVisible3">
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

        <el-form-item label="具体事宜" prop="Remark">
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
        <el-button @click="dialogFormVisible3= false">取消</el-button>
        <el-button type="primary" @click="applyService(temp)">申请</el-button>
      </div>
    </el-dialog>
    <!--点击删除需求之后的表单-->
    <!--<el-dialog title="删除需求" :visible.sync="dialogFormVisible2" width="25%">-->
    <!--<el-form :model="temp" label-position="left"  style="margin-left:50px">-->
    <!--</el-form>-->
    <!--<span style="fontSize:15px" type="text" align ="center">确定删除此条未被响应的需求吗？</span>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button type="primary" @click="DeleteDemand(serviceId)">删除</el-button>-->
    <!--<el-button @click="dialogFormVisible2 = false">取消</el-button>-->

    <!--</div>-->
    <!--</el-dialog>-->
    <el-dialog title="删除需求" :visible.sync="dialogFormVisible2" width="25%">
      <el-form :model="temp" label-position="left"  style="margin-left:50px">
      </el-form>
      <span style="fontSize:15px" type="text" align ="center">确定删除此条未被响应的需求吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DeleteDemand(serviceId)">删除</el-button>
        <el-button @click="dialogFormVisible2 = false">取消</el-button>

      </div>
    </el-dialog>
    <!--弹出的编辑界面-->
    <el-dialog title="编辑需求            请输入您要更改为的新数据" :visible.sync="dialogFormVisible4">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" width="50%" style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="80px" label="服务内容:" class="postInfo-container-item">
          <el-select clearable style="width: 130px" class="filter-item"  v-model="postForm.service_content" placeholder="服务类型">
            <el-option v-for="item in servecontent_info" :key="item.ID" :label="item.type" :value="item.ID" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px;" label-width="80px" label=" 开始日期:" class="postInfo-container-item">
          <el-date-picker v-model="postForm.start_time" type="date"
                          format="yyyy-MM-dd " value-format="yyyy-MM-dd"
                          :picker-options="pickerBeginDateAfter" placeholder="选择开始的时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px;" label-width="80px" label=" 服务时段:" class="postInfo-container-item">
          <el-time-select
            placeholder="起始时间"
            v-model="pickedtime"
            :picker-options="{
                     start: '05:30',
                      step: '00:30',
                      end: '20:00'
                   }"></el-time-select>
        </el-form-item>
        <el-form-item label-width="80px" label="服务时长:" class="postInfo-container-item">
          <el-select clearable style="width: 100px" class="filter-item" v-model="postForm.duration" placeholder="小时">
            <el-option v-for="item in time_info" :key="item" :label="item" :value="item" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px;" label-width="45px" label="详情:">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 20}" placeholder="Please input" v-model="postForm.content">
          </el-input>
        </el-form-item>
        <!--<el-form-item label="服务对象" prop="Name">-->
        <!--<span>{{ temp.Name }}</span>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="服务内容" prop="Content">-->
        <!--<span>{{temp.Content}}</span>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="具体事宜" prop="Remark">-->
        <!--<span v-html="temp.Remark"></span>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="服务时长" prop="Duration">-->
        <!--<span>{{ temp.Duration }}</span>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="联系方式" prop="Phone">-->
        <!--<span>{{ temp.Phone }}</span>-->
        <!--</el-form-item>-->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4= false">取消</el-button>
        <el-button type="primary" @click="editdemand(serviceId)">确定更改</el-button>
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
        pickerBeginDateAfter: {
          disabledDate(time) {
            var timeSpace = time.getTime() < (Date.now() - 24 * 60 * 60 * 1000)
            return timeSpace
          }
        },
        time_info: [1, 1.5, 2, 2.5, 3, 3.5, 4],
        inputData: 'https://github.com/PanJiaChen/vue-element-admin',
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        dialogFormVisible4: false,
        demands: [],
        servecontent_info: [],
        volunteer: {
          UserName: '',
          Gender: '',
          Name: '',
          IDNumber: '',
          Email: '',
          Phone: ''
        },
        serviceId: 0,
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
        pickedtime: '',
        postForm: {
          service_content: '',
          editStartTime: '',
          duration: '',
          content: '',
          start_time: ''
        }
      }
    },
    created() {
      this.showServerType()
      var id = JSON.parse(localStorage.getItem('volunteerid'))
      global.global_userID = id
      console.log('全局：' + global.global_userID)
    },
    mounted: function(UserId) {
      var params = new URLSearchParams()
      params.append('UserID', global.global_userID)
      this.listLoading = true
      axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getDemandByUserID', params).then(
        (res) => {
          if (res.data.list.rows) {
            this.demands = res.data.list.rows
            this.totalDataNumber = res.data.list.count
          } else {
            this.demands = res.data.list
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
      formatDateTime(inputTime) {
        var date = new Date(inputTime)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        var minute = date.getMinutes()
        var second = date.getSeconds()
        minute = minute < 10 ? ('0' + minute) : minute
        second = second < 10 ? ('0' + second) : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      },
      editdemand(serviceId) {
        const that = this
        this.dialogFormVisible4 = false
        var params = new URLSearchParams()
        params.append('UserId', global.global_userID)
        params.append('serviceId', serviceId)
        params.append('Duration', this.postForm.duration)
        params.append('Content', this.postForm.service_content)
        console.log('修改时iask传进来的serviceId值    ' + serviceId)
        console.log('修改时iask传进来的UserId值    ' + global.global_userID)
        console.log('修改时iask传进来的Duration值    ' + this.postForm.duration)
        console.log('修改时iask传进来的Content值    ' + this.postForm.service_content)
        console.log('修改时iask传进来的Remark值    ' + this.postForm.content)
        if (this.postForm.service_content === undefined) {
          this.$message('服务内容禁止为空')
          return
        } else if (this.postForm.start_time === '') {
          this.$message('起始时间禁止为空')
          return
        } else if (this.postForm.content === undefined) {
          this.$message('详情内容禁止为空')
          return
        } else if (this.postForm.duration.length === 0) {
          this.$message('服务时长禁止为空')
          return
        } else {
          var StartTimestamp = new Date(String(this.postForm.start_time) + ' ' + this.pickedtime)
          var EndTimestamp = StartTimestamp.getTime() + this.postForm.duration * 60 * 60 * 1000
          var finalbegin = this.formatDateTime(StartTimestamp.getTime())
          var finalend = this.formatDateTime(EndTimestamp)
          // params.append('DemandStartTime', this.postForm.start_time)
          params.append('DemandStartTime', finalbegin)
          // params.append('DemandEndTime', this.postForm.end_time)
          params.append('DemandEndTime', finalend)
          params.append('Remark', this.postForm.content)
          console.log('必须要显示呀  修改时iask传进来的DemandStartTime值    ' + finalbegin)
          console.log('必须要显示呀  修改时iask传进来的DemandEndTime值    ' + finalend)
          axios.post('http://' + port.info.host + ':' + port.info.port + '/api/editDemand', params).then(
            function(res){
              console.log(res)
              console.log("进来啦！")
              if(res.data.num === 1){
                console.log("进来啦2号！")
                // console.log("testnumsuccess!!"+res.data.num)
                that.$notify({
                  title: '成功',
                  message: '已成功更改需求',
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
                  message: '编辑需求失败，请重新编辑',
                  type: 'error',
                  duration: 2000
                })
              }

            }
          )
        }
      },
      showServerType() {
        // 得到全部服务类型
        axios.get('http://' + port.info.host + ':' + port.info.port + '/api/itemOperation',
          {
            dataType: 'jsonp',
            crossDoxmain: true
          }).then(
          (res) => {
            this.servecontent_info = res.data.list.rows
            console.log(res)
          }
        ).catch((err) => {
          console.log(err)
        })
      },
      handleUpdate(row) {
        // this.postForm.service_content = this.scope.row.Content
        console.log('这里是传值：' + row)
        this.serviceId = row
        this.dialogFormVisible4 = true
      },
      handleShow(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogFormVisible3 = true
      },
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
      handleShowDialog(row) {
        console.log('这里是传值：' + row)
        this.serviceId = row
        this.dialogFormVisible2 = true
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        var pageSize = this.pageSize
        this.getAndDraw(parseInt(pageNo), parseInt(pageSize))
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

