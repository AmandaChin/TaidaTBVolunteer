<template>
  <div class="register-container">
  
      <el-form  class="register-form" :model="registerForm" :rules="rules" ref="registerForm" label-position="right" label-width="100px">
          <h3 class="title">注册页面</h3>

          <el-form-item label="用户名"  prop="username">
          <el-col :span="12">
          <el-input v-model="registerForm.username"></el-input>
          </el-col>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-col :span="12">
          <el-input type="password" v-model="registerForm.pass" auto-complete="off"></el-input>
          </el-col>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-col :span="12">            
          <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>
          </el-col>          
          </el-form-item>

          <el-form-item label="手机号" prop="phone" >
          <el-col :span="12">
          <el-input v-model="registerForm.phone"></el-input>
          </el-col>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
          <el-col :span="12">
          <el-input v-model="registerForm.email"></el-input>
          </el-col>
          </el-form-item>
      
          <el-form-item label="性别" prop='gender'>
            <el-radio-group v-model="registerForm.gender" @change="sexChangeHandler">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
         </el-form-item>

        <el-form-item label="所在地区" prop='region'>
          <el-cascader
           expand-trigger="hover"
           placeholder="选择您所在地区"
           :options="cityInfo"
           v-model="registerForm.region"
           @change="handleChange">
          </el-cascader>
          </el-form-item>

          <el-form-item label="身份证号">
          <el-col :span="12">
          <el-input v-model="registerForm.IDNumber"></el-input>
          </el-col>
          </el-form-item>

          <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
          </el-form-item>

      </el-form>
      

  </div>
</template>
<script>
import cityInfo from '../../utils/cityInfo'
import axios from 'axios'
export default {
  data(){
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      registerForm:{
        username:'',
        pass:'',
        phone: '',
        email: '',
        checkPass: '',
        gender:'',
        region:[],
        IDNumber:''
      },
      cityInfo: cityInfo.info.cityInfo,
      rules: {
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        phone:[
          {required:true, message:'请输入手机号', trigger:'blur'},
          {type: 'number',min:11,max:11, message: '手机号为11位数字', trigger: 'blur'}
        ],
        email:[
          {required:true,message:'请输入邮箱地址',trigger:'blur'},
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        pass:[
          { validator: validatePass, trigger: 'blur' },
          {required:true}
        ],
        checkPass: [
            { validator: validatePass2, trigger: 'blur' },
          {required:true}            
        ],
        gender: [
          {required:true, message:'请选择性别', trigger:'blur'},          
        ],
        region: [
          {required:true,message:'请选择地区',trigger: 'blur'}
        ]
      },
     
    }   
  },
  methods:{

    submitForm() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            var params = new URLSearchParams();
            params.append('account', this.registerForm.username);
            params.append('password', this.registerForm.pass);
            params.append('phone', this.registerForm.phone);
            params.append('email', this.registerForm.email);
            params.append('gender', this.registerForm.gender);
            params.append('province', this.registerForm.region[0]);
            params.append('city', this.registerForm.region[1]);
            params.append('district', this.registerForm.region[2]);
            params.append('IDNumber', this.registerForm.IDNumber);
            
            axios.post('http://' + port.info.host + ':' + port.info.port + '/api/UserRegister', params).then(
              function(res){
                var num = res.data.num;
                
              }
            )
            this.$message('提交成功');
          } else {
            console.log('error submit!!');
            this.$error('请填写必要信息');            
            return false;
          }
        });
      },
    resetForm() {
        this.$refs.registerForm.resetFields();
      }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>

$bg:#2d3a4b;
$light_gray:#eee;

.register-container{
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  .register-form {
    position: absolute;
    left: 20%;
    right: 0;
    width: 60%;
    height: 100%;
    background-color:#fff;
    padding: 35px 35px 15px 35px;
    // margin: 120px auto;
    .title{
      position: relative;
      left:10%;
    }
  }

  

}
</style>

