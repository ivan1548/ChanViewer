import store from "../store";


import api4 from '../api/4chan';
import api2 from '../api/2ch';

let availableApis = {};
availableApis[api4.name] = api4;
availableApis[api2.name] = api2;

export function init() {
    store.dispatch("setApi", availableApis[store.state.Settings.api])
}

export {
    availableApis
}

export default {
    availableApis,
    init
}