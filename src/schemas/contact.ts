import {Document, Schema, Model, model, Types} from "mongoose";
import {IPerson, IVendor, IContact, IPersonName, ContactType, CardType, IVirtual} from "../models";
import {
    getConstraints,
    isNumericString,
    isValidEmailAddress,
    assignSchemaPlugin,
    joinObjectIds, addBrackets
} from "../helpers";
import {dbConnection} from "../db";

export interface IContactModel extends IContact, Document { }

export interface IPersonModel extends IPerson, Document { }

export interface IVendorModel extends IVendor, Document { }

const contactSchema = new Schema({
    type: {
        type: String,
        enum: Object.keys(ContactType).map(e => ContactType[e]),
        require: [true, "Contact type is required"],
        trim: true
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"],
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    emails: {
        type: [String],
        trim: true,
        minlength: 6,
        validate: {
            validator: (email: string) => isValidEmailAddress(email),
            message: "The email field can't be empty"
        }
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    }
});

const personSchema = new Schema({
    name: {
        first: {
            type: String,
            minlength: 1,
            trim: true,
            required: [true, "First name is required"]
        },
        last: {
            type: String,
            minlength: 1,
            trim: true,
            required: [true, "Last name is required"]
        },
        full: {
            type: String,
            default: function () { return this.name.first + " " + this.name.last; }
        }
    },
    autoComplete: {
        displayText: {
            type: String,
            default: function () { return this.name.full }
        },
        actualValue: {
            type: String,
            default: function () { return this.name.full }
        }
    }
});

const vendorSchema = new Schema({
    name: {
        type: String,
        minlength: 1,
        trim: true,
        required: [true, "Vendor name is required"]
    },
    displayText: {
        type: String,
        minlength: 1,
        trim: true,
        default: this.vendorName
    },
    autoComplete: {
        displayText: {
            type: String,
            default: function () { return this.displayText; }
        },
        actualValue: {
            type: String,
            default: function () { return this.displayText; }
        }
    }
});

const contactPaths: string[] = Object.keys(contactSchema["paths"]);
const vendorPaths: string[] = Object.keys(vendorSchema["paths"]);
const personPaths: string[] = Object.keys(personSchema["paths"]);

const contactCsvHeaders: string[] = Array.from(new Set([...contactPaths, ...vendorPaths, ...personPaths]).values());
const personCsvHeaders: string[] = Array.from(new Set([...contactPaths, ...personPaths]).values());
const vendorCsvHeaders: string[] = Array.from(new Set([...contactPaths, ...vendorPaths]).values());

const personVirtuals: IVirtual[] = [
    { path: "emails", callback: joinObjectIds },
    { path: "autoComplete.displayText", callback: addBrackets },
    { path: "autoComplete.actualValue", callback: addBrackets }
];

const vendorVirtuals: IVirtual[] = [
    { path: "emails", callback: joinObjectIds },
    { path: "autoComplete.displayText", callback: addBrackets },
    { path: "autoComplete.actualValue", callback: addBrackets }];

assignSchemaPlugin(personSchema, personCsvHeaders, personVirtuals);
assignSchemaPlugin(vendorSchema, vendorCsvHeaders, vendorVirtuals);

export const Contact: Model<IContactModel> = dbConnection.model<IContactModel>("Contact", contactSchema);
dbConnection.collection("contacts").createIndex({type: 1, phone: 1, email: 1, address: 1},{unique: true});

const Person = Contact.discriminator("Person", personSchema);
const Vendor = Contact.discriminator("Vendor", vendorSchema);

export const person: Model<IPersonModel> = dbConnection.model<IPersonModel>("Person", personSchema);
dbConnection.collection("persons").createIndex({"name.first": 1, "name.last": 1},{unique: true});
export const vendor: Model<IVendorModel> = dbConnection.model<IVendorModel>("Vendor", vendorSchema);
dbConnection.collection("vendors").createIndex({name: 1, displayName: 1},{unique: true});

