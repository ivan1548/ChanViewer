import {
    isNil,
    join,
    concat,
    compose
} from "rambda";

import store from "../store";

const BOARDS = "boards"
const BOARD = "board"
const THREAD = "thread"

function getKey(prefix, key, ...extra) {
    return compose(
        join("_"),
        concat([prefix, key])
    )(extra)
}

function updateCache(key, value) {
    store.dispatch("setCacheItem", {
        key,
        value
    });
}

function get(name, getter, attrs = []) {
    const api = store.state.Api.data;
    const cache = store.state.Cache;

    const key = getKey(api.name, name, ...attrs);

    if (isNil(cache[key])) {
        return api[getter](...attrs).then(result => {
            updateCache(key, result);
            return result;
        })
    }

    return Promise.resolve(cache[key]);
}

export function getBoards() {
    return get(BOARDS, "getBoards")
}

export function getBoard(id) {
    return get(BOARD, "getBoard", [id])
}
export function getThread(board, id) {
    return get(THREAD, "getThread", [board, id])
}