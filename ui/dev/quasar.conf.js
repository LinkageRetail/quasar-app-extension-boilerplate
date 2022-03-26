// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = function (ctx) {
  return {
    // https://v1.quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://v1.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v1.quasar.dev/quasar-cli/boot-files
    boot: ['register.js'],

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      // 'roboto-font' // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
      'material-icons-outlined',
      'material-icons-round',
      'material-icons-sharp',
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history',
      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://v1.quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v1.quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(chain) {
        chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js', 'vue'] }]);
        chain.resolve.alias.merge({
          ui: path.resolve(__dirname, `../src/index.esm.js`),
        });
      },
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true, // opens browser window automatically
    },

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack
      config: {
        notify: {
          type: 'positive',
          position: 'top-right',
          timeout: 1500,
          group: false,
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

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: 'auto',

      // https://v1.quasar.dev/layout/grid/introduction-to-flexbox
      cssAddon: true,

      // For special cases outside of where "auto" importStrategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Loading',
        'LoadingBar',
        'LocalStorage',
        'SessionStorage',
        'Cookies',
      ],
    },

    // animations: 'all', // --- includes all animations
    // https://v1.quasar.dev/options/animations
    animations: 'all',

    ssr: {
      middlewares: [
        ctx.prod ? 'compression' : '',
        'render', // keep this as last one
      ],
    },
  };
};
