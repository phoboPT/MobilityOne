"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUpdatedListener = void 0;
const queue_group_name_1 = require("./queue-group-name");
const common_lib_1 = require("@mobileorg/common-lib");
class OrderUpdatedListener extends common_lib_1.Listener {
    subject = common_lib_1.Subjects.OrderUpdated;
    queueGroupName = queue_group_name_1.queueGroupName;
    async onMessage(data, msg) {
        const { id, routeId } = data;
        // const route = await Route.findById(routeId);
        // if (route) {
        //     route.set({ capacity: route.capacity - 1 });
        //     await route.save();
        // }
        msg.ack();
    }
}
exports.OrderUpdatedListener = OrderUpdatedListener;
