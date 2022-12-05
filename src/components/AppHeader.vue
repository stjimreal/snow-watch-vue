<!--
 * @Date: 2022-04-18 00:52:06
 * @LastEditors: LIULIJING
 * @LastEditTime: 2022-04-22 23:24:44
 :default-active="activeIndex"
 @select="handleSelect"
-->
<template>
  <Row>
    <el-menu
        :default-active="activeIndex"
        active-text-color="#ffd04b"
        background-color="#3c5162"
        class="el-menu-demo"
        mode="horizontal"
        router="true"
        text-color="#fff"
        v-model="chosenType"
        >
      <el-menu-item>
        <!-- <el-image alt="snow-watch" 
                  :src="require('../assets/main_logo.png')" height="13"></el-image> -->
        <img alt="main-logo" src="../assets/main_logo.png" height="60" />
        
      </el-menu-item>
      <el-menu-item index="static">在线浏览</el-menu-item>
      <el-menu-item index="dynamic">在线监测</el-menu-item>
      <el-menu-item index="about">数据集管理</el-menu-item>
    </el-menu>
  </Row>
  <Row>
    <ViewWorld/>
  </Row>
</template>

<script>
import 'element-plus/lib/theme-chalk/el-image.css';
import 'element-plus/lib/theme-chalk/el-menu.css';
import ViewWorld from "@/views/ViewWorld";
// import ViewTrend from "@/views/ViewTrend";
// import ViewAbout from "@/views/ViewAbout";

export default {
  name: "AppHeader",
  components: {
    ViewWorld,
    // ViewTrend,
    // ViewAbout
  },
  data() {
    return {
      // chosenType:"static",
      activeIndex: 'static',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = keyPath;
    }
  },
}
</script>

<style scoped>
.el-menu-demo {
  height: 10%;
}

</style>
