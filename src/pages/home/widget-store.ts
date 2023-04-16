/**
 * index页面的widget配置
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import { defineAsyncComponent, markRaw } from "vue"
import { WidgetState } from "@mars/common/store/widget"
import { StoreOptions } from "vuex"

const store: StoreOptions<WidgetState> = {
  state: {
    widgets: [
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/navigator/index.vue"))),
        name: "navigator",
        autoDisable: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-basemap/index.vue"))),
        name: "manage-basemap",
        group: "manage"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/index.vue"))),
        name: "manage-layers",
        group: "manage",
        disableOther: ["roamLine"]
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-tree.vue"))),
        name: "layer-tree"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-picture-heatmap.vue"))),
        name: "layer-picture-heatmap"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-picture-guihua.vue"))),
        name: "layer-picture-guihua"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/location-point/index.vue"))),
        name: "location-point",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/satellite-running/index.vue"))),
        name: "satellite-running",
        group: "satellite"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/uav/index.vue"))),
        name: "uav",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/random-aircraft/index.vue"))),
        name: "random-aircraft",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/firepoint/index.vue"))),
        name: "firepoint",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/firepoint_more/index.vue"))),
        name: "firepoint_more",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/fire-graph/index.vue"))),
        name: "fire-graph",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/tower/index.vue"))),
        name: "tower",
        group: "tools"
      }
    ],
    openAtStart: ["navigator"]
  }
}

export default store
