import {
    isNil,
    map,
    compose,
    flatten
} from "rambda";

import axios from "axios";

import {
    bytesToSize
} from "../helper/general"

import FileModel from "../model/file";
import PostModel from "../model/post";
import ThreadModel from "../model/thread";
import BoardModel from "../model/board";

const api = {
    name: "4chan",
    board: {
        id: "board",
        name: "title",
        nsfw(data) {
            return !data.ws_board
        }
    },
    post: {
        no(data) {
            return data["no"]
        },
        tim: "tim",
        subject(data) {
            return isNil(data["sub"]) ? "" : data["sub"]
        },
        date: "now",
        name: "name",
        message(data) {
            return isNil(data["com"]) ? "" : data["com"]
        },
        post_count: "replies",
        file_count: "images"
    },
    file: {
        filename: "filename",
        ext: "ext",
        size(data) {
            return bytesToSize(data.fsize);
        },
        no: "no",
        tim: "tim",
        width: "w",
        height: "h",
        thumbnail(data) {
            return {
                width: data.tn_w,
                height: data.tn_h
            }
        }
    },
    urls: {
        boards: "https://a.4cdn.org/boards.json",
        board(id) {
            return `https://a.4cdn.org/${id}/catalog.json`
        },
        thread(board, id) {
            return `https://a.4cdn.org/${board}/thread/${id}.json`
        },
        thumbnail(file) {
            return `https://i.4cdn.org/${file.board}/${file.tim}s.jpg`
        },
        file(file) {
            return `https://i.4cdn.org/${file.board}/${file.tim}${file.ext}`
        }
    },
    getBoards() {
        return axios.get(this.urls.boards).then(response => {
            return map(b => {
                return new BoardModel(b);
            })(response.data.boards);
        });
    },
    getBoard(id) {
        return axios.get(this.urls.board(id)).then(response => {
            return compose(
                flatten,
                map(p => {
                    return map(thread => {
                        return new PostModel(api, thread, id);
                    }, p.threads)
                }))(response.data)
        });
    },
    getThread(board, id) {
        return axios
            .get(this.urls.thread(board, id))
            .then(response => {
                return new ThreadModel(api, response.data.posts, board);
            });
    },
    getReplyRef(post) {
        return "#p" + post.no;
    },
    getFiles(data, board) {
        if (data.filename) {
            return [new FileModel(api, data, board)];
        }
        return []
    }
}

export default api;