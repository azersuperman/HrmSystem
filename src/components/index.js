import PageTools from './PageTools/index.vue'
// import * as directives from '@/directives'
const components = [PageTools]

// export default {
//   install: function(Vue) {
//     components.forEach(ele => {
//       Vue.component(ele.name, ele)
//     })
//   }
// }

export default (Vue) => {
  components.forEach(ele => {
    Vue.component(ele.name, ele)
  })
}

// const fn = require.context('./', true, /\.vue$/)
// console.log(fn.keys())
// console.log(fn('./SvgIcon/index.vue'))
