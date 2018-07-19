<!--suppress ALL -->
<template>
  <div class="vue-slide-nav-wrapper" ref="vueSlideNavWrapper">

    <div class="nav-wrapper"
         ref="navWrapper"
         :class="fixedNav?'fixed':''"
         @touchstart="navTouchStart($event)"
         @touchmove="navTouchMove($event)"
         @touchend="navTouchEnd($event)"
    >
      <ul
          class="nav-list-wrapper"
          ref="navListWrapper"
          :class="{
          flex:!navMove,
          clearfix :navMove
          }"
      >
        <li
            class="nav-item"
            v-for="(item,index) in navList"
            :key="index"
            :style="{
            height:height/htmlFontSize+'rem',
            lineHeight:height/htmlFontSize+'rem',
            width:LRPadding !==0?0:width/htmlFontSize+'rem',
            paddingLeft: LRPadding/htmlFontSize+'rem',
            paddingRight: LRPadding/htmlFontSize+'rem',
            fontSize:fontSize/htmlFontSize+'rem',
            color:activeIndex===index?activeFontColor:fontColor,
            background:activeIndex===index?navActiveBackground:navBackground,
            }"
            @click="changeIndex(index)"
        >
          {{item}}
          <i v-show="activeIndex === index && !activeAnimation" :style="{background:activeLine}"></i>
        </li>
        <p class="active-line" ref="activeLine" v-show="activeAnimation" :style="{background:activeLine}"></p>
      </ul>
    </div>
    <slot/>
  </div>
</template>

<script>
  import {fixedClone} from '../utils/utils'

  const MOVE_TIME = 2000; // 滑动后的动画时间

  window.requestAnimationFrame = window.requestAnimationFrame || function (a) {
    return setTimeout(a, 1000 / 60)
  };
  window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;


  export default {
    name: "vue-slide-nav",
    props: {
      // 导航数组
      navList: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 默认显示下标
      defaultIndex: {
        type: Number,
        default: 0
      },
      activeAnimation: {
        type: Boolean,
        default: false,
      },
      fixedNav: {
        type: Boolean,
        default: false,
      },
      fixedDirection: {
        type: String,
        default: 'top'
      },
      navMove: {
        type: Boolean,
        default: false,
      },
      height: {
        type: Number,
        default: 44
      },
      width: {
        type: Number,
        default: 100,
      },
      LRPadding: {
        type: Number,
        default: 0,
      },
      fontSize: {
        type: Number,
        default: 14
      },
      fontColor: {
        type: String,
        default: '#fff'
      },
      activeFontColor: {
        type: String,
        default: "#fff"
      },
      navBackground: {
        type: String,
        default: '#FFC4CF'
      },
      navActiveBackground: {
        type: String,
        default: '#FFC4CF'
      },
      activeLine: {
        type: String,
        default: '#EF6680'
      }
    },
    data() {
      return {
        activeIndex: this.defaultIndex,
        allLiTag: 0,  // 所有的导航节点数量
        htmlFontSize: 0, // html的字体大小
        startX: 0, // 按下的时候X轴位置
        differX: 0,  // 差值
        defaultX: 0, // 默认值
        bounce: 0.1, // 弹力
        moveDistance: 0, // 滑动的距离
        finalX: 0, // 最终的位置
        moveDirection: null,// 滑动方向
        speed: 1,  // 滑动速度
        isMove:false, // 是否滑动了 如果没有滑动就不能执行缓动的动画

      }
    },
    mounted() {
      this.getDefaultVal();
      this.setFixedDirection(this.fixedDirection);

      this.$nextTick(() => {
        this.setNavlistWrapperWidth();
        this.fixedNavDom(this.fixedNav);
        this.setDefaultActiveLine(0);
      });
    },
    methods: {
      // 设置ul的宽度
      setNavlistWrapperWidth() {
        if (!this.navMove) {
          return false;
        }
        let width = 0;
        let navList = this.$refs.navListWrapper.getElementsByTagName('li');
        for (let i = 0; i < navList.length; i++) {
          width += navList[i].offsetWidth;
        }
        this.$refs.navListWrapper.style.width = `${width / this.htmlFontSize}rem`
      },
      // 设置定位方向
      setFixedDirection(direction) {
        if (!this.fixedNav) {
          return false;
        }
        if (direction === 'top') {
          this.$refs.navWrapper.style.top = 0;
        } else if (direction === 'bottom') {
          this.$refs.navWrapper.style.bottom = 0;
        } else {
          throw new Error('fixed定位方向错误，请检查fixedDirection值是否为规定的值！')
        }
      },
      // 获取默认html的字体大小（rem方案）
      getDefaultVal() {
        this.allLiTag = this.$refs.navListWrapper.getElementsByTagName('li');
        this.htmlFontSize = document.documentElement.style.fontSize.split('px')[0];
      },
      // 当activeAnimation为true的情况下切换一次获取一次当前导航的宽度
      setDefaultActiveLine(index) {
        this.$refs.activeLine.style.width = `${Math.floor(this.allLiTag[index].offsetWidth) / this.htmlFontSize}rem`;
      },
      // 当activeAnimation为true的情况下设置activeLine的偏移量
      setActiveLineLeftVal(index) {
        let leftVal = 0;
        for (let i = 0; i < index; i++) {
          leftVal += Number(this.allLiTag[i].offsetWidth);
        }
        this.$refs.activeLine.style.transform = `translateX(${leftVal / this.htmlFontSize}rem)`;
      },
      // 点击切换盗导航事件
      changeIndex(index) {
        this.setDefaultActiveLine(index);
        this.setActiveLineLeftVal(index);


        this.$emit('navChangeIndex', index)
      },
      // 下标改变后触发的事件
      nowIndexChange(index) {
        this.activeIndex = index;
        this.setDefaultActiveLine(index);
        this.setActiveLineLeftVal(index);
      },
      // 如果导航定位在顶部则需要生成一个div以免fixed定位影响到内容显示
      fixedNavDom(type) {
        if (type) {
          if (this.fixedDirection === 'top') {
            fixedClone(false, this.$refs.navWrapper)
          } else if (this.fixedDirection === 'bottom') {
            fixedClone(true, this.$refs.navWrapper)
          } else {
            throw new Error("fixed定位方向错误，请检查fixedDirection值是否为规定的值！");
          }
        }

      },


      setNavListWrapperTransform(px) {
        this.$refs.navListWrapper.style.transform = `translateX(${px / this.htmlFontSize }rem)`;
      },

      navTouchStart($ev) {
        this.isMove = false;
        let dom = $ev.changedTouches[0];
        this.startX = dom.pageX;
        let transfrom = this.$refs.navListWrapper.style.transform;


        // 获取实际导航宽度
        let navListWrapperWidth = this.$refs.navListWrapper.offsetWidth;
        // 获取屏幕宽度
        let windowWidth = document.body.offsetWidth;

        // 获取实际导航宽度和屏幕宽度的差值
        this.differWidth = navListWrapperWidth - windowWidth;

        if (transfrom !== 'undefined' && transfrom !== '') {
          let translateXArr = transfrom.match(/\(([^)]*)\)/)[1].split('rem');
          this.defaultX = Number(translateXArr[0]) * this.htmlFontSize;
        } else {
          this.defaultX = 0;
        }
      },
      navTouchMove($ev) {
        this.$refs.navListWrapper.style.transition = 'none';
        this.isMove = true; // 滑动了
        let dom = $ev.changedTouches[0];
        this.moveDistance = Math.abs(this.startX - dom.pageX);  // 设置滑动的距离
        if (dom.pageX > this.startX) {
          this.moveDirection = true;
          // 左往右
          this.differX = this.defaultX + (dom.pageX - this.startX);

          // 划到底动画计算
          if (this.differX > 0) {
            this.differX = Math.abs(dom.pageX - this.startX) * this.bounce;
          }
        } else {
          this.moveDirection = false;
          // 右往左
          this.differX = this.defaultX + -(this.startX - dom.pageX);


          // 划到底动画计算
          if (Math.abs(this.differX) >= this.differWidth) {
            this.differX = this.differX + (Math.abs(this.differX) - this.differWidth) * this.bounce * 8;
          }
        }


        this.setNavListWrapperTransform(this.differX);
      },
      navTouchEnd($ev) {
        if (!this.isMove){
            return;
        }
        console.log(this.isMove)
        // 计算最终值
        if (this.differX < 0) {
          // 如果是右往左划 differX就是负数 那么最终值就是differX - 偏移量乘以系数 反之就+

          // 判断方向，左往右的+ 右往左的—
          if (this.moveDirection) {
            this.finalX = this.differX + this.moveDistance * 0.2;
          } else {
            this.finalX = this.differX - this.moveDistance * 0.2;
          }

        } else if (this.differX === 0) {
          this.finalX = 0;
        } else {
          this.finalX = this.differX + this.moveDistance * 0.2;
        }
        this.move(this.differX, this.finalX)

      },
      /**
       *
       * @param sVal  初始值
       * @param cVal  最终值
       */
      move(sVal, cVal) {

        // 判断方向
        if (this.moveDirection) {
          // console.log('左往右')

          if (sVal >= 0) {
            this.$refs.navListWrapper.style.transition = 'transform 300ms ease-in-out';
            this.setNavListWrapperTransform(0);
            cancelAnimationFrame(this.timerTouch);
            return;
          }
          if (sVal <= cVal) {
            sVal += this.speed;
            this.setNavListWrapperTransform(sVal);
            this.timerTouch = requestAnimationFrame(this.move.bind(this, sVal, cVal))
          } else {
            cancelAnimationFrame(this.timerTouch)
          }

        } else {
          // console.log('右往左')

          // 没有达到最终值的时候 动画执行 达到了取消动画
          if (!(sVal <= cVal)) {
            sVal -= this.speed;
            // 限制最大值不超过整个导航容器的宽度

            if ((sVal <= -this.differWidth)) {
              this.$refs.navListWrapper.style.transition = 'transform 300ms ease-in-out';
              this.setNavListWrapperTransform(-this.differWidth);
              cancelAnimationFrame(this.timerTouch);
              return;
            }
            this.setNavListWrapperTransform(sVal);
            this.timerTouch = requestAnimationFrame(this.move.bind(this, sVal, cVal))

          } else {
            cancelAnimationFrame(this.timerTouch)
          }

        }

      }

    },
    watch: {
      defaultIndex(newVal) {
        this.nowIndexChange(newVal);
      },
      fixedNav(newVal) {
        this.fixedNavDom(newVal);
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./vue-slide-nav";
</style>