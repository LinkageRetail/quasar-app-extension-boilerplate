/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf(conf) {
  // register our boot file
  conf.boot.push('~quasar-app-extension-linkage-cms-ui/src/boot/register.js');

  // make sure app extension files & ui package gets transpiled
  conf.build.transpileDependencies.push(/quasar-app-extension-linkage-cms-ui[\\/]src/);

  conf.framework.plugins.push('Dialog');
  conf.framework.plugins.push('Notify');
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  api.compatibleWith('quasar', '^1.0.0');
  api.compatibleWith('@quasar/app', '^2.0.0');

  // Uncomment the line below if you provide a JSON API for your component
  // api.registerDescribeApi('MyUI', '~quasar-ui-linkage-cms-ui/src/components/MyUI.json')

  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf);
};
