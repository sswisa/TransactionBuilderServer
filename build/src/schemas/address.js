"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const db_1 = require("../db");
const addressSchema = new mongoose_1.Schema({
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
        enum: Object.keys(models_1.Countries).map(e => models_1.Countries[e])
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
            default: function () { return this.street + ", " + this.city + ", " + this.state.abbreviation + " " + this.zip; }
        },
        actualValue: {
            type: String,
            default: function () { return this.street + ", " + this.city + ", " + this.state.abbreviation + " " + this.zip; }
        }
    }
});
addressSchema.obj.state.required = function () {
    return this.country === models_1.Countries.USA;
};
const virtuals = [
    { path: "autoComplete.displayText", callback: helpers_1.addBrackets },
    { path: "autoComplete.actualValue", callback: helpers_1.addBrackets }
];
const csvHeaders = Object.keys(addressSchema["paths"]);
helpers_1.assignSchemaPlugin(addressSchema, csvHeaders, virtuals);
exports.Address = db_1.dbConnection.model("Address", addressSchema);
db_1.dbConnection.collection("addresses").createIndex({ country: 1, city: 1, street: 1, zip: 1, "state.name": 1, "state.abbreviation": 1 }, { unique: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY2hlbWFzL2FkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBd0Q7QUFDeEQsc0NBQW9GO0FBQ3BGLHdDQUErRztBQUMvRyw4QkFBbUM7QUFNbkMsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQzdCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLElBQUk7U0FDYjtRQUNELFlBQVksRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLElBQUk7U0FDYjtLQUNKO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUM7UUFDeEMsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0RDtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUM7UUFDcEMsU0FBUyxFQUFFLENBQUM7UUFDWixTQUFTLEVBQUUsRUFBRTtLQUNoQjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUM7UUFDdEMsU0FBUyxFQUFFLENBQUM7UUFDWixTQUFTLEVBQUUsRUFBRTtLQUNoQjtJQUNELEdBQUcsRUFBRTtRQUNELElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDYjtJQUNELFlBQVksRUFBRTtRQUNWLFdBQVcsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGNBQWMsT0FBUSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQSxDQUFDLENBQUM7U0FDcEg7UUFDRCxXQUFXLEVBQUU7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxjQUFjLE9BQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUEsQ0FBQyxDQUFDO1NBQ3BIO0tBQ0o7Q0FDSixDQUFDLENBQUM7QUFFSCxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUc7SUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLGtCQUFTLENBQUMsR0FBRyxDQUFDO0FBQzFDLENBQUMsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFlO0lBQ3pCLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxxQkFBVyxFQUFFO0lBQzNELEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxxQkFBVyxFQUFFO0NBQUMsQ0FBQztBQUVqRSxNQUFNLFVBQVUsR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBRWpFLDRCQUFrQixDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFM0MsUUFBQSxPQUFPLEdBQXlCLGlCQUFZLENBQUMsS0FBSyxDQUFnQixTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDekcsaUJBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMifQ==