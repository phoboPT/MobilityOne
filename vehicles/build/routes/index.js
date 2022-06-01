"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexVehicleRouter = void 0;
const express_1 = __importDefault(require("express"));
const vehicle_1 = require("../models/vehicle");
const router = express_1.default.Router();
exports.indexVehicleRouter = router;
router.get('/api/vehicles', async (req, res) => {
    const vehicles = await vehicle_1.Vehicle.find({});
    res.send(vehicles);
});
