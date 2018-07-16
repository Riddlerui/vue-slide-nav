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
fixedDirection| 定位方向 限定值为top/bottom | top | String
navMove | 开启滚动导航 | false    | Boolean
height | 导航item的高度   | 44 (px)   | Number
width | 导航item的宽度 当存在LRPadding的时候会被替代掉 |100(px)|Number
LRPadding | 导航item的左右内边距，当存在此属性的时候width会被替代掉 | 0(px) | Number
fontSize | 导航字体大小| 14(px) | Number
fontColor | 导航字体颜色 | #fff | String
activeFontColor | 选中的导航字体颜色 | #fff | String
navBackground| 导航的背景颜色 | #FFC4CF | String
navActiveBackground | 选中的导航背景颜色 | #FFC4CF | String
activeLine | 选中的时候下面的线的颜色 | #EF6680 | String




