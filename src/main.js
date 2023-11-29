import Vue from "vue";
import App from "./App";
import router from './router/index.js'
import store from './store/index.js'
// import { AlertPlugin } from "vux";

// Vue.use(AlertPlugin);

new Vue({
    el:"#app",
    router,
    store,
    components: { App },
    template: "<App/>"
  });
  
