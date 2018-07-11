<template>
  <div class="slide-page-wrapper"
       ref="slidePageWrapper"
       @touchstart="pageTouchStart($event)"
       @touchmove="pageTouchMove($event)"
       @touchend="pageTouchEnd($event)"
  >
    <div class="page-wrapper" ref="pageWrapper">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'slide-page-wrapper',
    data() {
      return {
        startPageX: 0, // 初始鼠标X轴位置
        startPageY: 0,  // 初始鼠标Y轴位置
        htmlFontSize: 0, // px 转rem
        offsetX: '',  // 初始偏移X
        offsetXNum: '',  // 初始偏移X
        offsetY: '',  // 初始偏移Y
        offsetYNum: '',  // 初始偏移Y
        differX: 0,  // X差值
        differY: 0,  // Y差值
        isLeft:true,  // 默认左划


      }

    },
    mounted() {
      this.htmlFontSize = Number(window.document.documentElement.style.fontSize.split('px')[0]);

    },
    methods: {
      pageTouchStart(ev) {
        let dom = ev.changedTouches[0];
        // 获取初始值
        this.startPageX = dom.pageX;
        this.startPageY = dom.pageY;

        // 获取当前pageWrapper的偏移
        let transfrom = this.$refs.pageWrapper.style.transform;

        // 如果有偏移那就保存初始偏移位置（带单位） 没有就默认0px
        if (transfrom !== "undefined" && transfrom !== '') {
          let translateArr = transfrom.match(/\(([^)]*)\)/)[1].split(',');
          this.offsetX = translateArr[0];
          this.offsetXNum = Number(translateArr[0].split('px')[0]);
          this.offsetY = translateArr[1];
          this.offsetY = Number(translateArr[1].split('px')[0]);

        } else {
          this.offsetX = '0px';
          this.offsetXNum = 0;
          this.offsetY = '0px';
          this.offsetYNum = 0;
        }
      },

      pageTouchMove(ev) {

        let pageWrapper = this.$refs.pageWrapper;


        let dom = ev.changedTouches[0];

        if (this.startPageX > dom.pageX) {
          // 右划
          // 计算滑动距离
          this.differX = Math.abs(dom.pageX - this.startPageX);
          this.differY = Math.abs(dom.pageY - this.startPageY);
          // 设置滑动方向
          this.isLeft = false;
        } else {
          // 左划
          // 计算滑动距离
          this.differX = this.startPageX - dom.pageX;
          this.differY = this.startPageY - dom.pageY;
          this.isLeft = true;
        }

        // 当滑动距离 X>Y的时候才赋值 一旦X<Y就直接改为初始偏移
        if (Math.abs(this.differX) / 100 > Math.abs(this.differY) / 100) {
          pageWrapper.style.transform = `translate(${this.offsetXNum ? (this.offsetXNum + -this.differX) / this.htmlFontSize : -this.differX / this.htmlFontSize}rem,0)`
        } else {
          pageWrapper.style.transform = `translate(${this.offsetX},${this.offsetY})`
        }
      },
      pageTouchEnd(ev) {
        // 获取屏幕的宽度
        const WINDOW_WIDTH = document.documentElement.offsetWidth;

        let pageWrapper = this.$refs.pageWrapper;


        if (WINDOW_WIDTH / 3 < Math.abs(this.differX)) {
          if (this.isLeft){
              // 左划
            pageWrapper.style.transform = `translate(${this.offsetXNum ? this.offsetXNum + WINDOW_WIDTH : WINDOW_WIDTH}px,0)`;

          }else{
            // 右划
            pageWrapper.style.transform = `translate(${this.offsetXNum ? this.offsetXNum + -WINDOW_WIDTH : -WINDOW_WIDTH}px,0)`
          }
        } else {
          pageWrapper.style.transform = `translate(${this.offsetX},${this.offsetY})`
        }


      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .slide-page-wrapper {
    overflow: hidden;
    position: relative;
    .page-wrapper {
      display: flex;
      transition: transform 150ms ease-in-out;
    }
  }
</style>