export default {
  env: {
    apiUrl: process.env.API_BASE_URL,
    baseUrl: process.env.BASE_URL
  },

  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "en"
    },
    title: "Gapstars CRM",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/vue-carousel", ssr: false },
    { src: "~/plugins/vue-backtotop", ssr: false },
    { src: "~/plugins/vue-toastification", ssr: false },
    { src: "~/plugins/vueperslides", ssr: false }
    // { src: '~/plugins/firebase' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],
  /*
  /*
  ** Global CSS
  */
  css: [
    "./assets/scss/styles/animate.min.css",
    "./assets/scss/styles/fontawesome.min.css",
    "./assets/scss/styles/style.scss",
    "./assets/scss/styles/admin.scss",
    "./assets/scss/styles/responsive.scss"
  ],
  /** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    baseURL: process.env.API_BASE_URL,
    headers: {
      common: {
        Accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json"
      },
      post: {
        "content-type": "application/vnd.api+json"
      },
      patch: {
        "content-type": "application/vnd.api+json"
      },
      delete: {
        "content-type": "application/vnd.api+json"
      }
    },
    credentials: true
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: "http://localhost:8000"
      }
    }
  },

  /*
   ** Globally configure <nuxt-link> default active class.
   */
  router: {
    linkActiveClass: "active"
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // eslint-disable-next-line no-unused-vars
    extend(config, ctx) {}
  }
};
