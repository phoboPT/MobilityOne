"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCreatedListener = void 0;
const queue_group_name_1 = require("./queue-group-name");
const common_lib_1 = require("@mobileorg/common-lib");
const route_1 = require("../../models/route");
class OrderCreatedListener extends common_lib_1.Listener {
    subject = common_lib_1.Subjects.OrderCreated;
    queueGroupName = queue_group_name_1.queueGroupName;
    async onMessage(data, msg) {
        const { routeId } = data;
        const route = await route_1.Route.findById(routeId);
        if (route) {
            route.set({ actualCapacity: route.actualCapacity - 1 });
            await route.save();
        }
        msg.ack();
    }
}
exports.OrderCreatedListener = OrderCreatedListener;
