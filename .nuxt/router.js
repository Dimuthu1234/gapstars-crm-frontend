import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _65f02eb4 = () => interopDefault(import('../pages/blog-details.vue' /* webpackChunkName: "pages/blog-details" */))
const _74ff8e6c = () => interopDefault(import('../pages/blog-one.vue' /* webpackChunkName: "pages/blog-one" */))
const _6b6949a2 = () => interopDefault(import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _5a05d256 = () => interopDefault(import('../pages/checkout.vue' /* webpackChunkName: "pages/checkout" */))
const _a8f1fc3e = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _e9a7e3b8 = () => interopDefault(import('../pages/diction-three.vue' /* webpackChunkName: "pages/diction-three" */))
const _4ce48752 = () => interopDefault(import('../pages/diction-two.vue' /* webpackChunkName: "pages/diction-two" */))
const _4069252c = () => interopDefault(import('../pages/gallery-one.vue' /* webpackChunkName: "pages/gallery-one" */))
const _0e93b6ea = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _8d5b481a = () => interopDefault(import('../pages/products.vue' /* webpackChunkName: "pages/products" */))
const _103d1367 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _9a222226 = () => interopDefault(import('../pages/admin/customer.vue' /* webpackChunkName: "pages/admin/customer" */))
const _03a7c695 = () => interopDefault(import('../pages/admin/dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _0334fd93 = () => interopDefault(import('../pages/products-details/_id.vue' /* webpackChunkName: "pages/products-details/_id" */))
const _44ec13d3 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blog-details",
    component: _65f02eb4,
    name: "blog-details"
  }, {
    path: "/blog-one",
    component: _74ff8e6c,
    name: "blog-one"
  }, {
    path: "/cart",
    component: _6b6949a2,
    name: "cart"
  }, {
    path: "/checkout",
    component: _5a05d256,
    name: "checkout"
  }, {
    path: "/contact",
    component: _a8f1fc3e,
    name: "contact"
  }, {
    path: "/diction-three",
    component: _e9a7e3b8,
    name: "diction-three"
  }, {
    path: "/diction-two",
    component: _4ce48752,
    name: "diction-two"
  }, {
    path: "/gallery-one",
    component: _4069252c,
    name: "gallery-one"
  }, {
    path: "/login",
    component: _0e93b6ea,
    name: "login"
  }, {
    path: "/products",
    component: _8d5b481a,
    name: "products"
  }, {
    path: "/signup",
    component: _103d1367,
    name: "signup"
  }, {
    path: "/admin/customer",
    component: _9a222226,
    name: "admin-customer"
  }, {
    path: "/admin/dashboard",
    component: _03a7c695,
    name: "admin-dashboard"
  }, {
    path: "/products-details/:id?",
    component: _0334fd93,
    name: "products-details-id"
  }, {
    path: "/",
    component: _44ec13d3,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
