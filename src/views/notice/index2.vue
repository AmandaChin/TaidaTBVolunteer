<template>
<div class="noticeContainer">
  <el-table
    :data="noticeData"
    style="width: 100%">

    <el-table-column label="标题">
      <template slot-scope="scope">
        <el-button type="text" @click="handleShowDialog(scope.row)">{{scope.row.Title}}</el-button>
      </template>
    </el-table-column>

    <el-table-column
      label="日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.ReleaseTime |formatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="作者">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.UserName }}</el-tag>
          </div>
      </template>
    </el-table-column>

  </el-table>

  <el-dialog
        title="通知详情"
        :visible.sync="dialogVisible"
        width="50%">
        <el-form :model="temp">
          <el-form-item label="标题">
            <span>{{ temp.Title }}</span>
          </el-form-item>
          <el-form-item label="发布人">
            <span>{{ temp.UserName }}</span>
          </el-form-item>
          <el-form-item label="发布日期">
            <span>{{ temp.ReleaseTime }}</span>
          </el-form-item>
          <el-form-item label="内容">
            <span>{{ temp.Content }}</span>
          </el-form-item>
          </el-form>
        </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { formatDate } from '@/methods/methods.js'
import port from '../../utils/manage'
  export default {
    data() {

      return {
        temp: {
        Title:undefined,
        NoticeID: undefined,
        Content:undefined,
        ReleaseTime:undefined,
        UserName:undefined
      },
        dialogVisible: false,
        noticeData: []
      }
    },
    mounted() {
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/noticeOperation',
        {
          dataType:'jsonp',
          crossDomain:true
        }).then(
          (res)=>{
            this.noticeData=res.data.list;
            console.log(res);
          }
        ).catch((err)=>{
          console.log(err);
        })
    },
    filters: {

    formatDate(time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
  },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

      handleShowDialog(row){
      this.temp = Object.assign({}, row) // copy obj
      this.dialogVisible = true
      }
    }
  }
</script>

<style scoped>
.noticeContainer{
    padding: 32px;
}
</style>
