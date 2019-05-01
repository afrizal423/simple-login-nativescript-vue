import Vue from 'nativescript-vue'
import App from './components/App'
import router from './router'
// Prints Vue logs when --env.production is *NOT* set while building
Vue.prototype.$router = router
Vue.prototype.$goto = function (to, options) {
  this.$navigateTo(this.$router[to], options)
}
Vue.config.silent = (TNS_ENV === 'production')
Vue.registerElement(
  'CardView',
  () => require('nativescript-cardview').CardView
);
Vue.registerElement(
  'Gradient',
  () => require('nativescript-gradient').Gradient
);
new Vue({
  render: h => h('frame', [h(router['home'])])
}).$start()
