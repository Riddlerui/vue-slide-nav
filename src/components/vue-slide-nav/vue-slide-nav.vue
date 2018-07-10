<template>
  <div class="vue-slide-nav-wrapper">
    <ul class="nav-list-wrapper">
      <li class="nav-item" v-for="(item,index) in navList" :key="index">{{item}}</li>
    </ul>
    <slot/>
  </div>
</template>

<script>
  export default {
    name:"vue-slide-nav",
    props: {
      // 导航数组
      navList: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 默认显示下标
      activeIndex:{
        type:Number,
        default:0
      }
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./vue-slide-nav";
</style>