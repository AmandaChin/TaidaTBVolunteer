<template>
  <div class="upload-container">
    <el-upload   class="image-uploader" 
               v-show="dialogImageUrl.length==0"
               drag :multiple="false" :show-file-list="false" 
               :action="actionUrl"
               :on-success="handleImageScucess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将其他相关文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="image-preview">
    <div class="image-preview-wrapper" v-show="dialogImageUrl.length>1">
      <img :src="dialogImageUrl">
      <div v-show="SureUpload==false">
      <button type="success" v-on:click="childClick">确认上传</button>
      <div class="image-preview-action">
        <i @click="rmImage" class="el-icon-delete"></i>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'singleImageUpload',
    props: {
      actionUrl: {
        type: String,
        default() {
          return "http://localhost:3000/api/uploadFile"
        }
      },
      value: String
    },
    computed: {
      imageUrl() {
        return this.value
      }
    },
    data() {
      return {
        tempUrl: '',
        dialogImageUrl: '',
        actionUrl:'',
        SureUpload: false
      }
    },
    methods: {
      rmImage() {
        this.dialogImageUrl = ''
      },
      handleImageScucess(response) {
        console.log('picture!')
        console.log(response)
        this.dialogImageUrl = response.list.url
      },
      childClick:function() {
        this.$emit('returnurl1', this.dialogImageUrl)
        this.SureUpload = true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .upload-container {
    width: 100%;
    position: relative;
    @include clearfix;
    .image-uploader {
      width: 35%;
      float: left;
    }
    .image-preview {
      width: 200px;
      height: 200px;
      position: relative;
      border: 1px dashed #d9d9d9;
      float: left;
      margin-left: 50px;
      .image-preview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s;
        cursor: pointer;
        text-align: center;
        line-height: 200px;
        .el-icon-delete {
          font-size: 36px;
        }
      }
      &:hover {
        .image-preview-action {
          opacity: 1;
        }
      }
    }
    .image-app-preview {
      width: 320px;
      height: 180px;
      position: relative;
      border: 1px dashed #d9d9d9;
      float: left;
      margin-left: 50px;
      .app-fake-conver {
        height: 44px;
        position: absolute;
        width: 100%; // background: rgba(0, 0, 0, .1);
        text-align: center;
        line-height: 64px;
        color: #fff;
      }
    }
  }
</style>
