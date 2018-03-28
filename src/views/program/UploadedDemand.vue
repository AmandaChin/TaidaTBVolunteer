<template>
  <el-table
    :data="demands"
    style="width: 100%;margin-left: 20px"

    :row-class-name="tableRowClassName">
    <el-table-column
      label="发布时间">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.CreateTime}}</span>
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
        <span style="color: darkgray">{{scope.row.DemandStartTime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="终止时间"
      prop="applyingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.DemandEndTime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="更多操作">
      <template scope="scope">
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="change">修改需求</el-button>
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
  export default {
    methods: {
      change: function(index, row) {
        this.$router.replace({ path: '/Information' })
      },
      mounted: function(UserId) {
        // GET /someUrl
        axios.post('http://localhost:3000/api/getDemandByUserID',
          {
            dataType: 'jsonp',
            crossDomain: true
          }).then(
          (res) => {
            this.demand = res.data.list
            console.log(res)
          }
        ).catch((err) => {
          console.log(err)
        })
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row';
        } else if (rowIndex === 1) {
          return 'success-row';
        }
        return '';
      },
      getChainDetail(text,event){
        clip(text, event)
      },
      showAlert() {
        this.$alert('这是一段内容','交易记录', {
          confirmButtonText: '确定'
        })
      }
    },
    data() {
      return {
        inputData: 'https://github.com/PanJiaChen/vue-element-admin',
        dialogTableVisible: false,
        demands: []
      }
    }
  }
</script>

