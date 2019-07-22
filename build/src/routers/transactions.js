"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const schemas_1 = require("../schemas");
const transactions = express.Router();
transactions.get("/transactions", (req, res) => {
    const shallowPopulationOptions = [
        { path: "vendor", model: "Contact" },
        { path: "person", model: "Contact" },
        { path: "payment", model: "Payment" }
    ];
    const deepPopulationOptions = [
        { path: "vendor.address", model: "Address" },
        { path: "person.address", model: "Address" },
        { path: "payment.card", model: "Card" }
    ];
    const populateCardOwner = { path: "payment.card.owner", model: "Contact" };
    schemas_1.Transaction
        .find()
        .populate(shallowPopulationOptions)
        .exec()
        .then((transactions) => {
        return schemas_1.Transaction.populate(transactions, deepPopulationOptions);
    })
        .then((transactions) => {
        return schemas_1.Transaction.populate(transactions, populateCardOwner);
    })
        .then((transactions) => {
        res.send(transactions);
    })
        .catch((err) => {
        throw err;
    });
});
module.exports = transactions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcnMvdHJhbnNhY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1DO0FBQ25DLHdDQUEwRDtBQUUxRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFdEMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtJQUM5RSxNQUFNLHdCQUF3QixHQUFHO1FBQzdCLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDO1FBQ2xDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDO1FBQ2xDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDO0tBQ3RDLENBQUM7SUFFRixNQUFNLHFCQUFxQixHQUFHO1FBQzFCLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUM7UUFDMUMsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQztRQUMxQyxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztLQUN4QyxDQUFDO0lBRUYsTUFBTSxpQkFBaUIsR0FBRyxFQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUM7SUFFekUscUJBQVc7U0FDTixJQUFJLEVBQUU7U0FDTixRQUFRLENBQUMsd0JBQXdCLENBQUM7U0FDbEMsSUFBSSxFQUFFO1NBQ04sSUFBSSxDQUFDLENBQUMsWUFBaUMsRUFBRSxFQUFFO1FBQ3hDLE9BQU8scUJBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLHFCQUFxQixDQUFDLENBQUE7SUFDcEUsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLENBQUMsWUFBaUMsRUFBRSxFQUFFO1FBQ3hDLE9BQU8scUJBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLENBQUMsWUFBaUMsRUFBRSxFQUFFO1FBQ3hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDWCxNQUFNLEdBQUcsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyJ9