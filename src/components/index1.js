const fn = require.context('./', true, /\.vue$/)
// console.log(fn.keys())
// console.log(fn('./SvgIcon/index.vue'))
import * as filters from '@/filters'
const components = fn.keys().map(ele => {
  return fn(ele)
})
export default (Vue) => {
  components.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
