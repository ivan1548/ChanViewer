import {
    compose,
    find,
    isNil
} from "rambda";

const state = {
    threads: []
}

const mutations = {
    ADD_BOOKSHELF_ITEM(state, item) {
        const undef = compose(
            isNil,
            find((i) => {
                return i.no === item.no;
            })
        )(state.threads);

        if (undef) {
            state.threads.push(item);
        }
    },
    REMOVE_BOOKSHELF_ITEM(state, item) {
        const index = state.threads.findIndex((i) => {
            return i.no === item.no;
        });

        if (index > -1) {
            state.threads.splice(index, 1);
        }
    },
    CLEAR_BOOKSHELF(state) {
        state.threads = [];
    },
}

const actions = {
    addBookshelfItem({
        commit
    }, item) {
        commit('ADD_BOOKSHELF_ITEM', item)
    },
    removeBookshelfItem({
        commit
    }, item) {
        commit('REMOVE_BOOKSHELF_ITEM', item)
    },
    clearBookshelf({
        commit
    }) {
        commit('CLEAR_BOOKSHELF')
    }
}

export default {
    state,
    mutations,
    actions
}