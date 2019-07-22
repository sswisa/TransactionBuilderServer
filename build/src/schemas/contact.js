"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const db_1 = require("../db");
const contactSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.keys(models_1.ContactType).map(e => models_1.ContactType[e]),
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
            validator: (email) => helpers_1.isValidEmailAddress(email),
            message: "The email field can't be empty"
        }
    },
    address: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Address"
    }
});
const personSchema = new mongoose_1.Schema({
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
            default: function () { return this.name.full; }
        },
        actualValue: {
            type: String,
            default: function () { return this.name.full; }
        }
    }
});
const vendorSchema = new mongoose_1.Schema({
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
const contactPaths = Object.keys(contactSchema["paths"]);
const vendorPaths = Object.keys(vendorSchema["paths"]);
const personPaths = Object.keys(personSchema["paths"]);
const contactCsvHeaders = Array.from(new Set([...contactPaths, ...vendorPaths, ...personPaths]).values());
const personCsvHeaders = Array.from(new Set([...contactPaths, ...personPaths]).values());
const vendorCsvHeaders = Array.from(new Set([...contactPaths, ...vendorPaths]).values());
const personVirtuals = [
    { path: "emails", callback: helpers_1.joinObjectIds },
    { path: "autoComplete.displayText", callback: helpers_1.addBrackets },
    { path: "autoComplete.actualValue", callback: helpers_1.addBrackets }
];
const vendorVirtuals = [
    { path: "emails", callback: helpers_1.joinObjectIds },
    { path: "autoComplete.displayText", callback: helpers_1.addBrackets },
    { path: "autoComplete.actualValue", callback: helpers_1.addBrackets }
];
helpers_1.assignSchemaPlugin(personSchema, personCsvHeaders, personVirtuals);
helpers_1.assignSchemaPlugin(vendorSchema, vendorCsvHeaders, vendorVirtuals);
exports.Contact = db_1.dbConnection.model("Contact", contactSchema);
db_1.dbConnection.collection("contacts").createIndex({ type: 1, phone: 1, email: 1, address: 1 }, { unique: true });
const Person = exports.Contact.discriminator("Person", personSchema);
const Vendor = exports.Contact.discriminator("Vendor", vendorSchema);
exports.person = db_1.dbConnection.model("Person", personSchema);
db_1.dbConnection.collection("persons").createIndex({ "name.first": 1, "name.last": 1 }, { unique: true });
exports.vendor = db_1.dbConnection.model("Vendor", vendorSchema);
db_1.dbConnection.collection("vendors").createIndex({ name: 1, displayName: 1 }, { unique: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY2hlbWFzL2NvbnRhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBK0Q7QUFDL0Qsc0NBQW1HO0FBQ25HLHdDQU1vQjtBQUNwQiw4QkFBbUM7QUFRbkMsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQzdCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG9CQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLDBCQUEwQixDQUFDO1FBQzNDLElBQUksRUFBRSxJQUFJO0tBQ2I7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSwwQkFBMEIsQ0FBQztRQUM1QyxJQUFJLEVBQUUsSUFBSTtRQUNWLFNBQVMsRUFBRSxFQUFFO1FBQ2IsU0FBUyxFQUFFLEVBQUU7S0FDaEI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZCxJQUFJLEVBQUUsSUFBSTtRQUNWLFNBQVMsRUFBRSxDQUFDO1FBQ1osUUFBUSxFQUFFO1lBQ04sU0FBUyxFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyw2QkFBbUIsQ0FBQyxLQUFLLENBQUM7WUFDeEQsT0FBTyxFQUFFLGdDQUFnQztTQUM1QztLQUNKO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLFNBQVM7S0FDakI7Q0FDSixDQUFDLENBQUM7QUFFSCxNQUFNLFlBQVksR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDNUIsSUFBSSxFQUFFO1FBQ0YsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixTQUFTLEVBQUUsQ0FBQztZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDO1NBQzdDO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLE1BQU07WUFDWixTQUFTLEVBQUUsQ0FBQztZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLHVCQUF1QixDQUFDO1NBQzVDO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsY0FBYyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDMUU7S0FDSjtJQUNELFlBQVksRUFBRTtRQUNWLFdBQVcsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGNBQWMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUM7U0FDakQ7UUFDRCxXQUFXLEVBQUU7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxjQUFjLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDO1NBQ2pEO0tBQ0o7Q0FDSixDQUFDLENBQUM7QUFFSCxNQUFNLFlBQVksR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDNUIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsQ0FBQztRQUNaLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLHlCQUF5QixDQUFDO0tBQzlDO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsQ0FBQztRQUNaLElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVO0tBQzNCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsV0FBVyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsY0FBYyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsV0FBVyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsY0FBYyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO0tBQ0o7Q0FDSixDQUFDLENBQUM7QUFFSCxNQUFNLFlBQVksR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ25FLE1BQU0sV0FBVyxHQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDakUsTUFBTSxXQUFXLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUVqRSxNQUFNLGlCQUFpQixHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksRUFBRSxHQUFHLFdBQVcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUNwSCxNQUFNLGdCQUFnQixHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUNuRyxNQUFNLGdCQUFnQixHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUVuRyxNQUFNLGNBQWMsR0FBZTtJQUMvQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLHVCQUFhLEVBQUU7SUFDM0MsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLHFCQUFXLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLHFCQUFXLEVBQUU7Q0FDOUQsQ0FBQztBQUVGLE1BQU0sY0FBYyxHQUFlO0lBQy9CLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsdUJBQWEsRUFBRTtJQUMzQyxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUscUJBQVcsRUFBRTtJQUMzRCxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUscUJBQVcsRUFBRTtDQUFDLENBQUM7QUFFakUsNEJBQWtCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ25FLDRCQUFrQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUV0RCxRQUFBLE9BQU8sR0FBeUIsaUJBQVksQ0FBQyxLQUFLLENBQWdCLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN6RyxpQkFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUUxRyxNQUFNLE1BQU0sR0FBRyxlQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM3RCxNQUFNLE1BQU0sR0FBRyxlQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUVoRCxRQUFBLE1BQU0sR0FBd0IsaUJBQVksQ0FBQyxLQUFLLENBQWUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3BHLGlCQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDcEYsUUFBQSxNQUFNLEdBQXdCLGlCQUFZLENBQUMsS0FBSyxDQUFlLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNwRyxpQkFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDIn0=