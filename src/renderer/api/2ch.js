import axios from "axios";
import {
    map,
    head,
    assoc,
    isNil
} from "rambda";

import {
    bytesToSize
} from "../helper/general"

import FileModel from "../model/file";
import PostModel from "../model/post";
import ThreadModel from "../model/thread";
import BoardModel from "../model/board";

const api = {
    name: "2ch",
    board: {
        id: "id",
        name: "name",
        nsfw() {
            return false
        }
    },
    post: {
        no(data) {
            return data["num"]
        },
        tim: "timestamp",
        subject: "subject",
        date: "date",
        name: "name",
        message(data) {
            return isNil(data["comment"]) ? "" : data["comment"]
        },
        post_count: "posts_count",
        file_count: "files_count"
    },
    file: {
        filename(data) {
            return data.file.name.replace(/\.[^/.]+$/, "")
        },
        ext(data) {
            return "." + data.file.name.split('.').pop()
        },
        size(data) {
            return bytesToSize(data.file.size * 1024);
        },
        no: "num",
        tim: "timestamp",
        path(data) {
            return data.file.path
        },
        width(data) {
            return data.file.width
        },
        height(data) {
            return data.file.height
        },
        thumbnail(data) {
            return {
                path: data.file.thumbnail,
                width: data.file.tn_width,
                height: data.file.tn_height
            }
        }

    },
    urls: {
        boards: "https://2ch.hk/boards.json",
        board(id) {
            return `https://2ch.hk/${id}/catalog.json`
        },
        thread(board, id) {
            return `https://2ch.hk/${board}/res/${id}.json`
        },
        thumbnail(file) {
            return `https://2ch.hk${file.thumbnail.path}`
        },
        file(file) {
            return `https://2ch.hk${file.path}`
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
            return map(thread => {
                return new PostModel(api, thread, id);
            })(response.data.threads);
        });
    },
    getThread(board, id) {
        return axios
            .get(this.urls.thread(board, id))
            .then(response => {
                return new ThreadModel(api, head(response.data.threads).posts, board);
            });
    },
    getReplyRef(post) {
        return `data-num="${post.no}"`;
    },
    getFiles(data, board) {
        if (data.files.length > 0) {
            return map(f => {
                return new FileModel(api, assoc('file', f, data), board)
            })(data.files)
        }
        return []
    }
}

export default api;