import Vue from 'vue';
import App from './App';
import VueRoute from 'vue-router';
import VueResource from 'vue-resource';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import 'common/stylus/index.styl';

Vue.use(VueRoute);
Vue.use(VueResource);

let app = Vue.extend(App);
let router = new VueRoute({
	linkActiveClass: 'active'
});

router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  'seller': {
    component: seller
  }
});

router.start(app, '#app');

router.go('goods');
