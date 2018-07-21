<template>
<div class="noticeContainer">
  <el-table
    :data="noticeData.slice((pageNo-1)*pageSize,pageNo*pageSize)"
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
      label="发布者">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.WriterName }}</el-tag>
          </div>
      </template>
    </el-table-column>
     <el-table-column
      label="状态">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">

        <span v-if="scope.row.Checked ==0" style="color: dodgerblue" type="text">未读</span>
        <span v-if="scope.row.Checked !=0" style="color: darkgray" type="text">已读</span>
            
          </div>
      </template>
    </el-table-column>

  </el-table>

  <el-dialog
        title="通知详情"
        :visible.sync="dialogVisible"
        width="30%"
        @close = 'closeDialog'>
        <el-form :model="temp">
          <el-form-item label="标题">
            <span>{{ temp.Title }}</span>
          </el-form-item>
          <el-form-item label="发布人">
            <span>{{ temp.WriterName }}</span>
          </el-form-item>
          <el-form-item label="发布日期">
            <span>{{ temp.ReleaseTime|formatDate }}</span>
          </el-form-item>
          <el-form-item label="内容">
            <span v-html="temp.Content"></span>
          </el-form-item>
          </el-form>
        </el-dialog>
        <!--分页-->
    <div class="pagination-container" style = "margin-left:450px" >
      <el-pagination background @current-change="handleIndexChange"
                      :page-size="pageSize" :current-page.sync="pageNo" layout="total, prev, pager, next" :total="totalDataNumber">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { formatDate } from '@/methods/methods.js'
import port from '../../utils/manage'
import global from '../../utils/global_userID'

  export default {
    data() {

      return {
        temp: {
        Title:undefined,
        NoticeID: undefined,
        Content:undefined,
        ReleaseTime:undefined,
        WriterName:undefined,
        Checked:undefined
      },
        dialogVisible: false,
        noticeData: [],
        pageNo:1,
        pageSize:10,
        totalDataNumber:0
      }
    },
    created(){
      var id = JSON.parse(localStorage.getItem('volunteerid'))
      console.log('全局：'+id)
      global.global_userID = id
    },
    mounted() {
      var params = new URLSearchParams()
      params.append('UserID', global.global_userID)
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/noticeOperation', params).then(
          (res)=>{
            if(res.data.list.rows)
              {
                console.log("有rows！！！")
                this.noticeData=res.data.list.rows;
                this.totalDataNumber = res.data.list.count;
              }else{
                 console.log("没有rows！！！")
                 this.noticeData=res.data.list;
                 this.totalDataNumber = res.data.list.length;
              }
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
    closeDialog(){
        var params = new URLSearchParams()
        params.append('UserID', global.global_userID)
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/noticeOperation', params).then(
          (res)=>{
           if(res.data.list.rows)
              {
                console.log("有rows！！！")
                this.noticeData=res.data.list.rows;
                this.totalDataNumber = res.data.list.count;
              }else{
                 console.log("没有rows！！！")
                 this.noticeData=res.data.list;
                 this.totalDataNumber = res.data.list.length;
              }
            console.log(res);
          }
        ).catch((err)=>{
          console.log(err);
        })
    },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        var pageSize = this.pageSize
        this.getAndDraw(parseInt(pageNo),parseInt(pageSize))
      },
      handleShowDialog(row){
      this.temp = Object.assign({}, row) // copy obj
      this.dialogVisible = true

      if(this.temp.Checked == 0){
           //修改通知状态 进入后未读变成已读
      var params = new URLSearchParams()
      params.append('NoticeID', this.temp.NoticeID)
       params.append('UserID', global.global_userID)
        axios.post('http://' + port.info.host + ':' + port.info.port + '/api/changeNoticeChecked', params).then(
         
        ).catch((err)=>{
          console.log(err);
        })
      }else{
          console.log(this.temp.Checked)
      }
     

      }
    }
  }
</script>

<style scoped>
.noticeContainer{
    padding: 32px;
}
</style>
