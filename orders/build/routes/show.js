"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showOrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_lib_1 = require("@mobileorg/common-lib");
const order_1 = require("../models/order");
const router = express_1.default.Router();
exports.showOrderRouter = router;
router.get('/api/orders/routeId/:id', common_lib_1.currentUser, common_lib_1.requiredAuth, async (req, res) => {
    console.log("hey", req.params.id);
    const order = await order_1.Order.find({ routeId: req.params.id, status: common_lib_1.OrderStatus.Created });
    console.log("order", order);
    if (!order) {
        throw new common_lib_1.NotFoundError({ details: 'notFound' });
    }
    res.send(order);
});
router.get('/api/orders/userId', common_lib_1.currentUser, common_lib_1.requiredAuth, async (req, res) => {
    console.log("hey", req.params.id);
    const order = await order_1.Order.find({ userId: req.currentUser.id });
    console.log("order", order);
    if (!order) {
        throw new common_lib_1.NotFoundError({ details: 'notFound' });
    }
    res.send(order);
});
router.get('/api/orders/:orderId', common_lib_1.requiredAuth, async (req, res) => {
    const order = await order_1.Order.findById(req.params.orderId);
    if (!order) {
        throw new common_lib_1.NotFoundError({ details: 'notFound' });
    }
    if (order.userId !== req.currentUser.id) {
        throw new common_lib_1.NotAuthorizedError();
    }
    res.send(order);
});
