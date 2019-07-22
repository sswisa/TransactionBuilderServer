"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getObjectByPath_1 = require("./getObjectByPath");
exports.getVirtualsForArrayFields = (_virtuals) => {
    if (!(_virtuals != null && _virtuals.length > 0))
        return null;
    let virtuals = {};
    _virtuals.forEach((_virtual) => {
        virtuals[_virtual.path] = (doc) => { return _virtual.callback(getObjectByPath_1.getObjectByPath(_virtual.path, doc)); };
    });
    return virtuals;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VmlydHVhbHNGb3JBcnJheUZpZWxkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL2dldFZpcnR1YWxzRm9yQXJyYXlGaWVsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1REFBa0Q7QUFFdkMsUUFBQSx5QkFBeUIsR0FBRyxDQUFDLFNBQXFCLEVBQVUsRUFBRTtJQUNyRSxJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDOUQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFrQixFQUFFLEVBQUU7UUFDckMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLGlDQUFlLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFHLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyxDQUFDIn0=