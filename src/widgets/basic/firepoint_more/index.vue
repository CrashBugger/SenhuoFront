<template>
  <dv-border-box-1 class="nav-right">
    <div class="inside-right">
      <a-form-item label="火势范围旋转监视">
     <a-space>
      <div></div><div></div><div></div><div></div><div></div><div></div>
        <mars-button @click="startRotate">开始</mars-button>
        <mars-button @click="stopRotate">停止</mars-button>
      </a-space>
      </a-form-item>

  <a-form-item label="查询目前飞行无人机信息">
     <a-space>
        <mars-button @click="start_look">查询</mars-button>
        <mars-button @click="stop_look">隐藏</mars-button>
      </a-space>
      </a-form-item>

      <a-space><div></div><div></div></a-space>
      <a-form-item label="操作对象">
        <mars-select class="selectWidth" v-model:value="selectWay" :options="selectWayOptions"> </mars-select>
      </a-form-item>
      <a-space>
        <mars-button @click="viewAircraft">跟踪视角</mars-button>
        <mars-button @click="viewTopDown">上方视角</mars-button>
        <mars-button @click="viewSide">侧方视角</mars-button>
      </a-space>
      <a-form-item ><a-space><div></div><div></div></a-space></a-form-item>
      <a-form-item label="多无人机电量图">
        <a-space>
          <div></div><div></div><div></div><div></div>
        <mars-button @click="change_show">显示</mars-button>
        <mars-button @click="change_stop">隐藏</mars-button>
      </a-space>
      </a-form-item>
  
      <a-form-item label="搜索最近官兵位置">
        <a-space>
          <div></div><div></div>
        <mars-button @click="change_show_fire">追踪</mars-button>
        <mars-button @click="change_stop_fire">隐藏</mars-button>
      </a-space>
      </a-form-item>

      <a-form-item label="获取无人机监测信息">
      <a-space>
        <div></div><div></div>
      <mars-button @click="change_show_sum">显示</mars-button>
      <mars-button @click="change_stop_sum">隐藏</mars-button>
    </a-space>
    </a-form-item>
  </div>
  </dv-border-box-1>
  
    <mars-dialog :visible="sum" title="火灾信息" width="380" top="30" bottom="50" left="55">
    <template #icon>
      <mars-icon icon="Fire" width="18" />
    </template>
    <!-- echarts图表 -->
    <div class="chart">
      <!-- 地形及地表植被 -->
      <div class="chartOne" id="chartOne">
        <div class="chartOne_text">
          <span class="firstBox text_dxjdbzb">地形及地表植被</span>
          <span class="firstBox text_icon">/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/</span>
        </div>

        <div class="container">
          <div class="vegetation main">
            <span class="columnar"></span>
            <span class="number">灌木</span>
            <p class="text-num">主要植被</p>
          </div>

          <div class="vegetation averageHeight">
            <span class="columnar"></span>
            <span class="number">170cm</span>
            <p class="text-num">植被平均高度</p>
          </div>

          <div class="vegetation areaCoverage">
            <span class="columnar"></span>
            <span class="number">90.0%</span>
            <p class="text-num">区域内植被覆盖度</p>
          </div>
        </div>

        <button @click="btnDXDB_hb(chartsData_sum.dxdb)">海拔</button>
        <button @click="btnDXDB_pd(chartsData_sum.dxdb)">坡度</button>
        <div id="ul_DXDB" class="chartOne_uldxdb"></div>
      </div>
      <!-- 天气 -->
      <div class="chartTwo" id="chartTwo">
        <div class="chartTwo_text">
          <span class="firstBox text_tq">天气</span>
          <span class="firstBox text_icon">/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/</span>
        </div>

        <div class="fengsu">
          <span>风速 5.8m/s</span>
        </div>

        <div class="shunshi">
          <span>瞬间极大风速 20.9m/s</span>
        </div>

        <div class="tianqi shidu">
          <span>湿度 13%-17%</span>
        </div>

        <div class="tianqi manyanzhibiao">
          <span>蔓延指标 73</span>
        </div>
        <div id="ul_TQ" class="chartTwo_ultq"></div>
      </div>
      <!-- 火灾面积 -->
      <div class="chartThree" id="chartThree">
        <div class="chartThree_text">
          <span class="firstBox text_hzmj">火灾面积</span>
          <span class="firstBox text_icon">/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/</span>
        </div>

        <div class="container">
          <div class="mianji keranwu">
            <span class="columnar"></span>
            <span class="number">15 t / ha</span>
            <p class="text-num">可燃物载量</p>
          </div>

          <div class="mianji reliang">
            <span class="columnar"></span>
            <span class="number">2*108 kj / ha</span>
            <p class="text-num">燃烧热量</p>
          </div>

          <div class="mianji yugusunshi">
            <span class="columnar"></span>
            <span class="number">1万亿元</span>
            <p class="text-num">预估经济损失</p>
          </div>
        </div>
        <div id="ul_HZMJ" class="chartThree_ulhzmj"></div>
      </div>
      <!-- 次生灾害 -->
      <div class="chartFour" id="chartFour">
        <div class="chartFour_text">
          <span class="firstBox text_cszh">次生灾害</span>
          <span class="firstBox text_icon">/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/</span>
        </div>
        <div id="ul_CSZH" class="chartFour_ulcszh"></div>
      </div>
    </div>
  </mars-dialog>

    <mars-dialog :visible="c_show" left="10" bottom="60" width="528">
      <div class="test">
        <a-form-item label="无人机群电量变化图/%">
        <div class="chart">
          <div class="chartOne" id="chartOne">
            <h6>无人机电量变化</h6>
          <div id="ul_HSCD" class="chartOne_ulhscd"></div>
        </div>
      </div>
    </a-form-item>
    </div>
  </mars-dialog>
  
  <dv-border-box-1 v-show="!sum" class="nav-left">
    <div class="inside-left">
    <mars-table size="small" :pagination="{ pageSize: 5 }" :columns="columns_keyong" :data-source="pathData_dj" >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a @click="change(text)">{{ text }}</a>
          </template>
        </template>
      </mars-table>
    </div>
</dv-border-box-1>
  
<div class="nav-right-down">
<dv-border-box-8 :visible="true">
  <div class="inside-right-down">
      <a-form>
        <a-row :gutter="[0, 8]">
          <a-col :span="12">多无人机火场搜索总长度:</a-col>
          <a-col :span="12">{{ formState.td_alllength }}</a-col>
  
          <a-col :span="12">已漫游长度:</a-col>
          <a-col :span="12">{{ formState.td_length }}</a-col>
  
          <a-col :span="12">总时长:</a-col>
          <a-col :span="12">{{ formState.td_alltimes }}</a-col>
  
          <a-col :span="12">已漫游时间:</a-col>
          <a-col :span="12">{{ formState.td_times }}</a-col>
  
          <a-col :span="12">途径经度:</a-col>
          <a-col :span="12">{{ formState.td_jd }}</a-col>
  
          <a-col :span="12">途径纬度:</a-col>
          <a-col :span="12">{{ formState.td_wd }}</a-col>
  
          <a-col :span="12">漫游高程:</a-col>
          <a-col :span="12">{{ formState.td_gd }}</a-col>
          <a-progress :percent="formState.percent" size="small" color="#fff" />
        </a-row>
      </a-form>
    </div>
    </dv-border-box-8>
  </div>

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
  import * as mapWork from "./map"
  import useLifecycle from "@mars/common/uses/use-lifecycle"
  import { ref, onMounted, reactive } from "vue"
  import * as echarts from "echarts"
  import type { UnwrapRef } from "vue"
  import { BorderBox1 as DvBorderBox1 } from "@kjgl77/datav-vue3"
  
  let c_show = ref(false)
let sum = ref(false)
let HSCD: HTMLElement
const DXDB = ref()
let TQ: HTMLElement
let HZMJ: HTMLElement
let CSZH: HTMLElement
  
  const change_show = () => {
    c_show.value = true
  }
  
  const change_show_fire = () => {
    mapWork.add_showfireman()
  }

  const change_show_sum = () => {
  sum.value = true
  changeDiv_1.value = true
}
  
  const change_stop = () => {
    c_show.value = false
  }
  
  const change_stop_fire = () => {
    mapWork.fire_Clear()
  }

  const change_stop_sum = () => {
  sum.value = false
  changeDiv_1.value = false
}
  
  const selectWay = ref("pathEntity0")
  const changeDiv_1 = ref(true)
  
  const change = (data:any) => {
  console.log(data)
  }
  
  const chartsData = {
    hscd: {
      first: [
      { name: "60s", value: 92 },
      { name: "120s", value: 78 },
      { name: "180s", value: 65 },
      { name: "240s", value: 43 },
      { name: "300s", value: 31 }
      ],
      second: [
      { name: "60s", value: 95 },
      { name: "120s", value: 80 },
      { name: "180s", value: 71 },
      { name: "240s", value: 50 },
      { name: "300s", value: 47 }
      ],
      third: [
      { name: "60s", value: 90 },
      { name: "120s", value: 79 },
      { name: "180s", value: 68 },
      { name: "240s", value: 52 },
      { name: "300s", value: 29 }
      ],
      forth: [
      { name: "60s", value: 95 },
      { name: "120s", value: 72 },
      { name: "180s", value: 63 },
      { name: "240s", value: 32 },
      { name: "300s", value: 11 }
      ],
      fifth: [
      { name: "60s", value: 90 },
      { name: "120s", value: 81 },
      { name: "180s", value: 65 },
      { name: "240s", value: 39 },
      { name: "300s", value: 17 }
      ]
    }
  }
  
  const columns_keyong = [
    {
      title: "无人机名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "现飞时间",
      dataIndex: "time",
      key: "time"
    },
    {
      title: "可飞行时间",
      dataIndex: "flytime",
      key: "flytime"
    },
    {
      title: "始飞经度",
      dataIndex: "longtitude",
      key: "longtitude"
    },
    {
      title: "始飞纬度",
      dataIndex: "altitude",
      key: "altitude"
    },
    {
      title: "始飞高度",
      dataIndex: "distance",
      key: "distance"
    }
  ]
  
  interface FormState {
    td_alllength: string
    td_length: string
    td_alltimes: string
    td_times: string
    td_jd: string
    td_wd: string
    td_gd: string
    percent: number
  }
  
  const formState: UnwrapRef<FormState> = reactive({
    td_alllength: "",
    td_length: "",
    td_alltimes: "",
    td_times: "",
    td_jd: "",
    td_wd: "",
    td_gd: "",
    percent: 0
  })
  
  onMounted(() => {
    mapWork.eventTarget.on("roamLineChange", (item: any) => {
      showInfo(item)
    })
    HSCD = document.getElementById("ul_HSCD")
    initCharts_One(chartsData.hscd, HSCD)

DXDB.value = document.getElementById("ul_DXDB")
TQ = document.getElementById("ul_TQ")
HZMJ = document.getElementById("ul_HZMJ")
CSZH = document.getElementById("ul_CSZH")
// 地形及地表植被
initCharts_One_sum(chartsData_sum.dxdb)
// 天气
initCharts_Two_sum(chartsData_sum.tq, "℃")
// 火灾面积
initCharts_Three_sum(chartsData_sum.hzmj, HZMJ)
// 次生灾害
initCharts_Four_sum(chartsData_sum.cszh, "千米")
  })
  
  function initCharts_One(arr: any, HSCD: any) {
    const arrName = []
    // const arrValue = new Array();
    for (let i = 0; i < arr.first.length; i++) {
      arrName[i] = arr.first[i].name
    }
    // for (let i = 0; i < 7; i++) {
    //   arrValue[i] = new Array(i);
    //   for (let j = 0; j < arr.first.length; j++) {
    //     arrValue[i][j] = arr.
    //   }
    // }
  
    const myChart = echarts.init(HSCD)
    const option = {
      // title: {
      //   text: "火势程度",
      //   textStyle: { color: "white", fontSize: "17", fontWidth: "normal" },
      //   top: "10",
      //   left: "5"
      // },
      // x轴
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: arrName // x轴坐标名称
      },
      // y轴
      yAxis: {
        type: "value"
      },
      // 提示框，鼠标悬浮交互时的信息提示
      tooltip: {
        show: true, // 是否显示
        trigger: "axis" 
      },
      legend: {
        data: ["精灵一号", "精灵二号", "精灵三号", "精灵四号", "精灵五号"],
        textStyle: {
          color: "#fff"
        }
      },
      grid: {
        left: "5px",
        right: "0",
        bottom: "5px",
        containLabel: true
      },
      series: [
        // 第一条折线图
        {
          name: "精灵一号", // 系列名称
          type: "line", // 类型：线
          data: [92, 78, 65, 54, 43, 31], // 数据
          smooth: false,
          symbol: "none",
          sampling: "average",
          itemStyle: {
            normal: {
              color: "rgb(255, 0, 0)"
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "RGB(40,78,140)"
                },
                {
                  offset: 1,
                  color: "rgb(0, 0, 0)"
                }
              ])
            }
          }
        },
        // 第二条折线
        {
          name: "精灵二号", // 系列名称
          type: "line", // 类型：线
          data: [95, 80, 71, 50, 47], // 数据
          smooth: false,
          symbol: "none",
          sampling: "average"
        },
        {
          name: "精灵三号", // 系列名称
          type: "line", // 类型：线
          data: [90, 79, 68, 52, 29], // 数据
          smooth: false,
          symbol: "none",
          sampling: "average"
        },
        {
          name: "精灵四号", // 系列名称
          type: "line", // 类型：线
          data: [95, 72, 63, 32, 11], // 数据
          smooth: false,
          symbol: "none",
          sampling: "average"
        },
        {
          name: "精灵五号", // 系列名称
          type: "line", // 类型：线
          data: [90, 81, 65, 39, 17], // 数据
          smooth: false,
          symbol: "none",
          sampling: "average"
        }
      ]
    }
    myChart.setOption(option)
    window.addEventListener("resize", function () {
      myChart.resize()
    })
  }
  
  function showInfo(item: any) {
    let val = Math.ceil((item.second * 100) / item.second_all)
    if (val < 1) {
      val = 1
    }
    if (val > 100) {
      val = 100
    }
    formState.percent = val
  
    formState.td_jd = item.point?.lng
    formState.td_wd = item.point?.lat
    formState.td_gd = mapWork.formatDistance(item.point?.alt)
    formState.td_times = mapWork.formatTime(item.second)
    formState.td_alltimes = mapWork.formatTime(item.second_all)
    formState.td_length = mapWork.formatDistance(item.distance) || "0米"
    formState.td_alllength = mapWork.formatDistance(item.distance_all)
  }
  
  const pathData_dj = ref([])
  
  mapWork.eventTarget.on("dataList", (e: any) => {
    pathData_dj.value = e.tableList_dj
  
  })
  
  // 下拉菜单
  const selectWayOptions = ref([
    {
      // 飞机1号
      value: "pathEntity0",
      label: "大疆精灵一号"
    },
    {
      // 飞机2号
      value: "pathEntity1",
      label: "大疆精灵二号"
    },
    {
      // 飞机3号
      value: "pathEntity2",
      label: "大疆精灵三号"
    }
  ])
  
  const viewAircraft = () => {
    if (selectWay.value === "pathEntity0") {
      mapWork.viewAircraft0()
    } else if (selectWay.value === "pathEntity1") {
      mapWork.viewAircraft1()
    } else if (selectWay.value === "pathEntity2") {
      mapWork.viewAircraft2()
    }
  }
  
  const viewTopDown = () => {
    if (selectWay.value === "pathEntity0") {
      mapWork.viewTopDown0()
    } else if (selectWay.value === "pathEntity1") {
      mapWork.viewTopDown1()
    } else if (selectWay.value === "pathEntity2") {
      mapWork.viewTopDown2()
    }
    
  }
  
  const viewSide = () => {
    if (selectWay.value === "pathEntity0") {
      mapWork.viewSide0()
    } else if (selectWay.value === "pathEntity1") {
      mapWork.viewSide1()
    } else if (selectWay.value === "pathEntity2") {
      mapWork.viewSide2()
    }
    
  }
  
  // 启用map.ts生命周期
  useLifecycle(mapWork)
    // 随机点
     const startRotate = () => {
    mapWork.startRotate()
   }

   // 出现左边无人机信息框
   const start_look = () => {
    changeDiv_1.value = false
   }
  // 清除
   const stopRotate = () => {
     mapWork.stopRotate()
   }

   // 隐藏左边无人机信息框
   const stop_look = () => {
    changeDiv_1.value = true
   }

   const chartsData_sum = {
  dxdb: {
    hb: [
    { name: "1", value: 1800 },
    { name: "2", value: 1700 },
    { name: "3", value: 2000 },
    { name: "4", value: 500 }
    ],
    pd: [
    { name: "1", value: 15 },
    { name: "2", value: 45 },
    { name: "3", value: 30 },
    { name: "4", value: 60 }
    ]
  },
  tq: [
    { name: "1", value: 17.8 },
    { name: "2", value: 18.5 },
    { name: "3", value: 16.0 },
    { name: "4", value: 17.6 }
  ],
  hzmj: [
    { name: "林地", value: 173.4248 },
    { name: "非林地", value: 125.1972 },
    { name: "预估受灾", value: 100 }
  ],
  cszh: [
    { name: "最近水源", value: 16 },
    { name: "最近公路", value: 12 },
    { name: "最近停机坪", value: 13 },
    { name: "重点防护目标距火场边缘", value: 30 }
  ]
}

// chartThree  Echart柱状  火灾面积
function initCharts_Three_sum(arr: any, HZMJ: any) {
  const arrName = []
  const arrValue = []
  for (let i = 0; i < arr.length; i++) {
    arrName[i] = arr[i].name
    arrValue[i] = arr[i].value
  }

  const myChart = echarts.init(HZMJ)
  const option = {
    // xAxis和yAxis的nameTextStyle不起作用
    // 因此设置了字体的全局样式
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      top: "30%",
      left: "3%",
      right: "4%",
      bottom: "-10%",
      containLabel: true
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.5],
      show: false
    },
    yAxis: {
      type: "category",
      data: arrName,
      axisLabel: {
        show: true,
        color: "#fff" // 坐标轴文字颜色
      },
      axisLine: {
        show: false
      }
    },
    series: [
      {
        type: "bar",
        label: {
          show: true,
          color: "#fff",
          fontSize: 10
        },
        data: arrValue,
        itemStyle: {
          borderRadius: [15, 15, 15, 15],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#4d68ee" // 0%处的颜色
            },
            {
              offset: 0.6,
              color: "#25b1f5" // 50%处的颜色
            },
            {
              offset: 1,
              color: "#01f5ff" // 100%处的颜色
            }
          ])
        }
      }
    ]
  }
  myChart.setOption(option)

  window.addEventListener("resize", function () {
    myChart.resize()
  })
}

// chartOne   Echart折线  地形及地表植被
function initCharts_One_sum(arr: any) {
  histogram_hb(arr.hb, "米")
}
// 海拔、坡度，按钮事件
function btnDXDB_hb(arr: any) {
  histogram_hb(arr.hb, "米")
}
function btnDXDB_pd(arr: any) {
  histogram_pd(arr.pd, "度")
}
function histogram_hb(arr: any, Word: string) {
  const arrName = []
  const arrValue = []
  for (let i = 0; i < arr.length; i++) {
    arrName[i] = arr[i].name
    arrValue[i] = arr[i].value
  }

  const myChart = echarts.init(DXDB.value)
  const option = {
    textStyle: {
      color: "#ccc"
    },
    title: {
      text: "单位:" + Word,
      textStyle: {
        color: "#fff"
      }
    },
    tooltip: {
      show: true,
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
        itemStyle: {
          borderRadius: [5, 5, 0, 0]
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
function histogram_pd(arr: any, Word: string) {
  const arrName = []
  const arrValue = []
  for (let i = 0; i < arr.length; i++) {
    arrName[i] = arr[i].name
    arrValue[i] = arr[i].value
  }

  const myChart = echarts.init(DXDB.value)
  const option = {
    textStyle: {
      color: "#ccc"
    },
    title: {
      text: "单位:" + Word,
      textStyle: {
        color: "#fff"
      }
    },
    tooltip: {
      show: true,
      trigger: "axis",
      formatter: "{b}<br/>{c}" + Word
    },
    grid: {
      left: "5px",
      right: "0",
      bottom: "5px",
      containLabel: true
    },
    xAxis: {
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
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
        color: "#fff"
      }
    },
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

// chartTwo   Echart折线  天气
function initCharts_Two_sum(arr: any, Word: string) {
  const arrName = []
  // const arrValue = new Array();
  for (let i = 0; i < arr.length; i++) {
    arrName[i] = arr[i].name
  }

  const myChart = echarts.init(TQ)
  const option = {
    textStyle: {
      color: "#ccc"
    },
    title: {
      text: "单位:" + Word,
      textStyle: {
        color: "#fff"
      }
    },
    tooltip: {
      show: true,
      trigger: "axis",
      formatter: "{b}<br/>{c}" + Word
    },
    // x轴
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: arrName // x轴坐标名称
    },
    // y轴
    yAxis: {
      type: "value"
    },
    legend: {
      data: ["日均温", "空气温度"],
      textStyle: {
        color: "#fff"
      }
    },
    grid: {
      left: "5px",
      right: "0",
      bottom: "5px",
      containLabel: true
    },
    series: [
      // 第一条折线
      {
        name: "1级", // 系列名称
        type: "line", // 类型：线
        data: [11, 22, 33, 44], // 数据
        smooth: false,
        symbol: "none",
        sampling: "average",
        itemStyle: {
          normal: {
            color: "rgb(0, 0, 0)"
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "RGB(40,78,140)"
              },
              {
                offset: 1,
                color: "rgb(0, 0, 0)"
              }
            ])
          }
        }
      },
      // 第二条折线
      {
        name: "2级", // 系列名称
        type: "line", // 类型：线
        data: [22, 33, 44, 55], // 数据
        smooth: false,
        symbol: "none",
        sampling: "average"
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener("resize", function () {
    myChart.resize()
  })
}

// chartFour   Echart柱状  次生灾害
function initCharts_Four_sum(arr: any, Word: string) {
  const arrName = []
  const arrValue = []
  for (let i = 0; i < arr.length; i++) {
    arrName[i] = arr[i].name
    arrValue[i] = arr[i].value
  }

  const myChart = echarts.init(CSZH)
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
  </script>
  
  <style lang="less">
  .selectWidth {
    width: 210px;
  }

  .nav-left {
  position: absolute;
  top: 100px;
  left: 10px;
  padding: 4px 8px;
  background-color: rgba(19,41,60,0.45);
  z-index: 9;
  border-radius: 15px;
  height: 300px;
  width:800px;

}

.inside-left {
  position: absolute;
  top: 15px;
  left: 10px;
  width: 750px;
  padding: 4px 8px;
  z-index: 9;
  border-radius: 15px;
  height: 280px;
}

.nav-right {
  position: absolute;
    width: 380px;
    top: 90px;
    right: 10px;
    padding: 4px 8px;
    border: 1px solid gray;
    background-color: rgba(19,41,60,0.45);
    z-index: 9;
    border-radius: 15px;
    height: 450px;
}

.nav-right-down {
  position: absolute;
    width: 380px;
    bottom: 55px;
    right: 10px;
    padding: 4px 8px;
    border: 1px solid gray;
    background-color: rgba(19,41,60,0.45);
    z-index: 9;
    border-radius: 15px;
    height: 300px;
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

.inside-right-down {
  position: absolute;
    width: 330px;
    top: 10px;
    left: 22px;
    padding: 10px 8px;
    z-index: 9;
    border-radius: 15px;
    background-color: rgba(21,67,46,0);
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
  
  :deep(.info-view) {
    width: 200px;
    top: auto !important;
    bottom: 60px;
    overflow-y: hidden;
    z-index: 0 !important;
  }
  
  :deep(.ant-progress-text) {
    color: #fff;
  }
  
  .chart_dian {
    position: absolute;
    right: 100px;
    top: 40px;
    height: 400px;
    width: 400px;
    font-size: 15px;
    border: none;
    color: #ffffff;
    background: none;
  }
  
  .chartOne_dian{
    width: 500px;
    height: 400px;
    margin-bottom: 3px;
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
  
  .chartOne_dian h6::before {
    position: absolute;
    top: 20px;
    left: 0px;
    width: 0px;
    height: 2px;
    background: red;
    content: " ";
  }
  
  .chartOne_dian_ulhscd {
    width: 500px;
    height: 342px;
    position: absolute;
    left: 0px;
    bottom: 5px;
  }
  
  .test {
    height: 430px;
    width: 528px;
  }
  
  .position-container {
    padding-top: 10px;
    margin-right: 5px;
  }
  :deep(.mars-input) {
    max-width: 192px;
  }
  
  /* 右侧统计图表 */
  .chart {
    height: calc(100% - 80px);
  }
  .chartOne {
    width: 350px;
    height: 54%;
    border: 1px solid rgb(11, 59, 75);
    margin-bottom: 1.066667rem;
    position: relative;
    background: linear-gradient(to left, #3897cf, #3897cf) left top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left top no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) right top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) right top no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) left bottom no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left bottom no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat, linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat;
    background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
    background-color: rgba(0, 0, 0, 0.3);
    h6 {
      color: #ffffff;
    }
    button {
      padding: 2px 6px;
    }
  }
  .chartTwo{
    width: 350px;
    height: 54%;
    border: 1px solid rgb(11, 59, 75);
    margin-bottom: 1.066667rem;
    position: relative;
    background: linear-gradient(to left, #3897cf, #3897cf) left top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left top no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) right top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) right top no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) left bottom no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left bottom no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat, linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat;
    background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .chartThree {
    width: 350px;
    height: 54%;
    border: 1px solid rgb(11, 59, 75);
    margin-bottom: 1.066667rem;
    position: relative;
    background: linear-gradient(to left, #3897cf, #3897cf) left top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left top no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) right top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) right top no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) left bottom no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left bottom no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat, linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat;
    background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .chartFour {
    width: 350px;
    height: 54%;
    border: 1px solid rgb(11, 59, 75);
    margin-bottom: 1.066667rem;
    position: relative;
    background: linear-gradient(to left, #3897cf, #3897cf) left top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left top no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) right top no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) right top no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) left bottom no-repeat, linear-gradient(to bottom, #3897cf, #3897cf) left bottom no-repeat,
      linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat, linear-gradient(to left, #3897cf, #3897cf) right bottom no-repeat;
    background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  .chartOne_text,
  .chartTwo_text,
  .chartThree_text,
  .chartFour_text {
    margin-top: 10px;
    padding-left: 3px;
    width: 100%;
    height: 20px;
  }
  .firstBox {
    margin-left: 10px;
  }
  .text_icon {
    font-weight: bold;
    color: rgb(6, 84, 123);
  }
  /* 地形及地表植被数据显示样式 */
  .vegetation {
    position: absolute;
    top: 7%;
    left: 0%;
    width: 90%;
    height: 75px;
  }
  .main {
    left: 4%;
  }
  .averageHeight {
    left: 28%;
  }
  .areaCoverage {
    left: 60%;
  }
  .columnar {
    float: left;
    display: block;
    margin-top: 15px;
    width: 8px;
    height: 60px;
    background-color: #0e6de9;
  }
  .averageHeight .columnar {
    background-color: #00af6d;
  }
  
  .areaCoverage .columnar {
    background-color: #b150d9;
  }
  .number {
    display: block;
    margin-left: 20px;
    margin-top: 10px;
    font-size: 25px;
    color: #1ae9f1;
    font-family: "UnidreamLED", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .text-num {
    display: block;
    position: absolute;
    left: 20px;
    bottom: 0;
  }
  /* 天气数据显示样式 */
  .fengsu {
    position: absolute;
    top: 10%;
    left: 7%;
    width: 100px;
    height: 40px;
    font-size: 10px;
    text-align: center;
    border: 1px solid rgb(43, 167, 244);
    color: rgb(43, 167, 244);
    background-color: rgba(21, 180, 192, 0.3);
    border-radius: 4px;
    padding: 5px;
    * {
      vertical-align: middle;
    }
    :deep(svg) {
      font-size: 25px;
      vertical-align: middle;
    }
  }
  .shunshi {
    position: absolute;
    top: 10%;
    left: 45%;
    width: 160px;
    height: 40px;
    font-size: 17px;
    border: 1px solid rgb(201, 25, 199);
    text-align: center;
    color: rgb(201, 25, 199);
    background-color: rgba(201, 25, 199, 0.3);
    border-radius: 4px;
    padding: 5px;
    * {
      vertical-align: middle;
    }
    :deep(svg) {
      font-size: 25px;
      vertical-align: middle;
    }
  }
  .shidu {
    position: absolute;
    top: 85%;
    left: 7%;
    width: 120px;
    height: 40px;
    font-size: 17px;
    border: 1px solid rgb(201, 25, 199);
    text-align: center;
    color: rgb(201, 25, 199);
    background-color: rgba(201, 25, 199, 0.3);
    border-radius: 4px;
    padding: 5px;
    * {
      vertical-align: middle;
    }
    :deep(svg) {
      font-size: 25px;
      vertical-align: middle;
    }
  }
  .manyanzhibiao {
    position: absolute;
    top: 85%;
    left: 50%;
    width: 100px;
    height: 40px;
    font-size: 10px;
    text-align: center;
    border: 1px solid rgb(43, 167, 244);
    color: rgb(43, 167, 244);
    background-color: rgba(21, 180, 192, 0.3);
    border-radius: 4px;
    padding: 5px;
    * {
      vertical-align: middle;
    }
    :deep(svg) {
      font-size: 25px;
      vertical-align: middle;
    }
  }
  /* 火灾面积数据显示样式 */
  .mianji {
    position: absolute;
    top: 75%;
    left: 3%;
    width: 50%;
    height: 75px;
  }
  .keranwu {
    left: 5%;
  }
  .reliang {
    left: 45%;
  }
  .yugusunshi {
    top: 10%;
    left: 45%;
  }
  .columnar {
    float: left;
    display: block;
    margin-top: 15px;
    width: 8px;
    height: 60px;
    background-color: #0e6de9;
  }
  .reliang .columnar {
    background-color: #00af6d;
  }
  
  .yugusunshi .columnar {
    background-color: #b150d9;
  }
  .number {
    display: block;
    margin-left: 20px;
    margin-top: 10px;
    font-size: 25px;
    color: #1ae9f1;
    font-family: "UnidreamLED", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .text-num {
    display: block;
    position: absolute;
    left: 20px;
    bottom: 0;
  }
  
  /* echarts 图表容器 */
  .chartOne_uldxdb {
    margin-top: 25%;
    width: 314px;
    height: 250px;
    position: absolute;
    left: 3%;
  }
  .chartTwo_ultq {
    margin-top: 49px;
    width: 314px;
    height: 250px;
    position: absolute;
    left: 3%;
  }
  .chartThree_ulhzmj {
    margin-top: 10px;
    width: 314px;
    height: 250px;
    position: absolute;
    left: 3%;
  }
  .chartFour_ulcszh {
    margin-top: 10%;
    width: 314px;
    height: 348px;
    position: absolute;
    left: 3%;
  }
  // 按钮
  .chartOne button {
    background: none;
    border: 0.06px solid rgb(0, 174, 255);
    z-index: 1000;
    font-size: 0.9rem;
  }
  .chartOne button:nth-child(3) {
    position: absolute;
    top: 31%;
    right: 20%;
  }
  .chartOne button:nth-child(4) {
    position: absolute;
    top: 31%;
    right: 10%;
  }
  .chartOne button:active {
    background-color: rgb(19, 166, 224);
  }
  .chartOne button:visited {
    background-color: rgb(19, 166, 224);
  }
  
  </style>
