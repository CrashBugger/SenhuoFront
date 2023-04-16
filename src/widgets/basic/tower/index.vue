<template>

<mars-dialog :visible="!zuobiao" title="坐标拾取" width="366" top="60" right="10" :min-width="357">
    <template #icon>
      <mars-icon icon="local" width="18" />
    </template>
    <div class="position-container">
      <a-form>
        <mars-gui ref="marsGuiRef" :options="options" labelCol="5"></mars-gui>
      </a-form>
      <div class="f-pt f-tac">
        <a-space>
          <mars-button @click="bindMourseClick">图上拾取</mars-button>
          <mars-button @click="submitCenter">坐标定位</mars-button>
          <mars-button @click="stop_zuobiao">隐藏</mars-button>
        </a-space>
      </div>
    </div>
  </mars-dialog>

  <dv-border-box-1 class="testbox1">
    <div class="insidemars">
    <a-form-item label="任意拾取火灾区域坐标点">
   <a-space>
      <mars-button @click="start_zuobiao">弹出</mars-button>
      <mars-button @click="stop_zuobiao">隐藏</mars-button>
    </a-space>
    </a-form-item>
    <a-form-item label="搜索火区可用摄像机">
   <a-space>
      <mars-button @click="start_camera">开始</mars-button>
      <mars-button @click="stop_camera">隐藏</mars-button>
    </a-space>
    </a-form-item>

    <a-form-item label="火势范围旋转监视">
   <a-space>
      <mars-button @click="startRotate">开始</mars-button>
      <mars-button @click="stopRotate">停止</mars-button>
    </a-space>
    </a-form-item>

<a-space><div></div><div></div></a-space>
</div>
</dv-border-box-1>

    <dv-border-box-1 class="keyong" v-show="!changeDiv_1">
      <div class="keyong_nei">
  <mars-table size="small" :pagination="{ pageSize: 5 }" :columns="columns_keyong" :data-source="pathData_tw" >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a @click="change(text)">{{ text }}</a>
        </template>
      </template>
    </mars-table>
    </div>
</dv-border-box-1>

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
  import { ref, reactive } from "vue"
  import type { GuiItem } from "@mars/components/mars-ui/mars-gui"
  import { BorderBox1 as DvBorderBox1 } from "@kjgl77/datav-vue3"

  const changeDiv_1 = ref(true)
  const zuobiao = ref(true)
const marsGuiRef = ref()


const start_zuobiao = () => {
  zuobiao.value = false
 }

 const start_camera = () => {
  changeDiv_1.value = false
 }

 const stop_camera = () => {
  changeDiv_1.value = true
 }

// 坐标转换
const options: GuiItem[] = [
  {
    type: "radio",
    field: "type",
    label: "类型",
    value: "1",
    data: [
      {
        label: "十进制",
        value: "1"
      },
      {
        label: "度分秒",
        value: "2"
      },
      {
        label: "平面坐标",
        value: "3"
      }
    ]
  },
  {
    type: "input",
    field: "lng",
    label: "经度",
    value: "",
    show(data) {
      return data.type === "1"
    },
    change(value, data) {
      changeDmsGk(data)
    }
  },
  {
    type: "input",
    field: "lat",
    label: "纬度",
    value: "",
    show(data) {
      return data.type === "1"
    },
    change(value, data) {
      changeDmsGk(data)
    }
  },
  {
    type: "input",
    field: "alt",
    label: "高程",
    value: "",
    show(data) {
      return data.type === "1"
    },
    change(value, data) {
      changeDmsGk(data)
    }
  },
  {
    type: "inputGroup",
    field: "lngDMS",
    label: "经度",
    value: [0, 0, 0],
    units: ["度", "分", "秒"],
    show(data) {
      return data.type === "2"
    },
    change(value, data) {
      changeGk(data)
    }
  },
  {
    type: "inputGroup",
    field: "latDMS",
    label: "纬度",
    value: [0, 0, 0],
    units: ["度", "分", "秒"],
    show(data) {
      return data.type === "2"
    },
    change(value, data) {
      changeGk(data)
    }
  },
  {
    type: "input",
    field: "altDMS",
    label: "高程",
    value: "",
    show(data) {
      return data.type === "2"
    },
    change(value, data) {
      changeGk(data)
    }
  },
  {
    type: "radio",
    field: "radioFendai",
    label: "分带",
    value: "1",
    data: [
      {
        label: "三度带",
        value: "1"
      },
      {
        label: "六度带",
        value: "2"
      }
    ],
    change(value, data) {
      changeValue(data)
    },
    show(data) {
      return data.type === "3"
    }
  },
  {
    type: "input",
    field: "gk6X",
    label: "纵坐标",
    value: "",
    show(data) {
      return data.type === "3"
    },
    change(value, data) {
      changeDms(data)
    }
  },
  {
    type: "input",
    field: "gk6Y",
    label: "横坐标",
    value: "",
    show(data) {
      return data.type === "3"
    },
    change(value, data) {
      changeDms(data)
    }
  },
  {
    type: "input",
    field: "gkAlt",
    label: "高度值",
    value: "",
    show(data) {
      return data.type === "3"
    },
    change(value, data) {
      changeDms(data)
    }
  }
]

// 十进制转2000平面三分度六分度
const changeValue = (data) => {
  marsZONEtoCRS(data)
  marsProj4Trans(data)
}

// 界面一
const changeDmsGk = (data) => {
  marsPointTrans(data)

  marsProj4Trans(data)
}

// 界面二
const changeGk = (data) => {
  marsGuiRef.value.updateField(
    "lng",
    mapWork.marsDms2degree(
      mapWork.marsUtilFormtNum(data.lngDMS[0], 6),
      mapWork.marsUtilFormtNum(data.lngDMS[1], 6),
      mapWork.marsUtilFormtNum(data.lngDMS[2], 6)
    )
  )
  marsGuiRef.value.updateField(
    "lat",
    mapWork.marsDms2degree(
      mapWork.marsUtilFormtNum(data.latDMS[0], 6),
      mapWork.marsUtilFormtNum(data.latDMS[1], 6),
      mapWork.marsUtilFormtNum(data.latDMS[2], 6)
    )
  )
  marsGuiRef.value.updateField("alt", data.altDMS)

  marsProj4Trans(data)
}

// 界面三
const changeDms = (data) => {
  marsZONEtoCRS(data)
  marsPointTrans(data)
}

const bindMourseClick = () => {
  mapWork.bindMourseClick()
}

// 图上拾取的坐标
mapWork.eventTarget.on("clickMap", (event: any) => {
  const data = reactive({
    lng: event.point.lng,
    lat: event.point.lat,
    alt: event.point.alt
  })

  marsUpdataPosition(data)
  marsPointTrans(data)
  marsProj4Trans(data)
  // 更新面板
  mapWork.updateMarker(false, data.lng, data.lat, data.alt)
})

// 更新度分秒
const marsUpdataPosition = (data) => {
  marsGuiRef.value.updateField("lng", mapWork.marsUtilFormtNum(data.lng, 6))
  marsGuiRef.value.updateField("lat", mapWork.marsUtilFormtNum(data.lat, 6))
  marsGuiRef.value.updateField("alt", mapWork.marsUtilFormtNum(data.alt, 6))
}

// 平面坐标转经纬度并更新
const marsZONEtoCRS = (data) => {
  const zone = mapWork.marsZONEtoCRS(Number(data.gk6X), Number(data.gk6Y), data.radioFendai)
  marsGuiRef.value.updateField("lng", mapWork.marsUtilFormtNum(zone[0], 6))
  marsGuiRef.value.updateField("lat", mapWork.marsUtilFormtNum(zone[1], 6))
  marsGuiRef.value.updateField("alt", data.gkAlt)
}

// 经纬度转平面坐标并更新
const marsProj4Trans = (data) => {
  const zone = mapWork.marsProj4Trans(
    mapWork.marsUtilFormtNum(data.lng, 6),
    mapWork.marsUtilFormtNum(data.lat, 6),
    marsGuiRef.value.getValue("radioFendai")
  )
  marsGuiRef.value.updateField("gk6X", mapWork.marsUtilFormtNum(zone[0], 1))
  marsGuiRef.value.updateField("gk6Y", mapWork.marsUtilFormtNum(zone[1], 1))
  marsGuiRef.value.updateField("gkAlt", mapWork.marsUtilFormtNum(data.alt, 6))
}

// 经纬度转度分秒并更新
const marsPointTrans = (data) => {
  const lngDMS = [mapWork.marsPointTrans(data.lng).degree, mapWork.marsPointTrans(data.lng).minute, mapWork.marsPointTrans(data.lng).second]
  const latDMS = [mapWork.marsPointTrans(data.lat).degree, mapWork.marsPointTrans(data.lat).minute, mapWork.marsPointTrans(data.lat).second]
  marsGuiRef.value.updateField("lngDMS", lngDMS)
  marsGuiRef.value.updateField("latDMS", latDMS)
  marsGuiRef.value.updateField("altDMS", mapWork.marsUtilFormtNum(data.alt, 6))
}

// 坐标定位
const submitCenter = () => {
  const data = marsGuiRef.value.getValues()
  mapWork.updateMarker(true, data.lng, data.lat, data.alt)
}

  // 启用map.ts生命周期
  useLifecycle(mapWork)

  const change = (data:any) => {
  console.log(data)
 if (data === "四角瞭望塔") {
  changeDiv_1.value = true
  mapWork.click_sat_1()
 } else if (data === "三柱圆钢防火瞭望塔") {
  changeDiv_1.value = true
 mapWork.click_sat_2()
} else if (data === "CFL钢避雷防火塔") {
  changeDiv_1.value = true
 mapWork.click_sat_3()
} else if (data === "三角避雷防火塔") {
  changeDiv_1.value = true
 mapWork.click_sat_4()
} 
}

  
const columns_keyong = [
  {
    title: "森林高塔名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "所处经度",
    dataIndex: "longtitude",
    key: "longtitude"
  },
  {
    title: "所处纬度",
    dataIndex: "altitude",
    key: "altitude"
  },
  {
    title: "装置摄像机类别",
    dataIndex: "camera_type",
    key: "camera_type"
  },
  {
    title: "摄像机成像波段",
    dataIndex: "camera_boduan",
    key: "camera_boduan"
  },
  {
    title: "成像分辨率",
    dataIndex: "camera_bian",
    key: "camera_bian"
  }
]

const pathData_tw = ref([])

mapWork.eventTarget.on("dataList", (e: any) => {
  pathData_tw.value = e.tableList_tw

})

const stop_zuobiao = () => {
   zuobiao.value = true
 }

 const startRotate = () => {
  mapWork.startRotate()
 }

 const stopRotate = () => {
   mapWork.stopRotate()
 }
</script>
 
<style lang="less">
.keyong {
  position: absolute;
  top: 100px;
  left: 10px;
  width: 850px;
  padding: 4px 8px;
  border: 1px solid gray;
  background-color: rgba(19,41,60,0.32);
  z-index: 9;
  border-radius: 15px;
  height: 280px;

}

.keyong_nei {
  position: absolute;
  top: 15px;
  left: 10px;
  width: 820px;
  padding: 4px 8px;
  z-index: 9;
  border-radius: 15px;
  height: 280px;

}

.testbox1 {
  position: absolute;
    width: 500px;
    top: 120px;
    right: 10px;
    padding: 4px 8px;
    border: 1px solid gray;
    background-color: rgba(19,41,60,0.32);
    z-index: 9;
    border-radius: 15px;
    height: 700px;
}

.insidemars {
  position: absolute;
    width: 450px;
    top: 30px;
    left: 22px;
    padding: 10px 8px;
    border: 1px solid gray;
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
</style>
