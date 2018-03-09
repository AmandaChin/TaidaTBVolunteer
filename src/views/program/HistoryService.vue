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
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="func">申请勋章</el-button>
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
      func: function() {
        this.$router.push('/program/volunteers');
      },
      mounted: function () {
        // GET /someUrl
        this.$http.get('http://localhost:8088/test').then(response => {
          console.log(response.demands);
          // get body data
          // this.someData = response.body;

        }, response => {
          console.log("error");
        });
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
        service: [{
          applydate:'2018-01-05',
          servicecontent:'擦窗',
          servicestarttime:'2018-01-06 18:30',
          serviceendtime:'2018-01-06 21:30'
        }]
      }
    }
  }
</script>

