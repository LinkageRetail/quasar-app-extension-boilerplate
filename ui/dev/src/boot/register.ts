import { boot } from 'quasar/wrappers';

// debug
import * as VuePlugin from '../../../src/vue-plugin';

// esm
// import VuePlugin from '../../../dist/index.esm';

// common
// import * as VuePlugin from '../../../dist/index.common';

// umd
// import VuePlugin from '../../../dist/index.umd';

export default boot(({ app }) => {
  app.use(VuePlugin);
});
