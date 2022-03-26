import { boot } from 'quasar/wrappers';
import VuePlugin from 'quasar-ui-linkage-cms-ui';

export default boot(({ Vue }) => {
  Vue.use(VuePlugin);
});
