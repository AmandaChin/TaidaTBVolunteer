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
      label="更  多">
      <template scope="scope">
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="dialogTableVisible = true">修改材料</el-button>
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
  import applying_image from '@/assets/medals_images/applying.gif'
  import clip from '@/utils/clipboard'
  export default {
      methods: {
        mounted: function(UserId, Account, Type) {
          // GET /someUrl
          var transcription = this
          this.$http.get({
            /**
             * 这个地方应该写的是通过勋章状态为got的函数的url访问这个账户内的勋章币
             * 并且这个地方用type为0表示applying的勋章 这些勋章应该链上查询
             */
            url:'',
            data: {
              UserId: this.UserId,
              Account: this.Account,
              Type: 0 }
          }).then(function(res) {
            transcription = []
            for (var i = 0, len = res.data.result.length; i < len; i++) {
              var trascription_data = res.data.result[i]
              transcription.list.push(trascription_data)
              this.applyingmedals.push(transcription)
            }
            this.applyingmedals = transcription
            this.applyingmedals = res.body
            /**
             * 这三个处理方式不知道哪一个是对的 需要测试
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
            Applying_image: applying_image,
            dialogTableVisible: false,
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

