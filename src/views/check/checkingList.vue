<template>
<div class="checkingList">
    <el-table  :data="checkingList" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
      style="width: 100%;margin-left: 20px" >

      <el-table-column  label="服务日期">
        <template slot-scope="scope">
          <span>{{scope.row.startTime|formatDate}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="志愿者">
        <template slot-scope="scope">
          <span>{{scope.row.volunteerName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务内容">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
      </template>
      </el-table-column>


      <el-table-column label="服务时段">
        <template slot-scope="scope">
          <span>{{scope.row.startTime|getTime}}</span>
          <span> - </span>
          <span>{{scope.row.endTime|getTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="审核" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkRecord(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>
<script>
import axios from 'axios'
import { formatDate } from '@/methods/methods.js'
import port from '../../utils/manage'
import global from '../../utils/global_userID'

export default {
  data() {
    return {
      checkingList: null,
      listLoading: true
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    },

    getTime(time) {
      var date = new Date(time)
      return formatDate(date, 'hh:mm:ss')
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
      var params = new URLSearchParams()
      params.append('UserID', global.global_userID)
      params.append('status', '0')
      this.listLoading = true
      axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getCheckList', params).then(
        (res) => {
          this.checkingList = res.data.list
          console.log(res.data.list)
          this.listLoading = false
        }
      )
    },
    checkRecord(row) {
      this.$router.push({ name: 'checkInfo',
        params: {
          serviceId: row.serviceId,
          oldMan: row.oldManName,
          volunteer: row.volunteerName,
          startTime: row.startTime,
          endTime: row.endTime,
          duration: row.duration,
          content: row.content,
          remark: row.remark,
          volunteerId: row.volunteerID
        }
      })
    }
  }
}
</script>
<style scoped>
.checkingList{
    margin-left: 10px;
    margin-top: 15px;
}
</style>

