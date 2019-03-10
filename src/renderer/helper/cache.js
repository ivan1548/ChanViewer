import {
    isNil,
    join,
    concat,
    compose
} from "rambda";

import store from "../store";

import { availableApis } from "../helper/api";

const BOARDS = "boards"
const BOARD = "board"
const THREAD = "thread"

function getApi(api) {
    if (isNil(api)) {
        return store.state.Api.data;
    }

    return availableApis[api];
}

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

function get(apival, name, getter, attrs = []) {
    const api = getApi(apival);
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
    return get(null, BOARDS, "getBoards")
}

export function getBoard(id) {
    return get(null, BOARD, "getBoard", [id])
}
export function getThread(board, id, api) {
    return get(api, THREAD, "getThread", [board, id])
}