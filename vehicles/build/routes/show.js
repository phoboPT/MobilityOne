"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showVehicleRouter = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
const express_1 = __importDefault(require("express"));
const vehicle_1 = require("../models/vehicle");
const router = express_1.default.Router();
exports.showVehicleRouter = router;
router.get('/api/vehicles/me', common_lib_1.currentUser, async (req, res) => {
    const vehicle = await vehicle_1.Vehicle.find({ userId: req.currentUser?.id });
    if (!vehicle) {
        throw new common_lib_1.NotFoundError({ from: 'show my vehicle ' });
    }
    res.send(vehicle);
});
router.get('/api/vehicles/:id', async (req, res) => {
    const vehicle = await vehicle_1.Vehicle.findById(req.params.id);
    if (!vehicle) {
        throw new common_lib_1.NotFoundError({ from: 'show vehicle ' });
    }
    res.send(vehicle);
});
