import {ModelPopulateOptions, Schema, Model} from "mongoose";

const fs = require("fs");
const path = require("path");

import {
    ITransactionModel,
    IAddressModel,
    ICardModel,
    IPaymentModel,
    IVendorModel,
    IPersonModel,
    IContactModel,
    IItemModel,
    Transaction,
    vendor as Vendor,
    person as Person,
    Contact,
    Address,
    Card,
    Payment,
    Item
} from "../../../schemas";

export interface ISchemaModels {
    transaction: Model<ITransactionModel>;
    address: Model<IAddressModel>;
    card: Model<ICardModel>;
    payment: Model<IPaymentModel>;
    vendor: Model<IVendorModel>;
    person: Model<IPersonModel>;
    contact: Model<IContactModel>;
    item: Model<IItemModel>;
}

export interface IDocumentToCsv {
    export(schemaModels?: Model<any>[]): void;
}

export class DocumentToCsv {

    private readonly shallowPopulationOptions: ModelPopulateOptions[];
    private readonly deepPopulationOptions: ModelPopulateOptions[];
    private readonly populateCardOwner: ModelPopulateOptions;
    private readonly baseExportPath: string;
    private readonly schemaModels: Model<any>[];
    private readonly unpopulatedPath: string;
    private readonly backupsPath: string;

    constructor() {

        this.schemaModels = <Model<any>[]>[
            Transaction,
            Item,
            Address,
            Card,
            Payment,
            Vendor,
            Person
        ];

        this.shallowPopulationOptions = [
            {path: "vendor", model: "Contact"},
            {path: "person", model: "Contact"},
            {path: "payment", model: "Payment"}
        ];

        this.deepPopulationOptions = [
            {path: "vendor.address", model: "Address"},
            {path: "person.address", model: "Address"},
            {path: "payment.card", model: "Card"}
        ];

        this.populateCardOwner = {path: "payment.card.owner", model: "Contact"};

        this.backupsPath = "src/assets/exports/csv/collections/backups/";
        this.unpopulatedPath = "src/assets/exports/csv/collections/unpopulated/";
    }

    export = (schemaModels?: Model<any>[]): void => {
        if (!schemaModels) schemaModels = this.schemaModels;
        let dirName: string = this.getDirName();
        let newPath: string = path.join(this.unpopulatedPath, dirName);
        if (!fs.existsSync(newPath)) fs.mkdirSync(newPath);

        schemaModels.forEach((schemaModel: Model<any>) => {
            let modelName: string = schemaModel.modelName.toLowerCase();
            schemaModel.find().exec()
                .then((docs) => {
                    schemaModel["csvReadStream"](docs).pipe(fs.createWriteStream(path.join(newPath, (modelName + ".csv"))));
                })
                .catch((err) => {
                    throw err;
                });
        });
    }

    getDirName = (): string => {
        let d = new Date();
        return (d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getFullYear() + "__" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
    }

}


















