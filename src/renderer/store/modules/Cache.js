import {
    keys
} from "rambda";

const state = {}

const mutations = {
    SET_CACHE_ITEM(state, {
        key,
        value
    }) {
        state[key] = value;
    },
    CLEAR_CACHE(state) {
        keys(state).forEach(k => {
            state[k] = null
        })
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
    },
    clearCache({
        commit
    }) {
        commit('CLEAR_CACHE')
    }
}

export default {
    state,
    mutations,
    actions
}