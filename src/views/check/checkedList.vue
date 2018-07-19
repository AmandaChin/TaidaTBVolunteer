<template>
<div class="checkedList">
     <el-table  :data="checkedList.slice((pageNo-1)*pageSize,pageNo*pageSize)" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
                style="width: 100%;margin-left: 20px" >

      <el-table-column  label="服务日期">
        <template slot-scope="scope">
          <span>{{scope.row.startTime|formatDatex}}</span>
        </template>
      </el-table-column>

      <el-table-column label="志愿者">
        <template slot-scope="scope">
          <span>{{scope.row.volunteerName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务内容">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
      </template>
      </el-table-column>


      <el-table-column label="服务开始时间">
        <template slot-scope="scope">
          <span>{{scope.row.startTime|getTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务结束时间" >
        <template slot-scope="scope">
          <span>{{scope.row.endTime|getTime}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="查看"  class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDialog(scope.row)">查看</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!--分页-->
    <div class="pagination-container" style = "margin-left:450px">
      <el-pagination background @current-change="handleIndexChange"
                      :page-size="pageSize" :current-page.sync="pageNo" layout="total, prev, pager, next" :total="totalDataNumber">
      </el-pagination>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import { formatDate } from '@/methods/methods.js'
import port from '../../utils/manage'
import global from '../../utils/global_userID'
import { formatDatex } from '@/methods/date.js'

export default {
  data() {
    return {
      checkedList: null,
      listLoading: false,
        pageNo:1,
        pageSize:10,
        totalDataNumber:0
    }
  },
  filters: {
    formatDatex(time) {
      var date = new Date(time)
      return formatDatex(date, 'yyyy-MM-dd')
    },

    getTime(time) {
      var date = new Date(time)
      return formatDatex(date, 'hh:mm:ss')
    }
  },
  created() {
    this.getList()
    var id = JSON.parse(localStorage.getItem('volunteerid'))
    global.global_userID = id
    console.log('全局：'+global.global_userID)
  
  },
  methods: {
    getList() {
      this.listLoading = true
      var params = new URLSearchParams()
      params.append('UserID', global.global_userID)
      params.append('status', '1')
      axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getCheckList', params).then(
        (res) => {
          this.checkedList = res.data.list
          this.totalDataNumber = res.data.list.length;
          console.log(res.data.list)
          this.listLoading = false
        }
      )
    },
    
    handleCurrentChange(val) {
        this.listQuery.page = val
        var pageSize = this.pageSize
        this.getAndDraw(parseInt(pageNo),parseInt(pageSize))
      }
  }
}
</script>

<style scoped>
.checkedList{
    margin-left: 10px;
    margin-top: 15px;
}
</style>
