"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelledPublisher = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
class OrderCancelledPublisher extends common_lib_1.Publisher {
    subject = common_lib_1.Subjects.OrderCancelled;
}
exports.OrderCancelledPublisher = OrderCancelledPublisher;
