"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderRouter = void 0;
const order_cancelled_publisher_1 = require("./../events/publishers/order-cancelled-publisher");
const nats_wrapper_1 = require("./../nats-wrapper");
const common_lib_1 = require("@mobileorg/common-lib");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = require("../models/order");
const order_finish_publisher_1 = require("../events/publishers/order-finish-publisher");
const router = express_1.default.Router();
exports.updateOrderRouter = router;
router.post('/api/orders/cancelled', common_lib_1.requiredAuth, [
    (0, express_validator_1.body)('id')
        .not()
        .isEmpty()
        .custom((input) => mongoose_1.default.Types.ObjectId.isValid(input))
        .withMessage('Id must be valid'),
], common_lib_1.validateRequest, async (req, res) => {
    const { id, status } = req.body;
    const order = await order_1.Order.findById(id);
    if (!order) {
        throw new common_lib_1.NotFoundError({ details: 'New order ' });
    }
    // const isReserved = await ticket.isReserved();
    // if (isReserved) {
    //     throw new BadRequestError('Already reserved', { details: 'order a ride' });
    // }
    order.set({
        status: common_lib_1.OrderStatus.Cancelled,
    });
    await order.save();
    new order_cancelled_publisher_1.OrderCancelledPublisher(nats_wrapper_1.natsWrapper.client).publish({
        id: order.id,
        route: {
            id: order.routeId,
        },
    });
    res.status(201).send(order);
});
router.post('/api/orders/accepted', common_lib_1.requiredAuth, [
    (0, express_validator_1.body)('id')
        .not()
        .isEmpty()
        .custom((input) => mongoose_1.default.Types.ObjectId.isValid(input))
        .withMessage('Id must be valid'),
], common_lib_1.validateRequest, async (req, res) => {
    const { id } = req.body;
    const order = await order_1.Order.findById(id);
    if (!order) {
        throw new common_lib_1.NotFoundError({ details: 'New order ' });
    }
    // const isReserved = await ticket.isReserved();
    // if (isReserved) {
    //     throw new BadRequestError('Already reserved', { details: 'order a ride' });
    // }
    order.set({
        status: common_lib_1.OrderStatus.Accepted,
    });
    await order.save();
    // new OrderCancelledPublisher(natsWrapper.client).publish({
    //     id: order.id,
    //     ticket: {
    //         id: order.routeId,
    //     },
    // });
    res.status(201).send(order);
});
router.post('/api/orders/finish', common_lib_1.requiredAuth, [
    (0, express_validator_1.body)('id')
        .not()
        .isEmpty()
        .custom((input) => mongoose_1.default.Types.ObjectId.isValid(input))
        .withMessage('Id must be valid'),
], common_lib_1.validateRequest, async (req, res) => {
    const { id } = req.body;
    const order = await order_1.Order.find({ routeId: id });
    console.log(order);
    if (!order) {
        throw new common_lib_1.NotFoundError({ details: 'New order ' });
    }
    // const isReserved = await ticket.isReserved();
    // if (isReserved) {
    //     throw new BadRequestError('Already reserved', { details: 'order a ride' });
    // }
    order.forEach(async (item) => {
        item.set({ status: common_lib_1.OrderStatus.Complete });
        new order_finish_publisher_1.OrderFinishPublisher(nats_wrapper_1.natsWrapper.client).publish({
            id: item.id,
            route: {
                id: item.routeId,
            },
        });
        await item.save();
    });
    res.status(201).send(order);
});
