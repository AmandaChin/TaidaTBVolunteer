<template>
  <el-table
    :data="gettingmedals"
    style="width: 100%;margin-left: 20px"

    :row-class-name="tableRowClassName">
    <el-table-column
      label="勋章币">
      <template scope="scope">
        <img  :src="Getting_image" style="width: 35px;height: 45px">
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
      label="获得时间"
      prop="gettingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.gettingtime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="更  多">
      <template scope="scope">
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="dialogTableVisible = true">交易链</el-button>

        <el-dialog title="交易历史" :visible.sync="dialogTableVisible">
          <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="from" label="勋章来源" width="200"></el-table-column>
            <el-table-column property="to" label="勋章去向"></el-table-column>
          </el-table>
        </el-dialog>
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
  import getting_image from '@/assets/medals_images/getting.gif'
  import clip from '@/utils/clipboard'
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
      getChainDetail(text,event){
        clip(text, event)
      },
      showAlert() {
        this.$alert('这是一段内容楼','交易记录', {
          confirmButtonText: '确定'
        })
      }
    },
    data(){
      return{
        inputData: 'https://github.com/PanJiaChen/vue-element-admin',
        Getting_image: getting_image,
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
        gettingmedals: [{
          medals:'5',
          users:'张三',
          applyingtime:'2018-01-05',
          gettingtime:'2018-01-10',
        },
          {
            medals:'10',
            users:'张三',
            applyingtime:'2018-01-05',
            gettingtime:'2018-01-10',
          }
        ]
      }
    }
  }
</script>

