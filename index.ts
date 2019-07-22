import * as express from "express";
const mongoose = require("mongoose");
import {usaStates, shoppingCategories} from "./src/jsons";
import {ModelPopulateOptions} from "mongoose";
import {DocumentToCsv} from "./src/tools/export/csv/document";
const fs = require("fs");

import {
    IAddressModel,
    ITransactionModel,
    ICardModel,
    IPersonModel,
    IVendorModel,
    IPaymentModel,
    IItemModel,
    Item,
    Address,
    Card,
    Payment,
    Transaction,
    Contact,
    vendor as Vendor,
    person as Person
} from "./src/schemas";

import {
    Severity,
    Countries,
    CardType,
    PaymentType,
    PaymentMethod,
    CurrencyType,
    ContactType,
    IPrice
} from "./src/models";

const app = express();
const hostname = "127.0.0.1";
let customPort = process.argv.slice(2).pop();
// const selectedPort = Number(customPort) || Number(process.env.PORT) || 8082;
const selectedPort = 8081;

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authorization, content-type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, PATCH, OPTIONS");
    next();
});

app.use(require('./src/routers/autoComplete'));
app.use(require('./src/routers/transactions'));

let homeAddress: IAddressModel = new Address({
    _id: new mongoose.Types.ObjectId(),
    state: usaStates.NY,
    country: Countries.USA,
    city: "Forest Hills",
    street: "108-29 65th Ave",
    zip: 11375,
    autoComplete: {
        displayText: "Home"
    }
});

let saluteAddress: IAddressModel = new Address({
    _id: new mongoose.Types.ObjectId(),
    state: usaStates.NY,
    country: Countries.USA,
    city: "Forest Hills",
    street: "63-61 108th St",
    zip: 11375,
    autoComplete: {
        displayText: "Salute in 108"
    }
});

let danielle: IPersonModel = new Person({
    _id: new mongoose.Types.ObjectId(),
    type: ContactType.Person,
    name: {
        first: "Danielle",
        last: "Swisa"
    },
    phone: 3473017251,
    emails: ["danicoh926@yahoo.com"],
    address: homeAddress._id
});

let shimon: IPersonModel = new Person({
    _id: new mongoose.Types.ObjectId(),
    type: ContactType.Person,
    name: {
        first: "Shimon",
        last: "Swisa"
    },
    phone: 3472339646,
    emails: ["shmn0007@gmail.com"],
    address: homeAddress._id
});

let card: ICardModel = new Card({
    _id: new mongoose.Types.ObjectId(),
    type: CardType.Debit,
    last4Digits: "3239",
    owner: shimon._id,
    autoComplete: {
        displayText: "Shimon's debit card 3239"
    }
});

let salute: IVendorModel = new Vendor({
    _id: new mongoose.Types.ObjectId(),
    type: ContactType.Vendor,
    name: "Salute Kosher Restaurant",
    displayText: "Salute",
    phone: 7182756860,
    address: saluteAddress._id
});

let payment: IPaymentModel = new Payment({
    _id: new mongoose.Types.ObjectId(),
    type: PaymentType.OneTimePurchase,
    method: PaymentMethod.Card,
    card: card._id,
    currency: CurrencyType.USD
});

let smallIsraeliSalad: IItemModel = new Item({
    _id: new mongoose.Types.ObjectId,
    categories: [ shoppingCategories.restaurants ],
    price: 6,
    name: "israeli salad small"
});

let rice: IItemModel = new Item({
    _id: new mongoose.Types.ObjectId,
    categories: [ shoppingCategories.restaurants ],
    price: 3.95,
    name: "rice side order"
});

let chicken: IItemModel = new Item({
    _id: new mongoose.Types.ObjectId,
    categories: [ shoppingCategories.restaurants ],
    price: 4.50,
    name: "boneless chicken-kebab"
});

let transaction: ITransactionModel = new Transaction({
    _id: new mongoose.Types.ObjectId(),
    dates: [new Date(2018, 9, 17, 13, 57, 3)],
    vendors: [salute._id],
    persons: [shimon._id, danielle._id],
    payments: [payment._id],
    items: [smallIsraeliSalad._id, rice._id, chicken._id],
    price: <IPrice>{
        tax: 1.28,
        tip: 2,
        subTotal: 14.45,
        totalWithoutTip: 15.73,
        total: 17.73
    }
});

let mongooseErrorHandler = (err) => {
    if (err.name === "MongoError" && err.code === 11000) throw err;
    throw err;
}

// homeAddress
//     .save()
//     .then(() => { console.log(`homeAddress saved`); })
//     .then(() => { return saluteAddress.save(); })
//     .then(() => { console.log(`saluteAddress saved`); })
//     .then(() => { return danielle.save(); })
//     .then(() => { console.log(`danielle saved`); })
//     .then(() => { return shimon.save(); })
//     .then(() => { console.log(`shimon saved`); })
//     .then(() => { return card.save(); })
//     .then(() => { console.log(`card saved`); })
//     .then(() => { return salute.save(); })
//     .then(() => { console.log(`salute saved`); })
//     .then(() => { return payment.save(); })
//     .then(() => { console.log(`payment saved`); })
//     .then(() => { return smallIsraeliSalad.save(); })
//     .then(() => { console.log(`smallIsraeliSalad saved`); })
//     .then(() => { return rice.save(); })
//     .then(() => { console.log(`rice saved`); })
//     .then(() => { return chicken.save(); })
//     .then(() => { console.log(`chicken saved`); })
//     .then(() => { return transaction.save(); })
//     .then(() => {
//         console.log(`transaction saved`);
//         let exportCsv = new DocumentToCsv();
//         exportCsv.export();
//     })
//     .catch(mongooseErrorHandler);

let exportCsv = new DocumentToCsv();
exportCsv.export();

app.get("/", (req, res) => {
    res.send("Hello Express");
});



app.listen(selectedPort, hostname, () => {
    console.log(`Server running at http://${hostname}:${selectedPort}`);
});