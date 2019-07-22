"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectByPath = (path, doc) => {
    let obj = JSON.parse(JSON.stringify(doc));
    path.split(".").forEach((node) => {
        obj = obj[node];
    });
    return obj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T2JqZWN0QnlQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvZ2V0T2JqZWN0QnlQYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQVcsUUFBQSxlQUFlLEdBQUcsQ0FBQyxJQUFZLEVBQUUsR0FBRyxFQUFVLEVBQUU7SUFDdkQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtRQUNyQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDLENBQUEifQ==