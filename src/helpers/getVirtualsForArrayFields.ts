import {IVirtual} from "../models";
import {getObjectByPath} from "./getObjectByPath";

export let getVirtualsForArrayFields = (_virtuals: IVirtual[]): Object => {
    if (!(_virtuals != null && _virtuals.length > 0)) return null;
    let virtuals = {};
    _virtuals.forEach((_virtual: IVirtual) => {
        virtuals[_virtual.path] = (doc) => { return _virtual.callback(getObjectByPath(_virtual.path, doc)); };
    });
    return virtuals;
};
