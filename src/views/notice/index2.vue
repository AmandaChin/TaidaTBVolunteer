<template>
<div class="noticeContainer">
  <el-table
    :data="noticeData"
    style="width: 100%">

    <el-table-column label="标题">
      <template slot-scope="scope">
        <el-button type="text" @click="dialogVisible = true">{{scope.row.title}}</el-button>
        <el-dialog
        title="通知详情"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form >
          <el-form-item label="标题">
            <span>{{ scope.row.title }}</span>
          </el-form-item>
          <el-form-item label="发布人">
            <span>{{ scope.row.author }}</span>
          </el-form-item>
          <el-form-item label="发布日期">
            <span>{{ scope.row.date }}</span>
          </el-form-item>
          <el-form-item label="内容">
            <span>{{ scope.row.content }}</span>
          </el-form-item>
          </el-form>
        </el-dialog>
      </template>
    </el-table-column>

    <el-table-column
      label="日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="作者">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.author }}</el-tag>
          </div>
      </template>
    </el-table-column>
    
  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        noticeData: [{
          title: '关于系统使用方法的通知1',
          author: '佚名',
          content: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法',
          date: '2018年1月30日'
        },
        {
          title: '关于系统使用方法的通知2',
          author: '佚名',
          content: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法',
          date: '2018年1月30日'
        },
        {
          title: '关于系统使用方法的通知3',
          author: '佚名',
          content: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法',
          date: '2018年1月30日'
        },
        {
          title: '关于系统使用方法的通知4',
          author: '佚名',
          content: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法',
          date: '2018年1月30日'
        },
        {
          title: '关于系统使用方法的通知5',
          author: '佚名',
          content: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法',
          date: '2018年1月30日'
        }]
      }
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