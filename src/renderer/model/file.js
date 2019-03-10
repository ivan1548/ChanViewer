import {
    includes
} from "rambda";

import {
    randomString
} from "../helper/general";
import store from "../store"

import GenericAPI from "./generic";

export default class FileModel extends GenericAPI {
    _videoExtensions = [".webm", ".mp4"]

    constructor(api, data, board) {
        super()

        this.board = board;

        this.setApiFields(api.file, data)

        this.isVideo = includes(this.ext, this._videoExtensions);

        this.src = api.urls.file(this);
        this.thumbnail.src = api.urls.thumbnail(this);

        this.file = `${this.filename}${this.ext}`;
        this.id = randomString(16);
    }
}