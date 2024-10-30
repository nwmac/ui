import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import { isEmbedded, dashboardWindow } from 'shared/utils/util';

export default class App extends Application {
  modulePrefix = config.modulePrefix;

  podModulePrefix = config.podModulePrefix;

  Resolver = Resolver;

  ready = function() {
    if (isEmbedded()) {
      // Add a class 'hide-when-embedded' which can be used to hide elements
      // that we don't want to show up when embedded
      const head = document.getElementsByTagName('head')[0];
      const styl = document.createElement('style');
      const css = '.embedded .hide-when-embedded { display: none !important; }\n  .embedded-no-overflow { overflow-y: hidden; } .embedded-no-overflow #application { padding-bottom: 10px; }';

      styl.setAttribute('type', 'text/css');
      if (styl.styleSheet) {
        styl.styleSheet.cssText = css;
      } else {
        styl.appendChild(document.createTextNode(css));
      }
      head.appendChild(styl);

      // Notify outer window that the app has loaded when we are embedded
      dashboardWindow().postMessage({ action: 'ready' });
    }
  };

  engines = {
    login: {
      dependencies: {
        services: [
          'access',
          'app',
          'features',
          'globalStore',
          'intl',
          'modal',
          'router',
          'session',
          'settings',
          'user-language',
        ],
        externalRoutes: {
          index:                      'index',
          authenticated:              'authenticated',
          'update-password':          'update-password',
          'update-critical-settings': 'update-critical-settings'
        }
      }
    },
    nodes: {
      dependencies: {
        services: [
          'access',
          'app',
          'azureAd',
          'catalog',
          'clusterStore',
          'digitalOcean',
          'endpoint',
          'features',
          'globalStore',
          'intl',
          'linode',
          'modal',
          'resource-actions',
          'router',
          'scope',
          'session',
          'settings',
          'store',
          'tooltip',
          'user-language',
          'user-theme',
        ],
        externalRoutes: {
          index:                                          'index',
          failWhale:                                      'failWhale',
          authenticated:                                  'authenticated',
          'authenticated.cluster':                        'authenticated.cluster',
          'authenticated.cluster.projects':               'authenticated.cluster.projects',
          'authenticated.project':                        'authenticated.project',
          'authenticated.prefs':                          'authenticated.prefs',
          'authenticated.cluster.nodes':                  'authenticated.cluster.nodes',
          'authenticated.cluster.security.members.index': 'authenticated.cluster.security.members.index',
          'global-admin.security.cloud-credentials':      'global-admin.security.cloud-credentials',
          'logout':                                       'logout'
        }
      }
    },
    'global-admin': {
      dependencies: {
        services: [
          'access',
          'app',
          'azureAd',
          'catalog',
          'clusterStore',
          'digitalOcean',
          'endpoint',
          'features',
          'globalStore',
          'intl',
          'modal',
          'oauth',
          'resource-actions',
          'scope',
          'session',
          'settings',
          'store',
          'tooltip',
          'user-language',
          'user-theme',
          'router',
        ],
        externalRoutes: {
          index:                                          'index',
          failWhale:                                      'failWhale',
          authenticated:                                  'authenticated',
          'authenticated.cluster':                        'authenticated.cluster',
          'authenticated.cluster.projects':               'authenticated.cluster.projects',
          'authenticated.project':                        'authenticated.project',
          'authenticated.project.apps-tab':               'authenticated.project.apps-tab',
          'authenticated.project.apps-tab.detail':        'authenticated.project.apps-tab.detail',
          'apps-tab':                                     'apps-tab',
          'apps-tab.detail':                              'apps-tab.detail',
          'authenticated.prefs':                          'nauthenticated.prefs',
          'authenticated.cluster.nodes':                  'authenticated.cluster.nodes',
          'authenticated.cluster.security.members.index': 'authenticated.cluster.security.members.index',
          'nodes.node-templates':                         'nodes.node-templates',
          'logout':                                       'logout',
        }
      }
    },
    logging: {
      dependencies: {
        services: [
          'app',
          'clusterStore',
          'features',
          'globalStore',
          'intl',
          'modal',
          'resource-actions',
          'router',
          'scope',
          'session',
          'store',
          'tooltip',
        ],
        externalRoutes: {}
      }
    },
    alert: {
      dependencies: {
        services: [
          'app',
          'clusterStore',
          'features',
          'globalStore',
          'intl',
          'modal',
          'resource-actions',
          'router',
          'scope',
          'session',
          'store',
          'tooltip',
        ],
        externalRoutes: {
          notifier:                                           'authenticated.cluster.notifier',
          'authenticated.cluster.monitoring.cluster-setting': 'authenticated.cluster.monitoring.cluster-setting',
          'authenticated.project.monitoring.project-setting': 'authenticated.project.monitoring.project-setting',
        }
      }
    },
    monitoring: {
      dependencies: {
        services: [
          'app',
          'clusterStore',
          'features',
          'globalStore',
          'grafana',
          'intl',
          'k8s',
          'modal',
          'router',
          'scope',
          'session',
          'store',
          'tooltip',
        ],
        externalRoutes: {}
      }
    },
  };
}

loadInitializers(App, config.modulePrefix);
