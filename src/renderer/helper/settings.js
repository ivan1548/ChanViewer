import {
    compose,
    isNil,
    keys,
    map
} from "rambda";

import store from "../store";

import {
    settings
} from "../init/db";

export function init() {
    const settingDefaults = store.state.Settings;

    compose(
        map(key => {
            settings.findOne({
                _id: key
            }).then(doc => {
                if (isNil(doc)) {
                    settings.insert({
                        _id: key,
                        value: settingDefaults[key]
                    })
                } else {
                    store.dispatch("setSettingsItem", {
                        key,
                        value: settingDefaults[key]
                    });
                }
            })
        }),
        keys
    )(settingDefaults)
};

export function update(key, value) {
    return settings.findOne({
        _id: key
    }).then(doc => {
        if (isNil(doc)) {
            console.log("error", "setting not found")
        } else {
            settings.update({
                _id: key,
                value: value
            }).then(() => {
                store.dispatch("setSettingsItem", {
                    key,
                    value
                });

            })

        }
    });
}

export default {
    init,
    update
}