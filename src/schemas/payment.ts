import {Document, Schema, Model, model} from "mongoose";
import {IPayment, PaymentType, PaymentMethod, CurrencyType, currencySymbol, IVirtual} from "../models";
import {dbConnection} from "../db";
import {addBrackets, assignSchemaPlugin, getConstraints} from "../helpers";

export interface IPaymentModel extends Document, IPayment {

}


const paymentSchema = new Schema({
    type: {
        type: String,
        enum: Object.keys(PaymentType).map(e => PaymentMethod[e])
    },
    method: {
        type: String,
        enum: Object.keys(PaymentType).map(e => PaymentMethod[e])
    },
    card: {
        type: Schema.Types.ObjectId,
        ref: "Card"
    },
    currency: {
        type: String,
        required: [true, "Choosing currency is mandatory"],
        trim: true,
        enum: Object.keys(PaymentType).map(e => PaymentMethod[e])
    },
    autoComplete: {
        displayText: {
            type: String,
            default: function () { return `${this.method} - ${this.type}`; }
        },
        actualValue: {
            type: String,
            default: function () { return `${this.method} - ${this.type}`; }
        }
    }
});

const virtuals: IVirtual[] = [
    { path: "autoComplete.displayText", callback: addBrackets },
    { path: "autoComplete.actualValue", callback: addBrackets }];

const csvHeaders: string[] = Object.keys(paymentSchema["paths"]);

assignSchemaPlugin(paymentSchema, csvHeaders, virtuals);

export const Payment: Model<IPaymentModel> = dbConnection.model<IPaymentModel>("Payment", paymentSchema);
dbConnection.collection("payments").createIndex({type: 1, method: 1, card: 1, currency: 1},{unique: true});