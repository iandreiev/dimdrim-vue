import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../views/Home'),
  },
    {
    path: '/search',
    name: 'Search',
    component: ()=>import('../views/Search'),
    props:true
  },
  {
    path: '/pay/status',
    name: 'PayStatus',
    component: ()=>import('../views/PayStatus'),
    props:true
  },
    {
    path: '/products',
    name: 'Catalogue',
    component: ()=>import('../views/Catalogue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ()=>import('../views/Product')
  },
  {
    path: '/order',
    name: 'CreateOrder',
    component: ()=>import('../views/CreateOrder')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: ()=>import('../views/Auth')
  },
  {
    path: '/me',
    name: 'ProfileWrapper',
    component: ()=>import('../components/pages/profile'),
    children:[
      {
        path: 'orders/active',
        name: 'UserOrders',
        component: ()=>import('../views/User/UserOrders')
      },
      {
        path: 'orders/history',
        name: 'OrderHistory',
        component: ()=>import('../views/User/OrderHistory')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ()=>import('../views/User/Profile')
      },
      {
        path: 'favs',
        name: 'UserFavourites',
        component: ()=>import('../views/User/UserFavourites')
      },
      {
        path: 'notifications',
        name: 'UserNotifications',
        component: ()=>import('../views/User/UserNotifications')
      },
      {
        path: 'settings',
        name: 'UserSettings',
        component: ()=>import('../views/User/UserSettings')
      },
      {
        path: 'logout',
        name: 'Logout',
        component: ()=>import('../views/User/Logout')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
