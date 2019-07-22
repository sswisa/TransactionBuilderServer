"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const db_1 = require("../db");
const helpers_1 = require("../helpers");
const transactionSchema = new mongoose_1.Schema({
    dates: {
        type: [Date],
        required: [true, "Date of transaction is required"]
    },
    vendors: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Vendor"
    },
    persons: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Person"
    },
    payments: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Payment"
    },
    items: {
        type: [mongoose_1.Schema.Types.ObjectId],
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
            default: function () { return this.price.total; }
        },
        total: {
            type: Number,
            default: function () { return this.price.total; }
        }
    }
});
const csvHeaders = Object.keys(transactionSchema["paths"]);
const virtuals = [
    { path: "dates", callback: helpers_1.joinObjectIds },
    { path: "persons", callback: helpers_1.joinObjectIds },
    { path: "vendors", callback: helpers_1.joinObjectIds },
    { path: "payments", callback: helpers_1.joinObjectIds },
    { path: "items", callback: helpers_1.joinObjectIds }
];
helpers_1.assignSchemaPlugin(transactionSchema, csvHeaders, virtuals);
exports.Transaction = db_1.dbConnection.model("Transaction", transactionSchema);
db_1.dbConnection.collection("transactions").createIndex({ date: 1 }, { unique: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2NoZW1hcy90cmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF3RDtBQUV4RCw4QkFBbUM7QUFDbkMsd0NBQTZFO0FBTTdFLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQ2pDLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxpQ0FBaUMsQ0FBQztLQUN0RDtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxDQUFDLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixHQUFHLEVBQUUsUUFBUTtLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxDQUFDLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixHQUFHLEVBQUUsUUFBUTtLQUNoQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxDQUFDLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixHQUFHLEVBQUUsU0FBUztLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxDQUFDLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixHQUFHLEVBQUUsTUFBTTtLQUNkO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLENBQUM7U0FDakQ7UUFDRCxlQUFlLEVBQUU7WUFDYixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxjQUFhLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsY0FBYSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQztTQUNsRDtLQUNKO0NBQ0osQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBRXJFLE1BQU0sUUFBUSxHQUFlO0lBQ3pCLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsdUJBQWEsRUFBQztJQUN4QyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLHVCQUFhLEVBQUM7SUFDMUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSx1QkFBYSxFQUFDO0lBQzFDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsdUJBQWEsRUFBQztJQUMzQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLHVCQUFhLEVBQUM7Q0FDM0MsQ0FBQztBQUVGLDRCQUFrQixDQUFDLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUUvQyxRQUFBLFdBQVcsR0FBNkIsaUJBQVksQ0FBQyxLQUFLLENBQW9CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzdILGlCQUFZLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDIn0=