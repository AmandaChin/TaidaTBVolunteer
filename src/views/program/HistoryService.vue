<template>
  <el-table
    :data="service"
    style="width: 100%;margin-left: 20px"

    :row-class-name="tableRowClassName">
    <el-table-column
      label="申请日期">
      <template scope="scope">
        <span style="color: darkgray">{{ scope.row.CreateTime|formatDate }}</span>
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
        <span style="color: darkgray">{{scope.row.RealStartTime|formatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="结束时间"
      prop="applyingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.RealEndTime|formatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="更多操作">
      <template scope="scope">
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="func(scope.row.ServiceID,scope.row.Content, scope.row.RealStartTime,scope.row.RealEndTime, scope.row.Duration)">申请勋章</el-button>
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
        UserName: undefined,
        Content: undefined,
        StartTime: undefined,
        EndTime: undefined,
        Duration: undefined,
        Remark: undefined,
        str_startTime: '',
        service: [],
        name: '',
        CreateTime: undefined
      }
    },
    mounted: function(UserId) {
      var params = new URLSearchParams()
      params.append('UserID', '7')
      axios.post('http://localhost:3000/api/getServicedList', params).then(
        (res) => {
          this.service = res.data.list
          console.log(res)
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
        var params = new URLSearchParams()
        params.append('ServiceID', serviceId)
        console.log(serviceId)
        axios.post('http://localhost:3000/api/getOldManName', params).then(
          (res) => {
            this.name = res.data.Name
            console.log(this.name)
            this.$router.push({ name: 'application', params: { name: this.name, serviceId: serviceId, content: content, startTime: startTime, endTime: endTime, duration: duration }})
          }
        ).catch((err) => {
          console.log(err)
        })
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
      showAlert() {
        this.$alert('这是一段内容', '交易记录', {
          confirmButtonText: '确定'
        })
      }
    }
  }
</script>

