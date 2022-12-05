<template>
  <!-- <AppHeaderCard
      :title="'确诊： ' + glanceData.cases"
      type="warning"
  ></AppHeaderCard>
  <AppHeaderCard
      :title="'康复： ' + glanceData.recovered"
      type="success"
  ></AppHeaderCard>
  <AppHeaderCard
      :title="'死亡： ' + glanceData.deaths"
      type="info"
  ></AppHeaderCard> -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet-timedimension@1.1.1/dist/leaflet.timedimension.control.min.css" />
    <!-- <span >地图颜色表： </span>
    <el-radio-group v-model="colorMap" @change="changeColorMap">
      <el-radio style="width: 100px" v-for="(c, i) in theColorMap"
                :label="i" :key="i" >
        <AppColorGrad :color-map="c"></AppColorGrad>
      </el-radio>
    </el-radio-group> -->
  <div id="map"></div>
</template>


<script>
// import AppHeaderCard from "@/components/AppHeaderCard";
// import AppColorGrad from "@/components/AppColorGrad";
import 'element-plus/lib/theme-chalk/el-radio.css';
import 'element-plus/lib/theme-chalk/el-radio-group.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from "leaflet";
import "@/m/fixleaflet";
import "leaflet.chinatmsproviders";
import "leaflet-draw";
import "leaflet-geodesy";
import "mytests-leaflet-timedimension-lljss";
import echarts from "echarts";

const theColorMap = [
  'Spectral',
  ['yellow', '008ae5'],
  ['yellow', 'red', 'black'],
  ['yellow', 'navy'],
  'YlGn',
  'RdYlBu'
];
const ratio2ColorMap = [
  [0.00, 0.00],
  [0.01, 0.10],
  [0.03, 0.20],
  [0.05, 0.30],
  [0.08, 0.40],
  [0.12, 0.50],
  [0.18, 0.60],
  [0.25, 0.70],
  [0.50, 0.80],
  [0.70, 0.90],
  [0.80, 1.00],
];

export default {
  name: "ViewWorld",
  data() {
    return {
      map: null,
      baseLayers: null,
      globalVaccineLayer: null,
      globalCovidLayer: null,
    };
  },
  components: {
    // AppColorGrad,
    // AppHeaderCard,
  },
  mounted() {
    this.initBaseMap();
    this.addLayerControl();
    this.addGlobalCountryLayer();
  },

  methods: {
    initBaseMap() {
      let Gaode = L.tileLayer.chinaProvider("GaoDe.Normal.Map", {
        attribution: "© 高德地图",
      });
      let Gaodimgem = L.tileLayer.chinaProvider("GaoDe.Satellite.Map", {
        attribution: "© 高德地图",
      });
      let Gaodimga = L.tileLayer.chinaProvider("GaoDe.Satellite.Annotion", {
        attribution: "© 高德地图",
      });
      // 图层
      let OpenStreetMap = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "© OpenStreetMap",
          }
      );
      this.baseLayers = {
        OpenStreetMap: OpenStreetMap,
        "高德导航": Gaode,
        "高德卫星影像": Gaodimgem,
        "高德卫星标注": Gaodimga
      };
      // this.timeDimension = new L.TimeDimension({
      //   timeInterval: "2017-01-01/2021-10-30",
      //   period: "P1DT"
      // });

      this.map = L.map("map", {
        center: [40, 80],
        zoom: 5,
        layers: [OpenStreetMap],
        timeDimension: true,
        timeDimensionOptions: {
        // position: 'upleft',
        timeInterval: "2017-01-01/2021-10-30",
        period: "P1DT"
        },
        timeDimensionControl: true,
        timeDimensionControlOptions: {
          position: "bottomleft"
        }
      });
      console.log(this.map.timeDimension.getCurrentTime())
      L.control
          .scale({
            maxWidth: 200,
            metric: true,
            imperial: false,
          })
          .addTo(this.map);
    },

    async addGlobalCountryLayer() {
      this.worldBaseShp = require("../static/resource/World_Countries.json");
      this.vaccineData = require("../static/resource/vaccine.json");
      this.vaccineCountryName = this.vaccineData.map((v) => v.country);
      this.globalVaccineLayer = new L.GeoJSON(this.worldBaseShp, {
        // style: this.vaccineStyle,
        style: {fill: true, color: '#0000FF'},
        onEachFeature: this.onEachFeatureOfGlobalLayer
      });
      
      this.controlLayers.addOverlay(this.globalVaccineLayer, '全球国家线');
    },

    vaccineStyle(feature) {
      let id = feature.properties.id;
      let d = 0;
      let index = this.vaccineCountryName.findIndex(
          (c) => c ===
              this.jhuCountryInfo.name[
                  this.jhuCountryInfo.id.findIndex((e) => e === id)
                  ]);
      if (index >= 0) {
        d = Object.values(this.vaccineData[index].timeline)
            / feature.properties.population;
      }
      let fColor = d <= ratio2ColorMap[0][0] ? this.color_scale(ratio2ColorMap[0][1])
          : d <= ratio2ColorMap[1][0] ? this.color_scale(ratio2ColorMap[1][1])
          : d <= ratio2ColorMap[2][0] ? this.color_scale(ratio2ColorMap[2][1])
          : d <= ratio2ColorMap[3][0] ? this.color_scale(ratio2ColorMap[3][1])
          : d <= ratio2ColorMap[4][0] ? this.color_scale(ratio2ColorMap[4][1])
          : d <= ratio2ColorMap[5][0] ? this.color_scale(ratio2ColorMap[5][1])
          : d <= ratio2ColorMap[6][0] ? this.color_scale(ratio2ColorMap[6][1])
          : d <= ratio2ColorMap[7][0] ? this.color_scale(ratio2ColorMap[7][1])
          : d <= ratio2ColorMap[8][0] ? this.color_scale(ratio2ColorMap[8][1])
          : d <= ratio2ColorMap[9][0] ? this.color_scale(ratio2ColorMap[9][1])
          : d <= ratio2ColorMap[10][0] ? this.color_scale(ratio2ColorMap[10][1])
          : this.color_scale(1);
      return {
        fillColor: fColor.hex(),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    },

    getCurTimeStr() {
      var dateInstant = new Date();
      return new Date(dateInstant).toISOString();
    },

    // 交互绘制回调
    drawCreatedBack(e) {
       var geodesy = require('leaflet-geodesy')
      // 绘制的图形图层对象
      let drawLayer = e.layer;

      // 添加到图层组
      this.drawLayerGroup.addLayer(drawLayer);
      let tsId =  this.getCurTimeStr() + "_draw";
      // 绘制监视图形 
      var content = "<div id = " + tsId + " class = \"popup-window\"></div>";
      drawLayer.bindPopup(content, {});
      let _this = this;
      drawLayer.on('popupopen', function(){
        // let dateInstant = _this.map.timeDimension.getCurrentTime();
        // var date = new Date(dateInstant).toISOString();
        let area = (geodesy.area(drawLayer) / 1000000).toFixed()
        let infoNode = document.createElement("div");
        let infoTimeNode = document.createElement("p");
        var startDate = new Date(_this.map.timeDimension.getCurrentTime());
        var date = startDate.toISOString().substring(0,10);
        infoTimeNode.innerHTML = "时间：<strong>"+date+"</strong>";

        let chartPopupNode = document.createElement("p");
        chartPopupNode.className = "echarts-for-all"
        let dateSeries = [];
        let landAreaSeries = [];
        let snowAreaSeries = [];
        let snowFractionalSeries = [];
        // 开始制作 E-Charts 
        let estance = echarts.init(charPopupNode);

        // popup 图表格式
        let popupOption = {
          // legend: {
          //   data: ['实际收益率', '大盘收益率'],
          // },
          xAxis: {
            name: '时间',
            nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          },
          type: 'category',
          boundaryGap: false,
          data: dateSeries,	// 绑定实时数据数组
          },
          yAxis: [{
            name: '面积',
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 18
            },
            type: 'value',
            scale: true,
            boundaryGap: ['15%', '15%'],
            axisLabel: {
              interval: 'auto',
              formatter: '{value} %' // TODO: change
            }
          },
          {
            name: '积雪率',
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 18
            },
            type: 'value',
            scale: true,
            boundaryGap: ['15%', '15%'],
            axisLabel: {
              interval: 'auto',
              formatter: '{value} %'
            }
          }
          ],
          tooltip: {
            trigger: 'axis',
          },
          series: [
            {
              name:'陆地面积',
              type:'line',
              smooth: false,
              yAxisIndex: 0,
              data: snowAreaSeries,	// 绑定实时数据数组
            },
            {
              name:'积雪面积',
              type:'line',
              smooth: false,
              yAxisIndex: 0,
              data: snowAreaSeries,	// 绑定实时数据数组
            },
            {
              name:'积雪率',
              type:'line',
              smooth: false,
              yAxisIndex: 1,
              data: snowFractionalSeries,	// 绑定实时数据数组
            }
          ]
        };
        estance.setOption(popupOption);

        setInterval(function(){
          estance.setOption({
            xAxis: {
              date: dateSeries
            },
            series:[{
              name:'陆地面积',
              yAxisIndex: 0,
              data: landAreaSeries,
            },{
              name:'积雪面积',
              yAxisIndex: 0,
              data: snowAreaSeries,
            },{
              name:'积雪率',
              yAxisIndex: 1,
              date: snowFractionalSeries
            }]
          })
        }, 3000);

        // 注册时间回调 绘制 echarts
        _this.map.timeDimension.on("timeload", function(time){
          startDate = new Date(time.time);
          date = startDate.toISOString().substring(0,10);
          let dateFormatted = date.replace(/-/g, '');
          infoTimeNode.innerHTML = "时间：<strong>"+date+"</strong>";
          
          // 从网络获取数据
          dateSeries.push(dateFormatted);

        });

        let infoAreaNode = document.createElement("p");
        infoAreaNode.innerHTML = "面积：<strong>"+area + " km<sup>2</sup></strong>";
        // infoTimeNode.addEventListener()
        // "时间："+date+"\n 面积：<strong>"+area + " km<sup>2</sup></strong>"
        infoNode.appendChild(infoTimeNode);
        infoNode.appendChild(infoAreaNode);
        infoNode.appendChild(chartPopupNode);

        let dom = document.getElementById(tsId);
        dom.appendChild(infoNode);
        // ev.popup.update();
        // api请求summary，在echarts绘制
        // console.log(time);
      });

      //  "<div>日期：<strong>" + date + "</strong></div>"

      // let startDate = new Date(this.map.timeDimension.);
      // startDate.setUTCHours(0, 0, 0, 0);
      // var startDateFormatted = startDate.toISOString().substring(0,10).replace(/-/g, '');
    },

    addLayerControl() {

      // let originUrl = "https://n5eil01u.ecs.nsidc.org/MOST/MOD10A1.061/2006.06.24/BROWSE.MOD10A1.A2006175.h00v08.061.2020265050446.1.jpg"

      // this.chinaProvinceLayer = (
      //     <GeoJSON
      //       // pennsylvaniaBoundaries highAsiaBoundaries
      //           data={ChinaProvince}
      //           style={{ fill: false, color: '#FF5733' }}
      //     />
      // );
      let chinaProvince = require("../static/resource/ChinaProvince.json")
      let bounder = require("../static/resource/highAsiaBoundaries.json")
      let chinaCity = require("../static/resource/CN_city.geojson")
      var provinceStyle = { fill: false, color: '#FF5733' }
      var bounderStyle = { fill: false, color: '#1E90FF' }
      var cityStyle = { fill: true, color: '#0000FF' }

      this.drawLayerGroup = new L.FeatureGroup();
      var drawControl = new L.Control.Draw({
        position: "topright",
        draw: {
          circle: false,
          polyline: false,
          circlemarker: false,
          polygon: {
            showArea: true,
            showLength: true,
            metric: ['km']
          },
          rectangle: {
            shapeOptions: true,
            showRadius: true
          },
        },
        edit: {
          featureGroup: this.drawLayerGroup,
          poly : {
              allowIntersection : false
          }
        },
      });
      this.map.addControl(drawControl);
      this.drawLayerGroup.addTo(this.map);
      this.map.on(L.Draw.Event.CREATED, this.drawCreatedBack);

      this.chinaProvinceLayer = L.geoJSON(chinaProvince, provinceStyle)
      this.chinaCityLayer = L.geoJSON(chinaCity, {
        style: cityStyle,
        onEachFeature: this.onEachFeatureOfCNCityLayer
      })
      this.bounderLayer = L.geoJSON(bounder, bounderStyle)


      let mbAttr = "Tibet-Qinghai Plateau CloudFree";
      let tileApiUrl = "http://127.0.0.1:9000/tiles/{d}/{z}/{x}/{y}";
      this.overlayMap =  L.layerGroup();
      let SCALayer =  L.tileLayer(tileApiUrl, {attribution: mbAttr, maxZoom: 7});
      this.SCATimeLayer = L.timeDimension.layer.tileLayer.portus(SCALayer, {})
      this.bounderLayer.addTo(this.overlayMap);
      this.SCATimeLayer.addTo(this.overlayMap);
      this.overlayMap.addTo(this.map);
      this.overlays = {
        青藏高原积雪图: this.overlayMap,
        画板: this.drawLayerGroup,
        中国地图: this.chinaProvinceLayer,
        中国城市: this.chinaCityLayer
        // 全球疫情图: this.globalCovidLayer,
      };
      this.controlLayers = L.control.layers(this.baseLayers, this.overlays,{position: "topleft"}).addTo(this.map);
    },

    onEachFeatureOfGlobalLayer(feature, layer) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        // click: this.zoomToFeature,
      });

      layer.bindPopup(
        '<img style="height: 50px;" src=https://disease.sh/assets/img/flags/' +
        feature.properties.id.toLowerCase() +
        ".png alt=" +
        feature.properties.id + 
        "><div><strong>" + 
        feature.properties.COUNTRY + "</strong></div>"+ 
        "<li>国家人口: " +
        feature.properties.population +
        "</li>"
      );
    
    },

    onEachFeatureOfCNCityLayer(feature, layer) {
      layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        // click: this.zoomToFeature,
      });
      layer.bindPopup(
        "<div><strong>" + feature.properties.NAME + "</strong></div>" 
      + "<div><strong>" + L.GeometryUtil.geodesicArea(layer.getLatLngs()) + "</strong></div>"
      );
    },

    highlightFeature(e) {
      let layer = e.target;
      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },

    resetHighlight(e) {
      this.globalVaccineLayer.resetStyle(e.target);
    },

    zoomToFeature(e) {
      this.map.fitBounds(e.target.getBounds());
    },
  },
}
</script>

<style scoped>
#map {
  margin: 0;
  width: 100%;
  height: 90%;
 
}
.leaflet-popup-content {
  display: block;
  width: 100% !important;
  height: auto !important;
}

.popup-window {
  width: 220px;
  height: 220px;
}

body.popup-middle .leaflet-popup  { min-width: 180px; max-width: 560px;}
</style>
