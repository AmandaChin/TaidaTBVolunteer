<template>
  <el-table
    :data="applyingmedals"
    style="width: 100%;margin-left: 20px"

    :row-class-name="tableRowClassName">
    <el-table-column
      label="勋章币">
      <template scope="scope">
        <img  :src="Applying_image" style="width: 35px;height: 45px">
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
        <span style="color: dodgerblue">交易链</span>
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
  import applying_image from '@/assets/medals_images/applying_image.gif'

  export default {
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 0) {
            return 'warning-row';
          } else if (rowIndex === 1) {
            return 'success-row';
          }
          return '';
        }
      },
      data(){
          return{
            Applying_image: applying_image,
            applyingmedals: [{
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

