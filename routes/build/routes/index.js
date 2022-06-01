"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouteRouter = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
const express_1 = __importDefault(require("express"));
const route_1 = require("../models/route");
const router = express_1.default.Router();
exports.indexRouteRouter = router;
router.get('/api/routes', async (req, res) => {
    const route = await route_1.Route.find({});
    res.status(200).send(route);
});
router.get('/api/routes/user', common_lib_1.requiredAuth, async (req, res) => {
    const route = await route_1.Route.find({ userId: req.currentUser.id });
    res.status(200).send(route);
});
router.get('/api/routes/user/:id', common_lib_1.requiredAuth, async (req, res) => {
    const route = await route_1.Route.find({ userId: req.params.id });
    res.status(200).send(route);
});
// req.currentUser!.id
