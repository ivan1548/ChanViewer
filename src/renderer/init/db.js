import electron from "electron";
import Datastore from "nedb-promises";

export const localDataStorage = electron.remote.app.getPath("userData");

export const settings = Datastore.create({
    filename: `${localDataStorage}/chan-viewer-db/settings.db`,
    autoload: true
});