import {
    isNil
} from "rambda";

import axios from "axios";

import FileModel from "../model/file";

export default {
    name: "4chan",
    board: {
        id: "board",
        name: "title",
        nsfw(data) {
            return !data.ws_board
        }
    },
    post: {
        no: "no",
        tim: "tim",
        subject(data) {
            return isNil(data["sub"]) ? "" : data["sub"]
        },
        date: "now",
        name: "name",
        message: "com"
    },
    file: {
        filename: "filename",
        ext: "ext",
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
            return response.data.boards;
        });
    },
    getBoard(id) {
        return axios.get(this.urls.board(id)).then(response => {
            return response.data;
        });
    },
    getThread(board, id) {
        return axios
            .get(this.urls.thread(board, id))
            .then(response => {
                return response.data.posts;
            });
    },
    getReplyRef(post) {
        return "#p" + post.no;
    },
    getFiles(data, board) {
        if (data.filename) {
            return [new FileModel(data, board)];
        }
        return []
    }
}