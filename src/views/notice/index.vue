<template>
  <el-table
    :data="noticeData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="标题">
            <span>{{ props.row.title }}</span>
          </el-form-item>
          <el-form-item label="发布人">
            <span>{{ props.row.author }}</span>
          </el-form-item>
          <el-form-item label="内容">
            <span>{{ props.row.content }}</span>
          </el-form-item>
          </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="标题"
      prop="title">
    </el-table-column>
    <el-table-column
      label="发布日期"
      prop="date">
    </el-table-column>
  </el-table>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data() {
      return {
        noticeData: [{
          title: '关于系统使用方法的通知',
          author: '佚名',
          content: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法',
          date: '2018年1月30日'
        },
        {
          title: '关于系统使用方法的通知',
          author: '佚名',
          content: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法',
          date: '2018年1月30日'
        },
        {
          title: '关于系统使用方法的通知',
          author: '佚名',
          content: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法',
          date: '2018年1月30日'
        },
        {
          title: '关于系统使用方法的通知',
          author: '佚名',
          content: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法',
          date: '2018年1月30日'
        },
        {
          title: '关于系统使用方法的通知',
          author: '佚名',
          content: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。所谓共识机制是区块链系统中实现不同节点之间建立信任、获取权益的数学算法',
          date: '2018年1月30日'
        }]
      }
    }
  }
</script>