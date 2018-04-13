<template>
<div class="checkingList">
    <el-table  :data="checkingList" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row
      style="width: 80%">

      <el-table-column width="200px" align="center" label="服务日期">
        <template slot-scope="scope">
          <span>{{scope.row.startTime|formatDate}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="志愿者">
        <template slot-scope="scope">
          <span>{{scope.row.volunteerName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="服务内容">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
      </template>
      </el-table-column>


      <el-table-column width="250px" align="center" label="服务时段">
        <template slot-scope="scope">
          <span>{{scope.row.startTime|getTime}}</span>
          <span> - </span>
          <span>{{scope.row.endTime|getTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="审核" width="120" class-name="small-padding fixed-width">
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
export default {
  data(){
    return {
        checkingList:null,
        listLoading: true
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
  },
  created() {
    this.getList()
  },
  methods: {
     getList() {
       this.listLoading = true
       axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getCheckList',
        {
          UserID : 1,
          status: 0
        }
       ).then(
         (res)=>{
                  this.checkingList=res.data.list;
                  console.log(res.data.list);
                  this.listLoading = false
                }
       )
     },
     checkRecord(row){
       this.$router.push({ name: 'checkInfo',
          params:{
            serviceId: row.serviceId,
            oldMan: row.oldManName,
            volunteer: row.volunteerName,
            startTime: row.startTime,
            endTime: row.endTime,
            duration: row.duration,
            content: row.content,
            remark: row.remark
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

