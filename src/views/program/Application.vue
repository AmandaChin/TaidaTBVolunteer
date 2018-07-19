<template>
  <div class="application-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <sticky :className="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submit()">立即申请
        </el-button>
      </sticky>
     
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <div class="postInfo-container">
              <el-row style="margin-left: 20px">
                <el-col :span="4">
                  <el-form-item label-width="75px" label="服务用户:" class="postInfo-container-item">
                    <el-form-item style="margin-bottom: 20px;" prop="title">
                      <span style="color: darkgray"  v-cloak >{{ this.Name }}</span>
                    </el-form-item>
                  </el-form-item>
                </el-col>

                <el-col :span="5">
                  <el-form-item label-width="110px" label="服务内容:  " class="postInfo-container-item">
                    <el-form-item style="margin-bottom: 20px;" prop="title">
                      <span style="color: darkgray"  v-cloak >{{ this.Content }}</span>
                    </el-form-item>
                  </el-form-item>

                </el-col>

                <el-col :span="4">
                  <el-form-item style="margin-bottom: 20px;" label-width="90px" label=" 服务日期:" class="postInfo-container-item">
                    <el-form-item style="margin-bottom: 20px;margin-left: 20px" prop="title">
                      <span style="color: darkgray"  v-cloak >{{ this.StartTime|formatDatex }}</span>
                    </el-form-item>
                  </el-form-item>
                </el-col>

                <el-col :span="4">
                  <el-form-item style="margin-bottom: 20px;" label-width="90px" label=" 服务时段:" class="postInfo-container-item">
                    <el-form-item style="margin-bottom: 20px;margin-left: 20px" prop="title">
                      <span style="color: darkgray"  v-cloak >{{ this.StartTime|getTime }}</span>
                    </el-form-item>
                  </el-form-item>
                </el-col>

                <el-col :span="4">
                  <el-form-item style="margin-bottom: 20px;" label-width="20px" label="—" class="postInfo-container-item">
                    <el-form-item style="margin-bottom: 20px; margin-left: 25px" prop="title">
                      <span style="color: darkgray"  v-cloak >{{ this.EndTime|getTime }}</span>
                    </el-form-item>
                  </el-form-item>
                </el-col>

                <el-col :span="1">
                  <el-form-item label-width="100px" label="服务时长:" class="postInfo-container-item">
                    <el-form-item style="margin-bottom: 20px;" prop="title">
                      <span style="color: darkgray"  v-cloak >{{ this.Duration }}</span>
                    </el-form-item>
                  </el-form-item>
                </el-col>

              </el-row>
            </div>
          </el-col>
        </el-row>


        <el-form-item style="margin-left: 20px;margin-bottom: 10px; font-size: 25px;" label-width="45px" label="详情:">
        </el-form-item>

        <div class="editor-container" style="margin-left: 20px">
          <tinymce :height=400 ref="editor" v-model="postForm.content"></tinymce>
        </div>

        <el-row>
          <el-col>
            <div class="filter-container">
              <el-row>
                <el-col :span="13">
                  <el-form-item style="margin-bottom: 5px;" label-width="90px" label="上传合照:">
                  </el-form-item>
                </el-col>

                <el-col :span="1">
                  <el-form-item style="margin-bottom: 5px;" label-width="90px" label="上传证明:">
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="filter-container">
              <el-row>
                <el-col :span="13">
                  <div class="upload-container" style="width: 1100px">
                    <el-upload   class="image-uploader" 
                              v-show="dialogImageUrl1.length==0"
                              drag :multiple="false" :show-file-list="false" 
                              action="http://localhost:3000/api/uploadFile"
                              :on-success="handleImageScucess1">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将其他相关文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <div class="image-preview">
                    <div class="image-preview-wrapper" v-show="dialogImageUrl1.length>1">
                      <img :src="dialogImageUrl1">
                      <div class="image-preview-action">
                        <i @click="rmImage1" class="el-icon-delete"></i>
                      </div>
                    </div>
                    </div>
                  </div>
                </el-col>

                <el-col :span="1">
                  <div class="upload-container" style="width: 1100px">
                    <el-upload class="image-uploader" 
                    v-show="dialogImageUrl2.length==0"
                    drag :multiple="false" :show-file-list="false" 
                    action="http://localhost:3000/api/uploadFile"
                    :on-success="handleImageScucess2">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将志愿服务证明拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <div class="image-preview">
                      <div class="image-preview-wrapper" v-show="dialogImageUrl2.length>1">
                        <img :src="dialogImageUrl2">
                      <div class="image-preview-action">
                      <i @click="rmImage2" class="el-icon-delete"></i>
                    </div>
                  </div>
                  </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

      </div>
       
      <!-- <el-button v-loading="loading" style="margin-left: 600px;" type="success" @click="submit()">立即申请
          </el-button> -->
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import Upload4 from '@/components/Upload/singleImage4'
  import Upload5 from '@/components/Upload/singleImage5'
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { validateURL } from '@/utils/validate'
  import { fetchArticle } from '@/api/article'
  import { userSearch } from '@/api/remoteSearch'
  import complexTable from './../example/table/complexTable'
  import { formatDatex } from '@/methods/date.js'
  import axios from 'axios'
  import port from '../../utils/manage'
  import global from '../../utils/global_userID'
  const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    start_time: '',
    end_time: '',
    service_content: '',
    duration: '',
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 上传图片
    pdf_uri: '', // 上传证明
    source_number: '', // 文章外部作者
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false
  }
  export default {
    filters: {
    formatDatex(time) {
      var date = new Date(time)
      return formatDatex(date, 'yyyy-MM-dd')
    },
    getTime(time) {
      var date = new Date(time)
      return formatDatex(date, 'hh:mm:ss')
    }
    },
    name: 'articleDetail',
    components: { Tinymce, Upload4, Upload5 , Sticky, complexTable },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateSourceUri = (rule, value, callback) => {
        if (value) {
          if (validateURL(value)) {
            callback()
          } else {
            this.$message({
              message: '外链url填写不正确',
              type: 'error'
            })
            callback(null)
          }
        } else {
          callback()
        }
      }
      return {
        dialogImageUrl1:'',
        dialogImageUrl2:'',
        postForm: Object.assign({}, defaultForm),
        fetchSuccess: true,
        loading: false,
        Content: '',
        Name: '',
        StartTime: '',
        EndTime: '',
        Duration: '',
        ServiceId: '',
        userLIstOptions: [],
        rules: {
          source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
        }
      }
    },
    mounted: function() {
      this.ServiceId = this.$route.query.serviceId
      this.Content = this.$route.query.content
      this.Name = this.$route.query.name
      this.StartTime = this.$route.query.startTime
      this.EndTime = this.$route.query.endTime
      this.Duration = this.$route.query.duration
    },
    computed: {
      contentShortLength() {
        return this.postForm.content_short.length
      }
    },
    created() {
      if (this.isEdit) {
        this.fetchData()
      } else {
        this.postForm = Object.assign({}, defaultForm)
      }
      var id = JSON.parse(localStorage.getItem('volunteerid'))
      global.global_userID = id
      console.log('全局：'+global.global_userID)
    },
    methods: {
      //上传图片未用组件Upload4/5， 原因是点击组件中的确认上传会产生多余跳转， 待解决
      rmImage1() {
        this.dialogImageUrl1 = ''
      },
      handleImageScucess1(response) {
        console.log('picture1!')
        console.log(response)
        this.dialogImageUrl1 = response.list.url
      },
      rmImage2() {
        this.dialogImageUrl2 = ''
      },
      handleImageScucess2(response) {
        console.log('picture2!')
        console.log(response)
        this.dialogImageUrl2 = response.list.url
      },
      submit: function() {
        var params = new URLSearchParams()
        params.append('UserID', global.global_userID)
        params.append('ServiceID', this.ServiceId)
        params.append('Material1', this.dialogImageUrl1)
        params.append('Material2', this.dialogImageUrl2)
        params.append('Material3', '')
        params.append('RealStartTime', '2018-01-05 00:09:20')
        params.append('RealEndTime', '2018-01-05 00:09:20')
        if (this.postForm.content.length == 0) {
          // if it is empty we should make the message as it cannot be submitted
          this.$message('详情部分禁止为空')
          return
        } else {
          params.append('Remark', this.postForm.content)
          axios.post('http://' + port.info.host + ':' + port.info.port + '/api/applicate', params).then(
            (res) => {
              this.$message('申请成功，等待审核')
              console.log(res)
            }
          ).catch((err) => {
            console.log(err)
          })

          this.$router.push({ name: 'HistoryService', params: {}})
        }
      },
      fetchData() {
        fetchArticle().then(response => {
          this.postForm = response.data
        }).catch(err => {
          this.fetchSuccess = false
          console.log(err)
        })
      },
      submitForm() {
        this.postForm.display_time = parseInt(this.display_time / 1000)
        console.log(this.postForm)
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            })
            this.postForm.status = 'published'
            this.loading = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      draftForm() {
        if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
          this.$message({
            message: '请填写必要的标题和内容',
            type: 'warning'
          })
          return
        }
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 100
        })
        this.postForm.status = 'draft'
      },
      getRemoteUserList(query) {
        userSearch(query).then(response => {
          if (!response.data.items) return
          console.log(response)
          this.userLIstOptions = response.data.items.map(v => ({
            key: v.name
          }))
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 18px;
    top:10px;
    color:#ff4949;
  }
  .application-container {
    font-size: 20px;
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;
          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
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

