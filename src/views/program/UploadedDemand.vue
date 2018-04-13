<template>
  <el-table
    :data="demands"
    style="width: 100%;margin-left: 20px"

    :row-class-name="tableRowClassName">
    <el-table-column
      label="发布时间">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.CreateTime|formatDate}}</span>
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
        <span style="color: darkgray">{{scope.row.DemandStartTime|formatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="终止时间"
      prop="applyingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.DemandEndTime|formatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="更多操作">
      <template scope="scope">
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="change(scope.row.Content, scope.row.ServiceId, scope.row.DemandStartTime, scope.row.DemandEndTime, scope.row.Duration, scope.row.Remark)">修改需求</el-button>
      </template>
    </el-table-column>
  </el-table>
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
  import port from '../../utils/manage'
  export default {
    filters: {
      formatDate(time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    data() {
      return {
        inputData: 'https://github.com/PanJiaChen/vue-element-admin',
        dialogTableVisible: false,
        demands: []
      }
    },
    mounted: function(UserId) {
      var params = new URLSearchParams()
      params.append('UserID', '8')
      axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getDemandByUserID', params).then(
        (res) => {
          this.demands = res.data.list
          console.log(res)
        }
      ).catch((err) => {
        console.log(err)
      })
    },
    methods: {
      change: function(content, serviceId, startTime, endTime, duration, remark) {
        this.$router.push({ name: 'modify', params: { content: content, serviceid: serviceId, startTime: startTime, endTime: endTime, duration: duration, remark: remark }})

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

