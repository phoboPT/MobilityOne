"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehicleRouter = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const vehicle_1 = require("../models/vehicle");
const router = express_1.default.Router();
exports.updateVehicleRouter = router;
router.put('/api/vehicles/:id', common_lib_1.requiredAuth, [
    (0, express_validator_1.body)('location').not().isEmpty().withMessage('location is required'),
    (0, express_validator_1.body)('type').not().isEmpty().withMessage('type is required'),
], common_lib_1.validateRequest, async (req, res) => {
    const vehicle = await vehicle_1.Vehicle.findById(req.params.id);
    if (!vehicle) {
        throw new common_lib_1.NotFoundError({ from: 'Update vehicle' });
    }
    if (vehicle.userId !== req.currentUser.id) {
        throw new common_lib_1.NotAuthorizedError();
    }
    vehicle.set({
        carModel: req.body.location,
        type: req.body.type,
    });
    await vehicle.save();
    // new VehiculeUpdatedPublisher(natsWrapper.client).publish({
    //     id: vehicle.id,
    //     carModel: vehicle.carModel,
    //     type: vehicle.type,
    //     userId: vehicle.userId
    // })
    res.send(vehicle);
});
