<!--
 * @Date: 2022-04-18 00:52:06
 * @LastEditors: LIULIJING
 * @LastEditTime: 2022-04-29 18:23:43
 :default-active="activeIndex"
 @select="handleSelect"
-->
<template>
  <!-- <Row> -->
    <el-menu
        :default-active="activeIndex"
        active-text-color="#ffd04b"
        background-color="#3c5162"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        text-color="#fff"
        @select="handleSelect"
        >
      <el-menu-item>
        <!-- <el-image alt="snow-watch" 
                  :src="require('../assets/main_logo.png')" height="13"></el-image> -->
        <img alt="main-logo" src="../assets/main_logo.png" height="60" />
        
      </el-menu-item>
      <el-menu-item index="/view">动态浏览</el-menu-item>
      <el-menu-item index="/analysis">在线监测</el-menu-item>
      <!-- <el-menu-item index="/about">数据集管理</el-menu-item> -->
    </el-menu>
  <!-- </Row> -->
  <!-- <Row> -->
    <!-- <ViewWorld /> -->
    <!-- <ViewTrend /> -->
  <!-- </Row> -->
</template>

<script>
import 'element-plus/lib/theme-chalk/el-image.css';
import 'element-plus/lib/theme-chalk/el-menu.css';
// import ViewWorld from "@/views/ViewWorld";
// import ViewTrend from "@/views/ViewTrend";
// import ViewTrend from "@/views/ViewTrend";
// import ViewAbout from "@/views/ViewAbout";

export default {
  name: "AppHeader",
  components: {
    // ViewWorld,
    // ViewTrend,
    // ViewAbout
  },
  data() {
    return {
      // chosenType:"static",
      activeIndex: '/view',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = keyPath.toString();
    }
  },
}
</script>

<style scoped>
.el-menu-demo {
  height: 10%;
}

</style>
