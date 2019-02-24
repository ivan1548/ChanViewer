const state = {}

const mutations = {
    SET_CACHE_ITEM(state, {
        key,
        value
    }) {
        state[key] = value;
    },
}

const actions = {
    setCacheItem({
        commit
    }, {
        key,
        value
    }) {
        commit('SET_CACHE_ITEM', {
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