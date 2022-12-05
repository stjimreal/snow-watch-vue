<!--
 * @Date: 2022-04-18 00:52:06
 * @LastEditors: LIULIJING
 * @LastEditTime: 2022-04-29 16:18:50
-->
<template>
  <Row class="HeatIndex" style="width:100%;" >
      <i-col span="24" class="left" :style="'height:' + contentHeight + 'px;'">
          <!-- <StaticMap v-if="chosenType === 'static'" style="height: 100%; width: 100%; position:relative; z: 0;"/> -->
          <DynamicMap :currentIndex="currentTimeLineIndex" v-if="chosenScale === 'day'" style="height: 100%; width: 100%; position:relative; z-index: 0;"/>
          <DynamicMapByWeek :currentIndex="currentWeekIndex" v-if="chosenScale === 'week'" style="height: 100%; width: 100%; position:relative; z-index: 0;"/>
          <DynamicMapByMonth :currentIndex="currentMonthIndex" v-if="chosenScale === 'month'" style="height: 100%; width: 100%; position:relative; z-index: 0;"/>
          <DynamicMapBySeason :currentIndex="currentSeasonIndex" v-if="chosenScale === 'season'" style="height: 100%; width: 100%; position:relative; z-index: 0;"/>
          <StaticMap style="height: 100%; width: 100%; position:relative; z-index: 0;"/>
          <visNumber style="position:absolute; right: 10px; top: 1%;z-index: 1;" :cardHeight="(ContentHeight*0.1)"/>
          <visNCandSMI style="position:absolute; right: 10px; top: 12%;z-index: 1;" :chartHeight="(ContentHeight*0.4)"/>
          <visSpecialHeatWord  style="position:absolute; right: 10px; bottom: 6.5%;z-index: 1;" :chartHeight="(ContentHeight*0.4)"/>
          <visTopTenHeatProvince @changeIndex="changeIndex" v-if="chosenScale === 'day'" style="position:absolute; right: 10px; bottom: 6.5%;z-index: 1;" :chartHeight="(ContentHeight*0.4)"/>
          <visTopTenHeatProvinceByWeek @changeIndex2="changeIndex2" v-if="chosenScale === 'week'" style="position:absolute; right: 10px; bottom: 6.5%;z-index: 1;" :chartHeight="(ContentHeight*0.4)"/>
          <div style="display: flex; align-items: center">
              <Select v-model="chosenScale" style="right: 100px; width: 100px; position:absolute; bottom: 0.5%;z-index: 1">
                  <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </div>
      </i-col>               
  </Row>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet-timedimension@1.1.1/dist/leaflet.timedimension.control.min.css" />
  <div id="map"></div>

</template>

<script>
import 'element-plus/lib/theme-chalk/el-radio.css';
import 'element-plus/lib/theme-chalk/el-radio-group.css';
import 'leaflet-draw/dist/leaflet.draw.css';
// import L from "leaflet";
import map from "@/views/ViewWorld";
import "@/m/fixleaflet";
// import echarts from "./ViewTrend.vue";
import "leaflet.chinatmsproviders";
import "leaflet-draw";
import "leaflet-geodesy";
import "mytests-leaflet-timedimension-lljss";
// import axios, {CancelToken} from "axios";
// const echarts = require('echarts');
// var geodesy = require('leaflet-geodesy');


export default {
  name: "ViewTrend",
  data() {
    return {
      map: map,
      // baseLayers: null,
      // globalVaccineLayer: null,
      // globalCovidLayer: null,
      // cancelAxiosRequest: null
    };
  },
  components: {
    // AppColorGrad,
    // AppHeaderCard,
  },
  mounted() {
    // this.initBaseMap();
    // this.addLayerControl();
    // this.addGlobalCountryLayer();
  },

  methods: {

  }
}

</script>

<style scoped>

</style>
