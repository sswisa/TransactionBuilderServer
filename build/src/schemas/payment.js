"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const db_1 = require("../db");
const helpers_1 = require("../helpers");
const paymentSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.keys(models_1.PaymentType).map(e => models_1.PaymentMethod[e])
    },
    method: {
        type: String,
        enum: Object.keys(models_1.PaymentType).map(e => models_1.PaymentMethod[e])
    },
    card: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Card"
    },
    currency: {
        type: String,
        required: [true, "Choosing currency is mandatory"],
        trim: true,
        enum: Object.keys(models_1.PaymentType).map(e => models_1.PaymentMethod[e])
    },
    autoComplete: {
        displayText: {
            type: String,
            default: function () { return `${this.method} - ${this.type}`; }
        },
        actualValue: {
            type: String,
            default: function () { return `${this.method} - ${this.type}`; }
        }
    }
});
const virtuals = [
    { path: "autoComplete.displayText", callback: helpers_1.addBrackets },
    { path: "autoComplete.actualValue", callback: helpers_1.addBrackets }
];
const csvHeaders = Object.keys(paymentSchema["paths"]);
helpers_1.assignSchemaPlugin(paymentSchema, csvHeaders, virtuals);
exports.Payment = db_1.dbConnection.model("Payment", paymentSchema);
db_1.dbConnection.collection("payments").createIndex({ type: 1, method: 1, card: 1, currency: 1 }, { unique: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY2hlbWFzL3BheW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBd0Q7QUFDeEQsc0NBQXVHO0FBQ3ZHLDhCQUFtQztBQUNuQyx3Q0FBMkU7QUFPM0UsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQzdCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLHNCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUQ7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxzQkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVEO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLE1BQU07S0FDZDtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLGdDQUFnQyxDQUFDO1FBQ2xELElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLHNCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUQ7SUFDRCxZQUFZLEVBQUU7UUFDVixXQUFXLEVBQUU7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxjQUFjLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbkU7UUFDRCxXQUFXLEVBQUU7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxjQUFjLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbkU7S0FDSjtDQUNKLENBQUMsQ0FBQztBQUVILE1BQU0sUUFBUSxHQUFlO0lBQ3pCLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxxQkFBVyxFQUFFO0lBQzNELEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxxQkFBVyxFQUFFO0NBQUMsQ0FBQztBQUVqRSxNQUFNLFVBQVUsR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBRWpFLDRCQUFrQixDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFM0MsUUFBQSxPQUFPLEdBQXlCLGlCQUFZLENBQUMsS0FBSyxDQUFnQixTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDekcsaUJBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMifQ==