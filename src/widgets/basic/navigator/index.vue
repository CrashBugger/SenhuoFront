<template>
    <mars-dialog :draggable="false" left="500px" customClass="base-pannel">
      <!-- 系统 -->
        <div style="display: inline;">
          <img src="/favicon.ico" alt="" style="height:50px; width:50px; display: inline;">
          <p style="display: inherit;margin: 0 2% 0 2%;">森火智慧平台</p>
          <!-- <p style="display: inherit;margin: 0 2% 0 2%;">Forest Intelligence System</p> -->
        </div>
      <!-- 主组 -->
      <template v-for="(item, i) in data" :key="i">
        <div v-if="item.widget && !item.children" class="toolbar-item" @click="showWidget(item.widget)">
          <mars-icon :icon="item.icon" width="18"></mars-icon>
          <span class="title">{{ item.name }}</span>
        </div>
        <!-- 下拉框 -->
        <mars-dropdown-menu v-if="item.children && !item.widget" trigger="hover" placement="bottomRight">
          <div class="toolbar-item">
            <mars-icon :icon="item.icon" width="18"></mars-icon>
            <span class="title">{{ item.name }}</span>
            <mars-icon icon="down" width="18"></mars-icon>
          </div>
          <template #overlay>
            <a-menu @click="clickMenu">
              <a-menu-item v-for="child in item.children" :key="child.widget" :title="child.name">
                <mars-icon :icon="child.icon" width="18"></mars-icon>
                <span>{{ child.name }}</span>
              </a-menu-item>
            </a-menu>
          </template>
        </mars-dropdown-menu>
      </template>
    </mars-dialog>
  </template>
  
  <script setup lang="ts">
  
  import { useWidget } from "@mars/common/store/widget"
  
  const { activate } = useWidget()
  
  const data = [
    // { name: "底图", icon: "international", widget: "manage-basemap" },
    // { name: "图层", icon: "layers", widget: "manage-layers" },
    { 
      name: "卫星漫游",
      icon: "hand-painted-plate", 
      children: [
          { name: "自动划分", icon: "hand-painted-plate", widget: "satellite-running" }
          // { name: "", icon: null, widget: null }
      ] 
    },
    { 
     name: "机群追踪",
     icon: "take-off",
     children: [
      { name: "扫描火区", icon: "mark", widget: "firepoint" },
      { name: "实时更新火区范围", icon: "connection", widget: "firepoint_more" }
  ]
},
    // { name: "坐标定位", icon: "local", widget: "location-point" },
    { name: "高塔扫描", icon: "layers", widget: "tower" },
    { name: "多无人机搜索", icon: "take-off", widget: "random-aircraft" },
    { name: "火情统计", icon: "full-screen-play", widget: "fire-graph" }
  ]
  
  
  
  const showWidget = (widget: string) => {
    activate(widget)
  }
  
  const clickMenu = ({ key }: any) => {
    showWidget(key)
  }
  </script>
  
  <style lang="less">
  .base-pannel {
    padding: 0 !important;
    background-image: none !important;
    border: 1px solid;
    border: none;
    border-radius: 2px !important;
    // background-color: var(--mars-bg-base);
    background-color: rgba(3, 33, 23, 1);
  ;
    height: 80px;
  
    .toolbar-item {
      display: inline-block;
      padding: 6px 12px;
      height: 100%;
      color: var(--mars-text-color);
      // color: rgba(3, 33, 23, 1);
      font-size: 30px;
  
      &:hover {
        background-color: var(--mars-select-bg);
      }
    }
  
    .mars-icon {
      margin-right: 5px;
      color: var(--mars-text-color);
    }
  }
</style>
