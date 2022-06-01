"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiculeUpdatedPublisher = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
class VehiculeUpdatedPublisher extends common_lib_1.Publisher {
    subject = common_lib_1.Subjects.VehiculeUpdated;
}
exports.VehiculeUpdatedPublisher = VehiculeUpdatedPublisher;
