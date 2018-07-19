import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const slide = (resolve) => {
  import('../components/vue-slide-nav/vue-slide-nav.vue').then((module) => {
    resolve(module)
  })
}
const test = (resolve) => {
  import('../components/test/test.vue').then((module) => {
    resolve(module)
  })
}



export default new Router({
  routes: [
    {
      path:'/slide',
      name:'slide',
      component:slide
    },
    {
      path:'/test',
      name:'test',
      component:test
    },
  ]
})
