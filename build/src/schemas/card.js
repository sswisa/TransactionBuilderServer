"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const db_1 = require("../db");
const helpers_1 = require("../helpers");
const cardSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.keys(models_1.CardType).map(e => models_1.CardType[e]),
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
        type: mongoose_1.Schema.Types.ObjectId,
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
const virtuals = [
    { path: "autoComplete.displayText", callback: helpers_1.addBrackets },
    { path: "autoComplete.actualValue", callback: helpers_1.addBrackets }
];
const csvHeaders = Object.keys(cardSchema["paths"]);
helpers_1.assignSchemaPlugin(cardSchema, csvHeaders, virtuals);
exports.Card = db_1.dbConnection.model("Card", cardSchema);
db_1.dbConnection.collection("cards").createIndex({ type: 1, last4Digits: 1, owner: 1 }, { unique: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY2hlbWFzL2NhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBK0Q7QUFDL0Qsc0NBQStEO0FBQy9ELDhCQUFtQztBQUNuQyx3Q0FBMkU7QUFLM0UsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQzFCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUscUNBQXFDLENBQUM7S0FDMUQ7SUFDRCxXQUFXLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLHdDQUF3QyxDQUFDO1FBQzFELFNBQVMsRUFBRSxDQUFDO1FBQ1osU0FBUyxFQUFFLENBQUM7S0FDZjtJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLGNBQWMsT0FBTyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztLQUN4RTtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxRQUFRO0tBQ2hCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsV0FBVyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsY0FBYyxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsV0FBVyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsY0FBYyxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO0tBQ0o7Q0FDSixDQUFDLENBQUM7QUFFSCxNQUFNLFFBQVEsR0FBZTtJQUN6QixFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUscUJBQVcsRUFBRTtJQUMzRCxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUscUJBQVcsRUFBRTtDQUFDLENBQUM7QUFFakUsTUFBTSxVQUFVLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUU5RCw0QkFBa0IsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRXhDLFFBQUEsSUFBSSxHQUFzQixpQkFBWSxDQUFDLEtBQUssQ0FBYSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDMUYsaUJBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDIn0=