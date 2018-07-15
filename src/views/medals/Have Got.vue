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
        <span style="font-size: 18px;margin-left:10px">{{"*" + scope.row.medalnum}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="获得时间"
      prop="applyingtime">
      <template scope="scope">
        <span style="color: darkgray">{{scope.row.getmedaltime|formatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="更  多">
      <template scope="scope">
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
          <el-form-item label="勋章来源:  ">
            <span>{{ temp.from }}</span>
          </el-form-item>
          </el-form>
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
  import axios from 'axios'
  import port from '../../utils/manage'
  import { formatDate } from '@/methods/methods.js'
  import global from '../../utils/global_userID'

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
        Getting_image: getting_image,
        temp: {
        blockNumber:"加载中",
        blockHash: "加载中",
        transactionHash:"加载中",
        to:"加载中",
         },
        dialogVisible: false,
        gettingmedals: []
      }
    },
    created() {
    this.getList()
    },
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 0) {
          return 'warning-row'
        } else if (rowIndex === 1) {
          return 'success-row'
        }
        return ''
      },
      getList() {
      var params = new URLSearchParams()
      params.append('UserID', global.global_userID)
      this.listLoading = true
      axios.post('http://' + port.info.host + ':' + port.info.port + '/api/getGetInfo', params).then(
              
        (res) => {
          this.gettingmedals = res.data.list.rows
          this.listLoading = false
        }
      )
    },
      
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


      },
      showAlert() {
        this.$alert('这是一段内容', '交易记录', {
          confirmButtonText: '确定'
        })
      }
    },
    
  }
</script>

