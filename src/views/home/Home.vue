<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h2 class="h2">OA系统</h2>
        <el-dropdown class="drop">
            {{employee.name}}[{{employee.title}}]
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleClickOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-container style="height: 785px">
        <el-aside width="200px" class="aside">
          <el-menu>
            <el-sub-menu
              v-for="(item, index) in nodeList"
              :key="index"
              :index="index.toString()"
              class="menu"
            >
              <template #title>
                <i class="el-icon-s-tools"></i>
                <span>{{ item.node.nodeName }}</span>
              </template>
              <el-menu-item
                v-for="func in item.children"
                :index="func.nodeId.toString()"
                :key="func.nodeId"
                @click="showPage(func.url)"
                >{{ func.nodeName }}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
        
        <Notice v-if="`${url}`=='/notice.html'" />
        <LeaveForm v-if="`${url}`=='/leave_form.html'" 
              :employeeName="employee.name" 
              :employeeTitle="employee.title" 
              :departmentName="department.departmentName"/>
        <Audit v-if="`${url}`=='/audit.html'"/>
        </el-main>
      </el-container>

    </el-container>
   
  </div>
  
</template>



<script>
import axios from "axios";
import LeaveForm from '@/components/LeaveForm.vue';
import Notice from '@/components/Notice.vue'
import Audit from '@/components/Audit.vue'
export default {
  components:{Notice,LeaveForm,Audit},
  data() {
    return {
      nodeList: [],
      employee:{},
      department:{},
      url:[]
    };
  },
  methods:{
    showPage(url){
      this.url=url;
    },
    handleClickOut(){
      sessionStorage.clear()
      window.location.href="/"
    }
  },
  mounted() {
    const objApp = this;
    const uid = sessionStorage.uid;
    const eid=sessionStorage.eid;
    axios.get("http://localhost:8000/api/user_info?uid=" + uid+"&eid="+eid)
      .then(function (response) {
        const json = response.data;
        console.log(json);
        json.data.nodeList.forEach(function (item) {
          objApp.nodeList.push(item);
        });
        objApp.employee = json.data.employee;
        objApp.department=json.data.department;
      });
  },
};
</script>



<style scoped>
.aside {
  background-color: #999;
}
.main {
  background-color: skyblue;
}
.spans {
  width: 500px;
}
el-main{
  height: 785px;
}
.drop{
position: absolute;
right: 100px;
top: 23px;
}
.iframe{
  height: 100%;
  width: 100%;
}
.h2{
  position: absolute;
  left: 56px;
  top: 12px;
}
</style>