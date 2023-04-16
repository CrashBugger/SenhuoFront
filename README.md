<h1 align=center>疾于星火软件平台————前端开发白皮书</h1>

[toc]

## 项目介绍

疾于星火智慧平台前端开发指导手册，有问题请咨询 梁启凡（Q：2436952514，wx：13693191713）毛子昊（Q：2074128305，wx：13026559186）
后端开发白皮书详见 <a herf="./README.md">《疾于星火软件平台————后端开发白皮书》</a>

项目技术选型：nodejs v14.18.0+, 基于Vue 3.0, eslint 7.32.0, ts 4.5.5, vite 2.9.14

## 私货

> 关于开发并不是一时半会儿说得完的，在这样一篇短短的readme中当然也是一样，作为一个半开源项目模板，这个内容本身对于初学者来说并不友好，虽然其中的注释已经相对详尽，但更多的只是提示了那个字段分别代表什么意义
>
> 于是我用几天的时间给我认为代码中不好理解的地方添加了注释，包括给定的函数为什么这样写、函数传参及runtime过程，代码中可以引用以及需要自己改写的部分
> 
> 而且本着不要重复造轮子的原则，一切vue及相关组件的库接口我都不会在这本白皮书里详说，只是对我认为（划重点）比较耗时间的地方给大家写了。
> 
> 希望对有志于在软件方面想要更多的提升自己能力的朋友们有所帮助，我相信这也是除了比赛拿奖外，我们能在一起走过的这些日子里留下的更加重要的财富
>

## 下载与调试运行（开发环境）

### 下载代码

- [Gitee](https://gitee.com/simon_leong/senhuo-smart-platform.git)选择develop分支（latest stable）

```
git clone git@gitee.com:marsgis/mars3d-vue-project.git
```

### 运行环境

- 推荐使用 vscode，安装参考[开发环境搭建教程](/guide/start/env.html)
- 安装 vscode 插件，推荐安装 volar（并禁用 vetur）、ESlint 、 Prettier
- 配置 vscode 参数
- 配置nginx服务器，增添对应json文件
```json
// setting.json相关配置
{
  "eslint.format.enable": true,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 运行命令
请将机器Node版本升级到v14及以上版本

#### 首次运行前安装依赖
#### 首次运行请根据mars3d官网配置nginx服务器，并与联系人联系获得无人机路径等对应的json文件（无后端环境下）
```
npm install
npm install @kjgl77/datav-vue3

//或使用代理
npm i --registry=http://registry.taobao.org
```

#### 启动开发环境

```
npm run serve
```

#### 编译构建【请后端同学负责】

```
npm run build
npm run serve:dist  //测试dist运行状态
```



## 浏览器支持

推荐使用`Chrome 90+` 浏览器， 建议升级浏览器到最新版本访问。

| IE | Edge | Firefox | Chrome | Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 如何反馈问题？

- 发现您发现项目中存在的问题或者需要优化的地方；
- 如果您有一些自己全新编写的示例，希望也开源与大家分享。

提交方式：

- 欢迎在 github 或 gitee 上[提交 PR](https://www.baidu.com/s?wd=在GitHub上提交PR)
- 如果对 git 不熟悉，也可以整理示例代码联系项目管理员，或发送邮件到 【我们平台的邮箱】 由我们来整理集成。

## 项目架构

### 技术选型

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) ：项目开发环境 
- [Vue3](https://v3.cn.vuejs.org/api/)：开发框架
- [Vite](https://vitejs.dev/)：开发环境
- [TypeScript](https://www.tslang.cn/):开发语言
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Ant Design Vue](https://next.antdv.com/components/overview-cn/)：UI 控件库 
- [ESlint](https://eslint.bootcss.com/)：代码检查工具
- [IconPark](https://iconpark.oceanengine.com/official)：UI 图标库 

### 主要目录说明

```
mars3d-vue-project
└───src                 主要项目代码
│   └───common          公共核心文件
│   └───components      公共组件
│         └──── store   功能定义接口文件，使用vuex管理状态   
│         └──── uses    生命周期模块化
│
│   └───misc            ts模块定义
│   └───pages           页面入口
│   └───utils           工具方法
│   └───widget          功能相关的widget控件【重要】
│
└───public              静态资源
│   └───config          地图的配置文件等【初始地图的定义在config.json中】
│   └───img             图片资源
│
│─── .eslintrc.js        eslint配置文件
│─── package.json        项目配置信息
└─── vite.config.ts      vite 配置文件
└─── tsconfig.js         ts 配置文件
└─── *.html              各页面入口【只保留根页面index.html】
```
> 说明：
>   public文件夹不经由webpack进行打包，而是直接复制到根目录下，因此在引用静态资源时请注意url编写方式
>   src下的assets文件夹中的资源经由webpack打包，引用时注意路径和require()

#### widget

##### widget 配置参数

widget 加载相关的代码在 `src/common/store/widget.ts`下，使用的 vuex 管理相关状态，默认状态字段有

```ts
// 为 store state 声明类型
export interface DefaultOption {
  ...
}

export interface Widget {
  ...
}

// 这个直接
export interface WidgetState {
  widgets: Widget[] // widget具体配置
  openAtStart: string[] // 默认加载的widget
  defaultOption?: DefaultOption // 支持配置默认参数
}
```

### widget 构流程图

示例的内部构造处理流程图：

![image](http://mars3d.cn/dev/img/guide/project-vue-liu.jpg)

## 如何增加新的 widget

下面我们以 `src/widgets/demo/sample-dialog/` 为示例做讲解

### 1.创建示例

在 widgets 目录下按项目需要建立好多层目录，比如我们将测试和演示的 widget 放在`src/widgets/demo`目录下面，基础项目的功能放在`src/widgets/basic`目录下。

首先建立后 sample-dialog 目录，并参考已有示例新建`index.vue` 和 `map.ts` 2 个文件。

#### index.vue

index.vue 完整代码为：

```vue
<template>
  <mars-dialog title="弹窗标题" width="300" height="400" top="400" bottom="10" :right="10">
    <a-row :gutter="5">
      <a-col :span="19">
        <mars-input v-model:value="extent" :allowClear="true"></mars-input>
      </a-col>
      <a-col :span="5">
        <a-space size="small">
          <mars-button class="small-btn" @click="onClickDrawExtent">绘制</mars-button>
        </a-space>
      </a-col>
    </a-row>
    <template #icon>
      <bookmark-one theme="outline" size="18" />
    </template>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import MarsDialog from "@mars/components/mars-work/mars-dialog.vue"
import * as mapWork from "./map"

// 启用map.ts生命周期
useLifecycle(mapWork)

const extent = ref("")

// 渲染模型
const onClickDrawExtent = () => {
  // formState.extent = "测试组件内部数据是否响应"
  mapWork.drawExtent()
}
mapWork.eventTarget.on("drawExtent", function (event: any) {
  extent.value = event.extent
})

onUnmounted(() => {
  // 销毁操作
})
</script>
<style lang="less"></style>
```

其中：

##### mars-dialog.vue

mars-dialog 是弹窗组件，我们 widget 内可以按需选择下面 2 个使用：

- mars-dialog 弹框 组件: `src/components/mars-work/mars-dialog.vue` 

mars-dialog 支持的配置参数包括：

```ts
interface Props {
  warpper?: string // 容器id 默认是app，将作为定位的参照元素，一般不需要修改
  title?: string // 弹框标题
  visible: boolean // 是否显示
  width?: number | string // 初始宽度
  height?: number | string // 初始高度
  left?: number | string // 定位 left值
  right?: number | string // 定位right值
  top?: number | string // 定位top值
  bottom?: number | string // 定位bottom值
  handles?: boolean | string // 缩放控制器 默认 [x, y, xy]
  minWidth?: number // 最小宽度
  minHeight?: number // 最小高度
  maxWidth?: number // 最大宽度
  maxHeight?: number // 最大高度
  zIndex?: number // 层级
  customClass?: string // 自定义class
}
```

##### 配置 widget 的 props 参数

widget 的 prop 参数默认有四中配置方式，默认情况下优先级从低到高分别为 内联 prop、defaultOption 中的 props、meta 中的 props 配置，动态传参，使用方式如下

```html
<!-- 内联 -->
<mars-dialog title="图上量算" width="300" height="530" top="50"></mars-dialog>
```

```js
// defaultOption中 注意 必须是meta
const store: StoreOptions<State> = {
  state: {
    defaultOption: {
      meta: {
        props: {
          top: 110
        }
      }
    },
    widgets: []
  }
}
```

```js
// meta中
widgets = [
  {
    component: markRaw(defineAsyncComponent(() => import("@mars/widgets/hello.vue"))),
    name: "hello",
    autoDisable: true,
    meta: {
      props: {
        top: 70
      }
    }
  }
]
```

```js
// 动态传参
activate({
  name: "hello",
  data: {
    props: {
      top: 70
    }
  }
})
```

> 以上均为默认情况下的处理，再某些特殊情况下，可以在 widget 中通过下面这种方式，强制将内联 props 的优先级提升到最高

```html
<mars-dialog v-bind="attrs" title="hello" width="300" height="530" top="50" :right="10" :min-width="297"></mars-dialog>

<script>
  import { useAttrs } from "vue"
  const attrs = useAttrs()
</script>
```

##### useLifecycle

vue 中需要调用地图方法时，需得启用 map.ts 的生命周期，并且在 map.ts 生命周期中获取 map 对象。

```js
// vue中
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"

// 启用map.ts生命周期
useLifecycle(mapWork)
```

> 注意：
>
> 1. 开启生命周期的操作只需要在 index.vue 中执行，子组件不需要
> 2. 尽量不要在 vue 的生命周期中操作 map，或者调用 map.ts 中操作 map 的函数，此时操作不能保证 map 存在

#### map.ts

map.ts 完整代码为：

```ts
import * as mars3d from "mars3d"

export let map: mars3d.Map // 地图对象

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars3d.BaseClass()

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map
}

// 释放当前业务
export function onUnmounted(): void {
  map = null
}

// 绘制矩形（演示map.js与index.vue的交互）
export function drawExtent(): void {
  map.graphicLayer.clear()
  // 绘制矩形
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fill: true,
      color: "rgba(255,255,0,0.2)",
      outline: true,
      outlineWidth: 2,
      outlineColor: "rgba(255,255,0,1)"
    },
    success: function (graphic: mars3d.graphic.RectangleEntity) {
      const rectangle = graphic.getRectangle({ isFormat: true })
      eventTarget.fire("drawExtent", { extent: JSON.stringify(rectangle) }) // 抛出事件，可以vue中去监听事件
    }
  })
}
```

其中：

##### onMounted

初始化当前地图业务的钩子方法，可以通过 onMounted 函数的获取到 map 主对象。

```js
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map 初始化当前业务
}
```

如果未调用，请请参考之前的步骤，检查是否正常使用`useLifecycle(mapWork)`启用生命周期

##### onUnmounted

释放当前地图业务的钩子方法,
一般在 onMounted 添加的图层、绑定的事件，在 onUnmounted 中都需要做相反的移除、解绑等操作。

```js
export function onUnmounted(): void {
  map = null // 释放当前业务
}
```

#### `map.ts`和`index.vue`各自代码业务分离的原则

- 涉及地图业务的操作均写在 map.ts 中
- 涉及 UI 层面、和地图无关的操作均写在 index.vue 中,vue 中尽量不使用 mars3d 和 Cesium 开头的类

#### index.vue 与 map.ts 交互

1. index.vue 直接调用 map.ts 中 导出的函数或对象
2. index.vue 调用 map.ts 中的函数拿到返回值，继续后续处理，异步操作返回值可以是 Promise
3. map.ts 主动触发 ui 变化，通过 mars3d.BaseClass 事件中心处理。如

```ts
// map.ts
export const eventTarget = new mars3d.BaseClass()

function change() {
  mapWork.eventTarget.fire("change", { value: "hello change" })
}

// index.vue
import * as mapWork from "./map"
const change = (e: any) => {
  console.log(e)
}
mapWork.eventTarget.on("change", change)

onUnmounted(() => {
  mapWork.eventTarget.off("change", change) // 注意：请及时销毁事件绑定
})
```

### 2.相关页面加入菜单入口

#### store.ts 清单配置

在对应 page 页面下的 widget-store.ts` 中，需要配置刚才新建的 widget 相关信息；

```js
import { defineAsyncComponent, markRaw } from "vue"
import { WidgetState } from "@mars/common/store/widget"
import { StoreOptions } from "vuex"

const store: StoreOptions<WidgetState> = {
  state: {
    //已忽略其他配置
    widgets: [
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sample-dialog/index.vue"))),
        name: "sample-dialog"
      }
    ]
  }
}
export default store
```

> 其中 state 下的配置参数参考 `widget 配置参数`

> 更多参数建议阅读源码的 `src/common/store/widget.ts` (教程可能滞后，请参考源码注释为准)

#### 菜单或其他入口文件中

在需要的菜单单击事件或其他对象触发代码中，加入`activate('sample-dialog')`来激活我们刚加入的控件，

下面已目录为例：

在`widgets/demo/menu/index.vue`中加入“弹窗示例”按钮，按钮单击事件调用对应方法，

activate 和 disable 函数支持 string（直接传递 name） 和 Widget（传递 widget 对象，将会合并传递的属性，必须包含 name 字段） 类型的参数，上述 name 字段与 store.ts 中的 name 需要一致。

```vue
<template>
  <mars-dialog :draggable="false">
    <a-space>
      <mars-button @click="show('sample-pannel')">面板示例</mars-button>
      <mars-button @click="show('sample-dialog')">弹窗示例</mars-button>
      <mars-button @click="show('ui')">UI面板</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import MarsDialog from "@mars/components/mars-work/mars-dialog.vue"
import { useWidget } from "@mars/common/store/widget"

const { activate } = useWidget()

const show = (name: string) => {
  activate(name)
  // 或
  activate({
    name
  })
}
</script>
<style lang="less"></style>
```

## 开发中常见问题

### 1. 局域网离线使用时注意事项

平台所有代码层面来说支持离线运行和使用，但需要注意的是离线时的地图服务的相关处理。

如果局域网内有相关地形、卫星底图服务可以按内网服务类型和 URL 地址替换下`config.json`或`构造Map的代码中`的默认地形和底图。


离线部署部分图文件被放置在public文件夹下，并在打包发布时放置在应用根路径下，因此引用离线库、使用缩略图、引用已有样式时，可以使用离线库中的代码，离线库代码同时维护了three.js的内容


### 2. 打包路径找不到静态文件问题

注意，public路径下的内容将被直接复制到根路径下，并且不参与webpack，也就是说不应使用require接口来进行相关的所以静态资源的路径,直接使用原值即可

## Mars3D SDK说明

### 问题日志

- Tle命名空间未导出, 提问题到Mars3d的issue
  

## 项目执行路线

首先在index.html中放置一个div，给定id为app，然后加载main.ts【main.ts中的执行语句的作用域都是全局的，其实所有的ts文件代码执行都是全局作用域】
```ts
const app = createApp(Application)
// 创建应用实例
MarsUIInstall(app)
// 引入所有的ui组件，详见补充知识
```
> 这里存在的问题：
> Vue2和Vue3在创建应用实例的时候有所区别的地方，Vue2的全局API并不能区分不同的vue实例，因为全局API是可以直接被访问的，所以全局组件注册是发生在实例创建之前的，所有创建的实例都受这些全局API更改设置的管辖
>

```ts
// 这里把所有组件的Store注册成了一个全局的插件，并且把key传给插件做参数
app.use(injectState(store), key)
// 挂载
app.mount("#app")
```

```vue
<template>
<!-- mars-work写好的组件 -->
  <main-view />
</template>

<script setup lang="ts">
import MainView from "@mars/components/mars-work/main-view.vue"
</script>
```

main-view里包含两个局部注册的组件, 都放在主组件的同目录下,一个是map

## 补充知识

### UI库的引用
```ts
export default function (app: App, config: Record<string, any> = {}): App {
  marsUIConfig = config
  app.use(AutoComplete)
  app.use(Row)
// 引用ant-design-vue写好的ui框架，此处省略ant-design的其他插件【关于use的请查阅vue官方文档】

// 前文有过引用mars-ui目录下写好的所有UI组件，这里是把它在全局组件里都注册一遍，这样是可以，也可以选择每个自定义组件再局部注册
  components.forEach((comp) => {
    app.component(comp.name, comp)
  })

// 功能性组件配置，拿MarsMessage举个例子
// 这一部分注册仅是为了方便选项式API加上的，因此以后每次用倒这四个方法的时候，还要从ui库中重引一次
  MarsMessage(app)
  MarsAlert(app)
  MarsNotify(app)
  MarsLoading(app)
  return app
}
```

给我们提供了一种方式，如何用已有的ui框架扩展我们自己的。后面ui图出来之后有可能mars3d给的ui组件就用不了了，开发的同学请根据UI形成一套自己的组件库。
UI框架（插件）按需导入、自己写的注册为组件，修改全局属性

### vuex的使用【以widget为例】

```ts
declare module "@mars/common/store/widget"{
  ...
}
```
1. ts声明模块，declare关键字，用于在.d.ts文件中声明各种模块和类型
2. module：
   [https://www.tslang.cn/docs/handbook/modules.html]
   module是JS模块化工具的最小单位，原本默认单文件是一个模块，但是显然这并不构成一个限制
3. widget：
```ts
import { Store, StoreOptions } from "vuex"
import { InjectionKey, ComputedRef } from "vue"

export const key: InjectionKey<Store<WidgetState>>
// Injectionkey：vue提供的一种类型，用来给ts提供类型判别依赖注入时的类型支持，泛型规定的类型就是key必须服从的类型

```

其实这个地方最麻烦的地方是widget.js不开源，所以对于vuex不像他给的实例中的内容体现的那么明显，很多东西只能靠猜。

考虑一下vuex在可接触源码的部分并没有使用createstore接口来生成，那么看参数来讲就应该是usewidgetstore内部根据page目录下的widget-store进行状态管理

```ts
const store: StoreOptions<WidgetState>
// 泛型定义类型，接口在widget.d.ts
```

返回来说usewidgetstore，感觉这里的类型定义很怪，但因为是开源的不知道人家是怎么实现的，我觉得他应该是个函数类型并且标明返回类型是
```ts
const useWidgetStore: () => Store<WidgetState>
```

所以我们就发现功能上分析到了，那这个就也是可以重写的，真正不可以覆盖的东西只有sdk库里给定的接口

> page目录的问题
> 后续根据之前安排的需求，会分成不同的页面，那么每个页面请在src/pages目录下建立一个文件夹放相关代码，并且使用vue-router来进行路由
>

4. 具体使用方法：
去看源码中的注释，使用方法详见vuex官方文档

### utils

这个目录一般放的是全局应该能访问到的方法