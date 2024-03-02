<template>
  <el-form ref="loginForm" :rules="rules" :model="form"  label-width="80px" class="login-box">
    <h2 class="title">OA办公系统</h2>
    <el-form-item label="账号" prop="username">
      <el-input type="text" placeholder="请输入账号" v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="form.password"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="LoginhandleClick('loginForm')"
        style="width: 200px"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>



<script>
import axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods:{
    LoginhandleClick(loginForm) {
        const form=this.$refs[loginForm]
        form.validate((valid)=>{
            if(valid){
                console.log("表单验证成功");
                const form=this.form;
                const $message=this.$message;
                const params=new URLSearchParams();
                params.append("username",form.username);
                params.append("password",form.password)
                axios.post("http://localhost:8000/api/login",params,{}).then(function (response) {
                   console.log(response);
                   const json=response.data;
                    // console.log(json);
                    if(json?.code==0){
                      sessionStorage.uid=json.data.user.userId
                      sessionStorage.eid=json.data.user.employeeId
                      window.location.href="/"
                      localStorage.isLogin=true;
                    }else{
                     $message.error({message:json.message,offset:100})
                    }
                })
            }
        })
    }
  }
};
</script>




<style >
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
.title {
  color: #909399;
  text-align: center;
}
</style>