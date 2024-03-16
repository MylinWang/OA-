<template>
  <el-form ref="leaveForm" :model="form" :rules="rules" label-width="80px">
    <el-descriptions title="请假申请单" :column="1" border>
      <el-descriptions-item label="部门">{{
           departmentName
      }}</el-descriptions-item>
      <el-descriptions-item label="申请人"
        >{{ employeeName }}[{{ employeeTitle }}]
      </el-descriptions-item>
      <el-descriptions-item label="请假类型">
        <el-select v-model="form.formType" style="width: 100%">
          <el-option label="事假" value="1"></el-option>
          <el-option label="病假" value="2"></el-option>
          <el-option label="工伤假" value="3"></el-option>
          <el-option label="婚嫁" value="4"></el-option>
          <el-option label="产假" value="5"></el-option>
          <el-option label="丧假" value="6"></el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="请假时间">
        <el-form-item prop="timeRange" label-width="0px">
          <div class="block">
            <el-date-picker
              v-model="form.timeRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTimeRange"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-descriptions-item>
      <el-descriptions-item label="请假原因">
        <el-form-item prop="reason" label-width="0px">
          <el-input
            type="text"
            placeholder="请输入请假原因"
            v-model="form.reason"
          />
        </el-form-item>
      </el-descriptions-item>
    </el-descriptions>
    <div style="text-align: center; padding-top: 30px">
      <el-button type="primary" v-on:click="onSubmit('leaveForm')"
        >立即申请</el-button
      >
    </div>
  </el-form>
</template>


<script>
import axios from 'axios';

export default {
  props:["employeeName","employeeTitle","departmentName"],
  data() {
    return {
      employee: {},
      department: {},
      form: {
        formType: "1",
        timeRange: "",
        startTime: "",
        endTime: "",
        reason: "",
        eid: "",
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        timeRange: [
          { required: true, message: "请选择请假时间", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "请填写请假原因", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changeTimeRange: function () {
      console.info(this.form.timeRange);
      this.form.startTime = this.form.timeRange[0].getTime();
      this.form.endTime = this.form.timeRange[1].getTime();
    },
    onSubmit(formName){
      const objApp=this;
      const formData=this.form;
      const $message=this.$message;
      this.$refs[formName].validate(function(valid){
        if(valid){
          const params = new URLSearchParams();
          params.append("formType", formData.formType);
          params.append("startTime", formData.startTime);
          params.append("endTime", formData.endTime);
          params.append("reason", formData.reason);
          params.append("eid", sessionStorage.eid);
          axios.post("http://localhost:8000/api/leave/create",params)
            .then(function(response){
              console.log(response);
              const json=response.data;
              if(json.code=="0"){
                 objApp.$alert("请假单已提交，等待上级审批",{
                  callback:function(){
                    window.location.href="/";
                  }
                 })
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

<style scoped>
.el-form {
  border: 1px solid #dcdfe6;
  width: 600px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
</style>