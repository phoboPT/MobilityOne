"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const comboios_1 = __importDefault(require("comboios"));
//@ts-ignore
const node_geocoder_1 = __importDefault(require("node-geocoder"));
const utils_1 = require("../lib/utils");
const route_1 = require("../models/route");
const routeAPI = async (start, end, type) => {
    try {
        const cpStations = await comboios_1.default.stations();
        const allTargets = [];
        const cpRoutes = [];
        const begin = { id: '', name: '' };
        const stop = { id: '', name: '' };
        let initialPlace = start;
        let finalPlace = end;
        const geocoder = (0, node_geocoder_1.default)({
            provider: 'opencage',
            apiKey: process.env.OPENCAGE_API_KEY,
            language: 'pt-BR',
        });
        console.log(initialPlace, finalPlace);
        const geo = await geocoder.batchGeocode([start, end]);
        initialPlace = geo[0].value[0];
        finalPlace = geo[1].value[0];
        const distanceBetween = (0, utils_1.distance)(start.lat, start.long, end.lat, end.long);
        // cpStations.forEach(async (station: IStation): Promise<void> => {
        //     allTargets.push(station.name);
        //     if (station.name.includes(initialPlace)) {
        //         begin.id = station.id;
        //         begin.name = station.name;
        //     }
        //     if (station.name.includes(finalPlace)) {
        //         stop.id = station.id;
        //         stop.name = station.name;
        //     }
        // });
        // const date: Date = new Date();
        const cpJourneys = [];
        const bdRides = await route_1.Route.find({ state: 'AVAILABLE' });
        // //  console.log(bdRides)
        bdRides.forEach((route) => {
            const ride = {
                id: route.id,
                type: route.type,
                availableTime: route.availableTime,
                state: route.state,
                description: route.description,
                estimatedTime: route.estimatedTime,
                startDate: route.startDate,
                userImage: route.userImage,
                rating: route.rating,
                capacity: route.capacity,
                actualCapacity: route.actualCapacity,
                version: route.version,
                legs: [
                    {
                        tripId: route.id,
                        origin: {
                            id: route.id,
                            name: route.startLocation,
                        },
                        destination: {
                            id: route.id,
                            name: route.endLocation,
                        },
                    },
                ],
                startLocation: route.startLocation,
                endLocation: route.endLocation,
                originId: route.id,
                destinationId: route.id,
                price: 0,
            };
            allTargets.push(route.startLocation);
            if (route.startLocation.includes(initialPlace)) {
                begin.id = route.id;
                begin.name = route.startLocation;
            }
            if (route.endLocation.includes(finalPlace)) {
                stop.id = route.id;
                stop.name = route.endLocation;
            }
            cpRoutes.push(ride);
        });
        // // busRoutes.data.forEach((route: any) => {
        // //     const routeDate = new Date(route.date);
        // //      if (routeDate.getHours() !== date.getHours()) return
        // //     const ride: IRoute = {
        // //         id: route.id,
        // //         type: route.type,
        // //         availableTime: route.availableTime,
        // //         state: route.state,
        // //         description: route.description,
        // //         estimatedTime: route.estimatedTime,
        // //         startDate: route.startDate,
        // //         userImage: route.userImage,
        // //         rating: route.rating,
        // //         capacity: route.capacity,
        // //         actualCapacity: route.actualCapacity,
        // //         version: route.version,
        // //         legs: [
        // //             {
        // //                 tripId: route.id,
        // //                 origin: {
        // //                     id: route.id,
        // //                     name: route.startLocation,
        // //                 },
        // //                 destination: {
        // //                     id: route.id,
        // //                     name: route.endLocation,
        // //                 },
        // //             }
        // //         ],
        // //         startLocation: route.startLocation,
        // //         endLocation: route.endLocation,
        // //         originId: route.id,
        // //         destinationId: route.id,
        // //         price: 0
        // //     }
        // //     allTargets.push(route.startLocation);
        // //     if (route.startLocation.includes(initialPlace)) {
        // //         begin.id = route.id;
        // //         begin.name = route.startLocation;
        // //     }
        // //     if (route.endLocation.includes(finalPlace)) {
        // //         stop.id = route.id;
        // //         stop.name = route.endLocation;
        // //     }
        // //     cpJourneys.push(ride);
        // // })
        // //filter journeys
        // if (cpJourneys) {
        //     cpJourneys.map((journey: IRoute): void => {
        //         journey.legs?.map((leg: ILeg) => {
        //             let found = false;
        //             cpRoutes?.forEach((element: IRoute) => {
        //                 if (element.startLocation === leg.origin.name && element.endLocation === leg.destination.name) {
        //                     found = true;
        //                 }
        //             });
        //             if (!found) {
        //                 cpRoutes.push({
        //                     id: leg.origin.id || '',
        //                     startLocation: leg.origin.name || '',
        //                     endLocation: leg.destination.name || '',
        //                     originId: leg.origin.id || '',
        //                     destinationId: leg.destination.id || '',
        //                     // leg: leg,
        //                     type: journey.type || 'comboio',
        //                     availableTime: leg.departure || '',
        //                     state: journey.state || 'Active',
        //                     description: journey.description || 'Viagem de comboio',
        //                     estimatedTime: leg.arrival || '',
        //                     startDate: journey.startDate || leg.departure || '',
        //                     userImage: journey.userImage || '',
        //                     rating: journey.rating || 0,
        //                     capacity: journey.capacity || 50,
        //                     actualCapacity: journey.actualCapacity || 50,
        //                     version: journey.version || 0,
        //                     price: leg.price || 0,
        //                 });
        //             }
        //         });
        //     });
        // }
        return { begin, stop, cpRoutes, allTargets };
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
};
exports.default = routeAPI;
