<template>
  <div class="vue-slide-nav-wrapper">

    <div class="nav-wrapper" ref="navWrapper" :class="fixedNav?'fixed':''">
      <ul class="nav-list-wrapper" ref="navListWrapper">
        <li
            class="nav-item"
            v-for="(item,index) in navList"
            :key="index"
            @click="changeIndex(index)"
        >
          {{item}}
          <i v-show="activeIndex === index && !activeAnimation"></i>
        </li>
      </ul>
      <p class="active-line" ref="activeLine" v-show="activeAnimation"></p>
    </div>
    <slot/>
  </div>
</template>

<script>
  import {fixedClone} from '../utils/utils'
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
      defaultIndex:{
        type:Number,
        default:0
      },
      activeAnimation:{
        type:Boolean,
        default:false,
      },
      fixedNav:{
        type:Boolean,
        default:false,
      }
    },
    data(){
      return {
        activeIndex : this.defaultIndex,
        allLiTag:0,  // 所有的导航节点数量
        htmlFontSize:0, // html的字体大小
      }
    },
    mounted(){
      this.getDefaultVal();
      this.setDefaultActiveLine(0);
      this.fixedNavDom(this.fixedNav);
    },
    methods:{
      getDefaultVal(){
        this.allLiTag = this.$refs.navListWrapper.getElementsByTagName('li');
        this.htmlFontSize = document.documentElement.style.fontSize.split('px')[0];
      },
      setDefaultActiveLine(index){
        this.$refs.activeLine.style.width = `${Math.floor(this.allLiTag[index].offsetWidth)/this.htmlFontSize}rem`;
      },
      setActiveLineLeftVal(index){
        let leftVal = 0;
        for (let i = 0; i < index; i++) {
          leftVal +=Number(this.allLiTag[i].offsetWidth);
        }
        this.$refs.activeLine.style.transform =`translateX(${leftVal/this.htmlFontSize}rem)`;
      },
      changeIndex(index){
        this.setDefaultActiveLine(index);
        this.setActiveLineLeftVal(index);


        this.$emit('navChangeIndex',index)
      },

      nowIndexChange(index){
        this.activeIndex = index;
        this.setDefaultActiveLine(index);
        this.setActiveLineLeftVal(index);
      },
      fixedNavDom(type){
        if (type){
          fixedClone(this.$refs.navWrapper)
        }

      }
    },
    watch:{
      defaultIndex(newVal){
        this.nowIndexChange(newVal);
      },
      fixedNav(newVal){
        this.fixedNavDom(newVal)
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./vue-slide-nav";
</style>