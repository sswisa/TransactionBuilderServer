import * as express from "express";
import {Transaction, ITransactionModel} from "../schemas";

const transactions = express.Router();

transactions.get("/transactions", (req: express.Request, res: express.Response) => {
    const shallowPopulationOptions = [
        {path: "vendor", model: "Contact"},
        {path: "person", model: "Contact"},
        {path: "payment", model: "Payment"}
    ];

    const deepPopulationOptions = [
        {path: "vendor.address", model: "Address"},
        {path: "person.address", model: "Address"},
        {path: "payment.card", model: "Card"}
    ];

    const populateCardOwner = {path: "payment.card.owner", model: "Contact"};

    Transaction
        .find()
        .populate(shallowPopulationOptions)
        .exec()
        .then((transactions: ITransactionModel[]) => {
            return Transaction.populate(transactions, deepPopulationOptions)
        })
        .then((transactions: ITransactionModel[]) => {
            return Transaction.populate(transactions, populateCardOwner)
        })
        .then((transactions: ITransactionModel[]) => {
            res.send(transactions);
        })
        .catch((err) => {
            throw err;
        });
});

module.exports = transactions;