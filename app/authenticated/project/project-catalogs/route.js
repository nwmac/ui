import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  catalog: service(),

  model() {
    return this.catalog.fetchUnScopedCatalogs();
  },

  resetController(controller, isExiting /* , transition*/ ) {
  },
});
