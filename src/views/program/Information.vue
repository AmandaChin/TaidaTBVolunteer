<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">

          <router-link style="margin-right:15px;" v-show='isEdit' :to="{ path:'create-form'}">
            <el-button type="info">创建form</el-button>
          </router-link>


          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">立即发布
          </el-button>
          <el-button v-loading="loading" type="warning" @click="draftForm()">存为草稿</el-button>

        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
        </template>

      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom:40px;" prop="title">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">
                标题
              </MDinput>
              <span v-show="postForm.title.length>=26" class='title-prompt'>app可能会显示不全</span>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="4">
                  <el-form-item label-width="90px" label="服务内容:" class="postInfo-container-item">
                    <el-form-item style="margin-bottom: 20px;" prop="title">
                      <el-input placeholder="最多10个字" style='min-width:100px;' v-model="postForm.service_content" required :maxlength="10">
                      </el-input>
                      <span v-show="postForm.title.length>=20" class='title-prompt'>app可能会显示不全</span>
                    </el-form-item>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="105px" label="人数:" class="postInfo-container-item">
                    <el-form-item style="margin-bottom: 20px;" prop="title">
                      <el-input placeholder="志愿者数" style='min-width:70px;' v-model="postForm.source_number" required :maxlength="3">
                      </el-input>
                      <span v-show="postForm.title.length>=20" class='title-prompt'>app可能会显示不全</span>
                    </el-form-item>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item style="margin-bottom: 20px;" label-width="90px" label=" 服务时段:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.start_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="5">
                  <el-form-item style="margin-bottom: 20px;" label-width="60px" label="—" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.end_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
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
                <el-col :span="4">
                  <el-form-item label-width="90px" label="服务时长:" class="postInfo-container-item">
                    <el-select clearable style="width: 100px" class="filter-item" v-model="postForm.duration":placeholder="$t('小时')">
                      <el-option v-for="item in importanceOptions_info" :key="item" :label="item" :value="item" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="3">
                  <el-form-item label-width="220px" label="需转移给志愿者勋章数量：" class="postInfo-container-item">
                    <el-tag style='margin-top:0px;display:block; width: 100px;height: 38px;margin-left: 0px' type="info">{{$t(postForm.coinamount)}}</el-tag>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 10px;" label-width="45px" label="摘要:">
          <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="postForm.content_short">
          </el-input>
          <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
        </el-form-item>

        <el-form-item style="margin-bottom: 10px;" label-width="45px" label="详情:">
        </el-form-item>

        <div class="editor-container">
          <tinymce :height=400 ref="editor" v-model="postForm.content"></tinymce>
        </div>

        <div style="margin-bottom: 20px;">
          <Upload v-model="postForm.image_uri"></Upload>
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/singleImage5'
  import MDinput from '@/components/MDinput'
  import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
  import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { validateURL } from '@/utils/validate'
  import { fetchArticle } from '@/api/article'
  import { userSearch } from '@/api/remoteSearch'
  import complexTable from '../example/table/complexTable'
  import data from "../svg-icons/generateIconsView";

  const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    source_number: '', // 文章外部作者
    start_time: undefined,
    end_time: undefined,
    id: undefined,
    platforms: ['a-platform'],
    duration: undefined,
    coinamount: undefined,
    comment_disabled: false
  }
  const sendData={
    UserId: this.UserId,
    content: this.postForm.service_content,
    start_time: this.postForm.start_time,
    end_time: this.postForm.end_time,
    duration: this.postForm.duration,
    remark: this.postForm.content
  }
  export default {
    name: 'articleDetail',
    components: { Tinymce, MDinput, Upload, Multiselect, Sticky, complexTable },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    methods:{
      /**
       * 这个位置应该改一下http地址就可以了
       * 此处需要serviceID在数据库中是多少
       */
      submit: function() {
        var JSONobject = JSON.stringify(this.sendData)
        this.$http.post('http://localhost:3000/api/demandPost', JSONobject).then((response) => {
          // success callback
          console.log(response.data)
        }, (response) => {
          console.log("error")
          // error callback
        })
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
        postForm: Object.assign({}, defaultForm),
        fetchSuccess: true,
        loading: false,
        userLIstOptions: [],
        platformsOptions: [
          { key: 'a-platform', name: 'a-platform' },
          { key: 'b-platform', name: 'b-platform' },
          { key: 'c-platform', name: 'c-platform' }
        ],
        importanceOptions_info: [1, 1.5, 2, 2.5, 3, 3.5, 4],
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
      if (this.isEdit) {
        this.fetchData()
      } else {
        this.postForm = Object.assign({}, defaultForm)
      }
    },
    methods: {
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
            this.postForm.submit()
            /**
             * 这个地方需要写路由地址 检测一下是否传参成功
             *this.$http.post('/someUrl', { title: this.postForm.title, service_content: this.postForm.service_content, start_time: this.postForm.start_time, end_time: this.postForm.end_time, duration: this.postForm.duration, content_short: this.postForm.content_short, content: this.postForm.content}).then(successCallback, errorCallback);
            */
             /**
             * 论坛填写的内容提交了
             * @type {boolean}
             */
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
        this.postForm.submit()
        /**
         * 这个地方应该注意 应该让数据库那边加上FORM的属性
         */
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

