import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _61a4c77c = () => interopDefault(import('../pages/blog-details.vue' /* webpackChunkName: "pages/blog-details" */))
const _184c1ac0 = () => interopDefault(import('../pages/blog-one.vue' /* webpackChunkName: "pages/blog-one" */))
const _ddf11ff6 = () => interopDefault(import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _0156d0ab = () => interopDefault(import('../pages/checkout.vue' /* webpackChunkName: "pages/checkout" */))
const _b678956a = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _eba9ebe4 = () => interopDefault(import('../pages/diction-three.vue' /* webpackChunkName: "pages/diction-three" */))
const _286575bc = () => interopDefault(import('../pages/diction-two.vue' /* webpackChunkName: "pages/diction-two" */))
const _1bea1396 = () => interopDefault(import('../pages/gallery-one.vue' /* webpackChunkName: "pages/gallery-one" */))
const _1f5a3cd4 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _30a7d46e = () => interopDefault(import('../pages/products.vue' /* webpackChunkName: "pages/products" */))
const _18474abd = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _d8611f7a = () => interopDefault(import('../pages/admin/customer.vue' /* webpackChunkName: "pages/admin/customer" */))
const _3ed76fff = () => interopDefault(import('../pages/admin/dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _36da9554 = () => interopDefault(import('../pages/admin/profile.vue' /* webpackChunkName: "pages/admin/profile" */))
const _38638c30 = () => interopDefault(import('../pages/admin/user.vue' /* webpackChunkName: "pages/admin/user" */))
const _f56eb32e = () => interopDefault(import('../pages/products-details/_id.vue' /* webpackChunkName: "pages/products-details/_id" */))
const _55b299bd = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _61a4c77c,
    name: "blog-details"
  }, {
    path: "/blog-one",
    component: _184c1ac0,
    name: "blog-one"
  }, {
    path: "/cart",
    component: _ddf11ff6,
    name: "cart"
  }, {
    path: "/checkout",
    component: _0156d0ab,
    name: "checkout"
  }, {
    path: "/contact",
    component: _b678956a,
    name: "contact"
  }, {
    path: "/diction-three",
    component: _eba9ebe4,
    name: "diction-three"
  }, {
    path: "/diction-two",
    component: _286575bc,
    name: "diction-two"
  }, {
    path: "/gallery-one",
    component: _1bea1396,
    name: "gallery-one"
  }, {
    path: "/login",
    component: _1f5a3cd4,
    name: "login"
  }, {
    path: "/products",
    component: _30a7d46e,
    name: "products"
  }, {
    path: "/signup",
    component: _18474abd,
    name: "signup"
  }, {
    path: "/admin/customer",
    component: _d8611f7a,
    name: "admin-customer"
  }, {
    path: "/admin/dashboard",
    component: _3ed76fff,
    name: "admin-dashboard"
  }, {
    path: "/admin/profile",
    component: _36da9554,
    name: "admin-profile"
  }, {
    path: "/admin/user",
    component: _38638c30,
    name: "admin-user"
  }, {
    path: "/products-details/:id?",
    component: _f56eb32e,
    name: "products-details-id"
  }, {
    path: "/",
    component: _55b299bd,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
