"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const schemas_1 = require("../../../schemas");
class DocumentToCsv {
    constructor() {
        this.export = (schemaModels) => {
            if (!schemaModels)
                schemaModels = this.schemaModels;
            let dirName = this.getDirName();
            let newPath = path.join(this.unpopulatedPath, dirName);
            if (!fs.existsSync(newPath))
                fs.mkdirSync(newPath);
            schemaModels.forEach((schemaModel) => {
                let modelName = schemaModel.modelName.toLowerCase();
                schemaModel.find().exec()
                    .then((docs) => {
                    schemaModel["csvReadStream"](docs).pipe(fs.createWriteStream(path.join(newPath, (modelName + ".csv"))));
                })
                    .catch((err) => {
                    throw err;
                });
            });
        };
        this.getDirName = () => {
            let d = new Date();
            return (d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getFullYear() + "__" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
        };
        this.schemaModels = [
            schemas_1.Transaction,
            schemas_1.Item,
            schemas_1.Address,
            schemas_1.Card,
            schemas_1.Payment,
            schemas_1.vendor,
            schemas_1.person
        ];
        this.shallowPopulationOptions = [
            { path: "vendor", model: "Contact" },
            { path: "person", model: "Contact" },
            { path: "payment", model: "Payment" }
        ];
        this.deepPopulationOptions = [
            { path: "vendor.address", model: "Address" },
            { path: "person.address", model: "Address" },
            { path: "payment.card", model: "Card" }
        ];
        this.populateCardOwner = { path: "payment.card.owner", model: "Contact" };
        this.backupsPath = "src/assets/exports/csv/collections/backups/";
        this.unpopulatedPath = "src/assets/exports/csv/collections/unpopulated/";
    }
}
exports.DocumentToCsv = DocumentToCsv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdG9vbHMvZXhwb3J0L2Nzdi9kb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFN0IsOENBaUIwQjtBQWlCMUI7SUFVSTtRQThCQSxXQUFNLEdBQUcsQ0FBQyxZQUEyQixFQUFRLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFlBQVk7Z0JBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDcEQsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hDLElBQUksT0FBTyxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVuRCxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBdUIsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLFNBQVMsR0FBVyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUM1RCxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFO3FCQUNwQixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDWCxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUcsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUNYLE1BQU0sR0FBRyxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFFRCxlQUFVLEdBQUcsR0FBVyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDOUksQ0FBQyxDQUFBO1FBakRHLElBQUksQ0FBQyxZQUFZLEdBQWlCO1lBQzlCLHFCQUFXO1lBQ1gsY0FBSTtZQUNKLGlCQUFPO1lBQ1AsY0FBSTtZQUNKLGlCQUFPO1lBQ1AsZ0JBQU07WUFDTixnQkFBTTtTQUNULENBQUM7UUFFRixJQUFJLENBQUMsd0JBQXdCLEdBQUc7WUFDNUIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUM7WUFDbEMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUM7WUFDbEMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUM7U0FDdEMsQ0FBQztRQUVGLElBQUksQ0FBQyxxQkFBcUIsR0FBRztZQUN6QixFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDO1lBQzFDLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUM7WUFDMUMsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUM7U0FDeEMsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUM7UUFFeEUsSUFBSSxDQUFDLFdBQVcsR0FBRyw2Q0FBNkMsQ0FBQztRQUNqRSxJQUFJLENBQUMsZUFBZSxHQUFHLGlEQUFpRCxDQUFDO0lBQzdFLENBQUM7Q0F5Qko7QUEvREQsc0NBK0RDIn0=