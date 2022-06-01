"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_update_if_current_1 = require("mongoose-update-if-current");
const routeSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    startLocation: {
        type: String,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    availableTime: {
        type: String,
        required: true,
    },
    vehicleId: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    estimatedTime: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    userImage: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    actualCapacity: {
        type: Number,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
routeSchema.set('versionKey', 'version');
routeSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
routeSchema.statics.build = (attrs) => {
    return new Route(attrs);
};
const Route = mongoose_1.default.model('Route', routeSchema);
exports.Route = Route;
