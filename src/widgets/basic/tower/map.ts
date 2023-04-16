import * as mars3d from "mars3d"
import { Cesium } from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象
let scrollWall = null
let tableList_tw = []
let graphic_1 = null
let graphic_2 = null
let graphic_3 = null
let graphic_4 = null
let graphicModel_1 = null
let graphicModel_2 = null
let graphicModel_3 = null
let graphicModel_4 = null
let rotatePoint
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 27.88, lng: 101.42, alt: 2832, heading: 359, pitch: -50 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

    // 创建矢量数据图层
    graphicLayer = new mars3d.layer.GraphicLayer()
    map.addLayer(graphicLayer)
  
    // 在layer上绑定监听事件
    graphicLayer.on(mars3d.EventType.click, function (event) {
      console.log("监听layer，单击了矢量对象", event)
    })
    bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效
    bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  
  map.addLayer(graphicLayer)
  show_senhuo()
  // 加一些演示数据
  addDemoGraphic3(graphicLayer)
  addDemoGraphic4(graphicLayer)
  addDemoGraphic5(graphicLayer)
  addDemoGraphic7(graphicLayer)
  addDemoGraphic8(graphicLayer)
  addDemoGraphic9(graphicLayer)
  addDemoGraphic10(graphicLayer)
  addDemoGraphic11(graphicLayer)

  startAnimation()

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
  map = null
  graphicLayer.remove()
  graphicLayer = null
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

export function startAnimation() {
    map.openFlyAnimation({ 
        center: { lat: 27.85, lng: 101.437, alt: 13390.5, heading: 359, pitch: -50 },
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

function addDemoGraphic4(graphicLayer) {
  let _rotation = Math.random()

  graphic_1 = new mars3d.graphic.CircleEntity({
    position: Cesium.Cartesian3.fromDegrees(101.435431, 27.978300, 27.88),
    style: {
      radius: 1500.0,
      // 扫描材质
      materialType: mars3d.MaterialType.CircleScan,
      materialOptions: {
        image: "img/textures/circle-scan.png",
        color: "#00ff00"
      },
      stRotation: new Cesium.CallbackProperty(function (e) {
        _rotation -= 0.02
        return _rotation
      }, false),
      classificationType: Cesium.ClassificationType.BOTH,
      clampToGround: true // 是否贴地
    },
    attr: { remark: "示例4" }
  })

   graphic_2 = new mars3d.graphic.CircleEntity({
    position: Cesium.Cartesian3.fromDegrees(101.504038, 27.944161, 27.88),
    style: {
      radius: 1500.0,
      // 扫描材质
      materialType: mars3d.MaterialType.CircleScan,
      materialOptions: {
        image: "img/textures/circle-scan.png",
        color: "#00ff00"
      },
      stRotation: new Cesium.CallbackProperty(function (e) {
        _rotation -= 0.02
        return _rotation
      }, false),
      classificationType: Cesium.ClassificationType.BOTH,
      clampToGround: true // 是否贴地
    },
    attr: { remark: "示例4" }
  })

   graphic_3 = new mars3d.graphic.CircleEntity({
    position: Cesium.Cartesian3.fromDegrees(101.386694, 27.904974, 27.88),
    style: {
      radius: 1500.0,
      // 扫描材质
      materialType: mars3d.MaterialType.CircleScan,
      materialOptions: {
        image: "img/textures/circle-scan.png",
        color: "#00ff00"
      },
      stRotation: new Cesium.CallbackProperty(function (e) {
        _rotation -= 0.02
        return _rotation
      }, false),
      classificationType: Cesium.ClassificationType.BOTH,
      clampToGround: true // 是否贴地
    },
    attr: { remark: "示例4" }
  })

   graphic_4 = new mars3d.graphic.CircleEntity({
    position: Cesium.Cartesian3.fromDegrees(101.438979, 27.922258, 27.88),
    style: {
      radius: 1500.0,
      // 扫描材质
      materialType: mars3d.MaterialType.CircleScan,
      materialOptions: {
        image: "img/textures/circle-scan.png",
        color: "#00ff00"
      },
      stRotation: new Cesium.CallbackProperty(function (e) {
        _rotation -= 0.02
        return _rotation
      }, false),
      classificationType: Cesium.ClassificationType.BOTH,
      clampToGround: true // 是否贴地
    },
    attr: { remark: "示例4" }
  })

  graphicLayer.addGraphic(graphic_1)
  graphicLayer.addGraphic(graphic_2)
  graphicLayer.addGraphic(graphic_3)
  graphicLayer.addGraphic(graphic_4)

}

function addDemoGraphic5(graphicLayer) {
  let _rotation = Math.random()
  
  const graphic_1 = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(101.434431, 27.978300, 27.88),
    style: {
      radius: 700.0,
      materialType: mars3d.MaterialType.CircleScan,
      materialOptions: {
        // 扫描材质
        image: "img/textures/circle-two.png",
        color: "#5fc4ee"
      },
      stRotation: new Cesium.CallbackProperty(function (e) {
        _rotation += 0.01
        return _rotation
      }, false),
      classificationType: Cesium.ClassificationType.BOTH,
      clampToGround: true // 是否贴地
    },
    attr: { remark: "示例5" }
  })

  const graphic_2 = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(101.504038, 27.944161, 27.88),
    style: {
      radius: 700.0,
      materialType: mars3d.MaterialType.CircleScan,
      materialOptions: {
        // 扫描材质
        image: "img/textures/circle-two.png",
        color: "#5fc4ee"
      },
      stRotation: new Cesium.CallbackProperty(function (e) {
        _rotation += 0.01
        return _rotation
      }, false),
      classificationType: Cesium.ClassificationType.BOTH,
      clampToGround: true // 是否贴地
    },
    attr: { remark: "示例5" }
  })

  const graphic_3 = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(101.386694, 27.904974, 27.88),
    style: {
      radius: 700.0,
      materialType: mars3d.MaterialType.CircleScan,
      materialOptions: {
        // 扫描材质
        image: "img/textures/circle-two.png",
        color: "#5fc4ee"
      },
      stRotation: new Cesium.CallbackProperty(function (e) {
        _rotation += 0.01
        return _rotation
      }, false),
      classificationType: Cesium.ClassificationType.BOTH,
      clampToGround: true // 是否贴地
    },
    attr: { remark: "示例5" }
  })

  const graphic_4 = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(101.438979, 27.922258, 27.88),
    style: {
      radius: 700.0,
      materialType: mars3d.MaterialType.CircleScan,
      materialOptions: {
        // 扫描材质
        image: "img/textures/circle-two.png",
        color: "#5fc4ee"
      },
      stRotation: new Cesium.CallbackProperty(function (e) {
        _rotation += 0.01
        return _rotation
      }, false),
      classificationType: Cesium.ClassificationType.BOTH,
      clampToGround: true // 是否贴地
    },
    attr: { remark: "示例5" }
  })


  graphicLayer.addGraphic(graphic_1)
  graphicLayer.addGraphic(graphic_2)
  graphicLayer.addGraphic(graphic_3)
  graphicLayer.addGraphic(graphic_4)

}

function addDemoGraphic3(graphicLayer) {

     graphicModel_1 = new mars3d.graphic.ModelPrimitive({
        position: Cesium.Cartesian3.fromDegrees(101.434431, 28.015300, 27.88),
        style: {
          url: "//data.mars3d.cn/gltf/imap/7f08b9f6b80d4f1ea110f1d4d900978b/gltf/default.gltf",
          scale: 15,
          minimumPixelSize: 50
        },
        attr: { remark: "四角瞭望塔" }
      })

      const point_2 = new mars3d.LngLatPoint(101.519038, 27.966161, 27.88)
     graphicModel_2 = new mars3d.graphic.ModelPrimitive({
        position: point_2,
        style: {
          url: "//data.mars3d.cn/gltf/imap/7f08b9f6b80d4f1ea110f1d4d900978b/gltf/default.gltf",
          scale: 15,
          minimumPixelSize: 50
        },
        attr: { remark: "三柱圆钢防火瞭望塔" }
      })
      graphicLayer.addGraphic(graphicModel_2)

      const point_3 = new mars3d.LngLatPoint(101.377694, 27.915074, 27.88)
     graphicModel_3 = new mars3d.graphic.ModelPrimitive({
        position: point_3,
        style: {
          url: "//data.mars3d.cn/gltf/imap/7f08b9f6b80d4f1ea110f1d4d900978b/gltf/default.gltf",
          scale: 15,
          minimumPixelSize: 50
        },
        attr: { remark: "CFL钢避雷防火塔" }
      })

        graphicModel_4 = new mars3d.graphic.ModelPrimitive({
        position: Cesium.Cartesian3.fromDegrees(101.438979, 27.942258, 27.88),
        style: {
          url: "//data.mars3d.cn/gltf/imap/7f08b9f6b80d4f1ea110f1d4d900978b/gltf/default.gltf",
          scale: 15,
          minimumPixelSize: 50
        },
        attr: { remark: "三角避雷防火塔" }
      })


      graphicLayer.addGraphic(graphicModel_3)
      graphicLayer.addGraphic(graphicModel_2)
      graphicLayer.addGraphic(graphicModel_1)
      graphicLayer.addGraphic(graphicModel_4)

      const tower_keyong_1 = { name: "四角瞭望塔", td_jd: null, td_wd: null, camera_type: null, camera_boduan: null, camera_bian: null }
      tower_keyong_1.td_jd = 101.435431
      tower_keyong_1.td_wd = 27.978300
      tower_keyong_1.camera_type = "球状旋转摄像头"
      tower_keyong_1.camera_boduan = "光学" 
      tower_keyong_1.camera_bian = "10m"

      const tower_keyong_2 = { name: "三柱圆钢防火瞭望塔", td_jd: null, td_wd: null, camera_type: null, camera_boduan: null, camera_bian: null }
      tower_keyong_2.td_jd = 101.504038
      tower_keyong_2.td_wd = 27.944161
      tower_keyong_2.camera_type = "激光监控云台摄像机"
      tower_keyong_2.camera_boduan = "光学" 
      tower_keyong_2.camera_bian = "15m"

      const tower_keyong_3 = { name: "CFL钢避雷防火塔", td_jd: null, td_wd: null, camera_type: null, camera_boduan: null, camera_bian: null }
      tower_keyong_3.td_jd = 101.381694
      tower_keyong_3.td_wd = 27.915074
      tower_keyong_3.camera_type = "Neutrino SX12 中波红外摄像头"
      tower_keyong_3.camera_boduan = "红外" 
      tower_keyong_3.camera_bian = "25m"

      const tower_keyong_4 = { name: "三角避雷防火塔", td_jd: null, td_wd: null, camera_type: null, camera_boduan: null, camera_bian: null }
      tower_keyong_4.td_jd = 101.438979
      tower_keyong_4.td_wd = 27.922258
      tower_keyong_4.camera_type = "激光旋转云台摄像机"
      tower_keyong_4.camera_boduan = "光学" 
      tower_keyong_4.camera_bian = "20m"

    showResult_keyong(tower_keyong_1)
    showResult_keyong(tower_keyong_2)
    showResult_keyong(tower_keyong_3)
    showResult_keyong_push(tower_keyong_4)

}

function showResult_keyong(twData_keyong) {
  // 显示卫星基本信息
          const data_keyong = {
            name: twData_keyong.name,
            longtitude: twData_keyong.td_jd,
            altitude: twData_keyong.td_wd,
            camera_type: twData_keyong.camera_type,
            camera_boduan: twData_keyong.camera_boduan,
            camera_bian: twData_keyong.camera_bian
            // position: djData_keyong.position
            // camera: weixinData_keyong.camera,
            // ratio: weixinData_keyong.ratio,
            // use: weixinData_keyong.use
          }
          // tableList_keyong.push(data_keyong)
          tableList_tw.push(data_keyong)
          // eventTarget.fire("dataList", { tableList_dj })
          // tableList_duo.push(tableList_keyong)
}

function showResult_keyong_push(twData_keyong) {
  // 显示卫星基本信息
          const data_keyong = {
            name: twData_keyong.name,
            longtitude: twData_keyong.td_jd,
            altitude: twData_keyong.td_wd,
            camera_type: twData_keyong.camera_type,
            camera_boduan: twData_keyong.camera_boduan,
            camera_bian: twData_keyong.camera_bian
            // position: djData_keyong.position
            // camera: weixinData_keyong.camera,
            // ratio: weixinData_keyong.ratio,
            // use: weixinData_keyong.use
          }
          // tableList_keyong.push(data_keyong)
          tableList_tw.push(data_keyong)
          eventTarget.fire("dataList", { tableList_tw })
          // eventTarget.fire("dataList", { tableList_dj })
          // tableList_duo.push(tableList_keyong)
}

// 复现跑马灯框和火灾元素
function addDemoGraphic7(graphicLayer) {
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

function addDemoGraphic8(graphicLayer) {
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

function addDemoGraphic9(graphicLayer) {
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

function addDemoGraphic10(graphicLayer) {
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

function addDemoGraphic11(graphicLayer) {
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

export function click_sat_1() {
  map.flyToGraphic(graphicModel_1, {
  radius: 0,
  heading: 180,
  pitch: 0
})
}

export function click_sat_2() {
  map.flyToGraphic(graphicModel_2, {
    radius: 0,
    heading: 180,
    pitch: 0
})
}

export function click_sat_3() {
  map.flyToGraphic(graphicModel_3, {
      radius: 0,
      heading: 180,
      pitch: 0
})
}

export function click_sat_4() {
  map.flyToGraphic(graphicModel_4, {
    radius: 0,
    heading: 180,
    pitch: 0
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

