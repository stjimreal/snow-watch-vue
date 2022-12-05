<!--
 * @Date: 2022-04-18 00:52:06
 * @LastEditors: LIULIJING
 * @LastEditTime: 2022-04-22 23:27:39
-->
<template>
  <div id="app">
    <!-- <Row style="height: 70px;"> -->
      <AppHeader/>
      <!-- <i-col span="5"> <Menu class="whiteword" @changeTab="setTab"/> </i-col> -->
    <!-- </Row> -->

    <!-- <Row class="content" :style="'height:'+ (fullHeight>500?fullHeight:fullHeight) +'px;'" > -->
      <!-- <i-col span="24">
        <HeatIndex v-if="currentTab === 'tab1'" :contentHeight="(fullHeight>500?fullHeight-120:fullHeight)"/>
        <HeatWord v-if="currentTab === 'tab2'" :contentHeight="(fullHeight>500?fullHeight-120:fullHeight)"/>
      </i-col> -->
      
    <!-- </Row> -->

  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
// import ViewWorld from "@/views/ViewWorld";

export default {
  name: 'App',
    data() {
    return{
      fullHeight: document.documentElement.clientHeight,
      currentTab:"tab1"
    }
  },
  components: {
    AppHeader,
    // ViewWorld
    // HeatIndex,
    // Banner,
    // Menu,
  }
}
</script>

<style>
html, body {
  height: 100%;
  /* overflow-x: hidden; */
  /* overflow-y: scroll; */
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
}
</style>
