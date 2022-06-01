"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRouteRouter = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
const express_1 = __importDefault(require("express"));
const route_1 = require("../models/route");
//import { natsWrapper } from "../nats-wrapper"
const router = express_1.default.Router();
exports.updateRouteRouter = router;
router.put('/api/routes/:id', common_lib_1.currentUser, common_lib_1.requiredAuth, common_lib_1.validateRequest, async (req, res) => {
    const route = await route_1.Route.findById(req.params.id);
    console.log(route);
    const { startLocation, type, vehicleId, state, endLocation, estimatedTime, userImage, description, startDate, rating, capacity, availableTime, actualCapacity, } = req.body;
    if (!route) {
        throw new common_lib_1.NotFoundError({ from: 'Route not found, verify the route id' });
    }
    // if (route.userId !== req.currentUser!.id) {
    //     throw new NotAuthorizedError();
    // }
    route.set({
        userId: req.currentUser.id,
        type: type || route.type,
        startLocation: startLocation || route.startLocation,
        endLocation: endLocation || route.endLocation,
        availableTime: availableTime || route.availableTime,
        vehicleId: vehicleId || route.vehicleId,
        state: state || route.state,
        description: description || route.description,
        estimatedTime: estimatedTime || route.estimatedTime,
        startDate: startDate || route.startDate,
        userImage: userImage || route.userImage,
        rating: rating || route.rating,
        capacity: capacity || route.capacity,
        actualCapacity: actualCapacity || route.actualCapacity,
    });
    await route.save();
    console.log('hey');
    // new RouteUpdatedPublisher(natsWrapper.client).publish({
    //     id: route.id,
    //     type: route.type,
    //     userId: route.userId,
    //     startLocation: route.startLocation,
    //     endLocation: route.endLocation,
    //     availableTime: route.availableTime,
    //     vehicleId: route.vehicleId,
    //     state: route.state,
    //     description: route.description,
    //     estimatedTime: route.estimatedTime,
    //     startDate: route.startDate,
    //     userImage: route.userImage
    // })
    res.send(route);
});
