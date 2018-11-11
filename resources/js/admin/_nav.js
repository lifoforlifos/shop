export default {
  items: [{
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'primary',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'UI elements'
  },
  {
    name: 'Components',
    url: '/components',
    icon: 'icon-puzzle',
    children: [{
      name: 'Buttons',
      url: '/components/buttons',
      icon: 'icon-puzzle'
    },
    {
      name: 'Social Buttons',
      url: '/components/social-buttons',
      icon: 'icon-puzzle'
    },
    {
      name: 'Cards',
      url: '/components/cards',
      icon: 'icon-puzzle'
    },
    {
      name: 'Forms',
      url: '/components/forms',
      icon: 'icon-puzzle'
    },
    {
      name: 'Modals',
      url: '/components/modals',
      icon: 'icon-puzzle'
    },
    {
      name: 'Switches',
      url: '/components/switches',
      icon: 'icon-puzzle'
    },
    {
      name: 'Tables',
      url: '/components/tables',
      icon: 'icon-puzzle'
    }
    ]
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [{
      name: 'Font Awesome',
      url: '/icons/font-awesome',
      icon: 'icon-star'
    },
    {
      name: 'Simple Line Icons',
      url: '/icons/simple-line-icons',
      icon: 'icon-star'
    }
    ]
  },
  {
    name: 'Posts',
    url: '/posts',
    icon: 'icon-star',
    children: [{
      name: 'Create Post',
      url: '/posts/create-post',
      icon: 'icon-star'
    },
    {
      name: 'Edit Post',
      url: '/posts/edit-post',
      icon: 'icon-star'
    }
    ]
  },
  {
    name: 'Categories',
    url: '/categories',
    icon: 'icon-star',
    children: [{
      name: 'Create Category',
      url: '/categories/create-category',
      icon: 'icon-star'
    },
    {
      name: 'Edit Category',
      url: '/categories/edit-category',
      icon: 'icon-star'
    }
    ]
  },
  {
    name: 'Sliders',
    url: '/sliders',
    icon: 'icon-star',
    children: [{
      name: 'Create Slider',
      url: '/sliders/create-slider',
      icon: 'icon-star'
    },
    {
      name: 'Edit Slider',
      url: '/sliders/edit-slider',
      icon: 'icon-star'
    }
    ]
  },
  {
    name: 'Brands',
    url: '/brands',
    icon: 'icon-star',
    children: [{
      name: 'Create Brand',
      url: '/brands/create-brand',
      icon: 'icon-star'
    },
    {
      name: 'Edit brand',
      url: '/brands/edit-brand',
      icon: 'icon-star'
    }
    ]
  },
  {
    name: 'Coupons',
    url: '/coupons',
    icon: 'icon-star',
    children: [{
      name: 'Create Coupon',
      url: '/coupons/create-coupon',
      icon: 'icon-star'
    },
    {
      name: 'Edit Coupon',
      url: '/coupons/edit-coupon',
      icon: 'icon-star'
    }
    ]
  },
  {
    name: 'Orders',
    url: '/orders',
    icon: 'icon-star',
    children: [{
      name: 'Edit Order',
      url: '/orders/edit-order',
      icon: 'icon-star'
    }, {
      name: 'Problem Order',
      url: '/orders/problem',
      icon: 'icon-star'
    }, {
      name: 'Sent Order',
      url: '/orders/sent',
      icon: 'icon-star',
      query: {
        plan: 'private'
      }

    }, {
      name: 'Verified Order',
      url: '/orders/verified',
      icon: 'icon-star'
    }

    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'danger',
      text: 'NEW'
    }
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [{
      name: 'Login',
      url: '/login',
      icon: 'icon-star'
    },
    {
      name: 'Register',
      url: '/pages/register',
      icon: 'icon-star'
    },
    {
      name: 'Error 404',
      url: '/pages/404',
      icon: 'icon-star'
    },
    {
      name: 'Error 500',
      url: '/pages/500',
      icon: 'icon-star'
    }
    ]
  }
  ]
}
