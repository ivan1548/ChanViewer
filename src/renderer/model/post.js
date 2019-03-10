import {
    reduce,
    isNil,
    any
} from "rambda";

import store from "../store"

import GenericAPI from "./generic";

export default class PostModel extends GenericAPI {
    replies = []
    totalReplies
    files = []

    constructor(api, data, board) {
        super();
        this.api = api;
        this.board = board;

        this.setApiFields(this.api.post, data)

        this.files = this.api.getFiles(data, board)

        this.hasVideo = any(f => {
            return f.isVideo;
        }, this.files)
    }

    setReplies(replies) {
        this.replies = replies;
        return this;
    }

    getRepliesCount() {
        if (isNil(this.totalReplies)) {
            this.totalReplies = this._totalReplies();
        }

        return this.totalReplies;
    }

    _totalReplies() {
        if (this.replies.length > 0) {
            return reduce((acc, r) => {
                return acc + r._totalReplies()
            }, this.replies.length, this.replies)
        }
        return this.replies.length;
    }
}