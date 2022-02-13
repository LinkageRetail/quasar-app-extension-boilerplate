// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

const path = require('path')
const webpack = require('webpack')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'register.js'
    ],

    css: [
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      // 'roboto-font' // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
      'material-icons-outlined',
      'material-icons-round',
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework、
    framework: {
      // iconSet: 'ionicons-v4', // Quasar icon set
      // lang: 'de', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'auto',

      components: [],
      directives: [],

      // Quasar plugins
      plugins: ['Notify', 'Dialog', 'Loading', 'LoadingBar', 'LocalStorage', 'SessionStorage'],
      config: {
        notify: {
          type: 'positive',
          position: 'top-right',
          group: false,
          timeout: 2000,
        },
        loading: {
          /* Loading defaults */
        },
        loadingBar: {
          color: 'green',
        },
        brand: {
          /* brand defaults */
        },
        screen: {
          // https://v1.quasar.dev/options/screen-plugin#introduction
          bodyClasses: true,
        },
      },
    },

    // https://quasar.dev/options/animations
    animations: 'all', // --- includes all animations
    // animations: [],

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: true,

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history',

      chainWebpack(chain) {
        chain.resolve.alias.merge({
          ui: path.resolve(__dirname, `../src/index.esm.js`)
        })

        chain.plugin('define-ui')
          .use(webpack.DefinePlugin, [{
            __UI_VERSION__: `'${require('../package.json').version}'`
          }])
      }
    },

    devServer: {
      // port: 8080,
      open: true // opens browser window automatically
    },

    ssr: {
      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    }
  }
}
