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
        <el-button style="font-weight: bold; color:dodgerblue" type="text" @click="getchain(scope.$index, scope.row)">交易链</el-button>
        <el-dialog title="交易历史" :visible.sync="dialogTableVisible">
          <el-table :data="gridData">
            <el-table-column property="date" label="交易日期" width="150"></el-table-column>
            <el-table-column property="block" label="交易区块" width="200"></el-table-column>
            <el-table-column property="transaction" label="交易哈希"></el-table-column>
            <el-table-column property="from" label="勋章来源"></el-table-column>
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
  import axios from 'axios'
  import port from '../../utils/manage'

  export default {
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 0) {
          return 'warning-row'
        } else if (rowIndex === 1) {
          return 'success-row'
        }
        return ''
      },
      /**
       * 这个函数里边发送ServiceId 还有 UserId 得到返回值 并显示
       * 注意 这里的返回值是数据库里边来的 是简单数据 不是区块链显示台
       * 遗留问题 怎么获取这个ServiceID 其实应该是从位置连接到数据上然后获取
       * @param UserId
       * @param ServiceId
       */
      getchain({ index, row }) {
        this.dialogTableVisible = true
        var serviceId = 0
        serviceId = this.gettingmedals.indexOf(index)
        this.getDetail(this.UserId, serviceId)
        /**
         *在这个函数中尝试通过点击位置所在的行获得对应的index 以及serviceId
         */
      },
      getDetail(UserId, ServiceId) {
        var chain = this
        this.$http.get({
          url: '',
          data: {
            UserId: UserId,
            ServiceId: ServiceId
          }
        }).then(function(res) {
          chain = []
          for (var j = 0, len = res.data.result.length; j < len; j++) {
            var chain_data = res.data.result[j]
            chain.list.push(chain_data)
            this.gridData.push(chain_data)
          }
          this.gridData = chain
          this.gridData = res.body
        })
      },
      getChainDetail(text, event) {
        clip(text, event)
      },
      showAlert() {
        this.$alert('这是一段内容', '交易记录', {
          confirmButtonText: '确定'
        })
      }
    },
    data() {
      return {
        inputData: 'https://github.com/PanJiaChen/vue-element-admin',
        Getting_image: getting_image,
        gridData: [{
          date: '2016-05-02',
          block: '王小虎',
          transaction: '李四',
          from: 'sadfd'
        }, {
          date: '2016-05-02',
          block: '王小虎',
          transaction: '李四',
          from: 'sadfd'
        }, {
          date: '2016-05-02',
          block: '王小虎',
          transaction: '李四',
          from: 'sadfd'
        }],
        dialogTableVisible: false,
        gettingmedals: [
          {
            medals: '5',
            users: '张三',
            applyingtime: '2018-01-05',
            gettingtime: '2018-01-10',
            serviceId: 'hahaha'
          },
          {
            medals: '10',
            users: '张三',
            applyingtime: '2018-01-05',
            gettingtime: '2018-01-10',
            serviceId: 'hehehe'
          }
        ]
      }
    },
    mounted: function(UserId) {
      // GET /someUrl
      // var params = new URLSearchParams()
      // params.append('UserID', '7')
      // axios.post('http://' + port.info.host + ':' + port.info.port + '/api/applicated', params).then(
      //   (res) => {
      //     this.gettingmedals = res.data.list
      //     console.log(res)
      //     //back a list of medal info
      //   }
      // ).catch((err) => {
      //   console.log(err)
      // })
    }
  }
</script>

