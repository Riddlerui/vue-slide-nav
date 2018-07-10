<template>
  <div class="content">
    <vue-slide-nav :navList="arr">
      <slide-page-wrapper>
        <slide-page-item v-for="(item,index) in 4" :key="index">
          <div class="item">
            {{index}}
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
        arr: ['导航1', '导航2', '导航3', '导航4']
      }
    },
    components: {
      "vue-slide-nav": vueSlideNav,
      "slide-page-wrapper": slidePageWrapper,
      "slide-page-item":slidePageItem
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @r: 1rem/75;
  .item {
    width: 100%;
    height: 200*@r;
    background: #68ffa3;
    &:nth-child(2){
      background: #4ff5ff;
    }
    &:nth-child(3){
      background: #5882ff;
    }
    &:nth-child(4){
      background: #d049ff;
    }
  }
</style>