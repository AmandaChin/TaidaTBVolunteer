<!--搜索志愿者发布的需求-->
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select clearable style="width: 130px" class="filter-item" v-model="listQuery.content" placeholder="内容类型">
        <el-option v-for="item in servecontent_info" :key="item.ID" :label="item.type" :value="item.ID" >
        </el-option>
      </el-select>
      <el-date-picker clearable style="width: 200px;"
                      v-model="listQuery.startTime"
                      :picker-options="pickerBeginDateAfter"
                      class="filter-item"
                      type="date" value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择服务开始日期"></el-date-picker>

      <el-select clearable style="width: 120px" class="filter-item"
                 v-model="listQuery.duration" placeholder="服务时长">
        <el-option v-for="item in durationOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 130px"
                 v-model="listQuery.type"  @change="TypeChangeHandler">
        <el-option v-for="item in  placeOptions" :key="item.key" :label="item.display_name" :value="item.key" >
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table :key='tableKey' :data="list.slice((pageNo-1)*pageSize,pageNo*pageSize)" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
              style="width: 80%" @selection-change="handleSelectionChange" >
      <el-table-column width="200px" align="center" label="服务日期">
        <template slot-scope="scope">
          <span>{{scope.row.DemandStartTime|formatDatex}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="服务内容">
        <template slot-scope="scope">
          <span class="link-type" @click="handleShowDialog(scope.row)">{{scope.row.Content}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="发布人">
        <template slot-scope="scope">
          <span>{{scope.row.Name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="服务时长">
        <template slot-scope="scope">
          <span>{{scope.row.Duration}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"@click="handleShowDialog(scope.row)">响应</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style = "margin-left:450px">
      <el-pagination background @current-change="handleIndexChange"
                      :page-size="pageSize" :current-page.sync="pageNo" layout="total, prev, pager, next" :total="totalDataNumber">
      </el-pagination>
    </div>
    <el-dialog title="可提供服务详情" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" width="50%" style='width: 400px; margin-left:50px;'>
        <el-form-item label="服务日期" prop="DemandStartTime">
          <span>{{temp.DemandStartTime|formatDatex}}</span>
        </el-form-item>

        <el-form-item label="志愿者" prop="Name">
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
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleShowDialog(temp)">响应</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import axios from 'axios'
  import { formatDate } from '@/methods/methods.js'
  import { formatDatex } from '@/methods/date.js'
  import port from '../../utils/manage'
  import global from '../../utils/global_userID'

  const placeOptions = [
    { key: 1, display_name: '同区选择' },
    { key: 2, display_name: '同市选择' },
    { key: 3, display_name: '同省选择' },
    { key: 4, display_name: '全国不限' }
  ]

  // arr to obj ,such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = placeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    directives: {
      waves
    },
    data() {
      return {
        pickerBeginDateAfter: {
          disabledDate(time) {
            var timeSpace = time.getTime() < (Date.now() - 24 * 60 * 60 * 1000)
            return timeSpace
          }
        },
        servecontent_info: [],
        tableKey: 0,
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          duration: undefined,
          content: undefined,
          type: 4,
          startTime: undefined
        },
        durationOptions: [1, 1.5, 2, 2.5, 3, 3.5, 4],
        placeOptions,
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
        dialogFormVisible: false,
        dialogStatus: '',
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        pageNo: 1,
        pageSize: 10,
        totalDataNumber: 0
      }
    },
    filters: {
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      },
      formatDate(time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatDatex(time) {
        var date = new Date(time)
        return formatDatex(date, 'yyyy-MM-dd hh:mm:ss')
      }

  },
  created() {
      this.showServerType()
      this.getList()
      var id = JSON.parse(localStorage.getItem('volunteerid'))
      global.global_userID = id
      console.log('全局：' + global.global_userID)
  },
  methods: {
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
      // 得到初始的全部需求
      getList() {
        this.listLoading = true
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getAllVolunteerService', { UserID: global.global_userID }).then(

          (res) => {
            if (res.data.list.rows) {
              console.log('有rows！！！')
              this.list = res.data.list.rows
              this.totalDataNumber = res.data.list.count
            } else {
              console.log('没有rows！！！')
              this.list = res.data.list
              this.totalDataNumber = res.data.list.length
            }
            console.log(res)
            this.listLoading = false
          }
        ).catch((err) => {
          console.log(err)
        })
      },
      // 处理search函数
      handleFilter() {
        console.log('search' + this.listQuery.content)
        this.listQuery.page = 1
        // this.getList()
        this.listLoading = true
        const that = this
        var duration
        var startTime
        var content
        if (this.listQuery.duration == undefined) {
          console.log('undefined duration')
          duration = 0
        } else {
          console.log(' duration')
          duration = that.listQuery.duration
        }
        if (this.listQuery.startTime == undefined) {
          console.log('undefined startTime')
          // 默认时间是今天
          startTime = '1980-03-15 15:35:04'
          // var now=  that.formatDateTime(Date.now())
          // startTime= now
          console.log('undefined startTime' + startTime)
        } else {
          console.log(' startTime')
          startTime = that.listQuery.startTime
        }
        if (this.listQuery.content == undefined) {
          console.log('undefined content')
          content = 0
        } else {
          console.log(' duration')
          content = that.listQuery.content
        }
        if (duration == 0) {
          if (content == 0) {
            console.log('enter no duration and no content')
            axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getProvideByConditionNoDurationNoContent',
              { UserID: global.global_userID,
                DemandStartTime: startTime,
                type: this.listQuery.type
              }).then(
              (res) => {
                if (res.data.list.rows) {
                  console.log('有rows！！！')
                  this.list = res.data.list.rows
                  this.totalDataNumber = res.data.list.count
                } else {
                  console.log('没有rows！！！')
                  this.list = res.data.list
                  this.totalDataNumber = res.data.list.length
                }

                console.log(res)
                this.listLoading = false
              }
            ).catch((err) => {
              console.log(err)
            })
          } else {
            console.log('enter no duration but content')
            axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getProvideByConditionNoDuration',
              { UserID: global.global_userID,
                Content: this.listQuery.content,
                DemandStartTime: startTime,
                type: this.listQuery.type
              }).then(
              (res) => {
                if (res.data.list.rows) {
                  console.log('有rows！！！')
                  this.list = res.data.list.rows
                  this.totalDataNumber = res.data.list.count
                } else {
                  console.log('没有rows！！！')
                  this.list = res.data.list
                  this.totalDataNumber = res.data.list.length
                }

                console.log(res)
                this.listLoading = false
              }
            ).catch((err) => {
              console.log(err)
            })
          }
        } else {
          if (content == 0) {
            console.log('enter duration and no content')
            axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getProvideByConditionNoContent',
              { UserID: global.global_userID,
                Duration: duration,
                DemandStartTime: startTime,
                type: this.listQuery.type
              }).then(
              (res) => {
                console.log(res.data)
                if (res.data.list.rows) {
                  console.log('有rows！！！')
                  this.list = res.data.list.rows
                  this.totalDataNumber = res.data.list.count
                } else {
                  console.log('没有rows！！！')
                  this.list = res.data.list
                  this.totalDataNumber = res.data.list.length
                }
                console.log(res)
                this.listLoading = false
              }
            ).catch((err) => {
              console.log(err)
            })
          } else {
            console.log('enter duration and content')
            axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getProvideByCondition',
              { UserID: global.global_userID,
                Content: this.listQuery.content,
                Duration: duration,
                DemandStartTime: startTime,
                type: this.listQuery.type
              }).then(
              (res) => {
              // console.log("testdurationsearch"+res.data.list)
                if (res.data.list.rows) {
                  console.log('有rows！！！')
                  this.list = res.data.list.rows
                  this.totalDataNumber = res.data.list.count
                } else {
                  console.log('没有rows！！！')
                  this.list = res.data.list
                  this.totalDataNumber = res.data.list.length
                }
                // console.log(res);
                this.listLoading = false
              }
            ).catch((err) => {
              console.log(err)
            })
          }
        }
        console.log(duration)
        console.log(startTime)
        // this.listLoading = false
      },
      // 志愿者申请
      applyService(row) {
        var num
        const that = this
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/applicateInVolunteerProvide',
          { UserID: global.global_userID,
            VolunteerID: row.UserID,
            VolunteerServiceID: row.VolunteerServiceID,
            Content: row.ContentID,
            DemandStartTime: row.DemandEndTime,
            DemandEndTime: row.DemandEndTime,
            Duration: row.Duration,
            Remark: row.Remark
          }).then(
          function(res) {
            // num=res.data.num;
            // console.log('申请返回值：'+res.data.num)
            if (res.data.num === 1) {
              // console.log("testnumsuccess!!"+res.data.num)
              that.$notify({
                title: '成功',
                message: '响应成功',
                type: 'success',
                duration: 2000
              })
              setTimeout(() => {
                axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getAllVolunteerService', { UserID: global.global_userID }).then(
                  (res) => {
                    that.list = res.data.list.rows
                    this.totalDataNumber = res.data.list.count
                    console.log('刷新页面后' + res)
                  }
                ).catch((err) => {
                  console.log(err)
                })
              }, 2000)
            } else {
              // console.log("testnumfail!!"+res.data.num)
              that.$notify({
                title: '失败',
                message: '响应失败,请重新响应',
                type: 'error',
                duration: 2000
              })
            }
          }
        )
        this.dialogFormVisible = false
      },
      handleShowDialog(row) {
        alert('请一定确保已和对方取得联系再响应哦~')
        this.temp = Object.assign({}, row) // copy obj
        this.dialogFormVisible = true
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        var pageSize = this.pageSize
        this.getAndDraw(parseInt(pageNo), parseInt(pageSize))
      },
      TypeChangeHandler(value) {
        this.listQuery.type = value
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }

    }
  }
</script>
