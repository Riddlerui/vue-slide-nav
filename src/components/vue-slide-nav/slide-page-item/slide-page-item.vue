<template>
  <div class="slide-page-item">
    <slot/>
  </div>
</template>

<script>
  export default {
    name:"slide-page-item"
  }
</script>

<style lang="less" rel="stylesheet/less">
  .slide-page-item{
    width: 100%;
    flex-shrink: 0;
  }
</style>