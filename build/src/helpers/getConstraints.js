"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConstraints = (headersArr) => {
    let constraints = {};
    headersArr.forEach((header) => {
        constraints[header] = header;
    });
    return constraints;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29uc3RyYWludHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVycy9nZXRDb25zdHJhaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFXLFFBQUEsY0FBYyxHQUFHLENBQUMsVUFBb0IsRUFBRSxFQUFFO0lBQ2pELElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUNyQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7UUFDbEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyJ9