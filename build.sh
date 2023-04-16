#!/bin/sh
# 前端应用存在NPM依赖时的默认编译脚本
npm install
npm run build
npm install
npm install @kjgl77/datav-vue3
npm run serve
