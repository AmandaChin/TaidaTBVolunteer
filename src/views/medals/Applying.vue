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
        <span style="font-size: 18px;margin-left:10px">{{"*" + scope.row.medalnum}}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="交易时间"
      prop="applyingtime"
      >
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.getmedaltime|formatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="更  多">
      <template scope="scope">
<<<<<<< HEAD
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="getChainDetail(scope.row.TransferHASH)">交易链</el-button>
        <el-dialog
        title="交易链详情"
        :visible.sync="dialogVisible"
        v-loading="listLoading" element-loading-text="加载中" 
        width="60%">
        <el-form :model="temp">
          <el-form-item label="交易区块编号:">
            <span>{{ temp.blockNumber }}</span>
          </el-form-item>
          <el-form-item label="交易区块哈希:">
            <span>{{ temp.blockHash }}</span>
          </el-form-item>
          <el-form-item label="交易哈希:  ">
            <span>{{ temp.transactionHash }}</span>
          </el-form-item>
          <el-form-item label="勋章去向:  ">
            <span>{{ temp.to }}</span>
          </el-form-item>
          </el-form>
=======
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="dialogTableVisible = true">交易链</el-button>
        <el-dialog title="交易链详情" :visible.sync="dialogTableVisible">
          <el-table :data="gridData">
            <el-table-column property="date" label="交易日期" width="150"></el-table-column>
            <el-table-column property="block" label="交易区块" width="200"></el-table-column>
            <el-table-column property="transaction" label="交易哈希"></el-table-column>
            <el-table-column property="to" label="勋章去向"></el-table-column>
          </el-table>
>>>>>>> 882f5232fcd264c3dfc872174337931c85e92b2f
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
    background:#f0f9eb;
  }
</style>

<script>
  import axios from 'axios'
  import applying_image from '@/assets/medals_images/applying.gif'
  import clip from '@/utils/clipboard'
  import port from '../../utils/manage'
  import { formatDate } from '@/methods/methods.js'
<<<<<<< HEAD
  import global from '../../utils/global_userID'

=======
>>>>>>> 882f5232fcd264c3dfc872174337931c85e92b2f
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
        Applying_image: applying_image,
<<<<<<< HEAD
        dialogVisible: false,
         temp: {
        blockNumber:"加载中",
        blockHash: "加载中",
        transactionHash:"加载中",
        to:"加载中",
         },
       
        applyingmedals: []
      }
    },
=======
        dialogTableVisible: false,
        gridData: [{
          date: '2016-05-02',
          block: '王小虎',
          transaction: '李四',
          to: 'sadfd'
        }],
        applyingmedals: []
        // [
        //   // {
        //   //   medals: '5',
        //   //   applyingtime: '2018-01-05',
        //   //   gettingtime: '2018-01-10'
        //   // }
        // ]
      }
    },
    // mounted: function(UserId) {
    //   // GET /someUrl
    //   // var params = new URLSearchParams()
    //   // params.append('UserID', '7')
    //   // params.append('Hash', '0Xgkonnniini')
    //   // //add hash as an public params in the register part
    //   // axios.post('http://' + port.info.host + ':' + port.info.port + '/api/applicating', params).then(
    //   //   (res) => {
    //   //     this.applyingmedals = res.data.list
    //   //     console.log(res)
    //   //     //back a list of medal info
    //   //   }
    //   // ).catch((err) => {
    //   //   console.log(err)
    //   // })
    // },
>>>>>>> 882f5232fcd264c3dfc872174337931c85e92b2f
    created() {
    this.getList()
    },
    methods: {
      tableRowClassName({ row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row'
        } else if (rowIndex === 1) {
          return 'success-row'
        }
        return ''
      },
      getList() {
      var params = new URLSearchParams()
<<<<<<< HEAD
      params.append('UserID', global.global_userID)
=======
      //写死 后测试引用全局变量！！！！
      params.append('UserID', '1')
>>>>>>> 882f5232fcd264c3dfc872174337931c85e92b2f
      this.listLoading = true
      axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getGiveInfo', params).then(
              
        (res) => {
          this.applyingmedals = res.data.list.rows
<<<<<<< HEAD
=======
          console.log(res.data.list.rows)
          console.log("testtesttest!!!")
>>>>>>> 882f5232fcd264c3dfc872174337931c85e92b2f
          this.listLoading = false
        }
      )
    },
<<<<<<< HEAD
  
      getChainDetail(transactionHASH){

          this.dialogVisible = true
          var params = new URLSearchParams()
          params.append('UserId', global.global_userID)
          params.append('transactionHash',transactionHASH)
          this.listLoading = true
           axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getTransactionInfo', params).then(
                
          (res) => {

          console.log(res.data.list)

          this.temp = res.data.list
          this.listLoading = false
        }
      )


=======
      getChainDetail(text,event){
        clip(text, event)
>>>>>>> 882f5232fcd264c3dfc872174337931c85e92b2f
      },
      showAlert() {
        this.$alert('这是一段内容', '交易记录', {
        confirmButtonText: '确定'
        })
      }
    }
  }
</script>
