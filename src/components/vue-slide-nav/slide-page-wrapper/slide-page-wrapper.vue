<template>
  <div class="slide-page-wrapper"
       ref="slidePageWrapper"
       @touchstart="pageTouchStart($event)"
       @touchmove="pageTouchMove($event)"
       @touchend="pageTouchEnd($event)"
  >
    <slot/>
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
        offsetX:'',  // 初始偏移X
        offsetY:'',  // 初始偏移Y
        differX:0,  // X差值
        differY:0,  // Y差值
      }

    },
    mounted() {
      this.htmlFontSize = Number(window.document.documentElement.style.fontSize.split('px')[0]);

    },
    methods: {
      pageTouchStart(ev) {
        let dom = ev.changedTouches[0];
        this.startPageX = dom.pageX;
        this.startPageY = dom.pageY;

        let transfrom = this.$refs.slidePageWrapper.style.transform;

        if (transfrom !== "undefined" && transfrom !== ''){
          let translateArr = transfrom.match(/\(([^)]*)\)/)[1].split(',');
          this.offsetX = translateArr[0];
          this.offsetY = translateArr[1];
        }else{
          this.offsetX = '0px';
          this.offsetY = '0px';
        }
      },
      pageTouchMove(ev) {

        let slidePageWrapper = this.$refs.slidePageWrapper;
        let dom = ev.changedTouches[0];
        let differX = Math.abs(dom.pageX - this.startPageX);
        let differY = Math.abs(dom.pageY - this.startPageY);
        console.log(differX/100,differY/100)
        if (differX/100 > differY/100) {
          slidePageWrapper.style.transform = `translate(${-differX/this.htmlFontSize}rem,0)`
        }else{
          slidePageWrapper.style.transform = `translate(${this.offsetX},${this.offsetY})`
        }

      },
      pageTouchEnd(ev) {

      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .slide-page-wrapper {
    overflow: hidden;
    display: flex;
  }
</style>