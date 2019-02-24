import axios from "axios";
import {
    compose,
    map,
    splitEvery,
    head,
    assoc
} from "rambda";

import FileModel from "../model/file";

export default {
    name: "2ch",
    board: {
        id: "id",
        name: "name",
        nsfw() {
            return false
        }
    },
    post: {
        no: "num",
        tim: "timestamp",
        subject: "subject",
        date: "date",
        name: "name",
        message: "comment"
    },
    file: {
        filename(data) {
            return data.file.name.replace(/\.[^/.]+$/, "")
        },
        ext(data) {
            return data.file.name.split('.').pop()
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
            return `https://2ch.hk/${file.thumbnail.path}`
        },
        file(file) {
            return `https://2ch.hk/${file.path}`
        }
    },
    getBoards() {
        return axios.get(this.urls.boards).then(response => {
            return response.data.boards;
        });
    },
    getBoard(id) {
        return axios.get(this.urls.board(id)).then(response => {
            // return splitEvery(10, response.data.threads);
            return compose(
                    map((threads, index) => {
                        return {
                            page: index + 1,
                            threads: threads
                        }
                    }),
                    splitEvery(20)
                )
                (response.data.threads)
        });
    },
    getThread(board, id) {
        return axios
            .get(this.urls.thread(board, id))
            .then(response => {
                return head(response.data.threads).posts;
            });
    },
    getReplyRef(post) {
        return "#p" + post.no;
    },
    getFiles(data, board) {
        if (data.files.length > 0) {
            return map(f => {
                return new FileModel(assoc('file', f, data), board)
            })(data.files)
        }
        return []
    }
}