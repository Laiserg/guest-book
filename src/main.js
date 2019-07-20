import Vue from 'vue';
import App from './App.vue';
import './firebase-init.js';
import firebase from 'firebase';
import router from './router.js';

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      firebase,
      render: h => h(App),
    }).$mount('#app');
  }
});
