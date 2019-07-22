import {Document, Schema, Model, model, Types} from "mongoose";
import {ICard, CardType, Countries, IVirtual} from "../models";
import {dbConnection} from "../db";
import {addBrackets, assignSchemaPlugin, getConstraints} from "../helpers";

export interface ICardModel extends ICard, Document {
}

const cardSchema = new Schema({
    type: {
        type: String,
        enum: Object.keys(CardType).map(e => CardType[e]),
        trim: true,
        required: [true, "Choosing the card type is mandatory"]
    },
    last4Digits: {
        type: Number,
        trim: true,
        required: [true, "Last 4 digits of the card are required"],
        minlength: 4,
        maxlength: 4
    },
    cardNumber: {
        type: String,
        default: function () { return "XXXX-XXXX-XXXX-" + this.last4Digits; }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Person"
    },
    autoComplete: {
        displayText: {
            type: String,
            default: function () { return this.type + " " + this.last4Digits; }
        },
        actualValue: {
            type: String,
            default: function () { return this.type + " " + this.last4Digits; }
        }
    }
});

const virtuals: IVirtual[] = [
    { path: "autoComplete.displayText", callback: addBrackets },
    { path: "autoComplete.actualValue", callback: addBrackets }];

const csvHeaders: string[] = Object.keys(cardSchema["paths"]);

assignSchemaPlugin(cardSchema, csvHeaders, virtuals);

export const Card: Model<ICardModel> = dbConnection.model<ICardModel>("Card", cardSchema);
dbConnection.collection("cards").createIndex({type: 1, last4Digits: 1, owner: 1},{unique: true});