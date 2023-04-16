import * as mars3d from "mars3d"
import { Cesium } from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象
export const formatDistance = mars3d.MeasureUtil.formatDistance
export const formatTime = mars3d.Util.formatTime
let rotatePoint
let scrollWall = null
const tableList_dj = []
let fixedRoute_fire_1
let fixedRoute_fire_2
let fixedRoute_fire_3
let pathEntity0 = null
let pathEntity1 = null
let pathEntity2 = null

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 27.88, lng: 101.42, alt: 2832, heading: 359, pitch: -50 }
  }
}

 export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  show_senhuo()
  startAnimation()

  mars3d.Util.fetchJson({ url: "http://localhost/mars3d-data/Uav-path1.json" }) 
  .then(function (res) {
    initPath0(res)
  })
  .catch(function (error) {
    console.log("加载JSON出错", error)
  })

  mars3d.Util.fetchJson({ url: "http://localhost/mars3d-data/Uav-path2.json" }) 
  .then(function (res) {
    initPath1(res)
  })
  .catch(function (error) {
    console.log("加载JSON出错", error)
  })

  mars3d.Util.fetchJson({ url: "http://localhost/mars3d-data/Uav-path3.json" }) 
  .then(function (res) {
    initPath2(res)
  })
  .catch(function (error) {
    console.log("加载JSON出错", error)
  })

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效

  // 合肥市
  addDemoGraphic1(graphicLayer)
  addDemoGraphic2(graphicLayer)
  addDemoGraphic3(graphicLayer)
  addDemoGraphic4(graphicLayer)
  addDemoGraphic5(graphicLayer)

  rotatePoint = new mars3d.thing.RotatePoint({
    direction: false, // 方向 true逆时针，false顺时针
    time: 50 // 给定飞行一周所需时间(单位 秒)，控制速度
    // autoStopAngle: 360, // 到达指定角度后自动停止
  })

   map.addThing(rotatePoint)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (pointEntity) {
    pointEntity.remove()
    pointEntity = null
  }
  eventTarget.off()
  map = null
  graphicLayer.remove()
  graphicLayer = null
}

export function startAnimation() {
    map.openFlyAnimation({ 
        center: { lat: 27.83, lng: 101.437, alt: 13390.5, heading: 359, pitch: -50 },
        duration: 0
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

export function startRotate() {
    // 获取当前视角
    const point = map.getCenter()
    rotatePoint.start(point) // 可以传指定的中心点坐标
  }
 
  export function stopRotate() {
    rotatePoint.stop()
  }

function initPath0(data) {
  const property = new Cesium.SampledPositionProperty()
  property.forwardExtrapolationType = Cesium.ExtrapolationType.HOLD// The first or last value is used when outside the range of sample data.超出示例范围，则使用第一个或最后一个值

  let start// 开始时间
  let stop// 结束时间
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i]
    // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
    const lng = Number(item.x.toFixed(6)) // 经度
    const lat = Number(item.y.toFixed(6)) // 纬度
    const height = item.z // 高度
    const time = item.time // 时间

    let position = null
    if (lng && lat) {
      position = Cesium.Cartesian3.fromDegrees(lng, lat, height)// lng指longitude经度,lat指latitude纬度，height指高度  相当于xyz坐标
      // longitude and latitude are given in degrees
     }
    let juliaDate = null
    if (time) {
      juliaDate = Cesium.JulianDate.fromIso8601(time)
    }
    if (position && juliaDate) {
      property.addSample(juliaDate, position)
    }

    if (i === 0) {
      start = juliaDate
    } else if (i === len - 1) {
      stop = juliaDate
    }

    // 每一个target点的数据
    const graphic = new mars3d.graphic.PointPrimitive({ // 像素点 Primitive矢量数据
      position: position, // 坐标位置
      style: { // 样式信息
        pixelSize: 4,
        color: "#cccccc"
      },
      popup: "编号:" + item.id + "<br/>时间:" + time// 绑定的popup弹窗值
    })
    graphicLayer.addGraphic(graphic)
  }

  // 设置时钟属性
  map.clock.startTime = start.clone()
  map.clock.stopTime = stop.clone()
  map.clock.currentTime = start.clone()
  map.clock.clockRange = Cesium.ClockRange.LOOP_STOP// 当到达Clock#stopTime时，Clock#tick将Clock#currentTime提前到间隔的另一端。当时间向后移动时，Clock#tick不会超过Clock#startTime
  map.clock.multiplier = 5// multiplier确定调用Clock#tick时 时间向前推进了多少，负值允许向后推进。

  if (map.controls.timeline) { // 时间线, 是否创建下侧时间线控件面板
    map.controls.timeline.zoomTo(start, stop)
  }

  // 创建path对象
  pathEntity0 = new mars3d.graphic.PathEntity({ // path路径 Entity矢量数据
    position: property, // 含时序的点的集合（坐标位置）
    orientation: new Cesium.VelocityOrientationProperty(property), // 实体方向
    style: { // 样式信息
      resolution: 1, // 指定在对位置进行采样时步进的最大秒数
      leadTime: 0, // 提前显示轨迹的时间长度（单位：秒）
      trailTime: 3600, // 保留历史轨迹的时间长度（单位：秒）
      color: "#ff0000",
      width: 3
    },
    label: { // 文本点 支持的样式信息
      text: "大疆精灵1号", // 文本内容
      font_size: 19,
      font_family: "楷体",
      color: Cesium.Color.AZURE, // 文本颜色
      outline: true, // 是否衬色(衬色)
      visibleDepth: false, // 是否被遮挡（不被遮挡）
      outlineColor: Cesium.Color.BLACK, // 衬色颜色
      outlineWidth: 2, // 衬色宽度
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 横向方向的定位(居中)
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向的定位(点位于文本的左下角)
      pixelOffset: new Cesium.Cartesian2(10, -25) // 偏移量
    },
    // billboard: {// 设置附加的 图标 和对应的样式
    //   image: "img/marker/lace-blue.png",
    //   horizontalOrigin: Cesium.HorizontalOrigin.CENTER,// 横向方向的定位(居中)
    //   verticalOrigin: Cesium.VerticalOrigin.BOTTOM,// 垂直方向的定位(点位于文本的左下角)
    //   visibleDepth: false// 是否被遮挡（不被遮挡）
    // },
    model: { // 设置附加的 gltf模型 和对应的样式
      url: "//data.mars3d.cn/gltf/mars/dajiang/dajiang.gltf", // glTF模型的URI的字符串或资源属性
      scale: 1, // 比例
      minimumPixelSize: 50// 指定模型的近似最小像素大小，而不考虑缩放。
    },
    popup: "大疆精灵1号"// 绑定的popup弹窗值
  })
  graphicLayer.addGraphic(pathEntity0)

  const fixedRoute = new mars3d.graphic.FixedRoute({
    name: "贴地表表面漫游",
    speed: 310,
    positions: [
      [101.495283, 28.010648, 162],
      [101.484110, 28.010424, 160],
      [101.337863, 28.101760, 439.45]
    ],
    clockLoop: false, // 是否循环播放

    // model: {
    //   show: true,
    //   url: '//data.mars3d.cn/gltf/mars/qiche.gltf',
    //   scale: 0.2,
    //   minimumPixelSize: 50,
    // },
    polyline: {
      color: "#ffff00",
      width: 3
    }
  })
  graphicLayer.addGraphic(fixedRoute)

  map.on(mars3d.EventType.keydown, function (event) {
    // 空格 切换暂停/继续
    if (event.keyCode === 32) {
      if (fixedRoute.isPause) {
        fixedRoute.proceed()
      } else {
        fixedRoute.pause()
      }
    }
  })

  // ui面板信息展示
  fixedRoute.on(mars3d.EventType.change, (event) => {
    eventTarget.fire("roamLineChange", event)
  })

  // 不贴地时，直接开始
  startFly(fixedRoute)


  const djData_keyong = { name: "大疆精灵一号", time: null, td_jd: null, td_wd: null, td_gd: null, flytime: "80分钟", position: null }

  const point = data[0]
  djData_keyong.td_jd = Number(point.x.toFixed(6))
  djData_keyong.td_wd = Number(point.y.toFixed(6))
  djData_keyong.td_gd = point.z
  djData_keyong.time = point.time
    showResult_keyong(djData_keyong)


  // 圆锥追踪体
  const coneTrack = new mars3d.graphic.ConeTrack({
    position: property, // 坐标位置
    style: { // 样式信息
      length: 750, // 圆锥追踪体长度值（单位：米）
      angle: 50, // 圆锥追踪体张角（角度值，取值范围 0.01-89.99）
      color: "#ff0000", // 填充颜色
      opacity: 0.3// 透明度, 取值范围：0.0-1.0
    }
  })
  graphicLayer.addGraphic(coneTrack)
}

function startFly(fixedRoute) {
  fixedRoute.start()
}

function initPath1(data) {
  const property = new Cesium.SampledPositionProperty()
  property.forwardExtrapolationType = Cesium.ExtrapolationType.HOLD// The first or last value is used when outside the range of sample data.超出示例范围，则使用第一个或最后一个值

  let start// 开始时间
  let stop// 结束时间
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i]
    // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
    const lng = Number(item.x.toFixed(6)) // 经度
    const lat = Number(item.y.toFixed(6)) // 纬度
    const height = item.z // 高度
    const time = item.time // 时间

    let position = null
    if (lng && lat) {
      position = Cesium.Cartesian3.fromDegrees(lng, lat, height)// lng指longitude经度,lat指latitude纬度，height指高度  相当于xyz坐标
      // longitude and latitude are given in degrees
     }
    let juliaDate = null
    if (time) {
      juliaDate = Cesium.JulianDate.fromIso8601(time)
    }
    if (position && juliaDate) {
      property.addSample(juliaDate, position)
    }

    if (i === 0) {
      start = juliaDate
    } else if (i === len - 1) {
      stop = juliaDate
    }

    // 每一个target点的数据
    const graphic = new mars3d.graphic.PointPrimitive({ // 像素点 Primitive矢量数据
      position: position, // 坐标位置
      style: { // 样式信息
        pixelSize: 4,
        color: "#cccccc"
      },
      popup: "编号:" + item.id + "<br/>时间:" + time// 绑定的popup弹窗值
    })
    graphicLayer.addGraphic(graphic)
  }

  // 设置时钟属性
  map.clock.startTime = start.clone()
  map.clock.stopTime = stop.clone()
  map.clock.currentTime = start.clone()
  map.clock.clockRange = Cesium.ClockRange.LOOP_STOP// 当到达Clock#stopTime时，Clock#tick将Clock#currentTime提前到间隔的另一端。当时间向后移动时，Clock#tick不会超过Clock#startTime
  map.clock.multiplier = 5// multiplier确定调用Clock#tick时 时间向前推进了多少，负值允许向后推进。

  if (map.controls.timeline) { // 时间线, 是否创建下侧时间线控件面板
    map.controls.timeline.zoomTo(start, stop)
  }

  // 创建path对象
  pathEntity1 = new mars3d.graphic.PathEntity({ // path路径 Entity矢量数据
    position: property, // 含时序的点的集合（坐标位置）
    orientation: new Cesium.VelocityOrientationProperty(property), // 实体方向
    style: { // 样式信息
      resolution: 1, // 指定在对位置进行采样时步进的最大秒数
      leadTime: 0, // 提前显示轨迹的时间长度（单位：秒）
      trailTime: 3600, // 保留历史轨迹的时间长度（单位：秒）
      color: "#00ff00",
      width: 3
    },
    label: { // 文本点 支持的样式信息
      text: "大疆精灵2号", // 文本内容
      font_size: 19,
      font_family: "楷体",
      color: Cesium.Color.AZURE, // 文本颜色
      outline: true, // 是否衬色(衬色)
      visibleDepth: false, // 是否被遮挡（不被遮挡）
      outlineColor: Cesium.Color.BLACK, // 衬色颜色
      outlineWidth: 2, // 衬色宽度
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 横向方向的定位(居中)
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向的定位(点位于文本的左下角)
      pixelOffset: new Cesium.Cartesian2(10, -25) // 偏移量
    },
    // billboard: {// 设置附加的 图标 和对应的样式
    //   image: "img/marker/lace-blue.png",
    //   horizontalOrigin: Cesium.HorizontalOrigin.CENTER,// 横向方向的定位(居中)
    //   verticalOrigin: Cesium.VerticalOrigin.BOTTOM,// 垂直方向的定位(点位于文本的左下角)
    //   visibleDepth: false// 是否被遮挡（不被遮挡）
    // },
    model: { // 设置附加的 gltf模型 和对应的样式
      url: "//data.mars3d.cn/gltf/mars/dajiang/dajiang.gltf", // glTF模型的URI的字符串或资源属性
      scale: 1, // 比例
      minimumPixelSize: 50// 指定模型的近似最小像素大小，而不考虑缩放。
    },
    popup: "大疆精灵2号"// 绑定的popup弹窗值
  })
  graphicLayer.addGraphic(pathEntity1)

  // 圆锥追踪体
  const coneTrack = new mars3d.graphic.ConeTrack({
    position: property, // 坐标位置
    style: { // 样式信息
      length: 750, // 圆锥追踪体长度值（单位：米）
      angle: 50, // 圆锥追踪体张角（角度值，取值范围 0.01-89.99）
      color: "#ff0000", // 填充颜色
      opacity: 0.3// 透明度, 取值范围：0.0-1.0
    }
  })
  graphicLayer.addGraphic(coneTrack)

  const djData_keyong = { name: "大疆精灵二号", time: null, td_jd: null, td_wd: null, td_gd: null, flytime: "85分钟", position: null }
    const point = data[0]
    djData_keyong.td_jd = Number(point.x.toFixed(6))
    djData_keyong.td_wd = Number(point.y.toFixed(6))
    djData_keyong.td_gd = point.z
    djData_keyong.time = point.time
   showResult_keyong(djData_keyong)
  
}

function initPath2(data) {
  const property = new Cesium.SampledPositionProperty()
  property.forwardExtrapolationType = Cesium.ExtrapolationType.HOLD// The first or last value is used when outside the range of sample data.超出示例范围，则使用第一个或最后一个值

  let start// 开始时间
  let stop// 结束时间
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i]
    // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
    const lng = Number(item.x.toFixed(6)) // 经度
    const lat = Number(item.y.toFixed(6)) // 纬度
    const height = item.z // 高度
    const time = item.time // 时间

    let position = null
    if (lng && lat) {
      position = Cesium.Cartesian3.fromDegrees(lng, lat, height)// lng指longitude经度,lat指latitude纬度，height指高度  相当于xyz坐标
      // longitude and latitude are given in degrees
     }
    let juliaDate = null
    if (time) {
      juliaDate = Cesium.JulianDate.fromIso8601(time)
    }
    if (position && juliaDate) {
      property.addSample(juliaDate, position)
    }

    if (i === 0) {
      start = juliaDate
    } else if (i === len - 1) {
      stop = juliaDate
    }

    // 每一个target点的数据
    const graphic = new mars3d.graphic.PointPrimitive({ // 像素点 Primitive矢量数据
      position: position, // 坐标位置
      style: { // 样式信息
        pixelSize: 4,
        color: "#cccccc"
      },
      popup: "编号:" + item.id + "<br/>时间:" + time// 绑定的popup弹窗值
    })
    graphicLayer.addGraphic(graphic)
  }

  // 设置时钟属性
  map.clock.startTime = start.clone()
  map.clock.stopTime = stop.clone()
  map.clock.currentTime = start.clone()
  map.clock.clockRange = Cesium.ClockRange.LOOP_STOP// 当到达Clock#stopTime时，Clock#tick将Clock#currentTime提前到间隔的另一端。当时间向后移动时，Clock#tick不会超过Clock#startTime
  map.clock.multiplier = 5// multiplier确定调用Clock#tick时 时间向前推进了多少，负值允许向后推进。

  if (map.controls.timeline) { // 时间线, 是否创建下侧时间线控件面板
    map.controls.timeline.zoomTo(start, stop)
  }

  // 创建path对象
  pathEntity2 = new mars3d.graphic.PathEntity({ // path路径 Entity矢量数据
    position: property, // 含时序的点的集合（坐标位置）
    orientation: new Cesium.VelocityOrientationProperty(property), // 实体方向
    style: { // 样式信息
      resolution: 1, // 指定在对位置进行采样时步进的最大秒数
      leadTime: 0, // 提前显示轨迹的时间长度（单位：秒）
      trailTime: 3600, // 保留历史轨迹的时间长度（单位：秒）
      color: "#ffff00",
      width: 3
    },
    label: { // 文本点 支持的样式信息
      text: "大疆精灵3号", // 文本内容
      font_size: 19,
      font_family: "楷体",
      color: Cesium.Color.AZURE, // 文本颜色
      outline: true, // 是否衬色(衬色)
      visibleDepth: false, // 是否被遮挡（不被遮挡）
      outlineColor: Cesium.Color.BLACK, // 衬色颜色
      outlineWidth: 2, // 衬色宽度
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 横向方向的定位(居中)
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向的定位(点位于文本的左下角)
      pixelOffset: new Cesium.Cartesian2(10, -25) // 偏移量
    },
    // billboard: {// 设置附加的 图标 和对应的样式
    //   image: "img/marker/lace-blue.png",
    //   horizontalOrigin: Cesium.HorizontalOrigin.CENTER,// 横向方向的定位(居中)
    //   verticalOrigin: Cesium.VerticalOrigin.BOTTOM,// 垂直方向的定位(点位于文本的左下角)
    //   visibleDepth: false// 是否被遮挡（不被遮挡）
    // },
    model: { // 设置附加的 gltf模型 和对应的样式
      url: "//data.mars3d.cn/gltf/mars/dajiang/dajiang.gltf", // glTF模型的URI的字符串或资源属性
      scale: 1, // 比例
      minimumPixelSize: 50// 指定模型的近似最小像素大小，而不考虑缩放。
    },
    popup: "大疆精灵3号"// 绑定的popup弹窗值
  })
  graphicLayer.addGraphic(pathEntity2)

  // 圆锥追踪体
  const coneTrack = new mars3d.graphic.ConeTrack({
    position: property, // 坐标位置
    style: { // 样式信息
      length: 750, // 圆锥追踪体长度值（单位：米）
      angle: 50, // 圆锥追踪体张角（角度值，取值范围 0.01-89.99）
      color: "#ff0000", // 填充颜色
      opacity: 0.3// 透明度, 取值范围：0.0-1.0
    }
  })
  graphicLayer.addGraphic(coneTrack)

  const djData_keyong = { name: "大疆精灵三号", time: null, td_jd: null, td_wd: null, td_gd: null, flytime: "65分钟", position: null }
    const point = data[0]
    djData_keyong.td_jd = Number(point.x.toFixed(6))
    djData_keyong.td_wd = Number(point.y.toFixed(6))
    djData_keyong.td_gd = point.z
    djData_keyong.time = point.time
   showResult_keyong_push(djData_keyong)
  
}


function addDemoGraphic1(graphicLayer) {
  const lightCone = new mars3d.graphic.LightCone({
    position: Cesium.Cartesian3.fromDegrees(101.442872, 27.911964, 117.8),
    style: {
      color: "rgba(255,0,0,0.9)",
      radius: 10, // 底部半径
      height: 80000 // 椎体高度
    },
    show: true
  })
  graphicLayer.addGraphic(lightCone)

  // 演示个性化处理graphic
  initGraphicManager(lightCone)
}
// 也可以在单个Graphic上做个性化管理及绑定操作
function initGraphicManager(graphic) {
  // 绑定Popup
  const inthtml = `<table style="width: auto;">
            <tr>
              <th scope="col" colspan="2" style="text-align:center;font-size:15px;">四川凉山州木里县模拟火点位置 </th>
            </tr>
            <tr>
            <tr>
              <td>展示一级火点和二级火点位置</td></tr>
              <td>可以对二级火点位置进行迁移</td>
            </tr>
          </table>`
  graphic.bindPopup(inthtml).openPopup()

  // 绑定右键菜单
  graphic.bindContextMenu([
    {
      text: "删除对象[graphic绑定的]",
      icon: "fa fa-trash-o",
      callback: (e) => {
        const graphic = e.graphic
        if (graphic) {
          graphic.remove()
        }
      }
    }
  ])
}

function addDemoGraphic2(graphicLayer) {
  const cities = [
    { name: "二级火点-1", lon: 101.487741, lat: 27.901914 },
    { name: "二级火点-2", lon: 101.45417, lat: 27.910557 },
    { name: "二级火点-3", lon: 101.416448, lat: 27.907239 },
    { name: "二级火点-4", lon: 101.433749, lat: 27.939323 },
    { name: "二级火点-5", lon: 101.436074, lat: 27.917293 },
    { name: "二级火点-6", lon: 101.386248, lat: 27.958096 },
    { name: "二级火点-7", lon: 101.419372, lat: 27.930455 },
    { name: "二级火点-8", lon: 101.480663, lat: 27.983014 }
  ]
  for (let i = 0; i < cities.length; i++) {
    const item = cities[i]

    const coneGlow2 = new mars3d.graphic.LightCone({
      position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat, 117.8),
      style: {
        radius: 70,
        height: 80000,
        distanceDisplayCondition: new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(1, 3010000),

        // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
        highlight: {
          type: mars3d.EventType.click,
          color: "#ffff00"
        }
      },
      show: true,
     popup: item.name
    })
    graphicLayer.addGraphic(coneGlow2)
  }
}

function addDemoGraphic3(graphicLayer) {
  // 走马灯围墙效果
  scrollWall = new mars3d.graphic.ScrollWall({
    positions: [
      [101.337741, 28.101914, 12.29],
      [101.48417, 28.010557, 11.07],
      [101.49448, 27.897239, 11.01],
      [101.407319, 27.901996, 17.11]
    ],
    style: {
      diffHeight: 2500, // 高度
      color: "#f33349",
      style: 2, // 效果2，默认是1
      speed: 10
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(scrollWall)
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 30)
  console.log("生成的测试网格坐标", result)

  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const index = j + 1

    const graphic = new mars3d.graphic.LightCone({
      position: position,
      style: {
        radius: result.radius * 0.3,
        height: result.radius * 3
      },
      attr: { index: index }
    })
    graphicLayer.addGraphic(graphic)
  }

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

// 开始绘制
export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "lightCone",
    style: {
      radius: 500,
      height: 8000
    }
  })
  graphicLayer.startDraw({
    type: "scrollWall",
    style: {
      color: "#55ff33",
      opacity: 0.8,
      diffHeight: 800,
      reverse: false, // 方向：true往上、false往下
      speed: 10
    }
  })
}

// 在图层绑定Popup弹窗
export function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    attr["类型"] = event.graphic.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr: attr })
  })
}

// 绑定右键菜单
export function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return !graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.startEditing(graphic)
        }
      }
    },
    {
      text: "停止编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphic.stopEditing()
        }
      }
    },
    {
      text: "删除对象",
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        const parent = graphic.parent // 右击是编辑点时
        graphicLayer.removeGraphic(graphic)
        if (parent) {
          graphicLayer.removeGraphic(parent)
        }
      }
    }
  ])
}

// 改变视角  跟踪，上方和侧方
// flyToPoint:定位至当前时间所在的位置 (非相机位置)
// 飞机0号
export function viewAircraft0() { // 跟踪
  map.trackedEntity = pathEntity0.entity

  pathEntity0.flyToPoint({
    radius: 8000, // 相机距离目标点的距离（单位：米）
    heading: 40, // 方向角度值，绕垂直于地心的轴旋转角度, 0至360
    pitch: -50, // 俯仰角度值，绕纬度线旋转角度, -90至90
    duration: 0.01// 飞行持续时间（秒）
  })
}
export function viewTopDown0() { // 上方
  map.trackedEntity = undefined

  map.flyToPoint(pathEntity0.positionShow, {
    radius: 10000, // 相机距离目标点的距离（单位：米）
    heading: -90, // 方向角度值，绕垂直于地心的轴旋转角度, 0至360
    pitch: -89// 俯仰角度值，绕纬度线旋转角度, -90至90
  })
}
export function viewSide0() { // 侧方
  map.trackedEntity = undefined

  map.flyToPoint(pathEntity0.positionShow, {
    radius: 8000, // 相机距离目标点的距离（单位：米）
    heading: -90, // 方向角度值，绕垂直于地心的轴旋转角度, 0至360
    pitch: -25// 俯仰角度值，绕纬度线旋转角度, -90至90
  })
}
// 飞机1号
export function viewAircraft1() { // 跟踪
  map.trackedEntity = pathEntity1.entity

  pathEntity1.flyToPoint({
    radius: 8000, // 相机距离目标点的距离（单位：米）
    heading: 40, // 方向角度值，绕垂直于地心的轴旋转角度, 0至360
    pitch: -50, // 俯仰角度值，绕纬度线旋转角度, -90至90
    duration: 0.01// 飞行持续时间（秒）
  })
}
export function viewTopDown1() { // 上方
  map.trackedEntity = undefined

  map.flyToPoint(pathEntity1.positionShow, {
    radius: 10000, // 相机距离目标点的距离（单位：米）
    heading: -90, // 方向角度值，绕垂直于地心的轴旋转角度, 0至360
    pitch: -89// 俯仰角度值，绕纬度线旋转角度, -90至90
  })
}
export function viewSide1() { // 侧方
  map.trackedEntity = undefined

  map.flyToPoint(pathEntity1.positionShow, {
    radius: 8000, // 相机距离目标点的距离（单位：米）
    heading: -90, // 方向角度值，绕垂直于地心的轴旋转角度, 0至360
    pitch: -25// 俯仰角度值，绕纬度线旋转角度, -90至90
  })
}
// 飞机2号
export function viewAircraft2() { // 跟踪
  map.trackedEntity = pathEntity2.entity

  pathEntity2.flyToPoint({
    radius: 8000, // 相机距离目标点的距离（单位：米）
    heading: 40, // 方向角度值，绕垂直于地心的轴旋转角度, 0至360
    pitch: -50, // 俯仰角度值，绕纬度线旋转角度, -90至90
    duration: 0.01// 飞行持续时间（秒）
  })
}
export function viewTopDown2() { // 上方
  map.trackedEntity = undefined

  map.flyToPoint(pathEntity2.positionShow, {
    radius: 10000, // 相机距离目标点的距离（单位：米）
    heading: -90, // 方向角度值，绕垂直于地心的轴旋转角度, 0至360
    pitch: -89// 俯仰角度值，绕纬度线旋转角度, -90至90
  })
}
export function viewSide2() { // 侧方
  map.trackedEntity = undefined

  map.flyToPoint(pathEntity2.positionShow, {
    radius: 8000, // 相机距离目标点的距离（单位：米）
    heading: -90, // 方向角度值，绕垂直于地心的轴旋转角度, 0至360
    pitch: -25// 俯仰角度值，绕纬度线旋转角度, -90至90
  })
}

function showResult_keyong(djData_keyong) {
  // 显示卫星基本信息
          const data_keyong = {
            name: djData_keyong.name,
            time: djData_keyong.time,
            longtitude: djData_keyong.td_jd,
            altitude: djData_keyong.td_wd,
            distance: djData_keyong.td_gd,
            flytime: djData_keyong.flytime
            // position: djData_keyong.position
            // camera: weixinData_keyong.camera,
            // ratio: weixinData_keyong.ratio,
            // use: weixinData_keyong.use
          }
          // tableList_keyong.push(data_keyong)
          tableList_dj.push(data_keyong)
          // eventTarget.fire("dataList", { tableList_dj })
          // tableList_duo.push(tableList_keyong)

}

function showResult_keyong_push(djData_keyong) {
  // 显示卫星基本信息
          const data_keyong = {
            name: djData_keyong.name,
            time: djData_keyong.time,
            longtitude: djData_keyong.td_jd,
            altitude: djData_keyong.td_wd,
            distance: djData_keyong.td_gd,
            flytime: djData_keyong.flytime
            // position: djData_keyong.position
            // camera: weixinData_keyong.camera,
            // ratio: weixinData_keyong.ratio,
            // use: weixinData_keyong.use
          }
          // tableList_keyong.push(data_keyong)
          tableList_dj.push(data_keyong)
          eventTarget.fire("dataList", { tableList_dj })
          // tableList_duo.push(tableList_keyong)

}

export function add_showfireman() {
   fixedRoute_fire_1 = new mars3d.graphic.FixedRoute({
    name: "步行路线",
    frameRate: 1,
    speed: 5,
    // autoStop: true, // 到达终点自动停止
    clockLoop: true, // 循环播放
    positions: [
      [101.451976, 27.937407, 2703.4],
      [101.453306, 27.937417, 2703.4],
      [101.454976, 27.937427, 2703.4]

    ],
    pauseTime: 0.5,
    camera: {
      type: "gs",
      radius: 300
    },
    model: {
      url: "//data.mars3d.cn/gltf/mars/man/walk.gltf",
      scale: 5,
      minimumPixelSize: 50,
      clampToGround: true
    },
    circle: {
      radius: 10,
      materialType: mars3d.MaterialType.CircleWave,
      materialOptions: {
        color: "#ffff00",
        opacity: 0.3,
        speed: 10,
        count: 3,
        gradient: 0.1
      },
      clampToGround: true
    }
  })

   fixedRoute_fire_2 = new mars3d.graphic.FixedRoute({
    name: "步行路线",
    frameRate: 1,
    speed: 10,
    // autoStop: true, // 到达终点自动停止
    clockLoop: true, // 循环播放
    positions: [
      [101.407571, 27.976893, 3857]
    ],
    pauseTime: 0.5,
    camera: {
      type: "gs",
      radius: 300
    },
    model: {
      url: "//data.mars3d.cn/gltf/mars/man/walk.gltf",
      scale: 5,
      minimumPixelSize: 50,
      clampToGround: true
    },
    circle: {
      radius: 10,
      materialType: mars3d.MaterialType.CircleWave,
      materialOptions: {
        color: "#ffff00",
        opacity: 0.3,
        speed: 10,
        count: 3,
        gradient: 0.1
      },
      clampToGround: true
    }
  })

   fixedRoute_fire_3 = new mars3d.graphic.FixedRoute({
    name: "步行路线",
    frameRate: 1,
    speed: 10,
    // autoStop: true, // 到达终点自动停止
    clockLoop: true, // 循环播放
    positions: [
      [101.426195, 27.904045, 2272.9]
    ],
    pauseTime: 0.5,
    camera: {
      type: "gs",
      radius: 300
    },
    model: {
      url: "//data.mars3d.cn/gltf/mars/man/walk.gltf",
      scale: 5,
      minimumPixelSize: 50,
      clampToGround: true
    },
    circle: {
      radius: 10,
      materialType: mars3d.MaterialType.CircleWave,
      materialOptions: {
        color: "#ffff00",
        opacity: 0.3,
        speed: 10,
        count: 3,
        gradient: 0.1
      },
      clampToGround: true
    }
  })
  graphicLayer.addGraphic(fixedRoute_fire_1)
  graphicLayer.addGraphic(fixedRoute_fire_2)
  graphicLayer.addGraphic(fixedRoute_fire_3)

   fixedRoute_fire_1.start()
  
  // fixedRoute_fire_2.start()

  // fixedRoute_fire_3.start()

}

export function fire_Clear(): void {
  // graphicLayer.clear(fixedRoute_fire_1)
  graphicLayer.removeGraphic(fixedRoute_fire_1)
  graphicLayer.removeGraphic(fixedRoute_fire_2)
  graphicLayer.removeGraphic(fixedRoute_fire_3)
  map.flyToGraphic(scrollWall, {
    radius: 17511.4
  }
  )
}

// 添加火焰效果
function addDemoGraphic4(graphicLayer) {
  const firePoint1 = new mars3d.graphic.ParticleSystem({ // 一级火点
    position: Cesium.Cartesian3.fromDegrees(101.442872, 27.911964, 117.8),
    style: {
      image: "./img/particle/fire2.png",
      particleSize: 30, // 粒子大小（单位：像素）
      emissionRate: 200, // 发射速率 （单位：次/秒）
      maxHeight: 200000, // 超出该高度后不显示粒子效果
      speed: 15,
      startColor: new Cesium.Color(1, 1, 1, 1), // 开始颜色
      endColor: new Cesium.Color(0.5, 0, 0, 0), // 结束颜色
      startScale: 3.0, // 开始比例（单位：相对于imageSize大小的倍数）
      endScale: 1.5, // 结束比例（单位：相对于imageSize大小的倍数）
      minimumSpeed: 20.0, // 最小速度（单位：米/秒）
      gravity: 50,
      maximumSpeed: 25.0 // 最大速度（单位：米/秒）
    },
    attr: { remark: "火焰粒子效果1" } 
  })
  graphicLayer.addGraphic(firePoint1)

  // 演示个性化处理graphic
  initGraphicManager(firePoint1)
}

function addDemoGraphic5(graphicLayer) {
  const cities = [
    { name: "二级火点-1", lon: 101.487741, lat: 27.901914 },
    { name: "二级火点-2", lon: 101.45417, lat: 27.910557 },
    { name: "二级火点-3", lon: 101.416448, lat: 27.907239 },
    { name: "二级火点-4", lon: 101.433749, lat: 27.939323 },
    { name: "二级火点-5", lon: 101.436074, lat: 27.917293 },
    { name: "二级火点-6", lon: 101.386248, lat: 27.958096 },
    { name: "二级火点-7", lon: 101.419372, lat: 27.930455 },
    { name: "二级火点-8", lon: 101.480663, lat: 27.983014 }
  ]
  for (let i = 0; i < cities.length; i++) {
    const item = cities[i]

    const firePoint2 = new mars3d.graphic.ParticleSystem({ // 二级火点
      position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat, 117.8),
      style: {
        image: "./img/particle/fire2.png",
        particleSize: 10, // 粒子大小（单位：像素）
        emissionRate: 250, // 发射速率 （单位：次/秒）
        maxHeight: 200000, // 超出该高度后不显示粒子效果
        
        startColor: new Cesium.Color(1, 1, 1, 1), // 开始颜色
        endColor: new Cesium.Color(0.5, 0, 0, 0), // 结束颜色
        startScale: 3.0, // 开始比例（单位：相对于imageSize大小的倍数）
        endScale: 1.5, // 结束比例（单位：相对于imageSize大小的倍数）
        minimumSpeed: 7.0, // 最小速度（单位：米/秒）
        gravity: 30,
        maximumSpeed: 9.0 // 最大速度（单位：米/秒）
      },
      attr: { remark: "火焰粒子效果2" }
    })
    graphicLayer.addGraphic(firePoint2)
  }
}

// 坐标转换
export function defultPoint() {
  const point = map.getCenter()
  point.format()
  return {
    lng: point.lng,
    lat: point.lat,
    alt: point.alt
  }
}

// 坐标转化的三种方法
export function marsUtilFormtNum(item: number, num: number) {
  return mars3d.Util.formatNum(item, num)
}

export function marsPointTrans(item: number) {
  return mars3d.PointTrans.degree2dms(item)
}

export function marsProj4Trans(JD: number, WD: number, radio: string) {
  if (radio === "2") {
    return mars3d.PointTrans.proj4Trans([JD, WD], mars3d.CRS.EPSG4326, mars3d.CRS.CGCS2000_GK_Zone_6)
  } else {
    return mars3d.PointTrans.proj4Trans([JD, WD], mars3d.CRS.EPSG4326, mars3d.CRS.CGCS2000_GK_Zone_3)
  }
}

// 转换成十进制的方法
export function marsDms2degree(du: number, fen: number, miao: number) {
  return mars3d.PointTrans.dms2degree(du, fen, miao)
}
export function marsZONEtoCRS(jd: number, wd: number, radio: string) {
  if (radio === "2") {
    return mars3d.PointTrans.proj4Trans([jd, wd], mars3d.CRS.CGCS2000_GK_Zone_6, mars3d.CRS.EPSG4326)
  } else {
    return mars3d.PointTrans.proj4Trans([jd, wd], mars3d.CRS.CGCS2000_GK_Zone_3, mars3d.CRS.EPSG4326)
  }
}

// 地图选点
export function bindMourseClick() {
  map.setCursor("crosshair")
  map.once(mars3d.EventType.click, function (event: any) {
    map.setCursor("")
    const cartesian = event.cartesian
    const point = mars3d.LngLatPoint.fromCartesian(cartesian)
    point.format() // 经度、纬度、高度
    eventTarget.fire("clickMap", { point })
    updateMarker(false, point.lng, point.lat, point.alt)
  })
}

let pointEntity: any
export function updateMarker(hasCenter: boolean, jd: number, wd: number, alt: number) {
  const position = [jd, wd, alt]

  if (pointEntity == null) {
    pointEntity = new mars3d.graphic.PointEntity({
      position: position,
      style: {
        color: "#3388ff",
        pixelSize: 10,
        outlineColor: "#ffffff",
        outlineWidth: 2
      }
    })
    map.graphicLayer.addGraphic(pointEntity)
  } else {
    pointEntity.position = position
  }

  if (hasCenter) {
    pointEntity.flyTo({ radius: 1000 })
  }
}
