import {Document, Schema, Model, model} from "mongoose";
import {ITransaction, IVirtual, PaymentMethod, PaymentType, Severity} from "../models";
import {dbConnection} from "../db";
import {assignSchemaPlugin, getConstraints, joinObjectIds} from "../helpers";
import {shoppingCategories} from "../jsons/";

export interface ITransactionModel extends Document, ITransaction {
}

const transactionSchema = new Schema({
    dates: {
        type: [Date],
        required: [true, "Date of transaction is required"]
    },
    vendors: {
        type: [Schema.Types.ObjectId],
        ref: "Vendor"
    },
    persons: {
        type: [Schema.Types.ObjectId],
        ref: "Person"
    },
    payments: {
        type: [Schema.Types.ObjectId],
        ref: "Payment"
    },
    items: {
        type: [Schema.Types.ObjectId],
        ref: "Item"
    },
    price: {
        tax: {
            type: Number,
            default: 0
        },
        tip: {
            type: Number,
            default: 0
        },
        subTotal: {
            type: Number,
            required: [true, "Subtotal price is required"]
        },
        totalWithoutTip: {
            type: Number,
            default: function() { return this.price.total }
        },
        total: {
            type: Number,
            default: function() { return this.price.total }
        }
    }
});

const csvHeaders: string[] = Object.keys(transactionSchema["paths"]);

const virtuals: IVirtual[] = [
    {path: "dates", callback: joinObjectIds},
    {path: "persons", callback: joinObjectIds},
    {path: "vendors", callback: joinObjectIds},
    {path: "payments", callback: joinObjectIds},
    {path: "items", callback: joinObjectIds}
];

assignSchemaPlugin(transactionSchema, csvHeaders, virtuals);

export const Transaction: Model<ITransactionModel> = dbConnection.model<ITransactionModel>("Transaction", transactionSchema);
dbConnection.collection("transactions").createIndex({date: 1}, {unique: true});
