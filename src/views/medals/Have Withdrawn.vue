<template>
  <el-table
    :data="withdrawnmedals"
    style="width: 100%;margin-left: 20px"

    :row-class-name="tableRowClassName">
    <el-table-column
      label="勋章币">
      <template scope="scope">
        <img  :src="Withdrawn_image" style="width: 35px;height: 45px">
      </template>
    </el-table-column>
    <el-table-column
      label="交易数目">
      <template scope="scope">
        <span style="font-size: 18px;margin-left:10px">{{"*" + scope.row.medals}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="交易用户"
      prop="users">
    </el-table-column>
    <el-table-column
      label="申请时间"
      prop="applyingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.applyingtime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="撤回时间"
      prop="gettingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.gettingtime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="更  多">
      <template scope="scope">
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="open">联系管理员</el-button>
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
  import withdrawn_image from '@/assets/medals_images/withdrawn.gif'

  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row';
        } else if (rowIndex === 1) {
          return 'success-row';
        }
        return '';
      },
      open() {
        this.$alert('联系电话：123456768', '联系我们', {
          confirmButtonText: '确定',
        });
      }
    },
    data() {
      return {
        inputData: 'https://github.com/PanJiaChen/vue-element-admin',
        Withdrawn_image: withdrawn_image,
        gridData: [{
          date: '2016-05-02',
          from: '王小虎',
          to: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          from: '王小虎',
          to: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          from: '王小虎',
          to: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          from: '王小虎',
          to: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        withdrawnmedals: [{
          medals: '5',
          users: '张三',
          applyingtime: '2018-01-05',
          gettingtime: '2018-01-10'
        },
        {
          medals: '10',
          users: '张三',
          applyingtime: '2018-01-05',
          gettingtime: '2018-01-10'
        }
        ]
      }
    }
  }
</script>

