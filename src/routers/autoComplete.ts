import * as express from "express";
import {
    IPersonModel,
    IAddressModel,
    IVendorModel,
    IPaymentModel,
    ICardModel,
    IItemModel,
    person as Person,
    vendor as Vendor,
    Address,
    Payment,
    Card,
    Item
} from "../schemas";

const autoComplete = express.Router();

export enum EntityTypes {
    person = "person",
    vendor = "vendor",
    address = "address",
    card = "card",
    payment = "payment",
    transaction = "transaction",
    item = "item"
}

const entities = {
    person: Person,
    vendor: Vendor,
    address: Address,
    payment: Payment,
    card: Card,
    item: Item
}

export interface IPopulateObject {
    model: EntityTypes;
    path: string;
}

export interface ISearchEntities {
    entityType: EntityTypes;
    populateObject?: IPopulateObject;
}

type IEntityModel = IVendorModel | IPersonModel | IAddressModel | IPaymentModel | ICardModel;

autoComplete.get("/auto-complete", (req: express.Request, res: express.Response) => {
    const searchVal = req.query.searchVal;
    const searchEntities: ISearchEntities = JSON.parse(decodeURI(req.query.searchEntities));
    const entity = entities[searchEntities.entityType];
    const populateEntity = searchEntities.populateObject != null ? entities[searchEntities.populateObject.model] : null;
    entity
        .find({"autoComplete.displayText": {$regex: `^${searchVal}`, $options: "i"}})
        .exec()
        .then((results: IEntityModel[]) => {
            return populateEntity != null ? entity.populate(results, [{path: searchEntities.populateObject.path, model: populateEntity}]) : results;
        })
        .then((contacts: IEntityModel[]) => {
            res.send(contacts);
        })
        .catch((err) => { throw err; });
});

module.exports = autoComplete;