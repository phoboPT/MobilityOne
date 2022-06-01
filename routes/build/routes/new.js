"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouteRouter = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const route_created_publisher_1 = require("../events/publishers/route-created-publisher");
const route_1 = require("../models/route");
const nats_wrapper_1 = require("../nats-wrapper"); //import { natsWrapper } from "../nats-wrapper"
const router = express_1.default.Router();
exports.createRouteRouter = router;
router.post('/api/routes', common_lib_1.requiredAuth, [
    (0, express_validator_1.body)('startLocation').not().isEmpty().withMessage('start location required'),
    (0, express_validator_1.body)('type').not().isEmpty().withMessage('type required'),
    (0, express_validator_1.body)('vehicleId').not().isEmpty().withMessage('vehicle required'),
    (0, express_validator_1.body)('startLocation').not().isEmpty().withMessage('starting point is required'),
    (0, express_validator_1.body)('endLocation').not().isEmpty().withMessage('end point is required'),
    (0, express_validator_1.body)('description').not().isEmpty().withMessage('description is required'),
    (0, express_validator_1.body)('startDate').not().isEmpty().withMessage('starting date is required'),
], common_lib_1.validateRequest, async (req, res) => {
    const { startLocation, type, vehicleId, state, endLocation, estimatedTime, userImage, description, startDate, rating, capacity, } = req.body;
    const route = route_1.Route.build({
        userId: req.currentUser.id,
        type,
        startLocation,
        endLocation,
        availableTime: 'teste',
        vehicleId,
        state: state || 'unavailable',
        description,
        estimatedTime,
        startDate,
        userImage: userImage || '',
        rating: rating || 0,
        capacity: capacity || 0,
        actualCapacity: capacity || 0,
    });
    await route.save();
    await new route_created_publisher_1.RouteCreatedPublisher(nats_wrapper_1.natsWrapper.client).publish({
        id: route.id,
        type: route.type,
        userId: route.userId,
        startLocation: route.startLocation,
        endLocation: route.endLocation,
        availableTime: route.availableTime,
        vehicleId: route.vehicleId,
        state: route.state,
        description: route.description,
        estimatedTime: route.estimatedTime,
        startDate: route.startDate,
        userImage: route.userImage,
        capacity: route.capacity,
        actualCapacity: route.actualCapacity,
    });
    res.status(201).send(route);
});
