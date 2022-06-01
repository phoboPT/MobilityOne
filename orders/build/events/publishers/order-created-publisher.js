"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCreatedPublisher = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
class OrderCreatedPublisher extends common_lib_1.Publisher {
    subject = common_lib_1.Subjects.OrderCreated;
}
exports.OrderCreatedPublisher = OrderCreatedPublisher;
