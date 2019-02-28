import {
    includes
} from "rambda";

// import api from "../api/4chan";
import store from "../store"

import GenericAPI from "./generic";

export default class FileModel extends GenericAPI {
    _videoExtensions = [".webm", ".mp4"]

    constructor(data, board) {
        super()
        const api = store.state.Api.data;

        this.board = board;

        this.setApiFields(api.file, data)

        this.isVideo = includes(this.ext, this._videoExtensions);

        this.src = api.urls.file(this);
        this.thumbnail.src = api.urls.thumbnail(this);

        this.file = `${this.filename}${this.ext}`;
        this.id = this.tim + this.no + this.filename;
    }
}