import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/index'
import Group from './pages/Group/index'
import AddGist from './pages/addGist/index'
import UpdateGist from './pages/updateGist/index'

var routes = [
    {path: '/', component: Index},
    {path: '/index', component: Index},
    {path: '/group', component: Group},
    {path: '/add-gist', component: AddGist},
    {path: '/update-gist', component: UpdateGist},


]
var router = new VueRouter({
    routes
})
Vue.use(VueRouter)
new Vue({
    router
}).$mount('#app')
