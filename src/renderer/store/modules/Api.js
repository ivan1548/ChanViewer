const state = {
    data: false
}

const mutations = {
    SET_API_DATA(state, payload) {
        state.data = payload;
    },
}

const actions = {
    setApi({
        commit
    }, data) {
        // do something async
        commit('SET_API_DATA', data)
    }
}

export default {
    state,
    mutations,
    actions
}