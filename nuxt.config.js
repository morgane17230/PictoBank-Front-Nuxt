require('dotenv').config()

export default {
  head: {
    titleTemplate: '%s',
    title: 'Pikto',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [],

  plugins: [
    { src: '~/plugins/persistedState.client.js' },
    { src: '~/plugins/notifier.js' }
  ],

  components: true,
  target: 'static',
  loading: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', { systemvars: true }]
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    '@nuxt/image'
  ],

  axios: {
    baseURL: process.env.API
  },

  auth: {
    strategies: {
      local: {
        token: {
          global: true,
          required: true
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          user: { url: '/user', method: 'get' },
          logout: false
        }
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/home',
      callback: '/'
    }
  },

  bundleRenderer: {
    shouldPreload: (file, type) => {
      return ['font'].includes(type)
    }
  },

  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss', '~/assets/main.scss']
  },

  build: {
    extractCSS: { ignoreOrder: true },
    splitChunks: {
      pages: true,
      vendor: true,
      commons: true,
      runtime: true,
      layouts: true
    },
    optimization: {
      splitChunks: {
        name: false
      }
    },
    terser: {
      parallel: true,
      cache: false,
      sourceMap: false,
      extractComments: {
        filename: 'LICENSES'
      },
      terserOptions: {
        output: {
          comments: /^\**!|@preserve|@license|@cc_on/
        }
      }
    }
  }
}
