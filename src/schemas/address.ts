import {Document, Schema, Model, model} from "mongoose";
import {IAddress, Countries, PaymentType, PaymentMethod, IVirtual} from "../models";
import {addBrackets, assignSchemaPlugin, getConstraints, isValidEmailAddress, joinObjectIds} from "../helpers";
import {dbConnection} from "../db";
import {usaStates} from "../jsons";

export interface IAddressModel extends Document, IAddress {
}

const addressSchema = new Schema({
    state: {
        name: {
            type: String,
            trim: true
        },
        abbreviation: {
            type: String,
            trim: true
        }
    },
    country: {
        type: String,
        required: [true, "Country is mandatory"],
        trim: true,
        enum: Object.keys(Countries).map(e => Countries[e])
    },
    city: {
        type: String,
        trim: true,
        required: [true, "City is required"],
        minlength: 2,
        maxlength: 25,
    },
    street: {
        type: String,
        trim: true,
        required: [true, "Street is required"],
        minlength: 2,
        maxlength: 50,
    },
    zip: {
        type: Number,
        trim: true
    },
    autoComplete: {
        displayText: {
            type: String,
            default: function () { return  this.street + ", " + this.city + ", " + this.state.abbreviation + " " + this.zip }
        },
        actualValue: {
            type: String,
            default: function () { return  this.street + ", " + this.city + ", " + this.state.abbreviation + " " + this.zip }
        }
    }
});

addressSchema.obj.state.required = function () {
    return this.country === Countries.USA;
};

const virtuals: IVirtual[] = [
    { path: "autoComplete.displayText", callback: addBrackets },
    { path: "autoComplete.actualValue", callback: addBrackets }];

const csvHeaders: string[] = Object.keys(addressSchema["paths"]);

assignSchemaPlugin(addressSchema, csvHeaders, virtuals);

export const Address: Model<IAddressModel> = dbConnection.model<IAddressModel>("Address", addressSchema);
dbConnection.collection("addresses").createIndex({country: 1, city: 1, street: 1, zip: 1, "state.name": 1, "state.abbreviation": 1},{unique: true});