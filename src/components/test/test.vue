<template>
  <div class="content">
    <vue-slide-nav
        :navList="arr"
        :default-index="activeIndex"
        :active-animation="activeAnimation"
        :fixed-nav="fixedNav"
        :fixed-direction="fixedDirection"
        :nav-move="navMove"
        :height="height"
        :width="width"
        :LRPadding="LRPadding"
        :font-size="fontSize"
        :font-color="fontColor"
        :active-font-color="activeFontColor"
        :nav-background="navBackground"
        :nav-active-background="navActiveBackground"
        :active-line="activeLine"
        @navChangeIndex="changeIndex"
    >
      <slide-page-wrapper
          :default-index="activeIndex"
          @changeIndex="changeIndex"
      >
        <slide-page-item v-for="(item,index) in 14" :key="index">
          <div class="item">
            <ul>
              <li>test is {{item}}</li>
              <li v-for="(i,n) in 10" :key="n">{{i}}</li>
            </ul>
          </div>
        </slide-page-item>
      </slide-page-wrapper>
    </vue-slide-nav>
  </div>
</template>

<script>
  import vueSlideNav from '../vue-slide-nav/vue-slide-nav'
  import slidePageWrapper from '../vue-slide-nav/slide-page-wrapper/slide-page-wrapper'
  import slidePageItem from '../vue-slide-nav/slide-page-item/slide-page-item'
  export default {
    data() {
      return {
        arr: ['导航1', '导航2', '导航3', '导航4', '导航5', '导航6', '导航7', '导航8', '导航9', '导航10', '导航11', '导航12', '导航13', '导航14'],
        activeIndex: 0,
        fixedNav:true,
        activeAnimation:true,
        fixedDirection:'top',
        navMove:true,
        height:44,
        width:100,
        LRPadding:0,
        fontSize:14,
        fontColor:'#fff',
        activeFontColor:"#fff",
        navBackground:'#FFC4CF',
        navActiveBackground:'#FFC4CF',
        activeLine:'#EF6680'
      }
    },
    methods: {
      changeIndex(index) {
        this.activeIndex = index;
      },
    },
    components: {
      "vue-slide-nav": vueSlideNav,
      "slide-page-wrapper": slidePageWrapper,
      "slide-page-item": slidePageItem
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @r: 1rem/75;
  .vue-slide-nav-wrapper{
    .nav-item{
      font-size: 30*@r;
    }
    .item {
      width: 100%;
      background: #68ffa3;
      li {
        display: block;
        width: 100%;
        height: 200*@r;
        line-height: 200*@r;
        text-align: center;
        background: pink;
        margin: 20*@r 0;
        &:first-child {
          font-size: 40*@r;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }
</style>