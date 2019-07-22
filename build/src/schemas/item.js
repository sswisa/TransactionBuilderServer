"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const jsons_1 = require("../jsons");
const helpers_1 = require("../helpers");
const db_1 = require("../db");
const itemSchema = new mongoose_1.Schema({
    severity: {
        type: String,
        enum: Object.keys(models_1.Severity).map(e => models_1.Severity[e]),
        default: models_1.Severity.Low
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
        enum: Object.keys(jsons_1.shoppingCategories).map(e => jsons_1.shoppingCategories[e]),
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
const virtuals = [
    { path: "autoComplete.displayText", callback: helpers_1.addBrackets },
    { path: "autoComplete.actualValue", callback: helpers_1.addBrackets }
];
const csvHeaders = Object.keys(itemSchema["paths"]);
helpers_1.assignSchemaPlugin(itemSchema, csvHeaders, virtuals);
exports.Item = db_1.dbConnection.model("Item", itemSchema);
db_1.dbConnection.collection("items").createIndex({ severity: 1, onWatchList: 1, isRefund: 1, categories: 1, price: 1, amount: 1, name: 1 }, { unique: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY2hlbWFzL2l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBd0Q7QUFDeEQsc0NBQW9FO0FBQ3BFLG9DQUE0QztBQUU1Qyx3Q0FBMEU7QUFDMUUsOEJBQW1DO0FBTW5DLE1BQU0sVUFBVSxHQUFHLElBQUksaUJBQU0sQ0FBQztJQUMxQixRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUc7S0FDeEI7SUFDRCxXQUFXLEVBQUU7UUFDVCxJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNkLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUFrQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsMEJBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLG1EQUFtRCxDQUFDO0tBQ3hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUM7S0FDeEM7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSx1QkFBdUIsQ0FBQztLQUM1QztJQUNELFlBQVksRUFBRTtRQUNWLFdBQVcsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGNBQWMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNELFdBQVcsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGNBQWMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM3QztLQUNKO0NBQ0osQ0FBQyxDQUFDO0FBRUgsTUFBTSxRQUFRLEdBQWU7SUFDekIsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLHFCQUFXLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLHFCQUFXLEVBQUU7Q0FBQyxDQUFDO0FBRWpFLE1BQU0sVUFBVSxHQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFFOUQsNEJBQWtCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUV4QyxRQUFBLElBQUksR0FBc0IsaUJBQVksQ0FBQyxLQUFLLENBQWEsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzFGLGlCQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDIn0=