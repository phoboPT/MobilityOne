"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteCreatedPublisher = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
class RouteCreatedPublisher extends common_lib_1.Publisher {
    subject = common_lib_1.Subjects.RouteCreated;
}
exports.RouteCreatedPublisher = RouteCreatedPublisher;
