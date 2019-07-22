"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoOp = require("./mongo");
const app = express();
const router = express.Router();
var DistanceUnit;
(function (DistanceUnit) {
    DistanceUnit[DistanceUnit["meters"] = 0] = "meters";
    DistanceUnit[DistanceUnit["kilometeres"] = 1] = "kilometeres";
    DistanceUnit[DistanceUnit["miles"] = 2] = "miles";
})(DistanceUnit || (DistanceUnit = {}));
router.get('/atms', (req, res) => {
    let address = parseInt(req.query.address);
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlcmNpc2UyX3NlYXJjaF9yZXN1bHRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcnMvZXhlcmNpc2UyX3NlYXJjaF9yZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ2xDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUNsQyxNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQTtBQUNyQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7QUFzQi9CLElBQUssWUFJSjtBQUpELFdBQUssWUFBWTtJQUNiLG1EQUFNLENBQUE7SUFDTiw2REFBVyxDQUFBO0lBQ1gsaURBQUssQ0FBQTtBQUNULENBQUMsRUFKSSxZQUFZLEtBQVosWUFBWSxRQUloQjtBQXFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO0lBQ2hFLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRzFDLENBQUMsQ0FBQyxDQUFBIn0=