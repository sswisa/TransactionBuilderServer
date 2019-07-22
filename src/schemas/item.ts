import {Document, Schema, Model, model} from "mongoose";
import {currencySymbol, IItem, IVirtual, Severity} from "../models";
import {shoppingCategories} from "../jsons";
import {ITransactionModel} from "./transaction";
import {addBrackets, assignSchemaPlugin, joinObjectIds} from "../helpers";
import {dbConnection} from "../db";

export interface IItemModel extends Document, IItem {

}

const itemSchema = new Schema({
    severity: {
        type: String,
        enum: Object.keys(Severity).map(e => Severity[e]),
        default: Severity.Low
    },
    onWatchList: {
        type: Boolean,
        default: false
    },
    isRefund: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
        enum: Object.keys(shoppingCategories).map(e => shoppingCategories[e]),
        required: [true, "Choosing category/ies for transaction is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    amount: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        required: [true, "Item name is required"]
    },
    autoComplete: {
        displayText: {
            type: String,
            default: function () { return this.name; }
        },
        actualValue: {
            type: String,
            default: function () { return this.name; }
        }
    }
});

const virtuals: IVirtual[] = [
    { path: "autoComplete.displayText", callback: addBrackets },
    { path: "autoComplete.actualValue", callback: addBrackets }];

const csvHeaders: string[] = Object.keys(itemSchema["paths"]);

assignSchemaPlugin(itemSchema, csvHeaders, virtuals);

export const Item: Model<IItemModel> = dbConnection.model<IItemModel>("Item", itemSchema);
dbConnection.collection("items").createIndex({severity: 1, onWatchList: 1, isRefund: 1, categories: 1, price: 1, amount: 1, name: 1},{unique: true});