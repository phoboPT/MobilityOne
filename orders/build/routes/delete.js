"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_lib_1 = require("@mobileorg/common-lib");
const order_1 = require("../models/order");
const order_cancelled_publisher_1 = require("../events/publishers/order-cancelled-publisher");
const nats_wrapper_1 = require("../nats-wrapper");
const router = express_1.default.Router();
exports.deleteOrderRouter = router;
router.delete('/api/orders/:orderId', common_lib_1.requiredAuth, async (req, res) => {
    const { orderId } = req.params;
    const order = await order_1.Order.findById(orderId).populate('route');
    if (!order) {
        throw new common_lib_1.NotFoundError({ details: 'error' });
    }
    if (order.userId !== req.currentUser.id) {
        throw new common_lib_1.NotAuthorizedError();
    }
    order.status = common_lib_1.OrderStatus.Cancelled;
    await order.save();
    // publishing an event saying this was cancelled!
    new order_cancelled_publisher_1.OrderCancelledPublisher(nats_wrapper_1.natsWrapper.client).publish({
        id: order.id,
        route: {
            id: order.route.id,
        },
    });
    res.status(204).send(order);
});
