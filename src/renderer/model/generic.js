import {
    keys
} from "rambda";

export default class GenericAPI {
    setApiFields(fields, data) {
        keys(fields).forEach(k => {
            if (typeof fields[k] === "function") {
                this[k] = fields[k](data)
            } else {
                this[k] = data[fields[k]]
            }
        })
    }
}