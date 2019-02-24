import "./style/main.scss";

import Vue from "vue";
import axios from "axios";

import App from "./App";
import router from "./router";
import store from "./store";

import "./init/preload";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

import preload from "./init/preload";


// electron.ipcRenderer.send("setProxy", "SOCKS5://127.0.0.1:9050");

// electron.ipcRenderer.on("proxyAvailable", function(event, message) {
//   $.getJSON("https://ifconfig.co/json", response => {
//     console.log(response);
//   }).fail((xhr, textStatus, error) => {
//     console.log(xhr);
//     console.log(textStatus);
//   });
// });

preload().then(() => {
  /* eslint-disable no-new */
  new Vue({
    components: {
      App
    },
    router,
    store,
    template: "<App/>"
  }).$mount("#app");
})