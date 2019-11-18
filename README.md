hotel
===
## 说明
实训阶段第一次项目答辩-酒店管理系统前端页面,项目结构使用[vue-cli](https://cli.vuejs.org/zh/)自动生成,由[npm](https://www.npmjs.cn/)打包构建,配合后端ssh项目使用

## 所用技术栈
[Vue](https://cn.vuejs.org/) + [Axios](http://www.axios-js.com/) + [Element](https://element.eleme.cn/#/)

## 项目结构划分
页面源码在*src*文件夹下  
<code><pre>components文件夹内为组件 - 
                   - HeaderBar.vue是页头状态栏,负责显示登录信息等
                   - LeftBar.vue是左侧导航栏  
views文件夹:主要页面  
router.js记录项目路由和前端的权限控制  
store.js同为权限控制  
</pre></code>
## 如何运行
1.安装必要环境,[Node.js](https://nodejs.org/en/)、npm(node自带)  
2.`cd hotel && npm run serve`

## 如何打包为HTML文件
`cd hotel && npm run build`


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
