import {getConstraints, getVirtualsForArrayFields} from "./index";
import {IVirtual} from "../models";

const mongooseToCsv = require("mongoose-to-csv");
import {Schema} from "mongoose";

export let assignSchemaPlugin = (schema: Schema, csvHeaders: string[], virtuals?: IVirtual[]): void => {
    schema.plugin(mongooseToCsv, {
        headers: csvHeaders,
        constraints: getConstraints(csvHeaders),
        virtuals: getVirtualsForArrayFields(virtuals)
    });
}