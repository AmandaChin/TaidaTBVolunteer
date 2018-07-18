<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">

          <router-link style="margin-right:15px;" v-show='isEdit' :to="{ path:'create-form'}">
            <el-button type="info">创建form</el-button>
          </router-link>

          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submit()">立即发布
          </el-button>
        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
        </template>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item label-width="90px" label="服务内容:" class="postInfo-container-item">
                    <el-select clearable style="width: 130px" class="filter-item" v-model="postForm.service_content" placeholder="服务类型">
                      <el-option v-for="item in servecontent_info" :key="item.ID" :label="item.type" :value="item.ID" >
                      </el-option>
                    </el-select>
                    <!-- <el-input placeholder="10字以内" style='min-width:100px;' v-model="postForm.service_content" required :maxlength="10">
                    </el-input> -->
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item style="margin-bottom: 10px;" label-width="130px" label=" 开始日期和时刻:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.start_time" type="date"
                                    format="yyyy-MM-dd " value-format="yyyy-MM-dd"
                                    :picker-options="pickerBeginDateAfter" placeholder="选择开始的时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                 <el-col :span="4">
                  <el-form-item style="margin-bottom: 10px;" label-width="130px" label=" 服务时段:" class="postInfo-container-item">
                    <el-time-select
                      placeholder="起始时间"
                      v-model="pickedtime"
                      :picker-options="{
                     start: '05:30',
                      step: '00:30',
                      end: '20:00'
                   }"></el-time-select>

                  </el-form-item>
                </el-col>
                <!--<el-col :span="5">-->
                  <!--<el-form-item style="margin-bottom: 10px;" label-width="100px" label="—" class="postInfo-container-item">-->
                    <!--<el-date-picker v-model="postForm.end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">-->
                    <!--</el-date-picker>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->

                <!-- <el-col :span="5">
                  <el-form-item style="margin-bottom: 10px;" label-width="100px" label="—" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col> -->

                <el-col :span="4">
                  <el-form-item label-width="225px" label="服务时长:" class="postInfo-container-item">
                    <el-select clearable style="width: 100px" class="filter-item" v-model="postForm.duration" placeholder="小时">
                      <el-option v-for="item in time_info" :key="item" :label="item" :value="item" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

          </el-col>
        </el-row>


        <el-form-item style="margin-bottom: 10px;" label-width="45px" label="详情:">
        </el-form-item>

        <div class="editor-container">
          <tinymce :height=400 ref="editor" v-model="postForm.content"></tinymce>
        </div>

      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import Upload4 from '@/components/Upload/singleImage4'
  import Upload3 from '@/components/Upload/singleImage3'
  import MDinput from '@/components/MDinput'
  import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
  import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { validateURL } from '@/utils/validate'
  import { fetchArticle } from '@/api/article'
  import { userSearch } from '@/api/remoteSearch'
  import { formatDate } from '@/methods/date.js'
  import complexTable from './../example/table/complexTable'
  import axios from 'axios'
  import global from '../../utils/global_userID'
  import port from '../../utils/manage'

  const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 上传图片
    start_time: '',
    end_time: '',
    pdf_uri: '', // 上传证明
    source_number: '', // 文章外部作者
    display_time: undefined, // 前台展示时间
    id: undefined,
    duration: undefined,
    platforms: ['a-platform'],
    comment_disabled: false
  }

  export default {
    // filters: {
    //   formatDate(time) {
    //     var date = new Date(time)
    //     return formatDate(date, 'yyyy-MM-dd hh:mm')
    //   }
    // },
    name: 'articleDetail',
    components: { Tinymce, MDinput, Upload4, Upload3, Multiselect, Sticky, complexTable },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(null)
        } else {
          callback()
        }
      }
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
            var timeSpace = time.getTime() < (Date.now() - 24 * 60 * 60 * 1000)
            return timeSpace
          }
        },
        pickedtime: '',
        pickedtimes: '',
        startTime: '',
        endTime: '',
        postForm: Object.assign({}, defaultForm),
        fetchSuccess: true,
        loading: false,
        sendstarttime: '',
        sendendtime: '',
        userLIstOptions: [],
        platformsOptions: [
          { key: 'a-platform', name: 'a-platform' },
          { key: 'b-platform', name: 'b-platform' },
          { key: 'c-platform', name: 'c-platform' }
        ],
        servecontent_info: [],
        time_info: [1, 1.5, 2, 2.5, 3, 3.5, 4],
        listQuery_info: {
          page: 1,
          limit: 20,
          importance_info: undefined,
          coinamount: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        rules: {
          image_uri: [{ validator: validateRequire }],
          title: [{ validator: validateRequire }],
          service_content: [{ validator: validateRequire }],
          content: [{ validator: validateRequire }],
          source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
        }
      }
    },
    computed: {
      contentShortLength() {
        return this.postForm.content_short.length
      }
    },
    created() {
      this.showServerType()
      if (this.isEdit) {
        this.fetchData()
      } else {
        this.postForm = Object.assign({}, defaultForm)
      }
    },
    methods: {
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
      submit: function() {
        console.log('submit!!' + this.postForm.service_content)
        var params = new URLSearchParams()
        if (this.postForm.service_content === undefined) {
          this.$message('服务内容禁止为空')
          return
        } else if (this.postForm.start_time === '') {
          this.$message('起始时间禁止为空')
          return
        // } else if (this.postForm.end_time === '') {
        //   this.$message('终止时间禁止为空')
        //   return
        } else if (this.postForm.content === undefined) {
          this.$message('详情内容禁止为空')
          return
        } else if (this.postForm.duration.length === 0) {
          this.$message('服务时长禁止为空')
          return
        } else {
          console.log('timerrefa:' + this.postForm.start_time)
          var testtime = new Date(String(this.postForm.start_time) + ' ' + this.pickedtime)
          console.log('test!!!!!!!' + this.pickedtime.substring(0, 2) + this.pickedtime.substring(3, 5))
          console.log('tttttttttt' + String(this.postForm.start_time))
          console.log('timerrefa:' + testtime)
          var test1 = testtime.getTime() + this.postForm.duration * 60 * 60 * 1000
          console.log('timerrefa:' + testtime.getTime())
          var finalbegin = this.formatDateTime(testtime.getTime())
          var finalend = this.formatDateTime(test1)
          console.log('timerrefa:' + test1)
          params.append('UserId', global.global_userID)
          params.append('Content', this.postForm.service_content)
          // params.append('DemandStartTime', this.postForm.start_time)
          params.append('DemandStartTime', finalbegin)
          // params.append('DemandEndTime', this.postForm.end_time)
          params.append('DemandEndTime', finalend)
          params.append('Duration', this.postForm.duration)
          params.append('Remark', this.postForm.content)
          // 'http://' + port.info.host + ':' + port.info.port + '/api/postNewRequirement'
          axios.post('http://' + port.info.host + ':' + port.info.port + '/api/postNewRequirement', params).then(
            (res) => {
              console.log(res)
            }
          ).catch((err) => {
            console.log(err)
          }).then(
            (res) => {
              this.$message('发布成功')
              console.log(res)
              setTimeout(() => {
              this.$router.push({ name: 'UploadedDemand', params: {}})
              },500)
            }
          ).catch((err) => {
            this.$message('发布失败，请重试或联系管理员！')
            console.log(err)
          })
        }
      },

      showServerType() {
        // 得到全部服务类型
        axios.get('http://' + port.info.host + ':' + port.info.port + '/api/itemOperation',
          {
            dataType: 'jsonp',
            crossDoxmain: true
          }).then(
          (res) => {
            this.servecontent_info = res.data.list.rows
            console.log(res)
          }
        ).catch((err) => {
          console.log(err)
        })
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
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
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
</style>

