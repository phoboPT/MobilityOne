"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVehicleRouter = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const vehicle_1 = require("../models/vehicle");
const router = express_1.default.Router();
exports.createVehicleRouter = router;
router.post('/api/vehicles', common_lib_1.requiredAuth, [(0, express_validator_1.body)('type').not().isEmpty().withMessage('type required')], common_lib_1.validateRequest, async (req, res) => {
    const { type, carModel, capacity } = req.body;
    console.log(carModel);
    const vehicle = vehicle_1.Vehicle.build({
        type: type,
        userId: req.currentUser.id,
        carModel: carModel,
        capacity: capacity,
    });
    await vehicle.save();
    // await new VehiculeCreatedPublisher(natsWrapper.client).publish({
    //     id: vehicule.id,
    //     type: vehicule.type,
    //     userId: vehicule.userId,
    // })
    res.status(201).send(vehicle);
});
