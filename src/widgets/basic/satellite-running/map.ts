import * as mars3d from "mars3d"
import { Cesium } from "mars3d"

let map: mars3d.Map // mars3d.Map三维地图对象
let drawGraphic
let graphicLayer
let tleArr
let tableList = []
let allCount
let lastSelectWX
let tableList_keyong = []

interface duo_keyong {
  id: number,
  name: string, 
  tle1: string, 
  tle2: string, 
  camera: string, 
  ratio: string, 
  use: string, 
  time: string, 
  td_jd: number, 
  td_wd: number, 
  td_gd: string
}

let detailData :duo_keyong[] = []
const tle_arr = [
  "CBERS-1 中巴资源卫星",
  "1 33918U 93036DX  21197.87508339  .00001232  00000-0  17625-3 0  9990",
  "2 33918  74.0595 343.7064 0054912  74.2148  45.2906 14.76790626663155",
  "121.56分钟",
  "IRMSS多光谱扫描仪 WFI宽视场成像仪 CCD相机",
  "256米",
  "国土变化 自然资源、灾害监测 矿产开发",
  "法国SPOT卫星",
  "1 33919U 93036DY  21197.91197918  .00000904  00000-0  20362-3 0  9990",
  "2 33919  74.0505 161.6299 0033213 276.5546  83.1838 14.57578432657116",
  "100.465分钟",
  "HRG几何装置 HRV、HRVIR、HRS传感器",
  "B2 0.61 – 0.68μm上20米分辨率，全色 10米",
  "资源开发、监测 大气监测 植被保护",
  "日本JERS-1卫星",
  "1 33920U 93036DZ  21197.66738688  .00000502  00000-0  17722-3 0  9999",
  "2 33920  74.0698  46.6248 0055820 106.9911 253.7370 14.36347026649192",
  "96.146分钟",
  "OPS光学传感器 SAR合成孔径雷达 CCD相机",
  "方位方向18米，距离方向18米",
  "地球陆域观测 地学研究",
  "中国吉林一号光学A星",
  "1 33921U 93036EA  21197.38565197  .00009006  00000-0  82577-3 0  9990",
  "2 33921  74.0006 290.6759 0010303  43.2289 316.9701 14.94971510663519",
  "3.3天",
  "多光谱CCD图像传感器 HR WFI",
  "全色≤0.72米、多光谱≤2.88米",
  "智慧城市建设 交通设施监测 国土资源监测",
  "加拿大RADARSAT-1卫星",
  "1 33922U 93036EB  21197.56502581  .00000274  00000-0  89558-4 0  9994",
  "2 33922  74.0508 266.4243 0024779  54.6361  12.2512 14.42936298653573",
  "100.7分钟",
  "SAR合成孔径雷达系统",
  "精细>50米、标准>100米",
  "全球环境和土地利用、自然资源监测",
  "美国陆地卫星八号",
  "1 33924U 93036ED  21197.52273790  .00000077  00000-0  98248-4 0  9996",
  "2 33924  73.9172 330.8929 0412462 300.5791  55.5226 13.47506448610712",
  "98.9分钟",
  "多光谱扫描仪系统 Thematic Mapper仪器 OLI",
  "波段1-7,9-11≤30米，波段8≤15米，空间分辨率>100m",
  "植被分析 地球水域监测 大气监测 军事监测",
  "美国陆地卫星七号",
  "1 33928U 93036EH  21197.42931451  .00000092  00000-0  35017-4 0  9996",
  "2 33928  73.9247 191.2154 0063743 117.8632 242.9002 14.43123719653944",
  "98.9分钟",
  "PASC孔径太阳校准器 MSS、ETM+、OLI、TIRS传感器",
  "Blue-Green 30m、Green 30m、Red 30m、Near 30m、SWIR 30m、LWIR 60m",
  "植被分析 地球水域监测 大气监测 军事监测",
  "中分辨率成像光谱仪",
  "1 33929U 93036EJ  21198.19991980  .00001910  00000-0  36273-3 0  9999",
  "2 33929  74.0305 128.7466 0003289 114.3771 359.7968 14.64926844657886",
  "1~2天",
  "PASC孔径太阳校准器 MSS、ETM+、OLI、TIRS传感器",
  "250 m（波段1～2）；500 m（波段 3～7）；1000m（波段8～36）",
  "陆地和海洋温度、初级生产率、陆地表面覆盖、云、汽溶胶、水汽和火情等目标图像获取",
  "中国天绘一号",
  "1 33930U 93036EK  21198.38692156  .00000817  00000-0  22790-3 0  9999",
  "2 33930  74.0285 287.1899 0028219 336.8694  92.7860 14.47667592652647",
  "106.23分钟",
  "三线阵CCD相机 2米高分辨率全色相机 多光谱相机",
  "绝对定位精度优于15米 相对定位精度平面优于10米 高程优于6米",
  "智慧城市建设 交通设施监测 国土资源监测 资源开发、监测"
]


// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: -13.151771, lng: 55.60413, alt: 30233027, heading: 154, pitch: -89 },
    cameraController: {
      zoomFactor: 3.0,
      minimumZoomDistance: 1,
      maximumZoomDistance: 300000000,
      constrainedAxis: false // 解除在南北极区域鼠标操作限制
    },
    clock: {
      multiplier: 10 // 速度
    }
  },
  control: {
    clockAnimate: true, // 时钟动画控制(左下角)
    timeline: true, // 是否显示时间线控件
    compass: { top: "10px", left: "5px" }
  }
}
export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(this: any, mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map  map.toolbar.style.bottom = "55px"// 修改toolbar控件的样式

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  mars3d.Util.fetchJson({ url: "//data.mars3d.cn/file/apidemo/tle.json" })
    .then(function (arr) {
      initData(arr.list)
    })
    .catch(function () {
      globalMsg("获取空间目标轨道数据异常！")
    })

  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了卫星", event)
  })
  // graphicLayer.on(mars3d.EventType.change, function (event) {
  //   console.log("卫星位置变化", event)
  // })

  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    attr["类型"] = event.graphic.type
    attr["备注"] = "我支持鼠标交互"

    return mars3d.Util.getTemplateHtml({ title: "卫星图层", template: "all", attr: attr })
  })
 
  creatSatellite(tle_arr)
  creatSatellite(tle_arr)
  creatSatellite(tle_arr)
  creatSatellite(tle_arr)
  creatSatellite(tle_arr)
  creatSatellite(tle_arr)
  creatSatellite(tle_arr)
  creatSatellite(tle_arr)
  creatSatellite(tle_arr)

  queryTleChinaApiData()

  start_rotate()
  // startRotate()

  show_senhuo()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
 export function onUnmounted(): void {
 map = null
  graphicLayer.remove()
  graphicLayer = null
 }

export function start_rotate() {
  map.rotateAnimation({
    duration: 90,
    center: { lat: 26.520735, lng: 99.609792, alt: 23891502.7, heading: 93.3, pitch: -80.8, roll: 266.7 }
  })
}

export function show_senhuo() {
  map.scene.skyBox = new Cesium.SkyBox({
    sources: {
      negativeX: "img/skybox/6/tycho2t3_80_mx.jpg",
      negativeY: "img/skybox/6/tycho2t3_80_my.jpg",
      negativeZ: "img/skybox/6/tycho2t3_80_mz.jpg",
      positiveX: "img/skybox/6/tycho2t3_80_px.jpg",
      positiveY: "img/skybox/6/tycho2t3_80_py.jpg",
      positiveZ: "img/skybox/6/tycho2t3_80_pz.jpg"
    }
  })
}

export function click_sat_1 () {
  setTimeout(() => {
    const position = tableList_keyong[0].position
    if (position) {
      map.flyToPoint(position, {
        radius: 290000, // 距离目标点的距离
        pitch: -90,
        heading: 150 // 相机方向
      })
    }
  }, 3000)
}

export function click_sat_2 () {
  setTimeout(() => {
    const position = tableList_keyong[1].position
    if (position) {
      map.flyToPoint(position, {
        radius: 290000, // 距离目标点的距离
        pitch: -90,
        heading: 150 // 相机方向
      })
    }
  }, 3000)
}

export function click_sat_3 () {
  setTimeout(() => {
    const position = tableList_keyong[2].position
    if (position) {
      map.flyToPoint(position, {
        radius: 290000, // 距离目标点的距离
        pitch: -90,
        heading: 150 // 相机方向
      })
    }
  }, 3000)
}

export function click_sat_4 () {
  setTimeout(() => {
    const position = tableList_keyong[3].position
    if (position) {
      map.flyToPoint(position, {
        radius: 290000, // 距离目标点的距离
        pitch: -90,
        heading: 150 // 相机方向
      })
    }
  }, 3000)
}

export function click_sat_5 () {
  setTimeout(() => {
    const position = tableList_keyong[4].position
    if (position) {
      map.flyToPoint(position, {
        radius: 290000, // 距离目标点的距离
        pitch: -90,
        heading: 150 // 相机方向
      })
    }
  }, 3000)
}

export function click_sat_6 () {
  setTimeout(() => {
    const position = tableList_keyong[5].position
    if (position) {
      map.flyToPoint(position, {
        radius: 290000, // 距离目标点的距离
        pitch: -90,
        heading: 150 // 相机方向
      })
    }
  }, 3000)
}

export function click_sat_7 () {
  setTimeout(() => {
    const position = tableList_keyong[6].position
    if (position) {
      map.flyToPoint(position, {
        radius: 290000, // 距离目标点的距离
        pitch: -90,
        heading: 150 // 相机方向
      })
    }
  }, 3000)
}

export function click_sat_8 () {
  setTimeout(() => {
    const position = tableList_keyong[7].position
    if (position) {
      map.flyToPoint(position, {
        radius: 290000, // 距离目标点的距离
        pitch: -90,
        heading: 150 // 相机方向
      })
    }
  }, 3000)
}

export function click_sat_9 () {
  setTimeout(() => {
    const position = tableList_keyong[8].position
    if (position) {
      map.flyToPoint(position, {
        radius: 290000, // 距离目标点的距离
        pitch: -90,
        heading: 150 // 相机方向
      })
    }
  }, 3000)
}

let i = 0
function creatSatellite(arr) {
  let k = i / 7 
  const item = arr[i]
  const weixin = new mars3d.graphic.Satellite({
    name: arr[i],
    _lastInPoly: false,
    tle1: arr[i + 1],
    tle2: arr[i + 2],
    model: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      show: true
    },
    cone: {
      angle1: 40,
      show: false
    },
    label: {
      font_family: "楷体",
      font_size: 30,
      show: true
    },
    path: {
      show: true,
      color: "#e2e2e2",
      opacity: 0.5,
      width: 1
    }
  })


  graphicLayer.addGraphic(weixin)


  // weixin._lastInPoly = false
  const weixinData_keyong = { name: weixin.name, time: null, td_jd: null, td_wd: null, td_gd: null, flytime: arr[i + 3], position: null }

   weixin.on(mars3d.EventType.change, function (event) {
   const date = Cesium.JulianDate.toDate(map.clock.currentTime)
   weixinData_keyong.time = mars3d.Util.formatDate(date, "yyyy-MM-dd HH:mm:ss")
  const point = mars3d.LngLatPoint.fromCartesian(weixin.position)
  weixinData_keyong.position = weixin.position
    weixinData_keyong.td_jd = point.lng
    weixinData_keyong.td_wd = point.lat
    weixinData_keyong.td_gd = mars3d.MeasureUtil.formatDistance(point.alt)
    showResult_keyong(weixinData_keyong)
   }

  ) 
  

  // const newSatelliteArr_keyong = [] // 存储当前全球视角所有的卫星数据
  // newSatelliteArr_keyong[i / 3].push(weixinData_keyong)
if (k < 8) {
detail_infor(weixin, tle_arr, k)
} else {
  detail_infor_last(weixin, tle_arr, k)
}

 // setTimeout(() => {
   // const position = weixin.position
   // if (position) {
    // map.flyToPoint(position, {
      // radius: 900000, // 距离目标点的距离
       // pitch: -60 // 相机方向
     // })
   // }
 // }, 3000)

  // 位置变化事件
  graphicLayer.on(mars3d.EventType.change, function (event) {
    // 判断卫星是否在面内
    const weixin = event.graphic
    if (!drawGraphic) {
      weixin._lastInPoly = false
      weixin.coneShow = false // 关闭视锥体
      return
    }

    const position = weixin.position
    if (!position) {
      return
    }
    let openVideo = false
    const thisIsInPoly = drawGraphic.isInPoly(position)
    if (thisIsInPoly !== weixin._lastInPoly) {
      if (thisIsInPoly) {
        // 开始进入区域内
        console.log("卫星开始进入区域内", weixin.name)

        weixin.coneShow = true // 打开视锥体
        openVideo = true // 打开视频面板
      } else {
        // 离开区域
        console.log("卫星离开区域", weixin.name)

        weixin.coneShow = false // 关闭视锥体
        openVideo = false // 关闭视频面板
      }

      eventTarget.fire("video", { openVideo })
      weixin._lastInPoly = thisIsInPoly
    }
  })


   // RectSensor锥体（比Satellite内置的cone效率略高）
   const rectSensor = new mars3d.graphic.RectSensor({
    position: new Cesium.CallbackProperty(function (time) {
      return weixin.position
    }, false),
    style: {
      angle1: 30,
      angle2: 15,
      length: 90000,
      color: "rgba(0,255,0,0.4)",
      outline: true,
      topShow: true,
      topSteps: 2,
      rayEllipsoid: true,
      heading: new Cesium.CallbackProperty(function (time) {
        return weixin.heading
      }, false)
    },
    reverse: true
  })
  
  graphicLayer.addGraphic(rectSensor)
  i += 7
}


// 实时更新卫星的详细信息
function detail_infor(weixin, arr, k) {

  let weixinData: duo_keyong = {
     id: k, name: weixin.name, tle1: weixin.options.tle1, tle2: weixin.options.tle2, camera: arr[i + 4], ratio: arr[i + 5], use: arr[i + 6], time: null, td_jd: null, td_wd: null, td_gd: null 
    }

 // 显示实时坐标和时间

 weixin.on(mars3d.EventType.change, function (event) {
  const date = Cesium.JulianDate.toDate(map.clock.currentTime)
  weixinData.time = mars3d.Util.formatDate(date, "yyyy-MM-dd HH:mm:ss")
  if (weixin.position) {
    const point = mars3d.LngLatPoint.fromCartesian(weixin.position)
    weixinData.td_jd = point.lng
    weixinData.td_wd = point.lat
    weixinData.td_gd = mars3d.MeasureUtil.formatDistance(point.alt)
     detailData.push(weixinData)
    // detailData[k] = weixinData
    // eventTarget.fire("satelliteChange", { detailData })
  }
})
  detailData[k] = weixinData
}

function detail_infor_last(weixin, arr, k) {

  let weixinData: duo_keyong = {
     id: k, name: weixin.name, tle1: weixin.options.tle1, tle2: weixin.options.tle2, camera: arr[i + 4], ratio: arr[i + 5], use: arr[i + 6], time: null, td_jd: null, td_wd: null, td_gd: null 
    }

 // 显示实时坐标和时间

 weixin.on(mars3d.EventType.change, function (event) {
  const date = Cesium.JulianDate.toDate(map.clock.currentTime)
  weixinData.time = mars3d.Util.formatDate(date, "yyyy-MM-dd HH:mm:ss")
  if (weixin.position) {
    const point = mars3d.LngLatPoint.fromCartesian(weixin.position)
    weixinData.td_jd = point.lng
    weixinData.td_wd = point.lat
    weixinData.td_gd = mars3d.MeasureUtil.formatDistance(point.alt)
     detailData.push(weixinData)
    // detailData[k] = weixinData
    eventTarget.fire("satelliteChange", { detailData })
  }
})
}


// 访问后端接口，取数据
function queryTleChinaApiData() {
  mars3d.Util.fetchJson({ url: "//data.mars3d.cn/file/apidemo/tle-china.json" })
    .then(function (data) {
      tleArr = data.data
      console.log("卫星数量：" + tleArr.length)
    })
    .catch(function (error) {
      console.log("加载JSON出错", error)
    })
}


// 框选查询 矩形
export function drawRectangle() {
  drawClear()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#ffff00",
      opacity: 0.2,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}

// 框选查询   圆
export function drawCircle() {
  drawClear()
  map.graphicLayer.startDraw({
    type: "circle",
    style: {
      color: "#ffff00",
      opacity: 0.2,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}
// 框选查询   多边
export function drawPolygon() {
  drawClear()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#ffff00",
      opacity: 0.2,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}
// 清除
export function drawClear(): void {
  map.graphicLayer.clear()
  drawGraphic = null
}

export function clearResult() {
  tableList = []
  map.graphicLayer.clear()
}

const parentGlobal = window.parent || window

function globalMsg(content) {
  return parentGlobal.$message(content)
}

//= ===============卫星过境===================================
const pointClr = Cesium.Color.fromCssColorString("#ff0000").withAlpha(0.7)
/**
 *
 * @export
 * @param {time} startTimes 开始时间
 * @param {time} endTimes 结束时间
 * @returns {void}
 */
export function startFX(startTimes, endTimes) {
  if (!drawGraphic) {
    globalMsg("请先在图上绘制区域")
    return
  }

  // 范围相关信息
  const options = {
    startTimes: startTimes,
    endTimes: endTimes,
    graphic: drawGraphic
  }

  // 分析卫星位置
  const newSatelliteArr = [] // 存储飞过指定范围的卫星的数据
  for (let ind = 0; ind < tleArr.length; ind++) {
    const item = tleArr[ind]
    const arr = fxOneSatellite(item, options)

    if (arr.length === 0) {
      continue
    }

    item.inAreaPath = arr
    newSatelliteArr.push(item)
  }
  showResult(newSatelliteArr)
}

function fxOneSatellite(item, options) {
  const inAreaPath = []
  let lastObj = null

  const graphic = options.graphic
  const startTimes = options.startTimes
  const endTimes = options.endTimes
  const step = 10 * 1000 // 插值数

  let nowTime = startTimes

  let position
  while (nowTime <= endTimes) {
    // 根据时间计算卫星的位置
    const position = mars3d.Tle.getEcfPosition(item.tle1, item.tle2, nowTime)
    if (!position) {
      break
    }
    // 显示点[参考比较结果是否正确]
    // let timeStr = new Date(nowTime).format("yyyy-MM-dd HH:mm:ss")
    const pointPrimitive = new mars3d.graphic.PointPrimitive({
      position: position,
      style: {
        color: pointClr,
        pixelSize: 3
      },
      attr: item
      // tooltip: `编号：${item.norad} <br />卫星：${item.name} <br />时间：${timeStr}`
    })
    map.graphicLayer.addGraphic(pointPrimitive)

    // 判断是卫星否在缓冲区内
    const isInPoly = graphic.isInPoly(position)

    // console.log(`${item.name},时间：${timeStr},结果：${isInPoly}`);

    if (lastObj && !lastObj.isInPoly && isInPoly) {
      // 表示进入范围
      inAreaPath.push({
        lastPosition: lastObj.position,
        lastTime: lastObj.time,
        time: nowTime,
        position: position,
        inOrOut: "in"
      })
    }

    if (lastObj && lastObj.isInPoly && !isInPoly) {
      // 表示出范围
      inAreaPath.push({
        position: position,
        lastPosition: lastObj.position,
        lastTime: lastObj.time,
        time: nowTime,
        inOrOut: "out"
      })
      break
    }

    lastObj = {
      position: position,
      isInPoly: isInPoly,
      time: nowTime
    }
    nowTime += step
  }

  if (lastObj && lastObj.isInPoly) {
    // 表示出范围
    inAreaPath.push({
      position: position,
      lastPosition: lastObj.position,
      lastTime: lastObj.time,
      time: nowTime,
      inOrOut: "out"
    })
  }

  return inAreaPath
}

//= ====================结果展示==================================

function showResult(newSatelliteArr) {
  // 显示卫星条带

  for (let ind = 0; ind < newSatelliteArr.length; ind++) {
    const item = newSatelliteArr[ind]
    const inAreaPath = item.inAreaPath
    if (inAreaPath.length < 2) {
      continue
    }

    let index = 0
    if (inAreaPath[0].inOrOut === "out") {
      // 保证从进入 开始计算
      index = 1
    }

    for (let i = index; i < inAreaPath.length; i = i + 2) {
      const positions = []
      let inTime
      let outTime
      if (inAreaPath[i].inOrOut === "in" && inAreaPath[i + 1].inOrOut === "out") {
        const inAttr = inAreaPath[i]
        const outAttr = inAreaPath[i + 1]
        if (inAttr?.lastPosition) {
          inTime = mars3d.Util.formatDate(new Date(inAttr.lastTime), "yyyy-M-d HH:mm:ss")
          positions.push(inAttr.lastPosition)
        }
        if (outAttr?.position) {
          positions.push(outAttr.position)
          outTime = mars3d.Util.formatDate(new Date(outAttr.time), "yyyy-M-d HH:mm:ss")
        }
        if (positions.length > 1) {
          const data = {
            positions: positions,
            name: item.name,
            inTime: inTime,
            outTime: outTime,
            often: mars3d.Util.formatTime((outAttr.time - inAttr.lastTime) / 1000),
            distance: mars3d.MeasureUtil.formatDistance(Cesium.Cartesian3.distance(positions[1], positions[0]))
          }
          tableList.push(data)

          eventTarget.fire("dataList", { tableList })

          showCorridor(data)
        }
      }
    }
  }

  globalMsg("分析完成，共" + tableList.length + "条过境记录")
}

function showResult_keyong(weixinData_keyong) {
  // 显示卫星基本信息
          const data_keyong = {
            name: weixinData_keyong.name,
            time: weixinData_keyong.time,
            longtitude: weixinData_keyong.td_jd,
            altitude: weixinData_keyong.td_wd,
            distance: weixinData_keyong.td_gd,
            flytime: weixinData_keyong.flytime,
            position: weixinData_keyong.position
            // camera: weixinData_keyong.camera,
            // ratio: weixinData_keyong.ratio,
            // use: weixinData_keyong.use
          }
          // tableList_keyong.push(data_keyong)
          tableList_keyong.push(data_keyong)
          eventTarget.fire("dataList", { tableList_keyong })
          // tableList_duo.push(tableList_keyong)

}


function showCorridor(data) {
  const graphic = new mars3d.graphic.CorridorPrimitive({
    positions: data.positions,
    style: {
      width: 6000,
      cornerType: Cesium.CornerType.MITERED, // 指定转角处样式
      color: "#00ff00"
    }
  })
  map.graphicLayer.addGraphic(graphic)

  const inthtml =
    '<table style="width:280px;">' +
    '<tr><th scope="col" colspan="4"  style="text-align:center;font-size:15px;">信息</th></tr>' +
    "<tr><td >卫星名称：</td><td >" +
    data.name +
    " </td></tr>" +
    "<tr><td >进入时间：</td><td >" +
    data.inTime +
    " </td></tr>" +
    "<tr><td >飞出时间：</td><td >" +
    data.outTime +
    " </td></tr>" +
    "<tr><td >过境时长：</td><td >" +
    data.often +
    " </td></tr>" +
    "<tr><td >过境距离：</td><td >" +
    data.distance +
    " </td></tr>" +
    "</table>"
  graphic.bindPopup(inthtml)

  data._graphic = graphic
}

function initData(arr) {
  allCount = arr.length
  globalMsg("当前外太空物数量: " + allCount)

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  const countryNumber = { 美国: 1, 前苏联: 1, 中国: 1, 英国: 1, 法国: 1, 加拿大: 1, 澳大利亚: 1, 日本: 1, 印度: 1 }
  const yearNumber = {}
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    const style = {
      pixelSize: 5,
      color: "rgba(0,255,0,0.6)",
      outlineWidth: 1,
      outlineColor: "#000000",
      scaleByDistance: new Cesium.NearFarScalar(20000000, 1.0, 150000000, 0.4)
    }

    // 转为属性，方便使用
    if (item.info) {
      item.type = item.info[0] // 对象类型
      item.status = item.info[1] // 操作状态代码
      item.country = item.info[2] // 所有权(国家)
      item.launchDate = item.info[3] && new Date(item.info[3]) // 发射日期
      item.launchSite = item.info[4] // 发射地点
      item.decayDate = item.info[5] // 衰减日期
      item.period = item.info[6] // 轨道周期[分钟]
      item.inclination = item.info[7] // 倾角[度]
      item.apogee = item.info[8] // 远地点高度[公里]
      item.perigee = item.info[9] // 近地点高度[公里]
      item.rcs = item.info[10] // 雷达截面
      // item.dataStatus = item.info[11]; // 数据状态码
      item.orbitCenter = item.info[12] // 轨道中心
      item.orbitType = item.info[13] // 轨道类型

      delete item.info
    }

    // 获取所有的国家数量
    if (countryNumber[getCountryName(item.country)]) {
      countryNumber[getCountryName(item.country)]++
    }
    // 获取所有的年份
    if (yearNumber[new Date(item.launchDate).getFullYear()]) {
      yearNumber[new Date(item.launchDate).getFullYear()]++
    } else {
      yearNumber[new Date(item.launchDate).getFullYear()] = 1
    }

    const graphic = new mars3d.graphic.PointPrimitive({
      position: null,
      id: item.id,
      style: style,
      attr: item
    })
    graphicLayer.addGraphic(graphic)
  }

  // 在面板加载 echars 图表
  eventTarget.fire("loadEchartsData", { allCount, countryNumber, yearNumber })

  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了卫星", event)
    const satelliteObj = event.graphic

    if (lastSelectWX) {
      // 重置上次选中的轨道样式
      lastSelectWX.remove()
      lastSelectWX = null
    }
    if (satelliteObj) {
      const item = satelliteObj.attr
      if (!item.name) {
        return
      }

      let launchDate, status, country, launchSite
      if (item.launchDate) {
        launchDate = mars3d.Util.formatDate(item.launchDate, "yyyy-MM-dd")
      }
      if (item.status) {
        status = getStatusName(item.status)
      } else {
        status = ""
      }
      if (item.country) {
        country = getCountryName(item.country)
      }
      if (item.launchSite) {
        launchSite = getLaunchSiteName(item.launchSite)
      }
      const period = mars3d.Util.formatNum(item.period, 2) + " 分钟"
      const inclination = item.inclination + "°"
      const apogee = mars3d.Util.formatNum(item.apogee, 0) + " km"
      const perigee = mars3d.Util.formatNum(item.perigee, 0) + " km"

      const inhtml = `<a href="https://www.n2yo.com/satellite/?s=${item.id}" target="_blank">N2YO...</a>`

      const weixinList = [
        item.name,
        item.id,
        item.cospar,
        item.type,
        status,
        country,
        launchDate,
        launchSite,
        period,
        inclination,
        apogee,
        perigee,
        item.rcs || "未知",
        item.orbitCenter,
        item.orbitType,
        inhtml
      ]

      eventTarget.fire("clickWeixin", { weixinList })

      // weixingStyle(item)
    }
  })

  // initWorker(arr)
}

function getCountryName(code) {
  switch (code) {
    case "AB":
      return "阿拉伯卫星通信组织"
    case "ABS":
      return "亚洲广播卫星"
    case "AC":
      return "亚洲卫星电讯公司"
    case "ALG":
      return "阿尔及利亚"
    case "ANG":
      return "安哥拉"
    case "ARGN":
      return "阿根廷"
    case "ASRA":
      return "奥地利"
    case "AUS":
      return "澳大利亚"
    case "AZER":
      return "阿塞拜疆"
    case "BEL":
      return "比利时"
    case "BELA":
      return "白俄罗斯"
    case "BERM":
      return "百慕大"
    case "BGD":
      return "孟加拉国"
    case "BHUT":
      return "不丹王国"
    case "BOL":
      return "玻利维亚"
    case "BRAZ":
      return "巴西"
    case "BUL":
      return "保加利亚"
    case "CA":
      return "加拿大"
    case "CHBZ":
      return "中国/巴西"
    case "CHLE":
      return "智利"
    case "CIS":
      return "前苏联"
    case "COL":
      return "哥伦比亚"
    case "CRI":
      return "哥斯达黎加共和国"
    case "CZCH":
      return "捷克"
    case "DEN":
      return "丹麦"
    case "ECU":
      return "厄瓜多尔"
    case "EGYP":
      return "埃及"
    case "ESA":
      return "欧洲太空总署"
    case "ESRO":
      return "欧洲空间研究组织"
    case "EST":
      return "爱沙尼亚"
    case "EUME":
      return "欧洲气象卫星开发组织"
    case "EUTE":
      return "欧洲电信卫星组织"
    case "FGER":
      return "法国/德国"
    case "FIN":
      return "芬兰"
    case "FR":
      return "法国"
    case "FRIT":
      return "法国/意大利"
    case "GER":
      return "德国"
    case "GHA":
      return "加纳共和国"
    case "GLOB":
      return "全球星"
    case "GREC":
      return "希腊"
    case "GRSA":
      return "希腊/沙特阿拉伯"
    case "GUAT":
      return "危地马拉"
    case "HUN":
      return "匈牙利"
    case "IM":
      return "国际移动卫星组织(INMARSAT)"
    case "IND":
      return "印度"
    case "INDO":
      return "印尼"
    case "IRAN":
      return "伊朗"
    case "IRAQ":
      return "伊拉克"
    case "IRID":
      return "IRID"
    case "ISRA":
      return "以色列"
    case "ISRO":
      return "印度空间研究组织"
    case "ISS":
      return "国际空间站"
    case "IT":
      return "意大利"
    case "ITSO":
      return "国际电信卫星组织"
    case "JPN":
      return "日本"
    case "KAZ":
      return "哈萨克斯坦"
    case "KEN":
      return "肯尼亚"
    case "LAOS":
      return "老挝"
    case "LKA":
      return "斯里兰卡"
    case "LTU":
      return "立陶宛"
    case "LUXE":
      return "卢森堡"
    case "MA":
      return "摩洛哥"
    case "MALA":
      return "马来西亚"
    case "MEX":
      return "墨西哥"
    case "MMR":
      return "缅甸"
    case "MNG":
      return "蒙古"
    case "MUS":
      return "毛里求斯"
    case "NATO":
      return "北大西洋公约组织"
    case "NETH":
      return "荷兰"
    case "NICO":
      return "新图标"
    case "NIG":
      return "尼日利亚"
    case "NKOR":
      return "朝鲜"
    case "NOR":
      return "挪威"
    case "NPL":
      return "尼泊尔"
    case "NZ":
      return "新西兰"
    case "O3B":
      return "O3b Networks公司"
    case "ORB":
      return "ORBCOMM卫星公司"
    case "PAKI":
      return "巴基斯坦"
    case "PERU":
      return "秘鲁"
    case "POL":
      return "波兰"
    case "POR":
      return "葡萄牙"
    case "PRC":
      return "中国"
    case "PRY":
      return "巴拉圭"
    case "PRES":
      return "中国/欧洲航天局"
    case "QAT":
      return "卡塔尔的状态"
    case "RASC":
      return "非洲区域卫星通信组织"
    case "ROC":
      return "台湾"
    case "ROM":
      return "罗马尼亚"
    case "RP":
      return "菲律宾"
    case "RWA":
      return "卢旺达"
    case "SAFR":
      return "南非"
    case "SAUD":
      return "沙特阿拉伯"
    case "SDN":
      return "苏丹"
    case "SEAL":
      return "Sea Launch公司"
    case "SES":
      return "SES电信公司"
    case "SGJP":
      return "新加坡/日本"
    case "SING":
      return "新加坡"
    case "SKOR":
      return "韩国"
    case "SPN":
      return "西班牙"
    case "STCT":
      return "新加坡/台湾"
    case "SVN":
      return "斯洛文尼亚"
    case "SWED":
      return "瑞典"
    case "SWTZ":
      return "瑞士"
    case "TBD":
      return "待定"
    case "THAI":
      return "泰国"
    case "TMMC":
      return "土库曼斯坦/摩纳哥"
    case "TUN":
      return "突尼斯共和国"
    case "TURK":
      return "土耳其"
    case "UAE":
      return "阿拉伯联合酋长国"
    case "UK":
      return "英国"
    case "UKR":
      return "乌克兰"
    case "URY":
      return "乌拉圭"
    case "US":
      return "美国"
    case "USBZ":
      return "美国/巴西"
    case "VENZ":
      return "委内瑞拉"
    case "VTNM":
      return "越南"
    case "UNK":
      return "未知"
  }
  return code
}

function getStatusName(code) {
  switch (code) {
    case "+":
      return "运作的"
    case "-":
      return "非运转的"
    case "P":
      return "部分运转,部分完成主要任务或次要任务"
    case "B":
      return "备份/备用,先前运行的卫星进入储备状态"
    case "S":
      return "备用,新卫星等待完全激活"
    case "X":
      return "扩展的任务"
    case "D":
      return "衰退的"
    case "?":
      return "未知的"
  }
  return code
}

function getLaunchSiteName(code) {
  switch (code) {
    case "AFETR":
      return "美国佛罗里达州空军东部试验场"
    case "AFWTR":
      return "美国加州空军西部试验场"
    case "CAS":
      return "Canaries Airspace"
    case "DLS":
      return "俄罗斯Dombarovskiy发射场"
    case "ERAS":
      return "东部领空范围"
    case "FRGUI":
      return "法属圭亚那库鲁的欧洲太空港"
    case "HGSTR":
      return "阿尔及利亚的Hammaguira空间轨道靶场"
    case "JSC":
      return "中国酒泉航天中心"
    case "KODAK":
      return "美国阿拉斯加科迪亚克发射中心"
    case "KSCUT":
      return "日本内浦航天中心"
    case "KWAJ":
      return "美国陆军夸贾林环礁"
    case "KYMSC":
      return "俄罗斯Kapustin Yar导弹和太空综合体"
    case "NSC":
      return "韩国罗老宇航中心"
    case "PLMSC":
      return "俄罗斯普列谢茨克导弹和太空综合体"
    case "RLLB":
      return "火箭实验室发射基地"
    case "SEAL":
      return "海上发射平台(流动)"
    case "SEMLS":
      return "伊朗塞姆南卫星发射场"
    case "SMTS":
      return "伊朗沙赫鲁德导弹试验场"
    case "SNMLP":
      return "印度洋(肯尼亚)圣马可发射平台"
    case "SRILR":
      return "印度萨迪什·达万航天中心"
    case "SUBL":
      return "潜艇发射平台(移动式)"
    case "SVOBO":
      return "俄罗斯Svobodnyy发射中心"
    case "TAISC":
      return "中国太原航天中心"
    case "TANSC":
      return "日本种子岛宇宙中心"
    case "TYMSC":
      return "哈萨克斯坦秋拉坦导弹和航天中心"
    case "VOSTO":
      return "俄罗斯东方港航天器发射场"
    case "WLPIS":
      return "美国弗吉尼亚州瓦勒普斯岛"
    case "WOMRA":
      return "澳大利亚Woomera"
    case "WRAS":
      return "西方领空范围"
    case "WSC":
      return "中国文昌卫星发射场"
    case "XICLF":
      return "中国西昌发射场"
    case "YAVNE":
      return "以色列Yavne发射设施"
    case "YUN":
      return "朝鲜云松发射场"
    case "UNK":
      return "未知的"
  }
  return code
}
