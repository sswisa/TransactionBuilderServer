"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const mongooseToCsv = require("mongoose-to-csv");
exports.assignSchemaPlugin = (schema, csvHeaders, virtuals) => {
    schema.plugin(mongooseToCsv, {
        headers: csvHeaders,
        constraints: index_1.getConstraints(csvHeaders),
        virtuals: index_1.getVirtualsForArrayFields(virtuals)
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduU2NoZW1hUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvYXNzaWduU2NoZW1hUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWtFO0FBR2xFLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBR3RDLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxNQUFjLEVBQUUsVUFBb0IsRUFBRSxRQUFxQixFQUFRLEVBQUU7SUFDbEcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7UUFDekIsT0FBTyxFQUFFLFVBQVU7UUFDbkIsV0FBVyxFQUFFLHNCQUFjLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLFFBQVEsRUFBRSxpQ0FBeUIsQ0FBQyxRQUFRLENBQUM7S0FDaEQsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBIn0=