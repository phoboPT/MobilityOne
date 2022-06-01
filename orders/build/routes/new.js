"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderRouter = void 0;
const nats_wrapper_1 = require("./../nats-wrapper");
const order_created_publisher_1 = require("./../events/publishers/order-created-publisher");
const common_lib_1 = require("@mobileorg/common-lib");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = require("../models/order");
const route_1 = require("../models/route");
const router = express_1.default.Router();
exports.newOrderRouter = router;
const EXPIRATION_WINDOW_SECONDS = 15 * 60;
router.post('/api/orders', common_lib_1.requiredAuth, [
    (0, express_validator_1.body)('routeId')
        .not()
        .isEmpty()
        .custom((input) => mongoose_1.default.Types.ObjectId.isValid(input))
        .withMessage('Id must be valid'),
], common_lib_1.currentUser, common_lib_1.validateRequest, async (req, res) => {
    const { routeId } = req.body;
    let route = await route_1.Route.findById(routeId);
    if (!route) {
        throw new common_lib_1.NotFoundError({ details: 'New order ' });
        // route = Route.build({ id: routeId });
    }
    // const isReserved = await ticket.isReserved();
    // if (isReserved) {
    //     throw new BadRequestError('Already reserved', { details: 'order a ride' });
    // }
    const userOrder = await order_1.Order.find({ userId: req.currentUser?.id, routeId: routeId });
    console.log(userOrder);
    if (userOrder.length > 0) {
        throw new common_lib_1.BadRequestError('Already ordered', { details: 'order a ride' });
    }
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    const order = order_1.Order.build({
        userId: req.currentUser.id,
        status: common_lib_1.OrderStatus.Created,
        expiresAt: expiration,
        route: route,
        routeId,
    });
    await order.save();
    new order_created_publisher_1.OrderCreatedPublisher(nats_wrapper_1.natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        version: order.version,
        route: {
            id: route.id,
        },
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        routeId: order.routeId,
    });
    res.status(201).send(order);
});
