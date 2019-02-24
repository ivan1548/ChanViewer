const state = {
    media: null
}

const mutations = {
    SET_VIEWER_MEDIA(state, payload) {
        state.media = payload;
    },
}

const actions = {
    setViewerMedia({
        commit
    }, data) {
        // do something async
        commit('SET_VIEWER_MEDIA', data)
    }
}

export default {
    state,
    mutations,
    actions
}