<template>
  <el-table
    :data="service"
    style="width: 100%;margin-left: 20px"

    :row-class-name="tableRowClassName">
    <el-table-column
      label="申请日期">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.applydate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="服务内容">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.servicecontent}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="开始时间"
      prop="users">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.servicestarttime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="结束时间"
      prop="applyingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.serviceendtime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="更多操作">
      <template scope="scope">
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="func(scope.$index, scope.row)">申请勋章</el-button>
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
      /**
       * 现在可以直接申请勋章了 但是应该传递给申请勋章页面一些信息 在这一步
       * 读取当前service 对应的数据 自动填写到后边
       */
      func: function(index, row) {
        /**
         * this.$http.post('v1/user/select-stage', {stage: stage})
         .then(({data: {code, content}}) => {
            if (code === 0) {
                // 对象
                this.$router.push({path: '/home'});
            }else if(code === 10){
                // 带查询参数，变成/login?stage=stage
                this.$router.push({path: '/login', query:{stage: stage}});
           }
});
         */
        this.$router.replace({ path: '/volunteers' })
        /*
        this.$router.push('/volunteers')
        var serviceId = 0
        serviceId = this.service.indexOf(index)
        this.getDetailtoApply(this.UserId, serviceId)
        /**
         * 此处获得这个ServiceId的目的是携带者这两个参数取填写并调用申请勋章的函数 然后把所有数据打包一起发给后台
         * 这个地方还需要一个能调用申请勋章界面的参数
         */
      },
      mounted: function(UserId, Account, Type) {
        // GET /someUrl
        var history_service = this
        this.$http.get({
          /**
           * 这个地方应该写的是通过勋章状态为got的函数的url访问这个账户内的勋章币
           * 并且这个地方用type为1表示已经进行过的服务 也就是已经响应过的需求
           */
          url: '',
          data: {
            UserId: this.UserId,
            Account: this.Account,
            Type: 1
          }
        }).then(function(res) {
          history_service = []
          for (var i = 0, len = res.data.result.length; i < len; i++) {
            var service_detail = res.data.result[i]
            history_service.list.push(service_detail)
            this.service.push(history_service)
          }
          this.service = history_service
          this.service = res.body
          /**
           * 这三个处理方式不知道哪一个是对的 需要测试
           * 另外注意 这里边已经把ServiceId传进来了 后边是要用到的
           */
        })
      },
      tableRowClassName(row, rowIndex) {
        if (rowIndex === 0) {
          return 'warning-row'
        } else if (rowIndex === 1) {
          return 'success-row'
        }
        return ''
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
        service: [{
          applydate:'2018-01-05',
          servicecontent:'擦窗',
          servicestarttime:'2018-01-06 18:30',
          serviceendtime:'2018-01-06 21:30',
          serviceId: ''
        }]
      }
    }
  }
</script>

