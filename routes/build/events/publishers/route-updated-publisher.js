"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteUpdatedPublisher = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
class RouteUpdatedPublisher extends common_lib_1.Publisher {
    subject = common_lib_1.Subjects.RouteUpdated;
}
exports.RouteUpdatedPublisher = RouteUpdatedPublisher;
