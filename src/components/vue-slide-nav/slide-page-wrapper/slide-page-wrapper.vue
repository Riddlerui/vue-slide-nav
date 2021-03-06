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


  // 获取屏幕的宽度
  const WINDOW_WIDTH = document.documentElement.offsetWidth;

  export default {
    name: 'slide-page-wrapper',

    props: {
      defaultIndex: {
        type: Number,
        default: 0
      }
    },

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
        nowY: 0, // 记录当前Y值
        isLeft: true,  // 默认左划
        activeIndex: this.defaultIndex,  // 当前显示的页面
        allPageNumber: 0,  // 所有的page-item页面个数
        angle: 0,  // 角度
        touchMoveType: false, // 是否为手动滑动的
      }
    },
    mounted() {
      // 获取根元素的字体大小（rem处理）
      this.htmlFontSize = Number(window.document.documentElement.style.fontSize.split('px')[0]);

      // 获取page-item个数
      this.allPageNumber = this.$refs.pageWrapper.getElementsByClassName('slide-page-item').length;

      // activeIndex如果不为0就需要设置默认显示页面
      this.$nextTick(() => {
        // 不为0的时候就执行当前语句
        if (Number(this.activeIndex) !== 0) {
          this.$refs.pageWrapper.style.transform = `translate(-${Number(this.activeIndex) * WINDOW_WIDTH}px,0)`
        }
      });
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
          if (translateArr[0].split('px').length > 1) {
            // px
            this.offsetXNum = Number(translateArr[0].split('px')[0]);
          } else {
            //rem
            this.offsetXNum = Number(translateArr[0].split('rem')[0]) * WINDOW_WIDTH;
          }

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
        // 滑动的时候取消动画，否则会有延迟问题
        pageWrapper.style.transition = 'none';

        let dom = ev.changedTouches[0];
        this.nowY = dom.pageY;
        // 判断滑动方向
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
          // 设置滑动方向
          this.isLeft = true;
        }


        // 计算角度
        let x = Math.abs(this.startPageX - dom.pageX);
        let y = Math.abs(this.startPageY - dom.pageY);
        let z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

        // 计算弧度
        let radina = Math.acos(y / z);
        this.angle = Math.floor(180 / (Math.PI / radina));


        // 当滑动距离 X>Y的时候才赋值 一旦X<Y就直接改为初始偏移
        //Math.abs(this.differX) / 100 > Math.abs(this.differY) / 100

        // 判断是否为最后一个或者是第一个
        if (Number(this.activeIndex) + 1 === this.allPageNumber) {
          // 判断方向
          if (!this.isLeft) {
            this.differX = this.differX / 5;
          }
          pageWrapper.style.transform = `translate(${this.offsetXNum ? (-Number(this.activeIndex) * WINDOW_WIDTH + -this.differX) / this.htmlFontSize : -this.differX / this.htmlFontSize}rem,0)`
        } else if (Number(this.activeIndex) === 0) {
          if (this.isLeft) {
            this.differX = this.differX / 5;
          }
          pageWrapper.style.transform = `translate(${this.offsetXNum ? (-Number(this.activeIndex) * WINDOW_WIDTH + -this.differX) / this.htmlFontSize : -this.differX / this.htmlFontSize}rem,0)`

        } else {
          // 限制 从下往右上斜着划
          if (!(this.angle > 0 && this.angle < 80)) {
            pageWrapper.style.transform = `translate(${this.offsetXNum ? (-Number(this.activeIndex) * WINDOW_WIDTH + -this.differX) / this.htmlFontSize : -this.differX / this.htmlFontSize}rem,0)`
          } else {
            pageWrapper.style.transform = `translate(${this.offsetX},${this.offsetY})`
          }
        }
      },

      pageTouchEnd(ev) {
        let pageWrapper = this.$refs.pageWrapper;
        // 开启动画
        pageWrapper.style.transition = 'transform 300ms ease-in-out';


        if ((this.angle > 0 && this.angle < 70)) {
          pageWrapper.style.transform = `translate(${this.offsetX},${this.offsetY})`;
          return;
        }
        if (WINDOW_WIDTH / 5 < Math.abs(this.differX)) {
          if (this.isLeft) {
            // 左划
            // 如果是第一个就不能让他继续滑动
            if (this.activeIndex === 0) {
              pageWrapper.style.transform = `translate(${this.offsetX},${this.offsetY})`;
              return;
            }
            this.activeIndex--;
          } else {
            // 右划
            this.activeIndex++;
            // 右划限定最大值为page-item的长度
            this.activeIndex = this.activeIndex + 1 >= this.allPageNumber ? this.allPageNumber - 1 : this.activeIndex;
          }
          pageWrapper.style.transform = `translate(${-this.activeIndex * WINDOW_WIDTH}px,0)`;

          // 下标改变后返回给父组件
          this.changeIndex(this.activeIndex);
        } else {
          pageWrapper.style.transform = `translate(${this.offsetX},${this.offsetY})`
        }
      },

      // 当前显示页发生改变后就暴露出去
      changeIndex(index) {
        this.$emit("changeIndex", index);
      },
      changePageWrapperTransform(index) {
        let pageWrapper = this.$refs.pageWrapper;
        pageWrapper.style.transition = 'transform 300ms ease-in-out';
        pageWrapper.style.transform = `translate(${-index * WINDOW_WIDTH / this.htmlFontSize}rem,0)`
      }
    },
    watch: {
      defaultIndex(newVal) {
        this.activeIndex = newVal;
        this.changePageWrapperTransform(newVal)
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
      /*transition: transform 150ms ease-in-out;*/
    }
  }
</style>