"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_update_if_current_1 = require("mongoose-update-if-current");
const order_1 = require("./order");
const routeSchema = new mongoose_1.default.Schema({ capacity: { type: String, required: true } }, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
routeSchema.set('versionKey', 'version');
routeSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
routeSchema.statics.findByEvent = (event) => {
    return Route.findOne({
        _id: event.id,
        version: event.version - 1,
    });
};
routeSchema.statics.build = (attrs) => {
    return new Route({
        _id: attrs.id,
        capacity: attrs.capacity,
    });
};
routeSchema.methods.isReserved = async function () {
    // this === the ticket document that we just called 'isReserved' on
    const existingOrder = await order_1.Order.findOne({
        route: this,
        status: {
            $in: [order_1.OrderStatus.Created, order_1.OrderStatus.AwaitingPayment, order_1.OrderStatus.Complete],
        },
    });
    return !!existingOrder;
};
const Route = mongoose_1.default.model('Route', routeSchema);
exports.Route = Route;
