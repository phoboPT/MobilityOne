"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFinishPublisher = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
class OrderFinishPublisher extends common_lib_1.Publisher {
    subject = common_lib_1.Subjects.OrderFinish;
}
exports.OrderFinishPublisher = OrderFinishPublisher;
