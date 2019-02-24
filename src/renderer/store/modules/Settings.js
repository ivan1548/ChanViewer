const state = {
    api: "4chan"
}

const mutations = {
    SET_SETTINGS_ITEM(state, {
        key,
        value
    }) {
        state[key] = value;
    },
}

const actions = {
    setSettingsItem({
        commit
    }, {
        key,
        value
    }) {
        commit('SET_SETTINGS_ITEM', {
            key,
            value
        })
    }
}

export default {
    state,
    mutations,
    actions
}