<template>
  <el-row class="panel-group" :gutter="40">

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="JumpSearch1">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="search_color" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">搜索需求</div>
          <div class="card-description">浏览需要志愿服务的需求</div>
        </div>
      </div>
    </el-col>


    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" ></div>
    </el-col>

  <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="JumpSearch2">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="heart" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">搜索服务</div>
          <div class="card-description">浏览可以提供志愿服务的项目</div>
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>

export default {
  methods: {

    JumpSearch2: function() {
      this.$router.push({ name: 'search1' })
    },
    JumpSearch1: function() {
      this.$router.push({ name: 'search1' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #36a3f7;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #36a3f7;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 15px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-description {
        font-size: 13px;
        margin-bottom: 12px;
      }

    }
  }
}
</style>
