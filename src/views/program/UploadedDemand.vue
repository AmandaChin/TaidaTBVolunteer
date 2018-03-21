<template>
  <el-table
    :data="demands"
    style="width: 100%;margin-left: 20px"

    :row-class-name="tableRowClassName">
    <el-table-column
      label="发布时间">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.postingtime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="服务内容">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.servicecontent}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="需求人数"
      prop="users">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.populationrequest}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="服务时长"
      prop="applyingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.servicetime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="更多操作">
      <template scope="scope">
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="dialogTableVisible = true">修改需求</el-button>
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
  export default {
    methods: {
      mounted: function(UserId, Account, Type) {
        // GET /someUrl
        var history_demand = this
        this.$http.get({
          /**
           * 这个地方应该写的是通过勋章状态为got的函数的url访问这个账户内的勋章币
           * 并且这个地方用type为0表示已经发布的需求
           */
          url: '',
          data: {
            UserId: this.UserId,
            Account: this.Account,
            Type: 0
          }
        }).then(function(res) {
          history_demand = []
          for (var i = 0, len = res.data.result.length; i < len; i++) {
            var demand_detail = res.data.result[i]
            history_demand.list.push(demand_detail)
            this.service.push(history_demand)
          }
          this.service = history_demand
          this.service = res.body
          /**
           * 这三个处理方式不知道哪一个是对的 需要测试
           * 另外注意 这里边已经把ServiceId传进来了 后边是要用到的
           */
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
    data(){
      return{
        inputData: 'https://github.com/PanJiaChen/vue-element-admin',
        dialogTableVisible: false,
        demands: [{
          postingtime:'2018-01-05',
          servicecontent:'擦窗',
          populationrequest:'3人',
          servicetime:'3小时',
          serviceId:''
        }]
      }
    }
  }
</script>

