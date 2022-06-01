"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRouteRouter = void 0;
const common_lib_1 = require("@mobileorg/common-lib");
const express_1 = __importDefault(require("express"));
const route_1 = require("../models/route");
const router = express_1.default.Router();
exports.showRouteRouter = router;
router.get('/api/routes/endLocation/:location', common_lib_1.currentUser, async (req, res) => {
    // $gte = greater than equals
    // Não listar rotas em que já tenha passado o dia nem que seja do utilizador
    const route = await route_1.Route.find({
        endLocation: req.params.location,
        state: 'AVAILABLE',
    }).sort({ startDate: 1 });
    console.log(route);
    if (!route) {
        throw new common_lib_1.NotFoundError({ from: 'show ride' });
    }
    const final = [];
    route.forEach((item) => {
        if (new Date(item.startDate) > new Date() && item.userId !== req.currentUser.id) {
            final.push(item);
        }
    });
    res.send(final);
});
router.get('/api/routes/startLocation/:location', async (req, res) => {
    const route = await route_1.Route.find({
        startLocation: req.params.location,
        state: 'AVAILABLE',
    }).sort({ startDate: 1 });
    console.log(route, req.params.location);
    const final = [];
    route.forEach((item) => {
        if (new Date(item.startDate) > new Date() && item.userId !== req.currentUser.id) {
            final.push(item);
        }
    });
    if (!final) {
        throw new common_lib_1.NotFoundError({ from: 'show ride' });
    }
    res.send(route);
});
router.get('/api/routes/user', common_lib_1.currentUser, async (req, res) => {
    const route = await route_1.Route.find({ userId: req.currentUser.id });
    if (!route) {
        throw new common_lib_1.NotFoundError({ from: 'show ride' });
    }
    res.send(route);
});
router.get('/api/routes/:id', async (req, res) => {
    console.log(req.params.id);
    const route = await route_1.Route.findById(req.params.id);
    if (!route) {
        throw new common_lib_1.NotFoundError({ from: 'show ride' });
    }
    res.send(route);
});
