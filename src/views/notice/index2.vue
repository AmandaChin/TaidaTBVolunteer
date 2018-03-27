<template>
<div class="noticeContainer">
  <el-table
    :data="noticeData"
    style="width: 100%">

    <el-table-column label="标题">
      <template slot-scope="scope">
        <el-button type="text" @click="dialogVisible = true">{{scope.row.Title}}</el-button>
        <el-dialog
        title="通知详情"
        :visible.sync="dialogVisible"
        width="50%">
        <el-form >
          <el-form-item label="标题">
            <span>{{ scope.row.Title }}</span>
          </el-form-item>
          <el-form-item label="发布人">
            <span>{{ scope.row.UserName }}</span>
          </el-form-item>
          <el-form-item label="发布日期">
            <span>{{ scope.row.ReleaseTime }}</span>
          </el-form-item>
          <el-form-item label="内容">
            <span>{{ scope.row.Content }}</span>
          </el-form-item>
          </el-form>
        </el-dialog>
      </template>
    </el-table-column>

    <el-table-column
      label="日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.ReleaseTime }}</span>
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
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        dialogVisible: false,
        noticeData: []
      }
    },
    mounted() {
        axios.post('http://localhost:3000/api/noticeOperation',
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
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>
.noticeContainer{
    padding: 32px;
}
</style>