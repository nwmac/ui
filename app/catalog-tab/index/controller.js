import { alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';
import { isAlternate } from 'ui/utils/platform';
import { getOwner } from '@ember/application';


export default Controller.extend({
  application:       controller(),
  catalogController: controller('catalog-tab'),
  parentRoute:       'catalog-tab',
  launchRoute:       'catalog-tab.launch',

  category:          alias('catalogController.category'),
  actions:           {
    categoryAction(category){
      this.transitionToRoute(this.launchRoute, { queryParams: { category } });
    },

    launch(id, onlyAlternate) {
      if ( onlyAlternate && !isAlternate(event) ) {
        return false;
      }

      this.transitionToRoute(this.launchRoute, id);
    },

    refresh() {
      let catalogTab = getOwner(this).lookup('route:catalog-tab');

      catalogTab.send('refresh');
    },
  },
});
