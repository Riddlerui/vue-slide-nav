# vue-slide-nav


##### Slide-page-wrapper组件接口信息：


参数名 | 作用 | 默认值| 类型
---|--- |---|---
defaultIndex | 设置默认显示的page下标 | 0 | Number
changeIndex | 切换页面后回调，接受当前页面下标 | 无 | Function


##### vue-slide-nav 组件接口信息：
参数名 | 作用 | 默认值| 类型
---|--- |---|---
navList | 设置导航数组 | [] | Array
defaultIndex | 默认选中的导航  | 0 | Number
navChangeIndex | 切换导航后回调，接收当前导航下标 | 无 | Function
activeAnimation |  是否开启切换动画 | false | Boolean
fixedNav | 是否定位导航在头部 | false | Boolean