"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const schemas_1 = require("../schemas");
const autoComplete = express.Router();
var EntityTypes;
(function (EntityTypes) {
    EntityTypes["person"] = "person";
    EntityTypes["vendor"] = "vendor";
    EntityTypes["address"] = "address";
    EntityTypes["card"] = "card";
    EntityTypes["payment"] = "payment";
    EntityTypes["transaction"] = "transaction";
    EntityTypes["item"] = "item";
})(EntityTypes = exports.EntityTypes || (exports.EntityTypes = {}));
const entities = {
    person: schemas_1.person,
    vendor: schemas_1.vendor,
    address: schemas_1.Address,
    payment: schemas_1.Payment,
    card: schemas_1.Card,
    item: schemas_1.Item
};
autoComplete.get("/auto-complete", (req, res) => {
    const searchVal = req.query.searchVal;
    const searchEntities = JSON.parse(decodeURI(req.query.searchEntities));
    const entity = entities[searchEntities.entityType];
    const populateEntity = searchEntities.populateObject != null ? entities[searchEntities.populateObject.model] : null;
    entity
        .find({ "autoComplete.displayText": { $regex: `^${searchVal}`, $options: "i" } })
        .exec()
        .then((results) => {
        return populateEntity != null ? entity.populate(results, [{ path: searchEntities.populateObject.path, model: populateEntity }]) : results;
    })
        .then((contacts) => {
        res.send(contacts);
    })
        .catch((err) => { throw err; });
});
module.exports = autoComplete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0NvbXBsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcnMvYXV0b0NvbXBsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1DO0FBQ25DLHdDQWFvQjtBQUVwQixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFdEMsSUFBWSxXQVFYO0FBUkQsV0FBWSxXQUFXO0lBQ25CLGdDQUFpQixDQUFBO0lBQ2pCLGdDQUFpQixDQUFBO0lBQ2pCLGtDQUFtQixDQUFBO0lBQ25CLDRCQUFhLENBQUE7SUFDYixrQ0FBbUIsQ0FBQTtJQUNuQiwwQ0FBMkIsQ0FBQTtJQUMzQiw0QkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFSVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQVF0QjtBQUVELE1BQU0sUUFBUSxHQUFHO0lBQ2IsTUFBTSxFQUFFLGdCQUFNO0lBQ2QsTUFBTSxFQUFFLGdCQUFNO0lBQ2QsT0FBTyxFQUFFLGlCQUFPO0lBQ2hCLE9BQU8sRUFBRSxpQkFBTztJQUNoQixJQUFJLEVBQUUsY0FBSTtJQUNWLElBQUksRUFBRSxjQUFJO0NBQ2IsQ0FBQTtBQWNELFlBQVksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtJQUMvRSxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUN0QyxNQUFNLGNBQWMsR0FBb0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkQsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDcEgsTUFBTTtTQUNELElBQUksQ0FBQyxFQUFDLDBCQUEwQixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBQyxFQUFDLENBQUM7U0FDNUUsSUFBSSxFQUFFO1NBQ04sSUFBSSxDQUFDLENBQUMsT0FBdUIsRUFBRSxFQUFFO1FBQzlCLE9BQU8sY0FBYyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDNUksQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLENBQUMsUUFBd0IsRUFBRSxFQUFFO1FBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMifQ==