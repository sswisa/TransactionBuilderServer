"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmailAddress = (email) => {
    let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWxWYWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVycy9lbWFpbFZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFXLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxLQUFhLEVBQVcsRUFBRTtJQUN4RCxJQUFJLFVBQVUsR0FBRyxxQ0FBcUMsQ0FBQztJQUN2RCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDIn0=