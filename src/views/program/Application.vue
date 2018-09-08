<template>
  <div class="application-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <sticky :className="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="cancel" @click="JumpHistoryService">取消申请
        </el-button>
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

        <el-row>
          <el-col :span="6">
            <el-form-item style="margin-bottom: 20px;" label-width="25%" label=" 实际服务日期:" class="postInfo-container-item">
              <el-form-item style="margin-bottom: 20px;margin-left: auto" prop="title">
                <el-date-picker     type="date" v-model="postForm.serve_date"
                                    format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                    :picker-options="pickerBeginDateAfter" placeholder="请选择实际服务日期">
                    </el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item style="margin-bottom: 20px;" label-width="28%" label=" 实际服务时段:" class="postInfo-container-item">
              <el-form-item style="margin-bottom: 20px;margin-left: auto" prop="title">
              <el-time-select
                placeholder="起始时间"  format="HH:mm:ss" value-format="HH:mm:ss" type="time"
                v-model="postForm.starttime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '20:30'
                }">
                </el-time-select>

              </el-form-item>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item style="margin-bottom: 20px;margin-left: 1%" label-width="5%" label="—" class="postInfo-container-item">
              <el-form-item style="margin-bottom: 20px; margin-left: auto" prop="title">
                <el-time-select
                  placeholder="结束时间" format="HH:mm:ss" value-format="HH:mm:ss" type="time"
                  v-model="postForm.endtime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '20:30',
                    minTime: postForm.starttime
                  }">
                </el-time-select>
              </el-form-item>
            </el-form-item>
          </el-col>

          <el-button v-loading="loading" style="margin-left: 10px;" type="cancel" @click="defaultTime">与申请时间一致请点击此处
          </el-button>
        </el-row>


        <el-form-item style="margin-left: 20px;margin-bottom: 10px; font-size: 25px;" label-width="45px" label="详情:">
        </el-form-item>

        <div class="editor-container" style="margin-left: 20px">
          <tinymce :height=400 ref="editor" v-model="postForm.content"></tinymce>
        </div>

        <el-row style="margin-left:20px">
          <el-col>
            <div class="filter-container" >
              <el-row>
                <el-col :span="13">
                  <el-form-item style="margin-bottom: 5px;"  label="上传图片材料:">
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="1">
                  <el-form-item style="margin-bottom: 5px;" label-width="90px" label="上传证明:">
                  </el-form-item>
                </el-col> -->
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-left:20px">
          <el-col>
            <div class="filter-container">
              <el-row>
                  <div class="upload-container" >
                    <el-upload   class="image-uploader"
                        v-show="dialogImageUrl1.length<4"
                        drag :multiple="false" :show-file-list="false"
                        :action="postUrl"
                        :on-success="handleImageScucess1">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将其他相关文件拖到此处，或<em>点击上传</em></div>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4张</div>
                    </el-upload>
                    <div class="image-preview" v-for="img in dialogImageUrl1" v-show="dialogImageUrl1.length>0">
                      <div class="image-preview-wrapper"  >
                          <img :src="img" >
                          <div class="image-preview-action">
                            <i @click="rmImage1(img)" class="el-icon-delete"></i>
                          </div>
                      </div>
                    </div>
                  </div>
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
  import { getTime } from '../../utils'
const defaultForm = {
    serve_date: '', // 实际开始日
    starttime: '', // 实际开始时间
    endtime: '', // 实际结束时间
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '' // 上传图片
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
    components: { Tinymce, Upload4, Upload5, Sticky, complexTable },
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
        pickerBeginDateAfter: {
          disabledDate(time) {
            var timeSpace = time.getTime() > (Date.now())
            return timeSpace
          }
          // shortcuts: [{
          //   text: '默认值',
          //   onClick(picker) {
          //     const date = new Date()
          //     date.setTime(this.StartTime.getTime())
          //     console.log('aaaaaaaa    ' + this.date)
          //     picker.$emit('pick', date)
          //   }
          // }]
        },
        realdate: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        postUrl: '',
        dialogImageUrl1: [],
        dialogImageUrl2: '',
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
      this.imgPostUrl()
      var id = JSON.parse(localStorage.getItem('volunteerid'))
      global.global_userID = id
      console.log('全局：' + global.global_userID)
    },
    methods: {
      // defaultTime() {
      //   this.postForm.serve_date = this.formatDatex(this.StartTime)
      //   this.postForm.starttime = this.formatDateTime(this.starttime)
      //   this.postForm.endtime = this.formatDateTime(this.endtime)
      //   console.log('aaaaaaaaa：' + this.postForm.serve_date)
      //   console.log('bbbbbbbb：' + this.postForm.starttime)
      //   console.log('ccccccc：' + this.postForm.endtime)
      // },
      defaultTime() {
        this.postForm.serve_date = this.StartTime
        var s = new Date(this.StartTime)
        var start = (s.getHours() - 8) + ':' + s.getMinutes() + ':' + s.getSeconds()
        this.postForm.starttime = start
        var d = new Date(this.EndTime)
        var end = (d.getHours() - 8) + ':' + d.getMinutes() + ':' + d.getSeconds()
        this.postForm.endtime = end
        console.log('默认日期！！！！！' + this.StartTime)
        console.log('默认开始时刻！！！！！' + start)
        console.log('默认结束时刻！！！！！' + end)
      },
      JumpHistoryService: function() {
        this.$router.push({ name: 'HistoryService' })
      },
      imgPostUrl() {
        this.postUrl = 'http://' + port.info.host + ':' + port.info.port + '/api/uploadFile'
      },
      // 上传图片未用组件Upload4/5， 原因是点击组件中的确认上传会产生多余跳转， 待解决
      rmImage1(img) {
        console.log(img)
        this.dialogImageUrl1.pop(img)
        console.log(this.dialogImageUrl1)
      },
      handleImageScucess1(response) {
        this.dialogImageUrl1.push(response.list.url)
      },
      // 上传错误
      uploadError1(response, file, fileList) {
        this.$message('上传失败，请重试！')
      },
      rmImage2() {
        this.dialogImageUrl2 = ''
      },
      handleImageScucess2(response) {
        this.dialogImageUrl2 = response.list.url
      },
      // 处理时间
      formatDateTime(inputTime) {
        var date = new Date(inputTime)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        var minute = date.getMinutes()
        var second = date.getSeconds()
        minute = minute < 10 ? ('0' + minute) : minute
        second = second < 10 ? ('0' + second) : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      },
      handleNullImg() {
        if (this.dialogImageUrl1.length < 4) {
          var len = this.dialogImageUrl1.length
          for (var i = 0; i < 4 - len; i++) {
            this.dialogImageUrl1.push('')
          }
        }
      },
      submit: function() {
        if (this.postForm.content.length == 0) {
          this.$message('请填写服务详情！')
          return
        // } else if (this.postForm.serve_date.length == 0) {
        //   this.$message('请填写真实服务时间！')
        //   return
        // } else if (this.postForm.starttime.length == 0) {
        //   this.$message('请填写服务开始时间！')
        //   return
        // } else if (this.postForm.endtime.length == 0) {
        //   this.$message('请填写服务结束时间！')
        //   return
        } else {
          this.handleNullImg()
          var StartTimestamp = new Date(String(this.postForm.serve_date) + ' ' + this.postForm.starttime)
          var EndTimestamp = new Date(String(this.postForm.serve_date) + ' ' + this.postForm.endtime)
          var finalbegin = this.formatDateTime(StartTimestamp.getTime())
          var finalend = this.formatDateTime(EndTimestamp.getTime())
          var params = new URLSearchParams()
          params.append('UserID', global.global_userID)
          params.append('ServiceID', this.ServiceId)
          params.append('Material1', this.dialogImageUrl1[0])
          params.append('Material2', this.dialogImageUrl1[1])
          params.append('Material3', this.dialogImageUrl1[2])
          params.append('Material4', this.dialogImageUrl1[3])
          params.append('RealStartTime', finalbegin)
          params.append('RealEndTime', finalend)
          params.append('Remark', this.postForm.content)
          axios.post('http://' + port.info.host + ':' + port.info.port + '/api/applicate', params).then(
            (res) => {
              console.log(res.data.num)
              if (parseInt(res.data.num) == -1) {
                this.$message('抱歉，审核者不足四人无法申请！')
              } else {
                this.$message('申请成功，等待审核')
                this.$router.push({ name: 'HistoryService', params: {}})
              }
            }
          ).catch((err) => {
            console.log(err)
          })
        }
      },
      fetchData() {
        fetchArticle().then(response => {
          this.postForm = response.data
        }).catch(err => {
          this.fetchSuccess = false
          console.log(err)
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
      width: 20%;
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

