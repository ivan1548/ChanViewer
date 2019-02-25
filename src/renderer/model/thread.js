import {
    compose,
    map,
    filter,
    includes,
    concat,
    uniq,
    prepend,
    flatten
} from "rambda";

// import api from "../api/4chan";
import store from "../store"

import Post from "./post";

export default class ThreadModel {
    _replyNos = [];
    created = [];

    constructor(posts, board) {

        this.original = posts;
        this.board = board;

        this.sorted = compose(
            filter(post => {
                return !includes(post.no, this._replyNos);
            }),
            map(post => {
                return this._convertPost(post, posts);
            })
        )(posts);

        this.files = compose(flatten, map(p => {
            return this._getFiles(p)
        }))(this.sorted)

        this.videos = filter(file => {
            return file.isVideo;
        })(this.files);

        this.images = filter(file => {
            return !file.isVideo;
        })(this.files);
    }

    _getFiles(post) {
        if (post.replies.length > 0) {
            return prepend(post.files, map(r => {
                return this._getFiles(r);
            }, post.replies))
        } else {
            return post.files;
        }
    }

    _getMediaReplies(post) {
        if (post.replies.length > 0) {
            return prepend(post, map(r => {
                return this._getMediaReplies(r);
            }, post.replies))
        } else {
            return post;
        }
    }

    _replies(post, posts) {
        const api = store.state.Api.data;
        const ref = api.getReplyRef(post);

        const replies = filter(p => {
            return includes(ref, p.com);
        }, posts);

        const _replyNos = map(p => {
            return p.no;
        }, replies);

        this._replyNos = uniq(concat(this._replyNos, _replyNos));

        return map(r => {
            return this._convertPost(r, posts);
        }, replies);
    }

    _convertPost(post, posts) {
        const formatted = new Post(post, this.board);

        const index = this.created.findIndex(p => {
            return formatted.no === p.no;
        });

        if (index > -1) {
            return formatted;
        } else {
            this.created.push(formatted);
            return formatted.setReplies(this._replies(formatted, posts));
        }

    }
}