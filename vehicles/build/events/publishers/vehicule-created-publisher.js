"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiculeCreatedPublisher = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
class VehiculeCreatedPublisher extends common_lib_1.Publisher {
    subject = common_lib_1.Subjects.VehiculeCreated;
}
exports.VehiculeCreatedPublisher = VehiculeCreatedPublisher;
