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
      {
        hid: 'description',
        name: 'description',
        content:
          "Pikto s'adresse aux établissements et aux aidants qui sont en contact avec des personnes autistes ou atteintes de troubles cognitifs nécessitants une aide visuelle à la communication"
      },
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
  loading: true,
  target: 'static',

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxt/image',
    ['@nuxtjs/dotenv', { systemvars: true }]
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    '@nuxt/image',
    'nuxt-purgecss',
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    '@nuxtjs/robots'
  ],

  image: {
    domains: [
      'https://pictos.s3.eu-west-3.amazonaws.com/images/',
      'https://pictos.s3.eu-west-3.amazonaws.com/avatars/'
    ]
  },

  axios: {
    baseURL: process.env.API
  },

  robots: {
    UserAgent: '*',
    Allow: '/'
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
    customVariables: ['~/assets/variables.scss', '~/assets/main.scss'],
    defaultAssets: {
      font: {
        family: 'Roboto'
      },
      icons: {
        iconfont: 'mdiSvg'
      }
    }
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
      minimize: true,
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
  },

  purgeCSS: {
    mode: 'webpack',
    enabled: true,
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      './node_modules/vuetify/dist/*.js',
      './node_modules/vuetify/dist/*.css',
      './node_modules/vuetify/src/**/*.ts',
      './node_modules/@mdi/fonts/*'
    ],
    styleExtensions: ['.scss', '.css'],
    // whitelist: ['body', 'html', 'nuxt-progress', ''],

    whitelist: ['v-application', 'v-application--wrap', 'layout', 'row', 'col'],
    whitelistPatterns: [
      /^v-((?!application).)*$/,
      /^theme--*/,
      /.*-transition/,
      /^justify-*/,
      /^p*-[0-9]/,
      /^m*-[0-9]/,
      /^text--*/,
      /--text$/,
      /^row-*/,
      /^col-*/,
      /leaflet/,
      /marker/
    ],
    whitelistPatternsChildren: [/^v-((?!application).)*$/, /^theme--*/],

    extractors: [
      {
        extractor: content => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['html', 'vue', 'js']
      }
    ]
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        if (type === 'script' || type === 'style') {
          return true
        }
        if (type === 'font') {
          return /\.woff$/.test(file)
        }
      }
    }
  },

  pwa: {
    meta: {
      title: 'Pikto',
      author: 'Morgane Gambis',
      description: "Pikto s'adresse aux établissements et aux aidants qui sont en contact avec des personnes autistes ou atteintes de troubles cognitifs nécessitants une aide visuelle à la communication",
      lang: 'fr',
      viewport: 'width=device-width, initial-scale=1',
      mobileApp: 'mobile-web-app-capable',
      charset: 'utf-8',
      mobileAppIOS: 'apple-mobile-web-app-capable',
      appleStatusBarStyle: 'default',
      favicon: true,
      ogType: 'website',
      ogSiteName: 'Pikto',
      ogTitle: 'Pikto',
      ogDescription: "Pikto s'adresse aux établissements et aux aidants qui sont en contact avec des personnes autistes ou atteintes de troubles cognitifs nécessitants une aide visuelle à la communication",
      ogHost: 'https://pikto.fr',
      ogUrl: 'https://pikto.fr',
      nativeUI: true
    },
    manifest: {
      name: 'Pikto',
      short_name: 'Pikto',
      lang: 'fr',
      dir: 'ltr',
      theme_color: '#49b9c5',
      background_color: '#fff',
      display: 'standalone'
    },
    workbox: {}
  }
}
