<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">

          <router-link style="margin-right:15px;" v-show='isEdit' :to="{ path:'create-form'}">
            <el-button type="info">创建form</el-button>
          </router-link>

          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submit()">立即申请
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
              <el-row style="margin-left: 100px">
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


                <el-col :span="6">
                  <el-form-item style="margin-bottom: 20px;" label-width="90px" label=" 服务时段:" class="postInfo-container-item">
                    <el-form-item style="margin-bottom: 20px;margin-left: 20px" prop="title">
                      <span style="color: darkgray"  v-cloak >{{ this.StartTime|formatDate }}</span>
                    </el-form-item>
                  </el-form-item>
                </el-col>

                <el-col :span="4">
                  <el-form-item style="margin-bottom: 20px;" label-width="20px" label="—" class="postInfo-container-item">
                    <el-form-item style="margin-bottom: 20px; margin-left: 25px" prop="title">
                      <span style="color: darkgray"  v-cloak >{{ this.EndTime|formatDate }}</span>
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


        <el-form-item style="margin-bottom: 10px;" label-width="45px" label="详情:">
        </el-form-item>

        <div class="editor-container">
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
                  <Upload4 clearable style="width: 1100px" v-model="postForm.image_uri"></Upload4>
                </el-col>

                <el-col :span="1">
                  <Upload3 clearable style="width: 1100px" v-model="postForm.pdf_uri"></Upload3>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

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
  import complexTable from './../example/table/complexTable'
  import { formatDate } from '@/methods/methods.js'
  import axios from 'axios'

  const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 上传图片
    pdf_uri: '', //上传证明
    source_number: '', // 文章外部作者
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false
  }
  export default {
    filters: {
      formatDate(time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    name: 'articleDetail',
    components: { Tinymce, MDinput, Upload4, Upload3, Multiselect, Sticky, complexTable },
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
        platformsOptions: [
          { key: 'a-platform', name: 'a-platform' },
          { key: 'b-platform', name: 'b-platform' },
          { key: 'c-platform', name: 'c-platform' }
        ],
        importanceOptions_info: [1, 1.5, 2, 2.5, 3, 3.5, 4],
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
          source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
        }
      }
    },
    mounted: function() {
      this.ServiceId = this.$route.params.serviceId
      this.Content = this.$route.params.content
      this.Name = this.$route.params.name
      this.StartTime = this.$route.params.startTime
      this.EndTime = this.$route.params.endTime
      this.Duration = this.$route.params.duration
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
    },
    methods: {
      submit: function() {
        var params = new URLSearchParams()
        params.append('UserID', '7')
        params.append('ServiceID', this.ServiceId)
        params.append('Material1', '')
        params.append('Material2', '')
        params.append('Material3', '')
        params.append('RealStartTime', this.StartTime)
        params.append('RealEndTime', this.EndTime)
        console.log(this.StartTime)
        axios.post('http://localhost:3000/api/applicate', params).then(
          (res) => {
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

