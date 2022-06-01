"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouteRouter = void 0;
const filterRoutes_1 = require("./../lib/filterRoutes");
const express_1 = __importDefault(require("express"));
const searchGraph_1 = require("../lib/searchGraph");
const routeAPI_1 = __importDefault(require("../lib/routeAPI"));
const router = express_1.default.Router();
exports.searchRouteRouter = router;
router.get('/api/routes/start/:start/end/:end/:type', async (req, res) => {
    try {
        const before = Date.now();
        const { type } = req.params;
        // const splitStart = req.params.start.split(',');
        // const splitEnd = req.params.end.split(',');
        // const start = { lat: parseFloat(splitStart[0]), long: parseFloat(splitStart[1]) };
        // const end: ILatLong = { lat: parseFloat(splitEnd[0]), long: parseFloat(splitEnd[1]) };
        // console.log(start, end);
        let allPaths;
        // get CP journeys between 2 citys
        const { begin, stop, cpRoutes, allTargets } = await (0, routeAPI_1.default)(req.params.start, req.params.end, type);
        //search for possible paths given a start, end and all the routes
        allTargets.push(req.params.start);
        allTargets.push(req.params.end);
        if (cpRoutes) {
            allPaths = (0, searchGraph_1.searchRoute)(req.params.start, req.params.end, cpRoutes, allTargets);
        }
        //filter the results
        const filteredRoutes = (0, filterRoutes_1.filterRoutes)(allPaths, cpRoutes);
        const after = Date.now();
        console.log('Route performed in ', (after - before) / 1000);
        res.send(filteredRoutes);
    }
    catch (error) {
        console.log(`error ${error}`);
    }
});
