<template>
   <mars-button class="control_btn_xuan" @click="showPannel_xuan = !showPannel_xuan">{{ showPannel_xuan ? "显示筛选框" : "显示统计图表" }}</mars-button>

   
   <dv-border-box-1 v-show="!showPannel_xuan" class="sat-right">
    <div class="inside-right">
    <a-form-item label="绘制形状">
        <mars-select class="selectWidth" v-model:value="selectWay" :options="selectWayOptions"> 
        </mars-select>
      </a-form-item>

      <a-form-item label="火势监控">
    <div class="f-mb">
    <a-space>
      <div></div><div></div>
      <mars-button @click="drawPicture">开始绘制</mars-button>
      <div></div><div></div><div></div><div></div><div></div>
      <mars-button @click="drawClear">清除</mars-button>
    </a-space>
    </div>
    </a-form-item>
    <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">过境区域:</span>
          <mars-button @click="drawRectangle">框选</mars-button>
          <mars-button @click="drawCircle">圆形</mars-button>
          <mars-button @click="drawPolygon">多边形</mars-button>
          <mars-button @click="drawClear_look">清除</mars-button>
        </a-space>
      </div>

      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">开始时间:</span>
          <mars-date-picker v-model:value="startTime" format="YYYY-MM-DD HH:mm:ss" :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }" />
        </a-space>
      </div>
  
      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">结束时间:</span>
          <mars-date-picker v-model:value="endTime" format="YYYY-MM-DD HH:mm:ss" :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }" />
        </a-space>
      </div>
  
      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label"></span>
          <div></div><div></div><div></div>
          <mars-button @click="startFX">开始分析</mars-button>
          <div></div><div></div><div></div><div></div><div></div>
          <mars-button @click="clearResult">清除</mars-button>
        </a-space>
      </div>

      <mars-table size="small" :pagination="{ pageSize: 5 }" :columns="columns" :data-source="pathData">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
        </template>
      </mars-table>
    </div>
  </dv-border-box-1>

  <!-- 视频 面板  //data.mars3d.cn/file/video/lukou.mp4 http://localhost/mars3d-data/fire.mp4-->
  <div class="videoWrap" v-show="satelliteParams.openVideo == true">
    <div class="openPanel" v-show="satelliteParams.openPannel === true">
      <div class="closeAction" @click="closePannel">收缩&gt;</div>
      <video width="420" :muted="true" :autoplay="true">
        <source src="http://localhost/mars3d-data/fire_new.mp4" type="video/mp4" />
      </video>
    </div>
    <div v-show="satelliteParams.openPannel === false">
      <mars-button @click="openPanel">查看视频</mars-button>
    </div>
  </div>


<div class="fire_graph" v-show="satelliteParams.opengraph == true">
    <div class="openPanel" v-show="satelliteParams.opengraph_pannel === true">
      <div class="closeAction" @click="closegraph">收缩&gt;</div>
    <div class="chart">
      <div class="chartTwo" id="chartTwo">
        <h6>多级火势饼状图</h6>
        <div id="ul_ZJLY" class="chartTwo_ulzjly"></div>
      </div>
      <div class="chartThree" id="chartThree">
        <h6>火势柱状图和折线图</h6>
        <button @click="btnNDTJ_xms(chartsData.ndtj)">柱状图</button>
        <button @click="btnNDTJ_zds(chartsData.ndtj)">折线图</button>
        <div id="ul_NDTJ" class="chartThree_ulndtj"></div>
      </div>
    </div>
    </div>
</div>
<div class="test" v-show="satelliteParams.opengraph_pannel === false">
      <mars-button @click="opengraph">查看火势统计图</mars-button>
    </div>


<div class="click_back" v-show ="changeDiv_1">
  <mars-button @click="closeDiv_1">返回</mars-button>
</div>

<div class="click_back" v-show ="changeDiv_2">
  <mars-button @click="closeDiv_2">返回</mars-button>
</div>

<div class="click_back" v-show ="changeDiv_3">
  <mars-button @click="closeDiv_3">返回</mars-button>
</div>

<div class="click_back" v-show ="changeDiv_4">
  <mars-button @click="closeDiv_4">返回</mars-button>
</div>

<div class="click_back" v-show ="changeDiv_5">
  <mars-button @click="closeDiv_5">返回</mars-button>
</div>

<div class="click_back" v-show ="changeDiv_6">
  <mars-button @click="closeDiv_6">返回</mars-button>
</div>

<div class="click_back" v-show ="changeDiv_7">
  <mars-button @click="closeDiv_7">返回</mars-button>
</div>

<div class="click_back" v-show ="changeDiv_8">
  <mars-button @click="closeDiv_8">返回</mars-button>
</div>

<div class="click_back" v-show ="changeDiv_9">
  <mars-button @click="closeDiv_9">返回</mars-button>
</div>

    <div class="cli-left" v-show="changeDiv_1">
  <dv-border-box-8 class="information" >
  <table class="mars-table_information tb-border f-mt">
      <tr>
        <td class="nametd">可用卫星名称</td>
        <td id="td_name">{{ formState_1.name }}</td>
      </tr>
      <tr>
        <td class="nametd">搭载传感器</td>
        <td id="td_name">{{ formState_1.camera }}</td>
      </tr>
      <tr>
        <td class="nametd">空间分辨率</td>
        <td id="td_name">{{ formState_1.ratio }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState_1.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState_1.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState_1.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState_1.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState_1.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState_1.td_gd }}</td>
      </tr>
      <tr>
        <td class="nametd">用途</td>
        <td id="td_name">{{ formState_1.use }}</td>
      </tr>
    </table>
    </dv-border-box-8>
  </div>

  <div class="cli-left">
  <dv-border-box-8 class="information" v-show="changeDiv_2" >
  <table class="mars-table_information tb-border f-mt">
      <tr>
        <td class="nametd">可用卫星名称</td>
        <td id="td_name">{{ formState_2.name }}</td>
      </tr>
      <tr>
        <td class="nametd">搭载传感器</td>
        <td id="td_name">{{ formState_2.camera }}</td>
      </tr>
      <tr>
        <td class="nametd">空间分辨率</td>
        <td id="td_name">{{ formState_2.ratio }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState_2.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState_2.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState_2.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState_2.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState_2.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState_2.td_gd }}</td>
      </tr>
      <tr>
        <td class="nametd">用途</td>
        <td id="td_name">{{ formState_2.use }}</td>
      </tr>
    </table>
  </dv-border-box-8>
  </div>

  <div class="cli-left">
  <dv-border-box-8 class="information" v-show="changeDiv_3" >
  <table class="mars-table_information tb-border f-mt">
      <tr>
        <td class="nametd">可用卫星名称</td>
        <td id="td_name">{{ formState_3.name }}</td>
      </tr>
      <tr>
        <td class="nametd">搭载传感器</td>
        <td id="td_name">{{ formState_3.camera }}</td>
      </tr>
      <tr>
        <td class="nametd">空间分辨率</td>
        <td id="td_name">{{ formState_3.ratio }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState_3.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState_3.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState_3.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState_3.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState_3.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState_3.td_gd }}</td>
      </tr>
      <tr>
        <td class="nametd">用途</td>
        <td id="td_name">{{ formState_3.use }}</td>
      </tr>
    </table>
  </dv-border-box-8>
  </div>

  <div class="cli-left">
  <dv-border-box-8 class="information" v-show="changeDiv_4" >
  <table class="mars-table_information tb-border f-mt">
      <tr>
        <td class="nametd">可用卫星名称</td>
        <td id="td_name">{{ formState_4.name }}</td>
      </tr>
      <tr>
        <td class="nametd">搭载传感器</td>
        <td id="td_name">{{ formState_4.camera }}</td>
      </tr>
      <tr>
        <td class="nametd">空间分辨率</td>
        <td id="td_name">{{ formState_4.ratio }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState_4.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState_4.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState_4.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState_4.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState_4.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState_4.td_gd }}</td>
      </tr>
      <tr>
        <td class="nametd">用途</td>
        <td id="td_name">{{ formState_4.use }}</td>
      </tr>
    </table>
  </dv-border-box-8>
  </div>

    <div class="cli-left">
  <dv-border-box-8 class="information" v-show="changeDiv_5" >
  <table class="mars-table_information tb-border f-mt">
      <tr>
        <td class="nametd">可用卫星名称</td>
        <td id="td_name">{{ formState_5.name }}</td>
      </tr>
      <tr>
        <td class="nametd">搭载传感器</td>
        <td id="td_name">{{ formState_5.camera }}</td>
      </tr>
      <tr>
        <td class="nametd">空间分辨率</td>
        <td id="td_name">{{ formState_5.ratio }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState_5.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState_5.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState_5.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState_5.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState_5.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState_5.td_gd }}</td>
      </tr>
      <tr>
        <td class="nametd">用途</td>
        <td id="td_name">{{ formState_5.use }}</td>
      </tr>
    </table>
  </dv-border-box-8>
  </div>

    <div class="cli-left">
  <dv-border-box-8 class="information" v-show="changeDiv_6" >
  <table class="mars-table_information tb-border f-mt">
      <tr>
        <td class="nametd">可用卫星名称</td>
        <td id="td_name">{{ formState_6.name }}</td>
      </tr>
      <tr>
        <td class="nametd">搭载传感器</td>
        <td id="td_name">{{ formState_6.camera }}</td>
      </tr>
      <tr>
        <td class="nametd">空间分辨率</td>
        <td id="td_name">{{ formState_6.ratio }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState_6.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState_6.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState_6.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState_6.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState_6.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState_6.td_gd }}</td>
      </tr>
      <tr>
        <td class="nametd">用途</td>
        <td id="td_name">{{ formState_6.use }}</td>
      </tr>
    </table>
  </dv-border-box-8>
  </div>

    <div class="cli-left">
  <dv-border-box-8 class="information" v-show="changeDiv_7" >
  <table class="mars-table_information tb-border f-mt">
      <tr>
        <td class="nametd">可用卫星名称</td>
        <td id="td_name">{{ formState_7.name }}</td>
      </tr>
      <tr>
        <td class="nametd">搭载传感器</td>
        <td id="td_name">{{ formState_7.camera }}</td>
      </tr>
      <tr>
        <td class="nametd">空间分辨率</td>
        <td id="td_name">{{ formState_7.ratio }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState_7.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState_7.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState_7.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState_7.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState_7.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState_7.td_gd }}</td>
      </tr>
      <tr>
        <td class="nametd">用途</td>
        <td id="td_name">{{ formState_7.use }}</td>
      </tr>
    </table>
  </dv-border-box-8>
  </div>

    <div class="cli-left">
  <dv-border-box-8 class="information" v-show="changeDiv_8" >
  <table class="mars-table_information tb-border f-mt">
      <tr>
        <td class="nametd">可用卫星名称</td>
        <td id="td_name">{{ formState_8.name }}</td>
      </tr>
      <tr>
        <td class="nametd">搭载传感器</td>
        <td id="td_name">{{ formState_8.camera }}</td>
      </tr>
      <tr>
        <td class="nametd">空间分辨率</td>
        <td id="td_name">{{ formState_8.ratio }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState_8.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState_8.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState_8.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState_8.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState_8.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState_8.td_gd }}</td>
      </tr>
      <tr>
        <td class="nametd">用途</td>
        <td id="td_name">{{ formState_8.use }}</td>
      </tr>
    </table>
  </dv-border-box-8>
  </div>

    <div class="cli-left">
  <dv-border-box-8 class="information" v-show="changeDiv_9" >
  <table class="mars-table_information tb-border f-mt">
      <tr>
        <td class="nametd">可用卫星名称</td>
        <td id="td_name">{{ formState_9.name }}</td>
      </tr>
      <tr>
        <td class="nametd">搭载传感器</td>
        <td id="td_name">{{ formState_9.camera }}</td>
      </tr>
      <tr>
        <td class="nametd">空间分辨率</td>
        <td id="td_name">{{ formState_9.ratio }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState_9.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState_9.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState_9.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState_9.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState_9.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState_9.td_gd }}</td>
      </tr>
      <tr>
        <td class="nametd">用途</td>
        <td id="td_name">{{ formState_9.use }}</td>
      </tr>
    </table>
  </dv-border-box-8>
  </div>
    <!--<div class="information" v-show="changeDiv">
      <table class="mars-table_information tb-border f-mt">
        <tr>
        <td class="nametd">可用卫星名称</td>
        <td id="td_name">{{ formState.name }}</td>
      </tr>
    </table>
    </div>-->
  
    <div class="keyong" v-show="!changeDiv_1 && !changeDiv_2 && !changeDiv_3 && !changeDiv_4 && !changeDiv_5 && !changeDiv_6 && !changeDiv_7 && !changeDiv_8 && !changeDiv_9">
    <mars-table size="small" :pagination="{ pageSize: 8 }" :columns="columns_keyong" :data-source="pathData_keyong" >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a @click="change(text)">{{ text }}</a>
          </template>
        </template>
      </mars-table>
 </div>

 <mars-echarts-example :visible="showPannel_xuan"></mars-echarts-example>

 <div class="nav-dec-1" >
    <dv-decoration-10 style="width:100%;height:10px;" />
 </div>

 <div class="nav-dec-2">
    <dv-decoration-10 style="width:100%;height:10px;" />
 </div>

 <div class="nav-dec-3">
    <dv-decoration8 style="width:300px;height:50px;" />
  </div>

  <div class="nav-dec-4">
    <dv-decoration8 :reverse="true" style="width:300px;height:50px;" />
  </div>

</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue"
import * as mapWork from "./map.js"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import MarsEchartsExample from "./mars-echartsExample.vue"
import dayjs, { Dayjs } from "dayjs"
import type { UnwrapRef } from "vue"
import * as echarts from "echarts"

let ZJLY: HTMLElement
const NDTJ = ref()

const showPannel_xuan = ref(true)
const changeDiv_1 = ref(false)
const changeDiv_2 = ref(false)
const changeDiv_3 = ref(false)
const changeDiv_4 = ref(false)
const changeDiv_5 = ref(false)
const changeDiv_6 = ref(false)
const changeDiv_7 = ref(false)
const changeDiv_8 = ref(false)
const changeDiv_9 = ref(false)

const change = (data:any) => {
  console.log(data)
 if (data === "CBERS-1 中巴资源卫星") {
  changeDiv_1.value = true
  mapWork.click_sat_1()
 } else if (data === "法国SPOT卫星") {
 changeDiv_2.value = true 
 mapWork.click_sat_2()
} else if (data === "日本JERS-1卫星") {
 changeDiv_3.value = true 
 mapWork.click_sat_3()
} else if (data === "中国吉林一号光学A星") {
 changeDiv_4.value = true 
 mapWork.click_sat_4()
} else if (data === "加拿大RADARSAT-1卫星") {
 changeDiv_5.value = true 
 mapWork.click_sat_5()
} else if (data === "美国陆地卫星八号") {
 changeDiv_6.value = true 
 mapWork.click_sat_6()
} else if (data === "美国陆地卫星七号") {
 changeDiv_7.value = true 
 mapWork.click_sat_7()
} else if (data === "中分辨率成像光谱仪") {
 changeDiv_8.value = true 
 mapWork.click_sat_8()
} else if (data === "中国天绘一号") {
 changeDiv_9.value = true 
 mapWork.click_sat_9()
}
}

const closeDiv_1 = () => {
  changeDiv_1.value = false
}
const closeDiv_2 = () => {
  changeDiv_2.value = false
}
const closeDiv_3 = () => {
  changeDiv_3.value = false
}
const closeDiv_4 = () => {
  changeDiv_4.value = false
}
const closeDiv_5 = () => {
  changeDiv_5.value = false
}
const closeDiv_6 = () => {
  changeDiv_6.value = false
}
const closeDiv_7 = () => {
  changeDiv_7.value = false
}
const closeDiv_8 = () => {
  changeDiv_8.value = false
}
const closeDiv_9 = () => {
  changeDiv_9.value = false
}

interface FormState {
  enabledShowMatrix: boolean // 参考轴系
  name: string
  camera: string
  ratio: string
  tle1: string
  tle2: string
  time: string
  td_jd: number
  td_wd: number
  td_gd: number
  use: string
}

const formState_1: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  name: "",
  camera: "",
  ratio: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  use: ""
})

const formState_2: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  name: "",
  camera: "",
  ratio: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  use: ""
})

const formState_3: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  name: "",
  camera: "",
  ratio: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  use: ""
})

const formState_4: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  name: "",
  camera: "",
  ratio: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  use: ""
})

const formState_5: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  name: "",
  camera: "",
  ratio: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  use: ""
})

const formState_6: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  name: "",
  camera: "",
  ratio: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  use: ""
})

const formState_7: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  name: "",
  camera: "",
  ratio: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  use: ""
})

const formState_8: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  name: "",
  camera: "",
  ratio: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  use: ""
})

const formState_9: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  name: "",
  camera: "",
  ratio: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  use: ""
})

mapWork.eventTarget.on("satelliteChange", (e: any) => {
  // const nowData = e.weixinData
  const nowData_1 = e.detailData[0]
  formState_1.name = nowData_1.name
  formState_1.camera = nowData_1.camera
  formState_1.ratio = nowData_1.ratio
  formState_1.tle1 = nowData_1.tle1
  formState_1.tle2 = nowData_1.tle2
  formState_1.time = nowData_1.time
  formState_1.td_jd = nowData_1.td_jd
  formState_1.td_wd = nowData_1.td_wd
  formState_1.td_gd = nowData_1.td_gd
  formState_1.use = nowData_1.use

   const nowData_2 = e.detailData[1]
   formState_2.name = nowData_2.name
   formState_2.camera = nowData_2.camera
   formState_2.ratio = nowData_2.ratio
   formState_2.tle1 = nowData_2.tle1
   formState_2.tle2 = nowData_2.tle2
   formState_2.time = nowData_2.time
   formState_2.td_jd = nowData_2.td_jd
   formState_2.td_wd = nowData_2.td_wd
   formState_2.td_gd = nowData_2.td_gd
   formState_2.use = nowData_2.use

   const nowData_3 = e.detailData[2]
   formState_3.name = nowData_3.name
   formState_3.camera = nowData_3.camera
   formState_3.ratio = nowData_3.ratio
   formState_3.tle1 = nowData_3.tle1
   formState_3.tle2 = nowData_3.tle2
   formState_3.time = nowData_3.time
   formState_3.td_jd = nowData_3.td_jd
   formState_3.td_wd = nowData_3.td_wd
   formState_3.td_gd = nowData_3.td_gd
   formState_3.use = nowData_3.use

   const nowData_4 = e.detailData[3]
   formState_4.name = nowData_4.name
   formState_4.camera = nowData_4.camera
   formState_4.ratio = nowData_4.ratio
   formState_4.tle1 = nowData_4.tle1
   formState_4.tle2 = nowData_4.tle2
   formState_4.time = nowData_4.time
   formState_4.td_jd = nowData_4.td_jd
   formState_4.td_wd = nowData_4.td_wd
   formState_4.td_gd = nowData_4.td_gd
   formState_4.use = nowData_4.use

   const nowData_5 = e.detailData[4]
   formState_5.name = nowData_5.name
   formState_5.camera = nowData_5.camera
   formState_5.ratio = nowData_5.ratio
   formState_5.tle1 = nowData_5.tle1
   formState_5.tle2 = nowData_5.tle2
   formState_5.time = nowData_5.time
   formState_5.td_jd = nowData_5.td_jd
   formState_5.td_wd = nowData_5.td_wd
   formState_5.td_gd = nowData_5.td_gd
   formState_5.use = nowData_5.use

   const nowData_6 = e.detailData[5]
   formState_6.name = nowData_6.name
   formState_6.camera = nowData_6.camera
   formState_6.ratio = nowData_6.ratio
   formState_6.tle1 = nowData_6.tle1
   formState_6.tle2 = nowData_6.tle2
   formState_6.time = nowData_6.time
   formState_6.td_jd = nowData_6.td_jd
   formState_6.td_wd = nowData_6.td_wd
   formState_6.td_gd = nowData_6.td_gd
   formState_6.use = nowData_6.use

   const nowData_7 = e.detailData[6]
   formState_7.name = nowData_7.name
   formState_7.camera = nowData_7.camera
   formState_7.ratio = nowData_7.ratio
   formState_7.tle1 = nowData_7.tle1
   formState_7.tle2 = nowData_7.tle2
   formState_7.time = nowData_7.time
   formState_7.td_jd = nowData_7.td_jd
   formState_7.td_wd = nowData_7.td_wd
   formState_7.td_gd = nowData_7.td_gd
   formState_7.use = nowData_7.use

   const nowData_8 = e.detailData[7]
   formState_8.name = nowData_8.name
   formState_8.camera = nowData_8.camera
   formState_8.ratio = nowData_8.ratio
   formState_8.tle1 = nowData_8.tle1
   formState_8.tle2 = nowData_8.tle2
   formState_8.time = nowData_8.time
   formState_8.td_jd = nowData_8.td_jd
   formState_8.td_wd = nowData_8.td_wd
   formState_8.td_gd = nowData_8.td_gd
   formState_8.use = nowData_8.use

   const nowData_9 = e.detailData[16]
   formState_9.name = nowData_9.name
   formState_9.camera = nowData_9.camera
   formState_9.ratio = nowData_9.ratio
   formState_9.tle1 = nowData_9.tle1
   formState_9.tle2 = nowData_9.tle2
   formState_9.time = nowData_9.time
   formState_9.td_jd = nowData_9.td_jd
   formState_9.td_wd = nowData_9.td_wd
   formState_9.td_gd = nowData_9.td_gd
   formState_9.use = nowData_9.use
})


interface Satellite {
  openVideo: boolean
  openPannel: boolean
  opengraph: boolean
  opengraph_pannel: boolean
}
const satelliteParams = reactive<Satellite>({
  openVideo: false,
  openPannel: true,
  opengraph: false,
  opengraph_pannel: true
})

mapWork.eventTarget.on("video", (item: any) => {
  satelliteParams.openVideo = item.openVideo
  satelliteParams.opengraph = item.openVideo
})

const selectWay = ref("rectangle")
  // 下拉菜单
  const selectWayOptions = ref([
    {
       // 绘制矩形
      value: "rectangle",
      label: "矩形"
    },
    {
      // 绘制圆形
      value: "circle",
      label: "圆形"
    },
    {
      // 绘制多边形
      value: "polygon",
      label: "多边形"
    }
  ])

// 启用map.ts生命周期
useLifecycle(mapWork)

 onMounted(() => {
  ZJLY = document.getElementById("ul_ZJLY")
  NDTJ.value = document.getElementById("ul_NDTJ")
  // 饼状图
  initCharts_Two(chartsData.zjly, ZJLY)
  // 柱状图和折线图
  initCharts_Three(chartsData.ndtj)
 })

  const drawPicture = () => {
    if (selectWay.value === "rectangle") {
      mapWork.drawRectangle()
    } else if (selectWay.value === "circle") {
      mapWork.drawCircle()
    } else if (selectWay.value === "polygon") {
      mapWork.drawPolygon()
    }
  }

// 清除
const drawClear = () => {
  mapWork.drawClear()
  satelliteParams.openVideo = false
}

// 视屏面板的控制
const openPanel = () => {
  satelliteParams.openPannel = true
}
const opengraph = () => {
  satelliteParams.opengraph = true
  satelliteParams.opengraph_pannel = true
}
const closePannel = () => {
  satelliteParams.openPannel = false
}
const closegraph = () => {
  satelliteParams.opengraph = false
  satelliteParams.opengraph_pannel = false
}

const columns = [
    {
      title: "卫星名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "进入时间",
      dataIndex: "inTime",
      key: "inTime"
    },
    {
      title: "飞出时间",
      dataIndex: "outTime",
      key: "outTime"
    },
    {
      title: "飞行时长",
      dataIndex: "often",
      key: "often"
    },
    {
      title: "飞行距离",
      dataIndex: "distance",
      key: "distance"
    }
  ]

  const columns_keyong = [
    {
      title: "卫星名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "运行周期",
      dataIndex: "flytime",
      key: "flytime"
    },
    {
      title: "飞行经度",
      dataIndex: "longtitude",
      key: "longtitude"
    },
    {
      title: "飞行纬度",
      dataIndex: "altitude",
      key: "altitude"
    },
    {
      title: "飞行高程",
      dataIndex: "distance",
      key: "distance"
    }
  ]
  
  const startTime = ref<Dayjs>(dayjs())
  const endTime = ref<Dayjs>(dayjs().add(60, "minute"))
  const pathData = ref([])
  const pathData_keyong = ref([])
  
  mapWork.eventTarget.on("dataList", (e: any) => {
    pathData.value = e.tableList
    pathData_keyong.value = e.tableList_keyong

  })

  // mapWork.eventTarget.on(" satelliteChange", (e: any) => {
    // pathData_keyong.value = e.tableList_keyong
  // })

  // 框选查询 矩形
  const drawRectangle = () => {
    mapWork.drawRectangle()
  }
  // 框选查询   多边
  const drawPolygon = () => {
    mapWork.drawPolygon()
  }
  // 框选查询   圆
  const drawCircle = () => {
    mapWork.drawCircle()
  }
  
  const drawClear_look = () => {
    mapWork.drawClear()
  }
  
  const clearResult = () => {
    pathData.value = []
    mapWork.clearResult()
  }
  
  const startFX = () => {
    const startTimes = dayjs(startTime.value).valueOf()
    const endTimes = dayjs(endTime.value).valueOf()
    mapWork.startFX(startTimes, endTimes)
  }

  const chartsData = {
  zjly: [
    { name: "三级", value: 88 },
    { name: "二级", value: 127 },
    { name: "一级", value: 175 },
    { name: "已熄灭", value: 270 }
  ],
  ndtj: {
    xms: [
      { name: "三级", value: 88 },
      { name: "二级", value: 127 },
      { name: "一级", value: 175 },
      { name: "已熄灭", value: 270 }
    ],
    zds: [
      { name: "三级", value: 127 },
      { name: "二级", value: 175 },
      { name: "一级", value: 88 },
      { name: "已熄灭", value: 270 }
    ]
  }
}

// chartTwo  Echart饼状  火场面积
function initCharts_Two(arr: any, ZJLY: any) {
  const data = []
  for (let i = 0; i < arr.length; i++) {
    const object: any = {}
    object.name = arr[i].name
    object.value = arr[i].value
    data[i] = object
  }

  const myChart = echarts.init(ZJLY)
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}<br/>{c}"
    },
    // 图例 的相关设置
    legend: {
      orient: "vertical",
      left: "right",
      textStyle: {
        color: "#fff"
      }
    },
    // 图形的设置
    series: [
      {
        // name: '访问来源',
        type: "pie",
        radius: "80%",
        right: "20%",
        // 图形上文本标签的样式设置
        label: {
          show: false
        },
        // 设置色卡，每个扇形设施不同的颜色
        color: [
          "RGB(40,78,140)",
          "RGB(92,136,197)",
          "RGB(83,197,197)",
          "RGB(173,214,138)"
        ],
        center: ["45%", "55%"],
        data: data, // 使用for循环添加
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  }
  myChart.setOption(option)

  window.addEventListener("resize", function () {
    myChart.resize()
  })
}

// chartThree   Echart柱状和折线  火场面积
function initCharts_Three(arr: any) {
  histogram_xms(arr.xms, "公顷")
}
// 柱状和折线，按钮事件
function btnNDTJ_xms(arr: any) {
  histogram_xms(arr.xms, "公顷")
}
function btnNDTJ_zds(arr: any) {
  histogram_zds(arr.zds, "公顷")
}

// 柱状和折线    按钮点击切换
function histogram_xms(arr: any, Word: string) {
  const arrName = []
  const arrValue = []
  for (let i = 0; i < arr.length; i++) {
    arrName[i] = arr[i].name
    arrValue[i] = arr[i].value
  }

  const myChart = echarts.init(NDTJ.value)
  const option = {
    // xAxis和yAxis的nameTextStyle不起作用
    // 因此设置了字体的全局样式
    textStyle: {
      color: "#ccc"
    },
    title: {
      text: "单位:" + Word,
      // 全局样式对此不生效，
      textStyle: {
        color: "#fff"
      }
    },
    // 移入柱子时的阴影
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>{c}" + Word,
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      left: "5px",
      right: "0",
      bottom: "5px",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      axisLine: {
          show: true
        },
        axisLabel: {
          show: true,
          color: "#fff"
        },
      data: arrName
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        type: "bar",
        // 柱子的相关设置
        itemStyle: {
          borderRadius: [5, 5, 0, 0]
          // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          //   {
          //     offset: 0,
          //     color: "#4d68ee" // 0%处的颜色
          //   },
          //   {
          //     offset: 0.6,
          //     color: "#25b1f5" // 50%处的颜色
          //   },
          //   {
          //     offset: 1,
          //     color: "#01f5ff" // 100%处的颜色
          //   }
          // ])
        },
        barWidth: "40px",
        emphasis: {
          focus: "series"
        },
        data: [
          // 每种柱子设置不同的颜色
          {
            value: arrValue[0],
            itemStyle: {
              color: "RGB(40,78,140)"
            }
          }, 
          {
            value: arrValue[1],
            itemStyle: {
              color: "RGB(92,136,197)"
            }
          },
          {
            value: arrValue[2],
            itemStyle: {
              color: "RGB(83,197,197)"
            }
          },
          {
            value: arrValue[3],
            itemStyle: {
              color: "RGB(173,214,138)"
            }
          } 
        ]
      }
    ]

  }
  myChart.setOption(option)
  
  window.addEventListener("resize", function () {
    myChart.resize()
  })
}
function histogram_zds(arr: any, Word: string) {
  const arrName = []
  const arrValue = []
  for (let i = 0; i < arr.length; i++) {
    arrName[i] = arr[i].name
    arrValue[i] = arr[i].value
  }

  const myChart = echarts.init(NDTJ.value)
  const option = {
    textStyle: {
      color: "#ccc"
    },
    title: {
      text: "单位:" + Word,
      // 全局样式对此不生效，
      textStyle: {
        color: "#fff"
      }
    },
    // tooltip: {
    //   trigger: "axis",
    // },
    grid: {
      left: "5px",
      right: "0",
      bottom: "5px",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLine: {
          show: true
        },
        axisLabel: {
          show: true,
          color: "#fff"
        },
        data: arrName
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: "{value}",
          color: "#fff"
        }
      }
    ],
    series: [
      {
        type: "line",
        smooth: false,
        symbol: "none",
        sampling: "average",
        itemStyle: {
          normal: {
            color: "rgb(255, 70, 131)"
          }
        },
        areaStyle: {
          normal: {
            // 每个区域设置不同的颜色
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "RGB(40,78,140)"
              },
              {
                offset: 0.3,
                color: "RGB(92,136,197)"
              },
              {
                offset: 0.7,
                color: "RGB(83,197,197)"
              },
              {
                offset: 1,
                color: "RGB(173,214,138)"
              }
            ])
          }
        },
        data: arrValue
      }
    ]
  }
  myChart.setOption(option)
  
  window.addEventListener("resize", function () {
    myChart.resize()
  })
}

</script>

<style scoped lang="less">

.sat-right {
  position: absolute;
    width: 380px;
    top: 90px;
    right: 10px;
    padding: 4px 8px;
    background-color: rgba(19, 41, 60, 0.45);
    z-index: 9;
    border-radius: 15px;
    height: 550px;
}

.inside-right {
  position: absolute;
    width: 330px;
    top: 20px;
    left: 22px;
    padding: 10px 8px;
    border: 1px solid gray;
    z-index: 9;
    border-radius: 15px;
    background-color: rgba(21,67,46,0);
}

.cli-left {
  position: absolute;
    top: 10px;
    left: 10px;
    padding: 4px 8px;
    z-index: 9;
    border-radius: 15px;
    height: 440px;
    width: 420px;
}

.click_back {
  position: absolute;
  left: 25px;
  top: 555px;
}
.nav-dec-1 {
  position: absolute;
    width: 450px;
    top: 60px;
    left: 30px;
    padding: 10px 8px;
    z-index: 9;
    border-radius: 15px;
    background-color: rgba(21,67,46,0);
    display:inline-block;
    transform: rotate(180deg);
}

.nav-dec-2 {
  position: absolute;
    width: 450px;
    top: 60px;
    right: 1px;
    padding: 10px 8px;
    z-index: 9;
    border-radius: 15px;
    background-color: rgba(21,67,46,0);
    display:inline-block;
}

.nav-dec-3 {
  position: absolute;
    width: 450px;
    top: 10px;
    left: 30px;
    padding: 10px 8px;
    z-index: 9;
    border-radius: 15px;
    background-color: rgba(21,67,46,0);
    display:inline-block;
    transform: rotate(180deg);
}

.nav-dec-4 {
  position: absolute;
    width: 450px;
    top: 10px;
    right: 130px;
    padding: 10px 8px;
    z-index: 9;
    border-radius: 15px;
    background-color: rgba(21,67,46,0);
    display:inline-block;
    transform: rotate(180deg);
    
}

.videoWrap {
  position: absolute;
  bottom: 60px;
  left: 50px;
  padding: 4px 8px;
  border: 1px solid gray;
  background-color: #3f4854;
  z-index: 9;
}

th.column-money,
td.column-money {
  text-align: right !important;
}
.ant-slider {
  width: 110px;
}

.tb-border {
  border: 1px solid #4db3ff70;
}

.tb-border tr td  {
  border: 1px solid #4db3ff70;
}

.information {
  position: absolute;
  top: 100px;
  left: 10px;
  padding: 4px 8px;
  border: 1px solid gray;
  // background-color: #3f4854;
  background-color: rgba(19,41,60,0.45);
  z-index: 9;
  // opacity: 0.9;
}

.test {
  position: absolute;
  top: 60px;
  right: 10px;
  padding: 4px 8px;
  border: 1px solid gray;
  background-color: #3f4854;
  z-index: 9;
  opacity: 0.7;
}

.keyong {
    position: absolute;
    top: 100px;
    left: 10px;
    padding: 4px 8px;
    border: 1px solid gray;
    background-color: #3f4854;
    z-index: 9;
    opacity: 0.7;
  }

.mars-table_information {
  width: 400px;
  border-collapse: collapse;
  border-spacing: 0;
}

.mars-table_thread {
  width: auto;
  border-collapse: collapse;
  border-spacing: 0;
}

.mars-table_information .nametd {
  padding: 2.5px 10px 2.5px 5px;
}

.mars-table_information tr td {
  padding: 2.5px 5px;
  text-align: left;
}

.mars-table_information tr td:first-child {
  border-left: none;
}

.tb-border {
  border: 1px solid #4db3ff70;
}

.mars-table .nametd {
  padding: 5px 20px 5px 10px;
}

.closeAction {
  position: absolute;
  top: -25px;
  left: 0;
  background-color: #3f4854;
  padding: 2px 6px;
  cursor: pointer;
}

.closeAction:after {
  content: "";
  position: absolute;
  right: -28px;
  top: 0;
  border-left: 14px solid #3f4854;
  border-right: 14px solid transparent;
  border-bottom: 14px solid #3f4854;
  border-top: 14px solid transparent;
}

.videoWrap .title {
  margin-bottom: 8px;
}

/* 视频的收缩展开状态 */
.videoWrap .openPanel {
  display: block;
}

.videoWrap .closePanel {
  display: block;
  cursor: pointer;
  display: none;
}

.selectWidth {
    width: 210px;
  }

  .control_btn_xuan {
  position: absolute;
  right: 30px;
  top: 10px;
}

.fire_graph {
  position: absolute;
  top: 80px;
  right: 10px;
  width: 415px;
  height: 680px;
  padding: 4px 8px;
  border: 1px solid gray;
  background-color: #3f4854;
  z-index: 9;
  opacity: 0.95;
}

.chart {
  position: absolute;
  right: 10px;
  top: 40px;
  height: 650px;
  font-size: 15px;
  border: none;
  color: #ffffff;
  background: none;
}
.chartTwo,
.chartThree {
  width: 393px;
  height: 260px;
  margin-bottom: 6px;
  position: relative;
  border: 1px solid #17366c;
  background: linear-gradient(to left, #3897cf, #3897cf) left top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left top no-repeat,
    linear-gradient(to left, #3897cf, #3897cf) right top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) right top no-repeat,
    linear-gradient(to left, #3897cf, #3897cf) left bottom no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left bottom no-repeat,
    linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat, linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat;
  background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
  background-color: rgba(0, 0, 0, 0.1);
  h6 {
    color: #ffffff;
  }

  button {
    padding: 2px 6px;
  }
}
.chart h6 {
  padding: 4px;
  width: 10px;
  margin-left: 5%;
  float: left;
  margin-top: 3%;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
}
.chartTwo h6::before {
  position: absolute;
  top: 10px;
  left: 6%;
  width: 20px;
  height: 2px;
  background: red;
  content: " ";
}
.chartThree h6::before {
  position: absolute;
  top: 10px;
  left: 6%;
  width: 20px;
  height: 2px;
  background: red;
  content: " ";
}

/*chartTwo ul_ZJLY */
.chartTwo_ulzjly,
.chartThree_ulndtj {
  width: 331px;
  height: 234px;
  position: absolute;
  left: 13%;
  bottom: 5px;
}

/* chartThree ul_NDTJ */
.chartThree button {
  background: none;
  border: 0.06px solid rgb(0, 174, 255);
  z-index: 1000;
  font-size: 1rem;
}
.chartThree button:nth-child(2) {
  position: absolute;
  top: 25px;
  right: 100px;
}
.chartThree button:nth-child(3) {
  position: absolute;
  top: 25px;
  right: 30px;
}

.chartThree button:active {
  background-color: rgb(19, 166, 224);
}
.chartThree button:visited {
  background-color: rgb(19, 166, 224);
}

</style>
