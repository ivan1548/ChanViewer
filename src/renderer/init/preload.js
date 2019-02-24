import {
    init as initSettings
} from "../helper/settings"

import {
    init as initApi
} from "../helper/api"


export default function preload() {
    return initSettings().then(() => {
        return initApi();
    });
}