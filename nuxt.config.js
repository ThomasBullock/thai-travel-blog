const pkg = require('./package')
require('dotenv').config({ path: '.env' });

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ],
    script: [
      { src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBgmhtgIlAUNMa11QW0uPzFPnsI76OAv64&libraries=places`}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    // '~/assets/style/app.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    {src: '~plugins/vee-validate.js', ssr: true}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@ax2/dayjs-module'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.BASE_URL || 'https://chom-siam.firebaseio.com',
    credentials: false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },
  env: {
    googleMapsAPIKey: process.env.GOOGLE_MAPS_API_KEY,  
    baseUrl: process.env.BASE_URL, 
    fbAPIKey: process.env.FIREBASE_API, 
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryKey: process.env.CLOUDINARY_KEY, 
    cloudinarySecret: process.env.CLOUDINARY_SECRET, 
  }
}
