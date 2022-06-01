"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFinishedListener = void 0;
const queue_group_name_1 = require("./queue-group-name");
const common_lib_1 = require("@mobileorg/common-lib");
const route_1 = require("../../models/route");
class OrderFinishedListener extends common_lib_1.Listener {
    subject = common_lib_1.Subjects.OrderFinish;
    queueGroupName = queue_group_name_1.queueGroupName;
    async onMessage(data, msg) {
        const { id, route } = data;
        const routes = await route_1.Route.findById(route.id);
        if (routes) {
            routes.set({ actualCapacity: routes.capacity });
            await routes.save();
        }
        msg.ack();
    }
}
exports.OrderFinishedListener = OrderFinishedListener;
