<template>
  <div class="common-layout">
    <el-container>
      <el-header>

        

      </el-header>
      <el-container style="height:100%">
        <el-aside width="200px" class="aside">
          <el-menu>
	<template   v-for="(item, index) in nodeList">      
	 <el-sub-menu  :index="item">
		</template>
              <template #title>
                <i class="el-icon-s-tools"></i>
                <span>{{ item.node.nodeName }}</span>
              </template>
              <el-menu-item v-for="func in item.children" :index="func.nodeId">{{func.nodeName}}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <iframe id="main" name="main" src="https://www.bilibili.com/" style="width:100%;height:95%;border: 0px"></iframe>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
import axios from "axios";
export default {
  data() {
    return {
      nodeList: [],
    };
  },
  mounted() {
    const objApp = this;
    const uid = sessionStorage.uid;
    axios
      .get("http://localhost:8000/api/user_info?uid=" + uid)
      .then(function (response) {
        const json = response.data;
        console.log(json);
        json.data.nodeList.forEach(function (item) {
          objApp.nodeList.push(item);
        });
        objApp.employee = json.data.employee;
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
</style>