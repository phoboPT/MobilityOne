"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteCreatedListener = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
const route_1 = require("../../models/route");
const queue_group_name_1 = require("./queue-group-name");
class RouteCreatedListener extends common_lib_1.Listener {
    subject = common_lib_1.Subjects.RouteCreated;
    queueGroupName = queue_group_name_1.queueGroupName;
    async onMessage(data, msg) {
        const { id, capacity } = data;
        const route = route_1.Route.build({
            id,
            capacity,
        });
        await route.save();
        msg.ack();
    }
}
exports.RouteCreatedListener = RouteCreatedListener;
