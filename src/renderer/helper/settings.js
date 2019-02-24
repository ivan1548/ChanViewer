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

    const proms = compose(
        map(key => {
            return settings.findOne({
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
                        value: doc.value
                    });
                }
            })
        }),
        keys
    )(settingDefaults)

    return Promise.all(proms);
};

export function update(key, value) {
    return settings.findOne({
        _id: key
    }).then(doc => {
        if (isNil(doc)) {
            console.log("error", "setting not found")
        } else {
            settings.update({
                _id: key
            }, {
                $set: {
                    value: value
                }
            }).then((n) => {
                console.log(n)
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