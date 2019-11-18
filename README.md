hotel
===
## 说明
实训阶段第一次项目答辩-酒店管理系统前端页面,项目结构使用vue-cli自动生成,由npm打包构建,配合后端ssh项目使用

## 所用技术栈
Vue + Axios + Element

## 项目结构划分
源码在src文件夹下  
`components文件夹内有组件,(HeaderBar是页头状态栏,负责显示登录信息等,LeftBar是左侧导航栏)
views内为主要页面
router.js记录项目路由和前端的权限控制
store.js同为权限控制
`
## 如何运行
1.安装必要环境,Node.js、npm(node自带)
2.cd hotel && npm run serve

## 如何打包为HTML文件
cd hotel && npm run build


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
