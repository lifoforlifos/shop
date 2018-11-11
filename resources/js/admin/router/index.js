import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/store"
// Containers
import Full from '../containers/Full'

// Views
import Dashboard from '../views/Dashboard'
import Charts from '../views/Charts'
import Widgets from '../views/Widgets'

// Views - Components
import Buttons from '../views/components/Buttons'
import SocialButtons from '../views/components/SocialButtons'
import Cards from '../views/components/Cards'
import Forms from '../views/components/Forms'
import Modals from '../views/components/Modals'
import Switches from '../views/components/Switches'
import Tables from '../views/components/Tables'

// View - Posts

import FormPost from '../views/posts/form'
import EditPost from '../views/posts/edit'

// View - category

import FormCategory from '../views/categories/form'
import EditCategory from '../views/categories/edit'

// View - sliders

import FormSlider from '../views/sliders/form'
import EditSlider from '../views/sliders/edit'

// View - Brand

import FormBrand from '../views/brands/form'
import EditBrand from '../views/brands/edit'

// coupons

import FormCoupon from '../views/coupons/form'
import EditCoupon from '../views/coupons/edit'

// order
import EditOrder from '../views/orders/edit'
import SingleOrder from '../views/orders/single'
import StatusOrder from '../views/orders/status'

// Views - Icons
import FontAwesome from '../views/icons/FontAwesome'
import SimpleLineIcons from '../views/icons/SimpleLineIcons'

// Views - Pages
import Page404 from '../views/pages/Page404'
import Page500 from '../views/pages/Page500'
import Login from '../views/pages/Login'
import Register from '../views/pages/Register'

Vue.use(Router)

const router = new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: Full,
    meta: {
      forAdmin: true
    },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: 'charts',
      name: 'Charts',
      component: Charts
    },
    {
      path: 'widgets',
      name: 'Widgets',
      component: Widgets
    },
    {
      path: 'components',
      redirect: '/components/buttons',
      name: 'Components',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [{
        path: 'buttons',
        name: 'Buttons',
        component: Buttons
      },
      {
        path: 'social-buttons',
        name: 'Social Buttons',
        component: SocialButtons
      },
      {
        path: 'cards',
        name: 'Cards',
        component: Cards
      },
      {
        path: 'forms',
        name: 'Forms',
        component: Forms
      },
      {
        path: 'modals',
        name: 'Modals',
        component: Modals
      },
      {
        path: 'switches',
        name: 'Switches',
        component: Switches
      },
      {
        path: 'tables',
        name: 'Tables',
        component: Tables
      }
      ]
    },
    {
      path: 'icons',
      redirect: '/icons/font-awesome',
      name: 'Icons',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [{
        path: 'font-awesome',
        name: 'Font Awesome',
        component: FontAwesome
      },
      {
        path: 'simple-line-icons',
        name: 'Simple Line Icons',
        component: SimpleLineIcons
      }
      ]
    },
    {
      path: 'posts',
      redirect: '/posts/create',
      name: 'Posts',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [{
        path: 'create-post',
        name: 'Create Post',
        component: FormPost,
        meta: {
          mode: 'create'
        }
      },
      {
        path: 'edit-post',
        name: 'Edit Post',
        component: EditPost

      },
      {
        path: 'single-post/:id',
        name: 'Single Post',
        component: FormPost,
        meta: {
          mode: 'edit'
        }
      }
      ]
    },
    {
      path: 'categories',
      redirect: '/categories/create',
      name: 'Categories',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [{
        path: 'create-category',
        name: 'Create Category',
        component: FormCategory,
        meta: {
          mode: 'create'
        }
      },
      {
        path: 'edit-category',
        name: 'Edit Category',
        component: EditCategory

      },
      {
        path: 'single-category/:id',
        name: 'Single Category',
        component: FormCategory,
        meta: {
          mode: 'edit'
        }
      }
      ]
    },
    {
      path: 'sliders',
      redirect: '/sliders/create',
      name: 'Sliders',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [{
        path: 'create-slider',
        name: 'Create Slider',
        component: FormSlider,
        meta: {
          mode: 'create'
        }
      },
      {
        path: 'edit-slider',
        name: 'Edit Slider',
        component: EditSlider

      },
      {
        path: 'single-slider/:id',
        name: 'Single Slider',
        component: FormSlider,
        meta: {
          mode: 'edit'
        }
      }
      ]
    },
    {
      path: 'brands',
      redirect: '/brands/create',
      name: 'brands',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [{
        path: 'create-brand',
        name: 'Create Brand',
        component: FormBrand,
        meta: {
          mode: 'create'
        }
      },
      {
        path: 'edit-brand',
        name: 'Edit Brand',
        component: EditBrand

      },
      {
        path: 'single-brand/:id',
        name: 'Single Brand',
        component: FormBrand,
        meta: {
          mode: 'edit'
        }
      }]
    },
    {
      path: 'coupons',
      redirect: '/coupons/create',
      name: 'Coupons',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [{
        path: 'create-coupon',
        name: 'Create Coupon',
        component: FormCoupon,
        meta: {
          mode: 'create'
        }
      },
      {
        path: 'edit-coupon',
        name: 'Edit Coupon',
        component: EditCoupon

      },
      {
        path: 'single-coupon/:id',
        name: 'Single Coupon',
        component: FormCoupon,
        meta: {
          mode: 'edit'
        }
      }
      ]
    },
    {
      path: 'orders',
      redirect: '/orders/edit',
      name: 'Orders',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [{
        path: 'edit-order',
        name: 'Edit Order',
        component: EditOrder
      },
      {
        path: 'single-order/:id',
        name: 'Single Order',
        component: SingleOrder
      },
      {
        path: 'sent',
        name: 'Sent Order',
        component: StatusOrder
      },
      {
        path: 'problem',
        name: 'Problem Order',
        component: StatusOrder
      },
      {
        path: 'verified',
        name: 'Verfied Order',
        component: StatusOrder
      }

      ]
    }
    ]
  },
  {
    path: '/pages',
    redirect: '/pages/p404',
    name: 'Pages',
    component: {
      render(c) {
        return c('router-view')
      }
    },
    children: [{
      path: '404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '500',
      name: 'Page500',
      component: Page500
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        forVisitros: true,
        title: 'Login'
      }
    },
    {
      path: 'register',
      name: 'Register',
      component: Register
    }
    ]
  }
  ]
})

router.beforeEach((to, from, next) => {
  next()
  if (to.matched.some(record => record.meta.forAdmin)) {
    if (!store.getters.currentAdmin) {
      next({
        path: '/login'
      })
    } else next()
  } if (to.matched.some(record => record.meta.forVisitros)) {
    if (store.getters.currentAdmin) {
      next({
        path: '/'
      })
    } else next()
  }
  else next()
})

export default router
