import store from "../store"

import GenericAPI from "./generic";

export default class BoardModel extends GenericAPI {
    constructor(data, board) {
        super()
        const api = store.state.Api.data;

        this.setApiFields(api.board, data)
    }
}