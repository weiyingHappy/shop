import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import ProductDetail from '@/page/ProductDetail'
import ProductList from '@/page/ProductList'
import OrderGenerate from '@/page/OrderGenerate'
import OrderDetail from '@/page/OrderDetail'
import OrderList from '@/page/OrderList'
import Auth from '@/page/Auth'
import OrderImgList from '@/page/OrderImgList'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Home'
      }
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/product_list',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/order_generate',
      name: 'OrderGenerate',
      component: OrderGenerate
    },
    {
      path: '/order/:id',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/order_list',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/order_img_list/:id',
      name: 'OrderImgList',
      component: OrderImgList
    }
  ]
})
